"""Publish only the already validated 1.0.0 Windows/Web artifacts."""
import base64
import hashlib
import json
import os
import time
import zipfile
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen

REPOSITORY = 'Blackfoxy0/voxlink-site'
BRANCH = 'refs/heads/release-1.0.0-20261022'
assert os.environ.get('GITHUB_ACTIONS') == 'true', 'CI-only publisher'
assert os.environ.get('GITHUB_REPOSITORY', '').lower() == REPOSITORY.lower()
assert os.environ.get('GITHUB_REF') == BRANCH
TOKEN = os.environ['GH_TOKEN']
BASE = 'https://api.github.com/repos/' + REPOSITORY
HERE = Path(__file__).resolve().parent
MANIFEST = json.loads((HERE / 'manifest.json').read_text(encoding='utf-8'))
assert MANIFEST['version'] == '1.0.0' and MANIFEST['build'] == 32
assert MANIFEST['repository'] == REPOSITORY
EXPECTED_NAMES = {'voxlink-windows.zip', 'voxlink-windows-setup.exe', 'voxlink-web-site-complete.zip', 'RELEASE_NOTES.md'}
assert set(MANIFEST['artifacts']) == EXPECTED_NAMES
WORK = Path(os.environ['RUNNER_TEMP']) / 'voxlink-release-100'
WORK.mkdir(exist_ok=True)

def request(path, method='GET', value=None, binary=None):
    url = path if path.startswith('https://') else BASE + path
    assert urlparse(url).hostname in {'api.github.com', 'uploads.github.com'}
    headers = {'Authorization': 'Bearer ' + TOKEN, 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'VoxLink-authorized-release-100'}
    data = None
    if value is not None:
        data = json.dumps(value).encode()
        headers['Content-Type'] = 'application/json'
    elif binary is not None:
        data = binary
        headers['Content-Type'] = 'application/octet-stream'
    with urlopen(Request(url, data=data, method=method, headers=headers), timeout=300) as response:
        raw = response.read()
        return json.loads(raw) if raw else None

for source, total in MANIFEST['sourceSizes'].items():
    assert source in {'windows', 'delta'} and total > 0
    parts = sorted((p for p in MANIFEST['parts'] if p['source'] == source), key=lambda p: p['offset'])
    cursor = 0
    with (WORK / (source + '.bin')).open('wb') as target:
        for part in parts:
            assert part['offset'] == cursor
            for attempt in range(3):
                try:
                    blob = request('/git/blobs/' + part['blob'])
                    assert blob['sha'] == part['blob'] and blob['encoding'] == 'base64'
                    raw = base64.b64decode(blob['content'])
                    assert len(raw) == part['length']
                    assert hashlib.sha256(raw).hexdigest() == part['sha256']
                    break
                except (HTTPError, TimeoutError):
                    if attempt == 2:
                        raise
                    time.sleep(2)
            target.write(raw)
            cursor += len(raw)
    assert cursor == total
    print('Verified transport:', source, total, flush=True)

sources = {key: (WORK / (key + '.bin')).read_bytes() for key in MANIFEST['sourceSizes']}
OUTPUT = WORK / 'artifacts'
OUTPUT.mkdir(exist_ok=True)
(OUTPUT / 'voxlink-windows.zip').write_bytes(sources['windows'])
for name, segments in MANIFEST['plans'].items():
    assert name in {'voxlink-windows-setup.exe', 'voxlink-web-site-complete.zip'}
    with (OUTPUT / name).open('wb') as target:
        for segment in segments:
            data = sources[segment['source']]
            start, size = segment['offset'], segment['length']
            assert 0 <= start <= len(data) and 0 <= size <= len(data) - start
            target.write(data[start:start+size])
(OUTPUT / 'RELEASE_NOTES.md').write_bytes((HERE / 'RELEASE_NOTES.md').read_bytes())
for name, expected in MANIFEST['artifacts'].items():
    data = (OUTPUT / name).read_bytes()
    assert len(data) == expected['bytes'] and hashlib.sha256(data).hexdigest() == expected['sha256'], name
    if name.endswith('.zip'):
        with zipfile.ZipFile(OUTPUT / name) as archive:
            assert archive.testzip() is None
            assert all(not Path(item.filename).is_absolute() and '..' not in Path(item.filename).parts for item in archive.infolist())
    print('Verified artifact:', name, expected['sha256'], flush=True)
assert (OUTPUT / 'voxlink-windows-setup.exe').read_bytes()[:2] == b'MZ'
checksum = ''.join(f'{expected["sha256"]}  {name}\n' for name, expected in MANIFEST['artifacts'].items())
(OUTPUT / 'SHA256SUMS.txt').write_text(checksum, encoding='utf-8')
marker = '<!-- verified-voxlink-100:' + MANIFEST['artifacts']['voxlink-windows.zip']['sha256'] + ':' + MANIFEST['artifacts']['voxlink-web-site-complete.zip']['sha256'] + ' -->'
body = (OUTPUT / 'RELEASE_NOTES.md').read_text(encoding='utf-8') + '\n\n' + marker
try:
    release = request('/releases/tags/v1.0.0')
except HTTPError as error:
    if error.code != 404:
        raise
    release = request('/releases', 'POST', {'tag_name': 'v1.0.0', 'target_commitish': os.environ['GITHUB_SHA'], 'name': 'VoxLink 1.0.0 — Windows e Web (beta)', 'body': body, 'draft': True, 'prerelease': True, 'make_latest': 'false'})
if not release['draft']:
    assert marker in (release.get('body') or ''), 'Refuse to change another published release'
    assert {a['name'] for a in release['assets']} == EXPECTED_NAMES | {'SHA256SUMS.txt'}
    for asset in release['assets']:
        raw = (OUTPUT / asset['name']).read_bytes()
        assert asset['size'] == len(raw) and asset.get('digest') == 'sha256:' + hashlib.sha256(raw).hexdigest()
    print(json.dumps({'alreadyPublished': True, 'url': release['html_url']}), flush=True)
    raise SystemExit(0)
assert marker in (release.get('body') or ''), 'Refuse to modify an unrelated draft'
upload = release['upload_url'].split('{')[0]
assert urlparse(upload).hostname == 'uploads.github.com'
for name in [*MANIFEST['artifacts'], 'SHA256SUMS.txt']:
    raw = (OUTPUT / name).read_bytes()
    digest = 'sha256:' + hashlib.sha256(raw).hexdigest()
    current = request('/releases/' + str(release['id']))
    existing = next((a for a in current['assets'] if a['name'] == name), None)
    if existing is None:
        existing = request(upload + '?name=' + quote(name), 'POST', binary=raw)
    assert existing['state'] == 'uploaded' and existing['size'] == len(raw) and existing.get('digest') == digest, name
    print('Verified release upload:', name, flush=True)
current = request('/releases/' + str(release['id']))
assert {a['name'] for a in current['assets']} == EXPECTED_NAMES | {'SHA256SUMS.txt'}
published = request('/releases/' + str(release['id']), 'PATCH', {'draft': False, 'prerelease': True, 'make_latest': 'false'})
assert not published['draft'] and published['tag_name'] == 'v1.0.0'
print(json.dumps({'published': True, 'version': '1.0.0', 'releaseId': published['id'], 'url': published['html_url'], 'assets': [{'name': a['name'], 'size': a['size'], 'digest': a.get('digest')} for a in published['assets']]}), flush=True)
