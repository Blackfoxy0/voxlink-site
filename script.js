'use strict';
const returnedAuth = new URLSearchParams(location.hash.slice(1));
if (returnedAuth.has('access_token') || returnedAuth.has('refresh_token') || returnedAuth.has('error_description')) {
  history.replaceState(null, '', location.pathname + '#plataformas');
}

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  nav.classList.remove('open');
}));
const views = {
  chat: { kicker: 'CONVERSAS', title: 'Perto, mesmo de longe.', status: 'Chats de texto e mídia já estão no aplicativo. Os perfis e mensagens deste exemplo são fictícios.', html: '<div class="bubble-row"><span class="mini-avatar">A</span><div class="bubble">Bora reunir a galera hoje?<small>Ana · exemplo</small></div></div><div class="bubble-row reverse"><span class="mini-avatar violet">L</span><div class="bubble">Bora! Te encontro no lounge. ✦<small>Léo · exemplo</small></div></div><div class="bubble-row"><span class="mini-avatar">A</span><div class="bubble">Uma conversa. Um mundo de possibilidades.</div></div>' },
  community: { kicker: 'COMUNIDADES', title: 'Um lugar para pertencer.', status: 'Chats separados para games, bate-papo e avisos, sincronizados na nuvem. Moderação avançada em desenvolvimento.', html: '<div class="community-row"><span>✕</span><div><strong>Depois da partida</strong><small>Games · canal de texto</small></div><span class="hash">#</span></div><div class="community-row"><span>◎</span><div><strong>Vozes do mundo</strong><small>Idiomas · lounge de voz</small></div><span class="hash">◉</span></div><div class="community-row"><span>✦</span><div><strong>Ideias em órbita</strong><small>Criatividade · canal de texto</small></div><span class="hash">#</span></div>' },
  live: { kicker: 'TRANSMISSÕES', title: 'Uma janela para o seu mundo.', status: 'Tela e câmera estão integradas ao LiveKit. Lives públicas de perfil e vídeos gravados ainda serão desenvolvidos.', html: '<div class="live-demo"><img src="voxlink-saturn.png" alt=""><span class="tag">PRÉVIA ILUSTRATIVA</span><strong>Seu próximo<br>grande momento.</strong><small>Games. Ideias. Conversas.</small></div>' }
};
const tabs = [...document.querySelectorAll('[data-view]')];
function showView(key, focus = false) {
  const view = views[key];
  if (!view) return;
  tabs.forEach(tab => { const active = tab.dataset.view === key; tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
  document.querySelector('#panel-kicker').textContent = view.kicker;
  document.querySelector('#panel-title').textContent = view.title;
  document.querySelector('#panel-status').textContent = view.status;
  // Only developer-authored static templates; no user or remote HTML is inserted.
  document.querySelector('#panel-visual').innerHTML = view.html;
  document.querySelector('#experience-panel').setAttribute('aria-labelledby', 'tab-' + key);
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => showView(tab.dataset.view));
  tab.addEventListener('keydown', event => {
    let index;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) index = (i + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) index = (i + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    if (index !== undefined) { event.preventDefault(); showView(tabs[index].dataset.view, true); }
  });
});
showView('chat');
const translations = {
  en: ['ENGLISH', 'The world feels smaller when we understand each other.'],
  es: ['ESPAÑOL', 'El mundo se hace más pequeño cuando nos entendemos.'],
  ja: ['日本語', 'お互いを理解し合うと、世界がもっと身近になる。'],
  pt: ['PORTUGUÊS · MESMO IDIOMA', 'O mundo fica menor quando a gente se entende.']
};
document.querySelector('#language').addEventListener('change', event => {
  const [label, phrase] = translations[event.target.value];
  document.querySelector('#target-label').textContent = label;
  const text = document.querySelector('#target-text');
  text.textContent = phrase;
  text.lang = event.target.value;
});
const details = {
  games: ['GAMES & COMUNIDADE', 'A partida é só o começo.', ['Na beta, crie uma comunidade, convide seu grupo e use canais de texto e salas de voz. Com LiveKit configurado, também é possível compartilhar câmera e tela.', 'A visão para a próxima etapa inclui transmissões vinculadas ao perfil, um espaço para criadores e controles de quem pode assistir. Esses recursos ainda estão em desenvolvimento.']],
  news: ['NOTÍCIAS & IDEIAS', 'Mais perspectivas. Mais conversa.', ['O VoxLink quer dar espaço a conversas sobre o que acontece no mundo, com comunidades e transmissões de criadores.', 'O catálogo editorial, as lives públicas, as ferramentas de denúncia e a moderação ainda precisam ser implementados antes de uma abertura ao público. Não há uma redação ou verificação editorial de notícias ativa neste site.']],
  world: ['CONEXÕES ENTRE IDIOMAS', 'Você fala. O mundo se aproxima.', ['O projeto prepara uma ponte entre idiomas, com 20 idiomas disponíveis nos perfis. Pessoas com o mesmo idioma continuam ouvindo a voz original.', 'O processamento de tradução precisa de um provedor de IA configurado no servidor. O exemplo desta página usa frases prontas e não captura seu microfone.']],
  privacy: ['PRIVACIDADE & TRANSPARÊNCIA', 'Você no controle da conexão.', ['Esta página é apenas uma apresentação, sem cadastro nem login. Ao criar conta no aplicativo, seu e-mail, nickname e preferências são enviados ao Supabase. A página não acessa microfone ou câmera e não envia o idioma da demonstração para tradução. Não adicionamos analytics nem rastreadores próprios. A hospedagem pode manter registros técnicos necessários ao serviço.', 'No aplicativo, mensagens e perfis são processados pelo servidor configurado. O histórico de chats ainda não usa criptografia ponta a ponta. Uma tradução real exige enviar a fala ao provedor de IA escolhido pelo operador.', 'As chaves de LiveKit e IA ficam no backend. Recursos de bloqueio, denúncia, contas verificadas, retenção e moderação devem ser concluídos antes do lançamento público. Esta descrição corresponde à beta em desenvolvimento; ela não é uma certificação de segurança.']],
  android: ['ANDROID · 0.5.10', 'O VoxLink no seu celular.', ['APK para Android 7.0 ou superior (Android 7.1 recomendado), arquitetura ARM64. Use os botões de download desta página. A atualização traz fotos nas publicações, zoom e download original de imagens do chat, fundo local personalizável, cores pastéis e agenda com o app aberto. A captura de áudio interno da tela Android ainda está em desenvolvimento; o microfone permanece separado.', 'O aplicativo usa Supabase e LiveKit pela internet, sem exigir um PC na mesma rede. Assinatura de teste; cadastro público com confirmação ainda depende da configuração de SMTP.']],
  windows: ['WINDOWS · 0.5.10', 'Seu espaço no desktop.', ['Instalador com apresentação do produto, escolha de pasta e atalhos. Interface compacta, participantes próximos ao vídeo, fotos sincronizadas, qualidade individual para assistir e opção de transmitir som da janela no Windows quando o sistema oferece captura de áudio.', 'Use o download Windows desta página. O modo Supabase usa internet sem exigir servidor local. O executável ainda não tem assinatura digital de editor.']],
  web: ['NAVEGADOR · VOXLINK WEB', 'A sua órbita em uma aba.', ['Este site apresenta o VoxLink e oferece downloads. O botão Abrir no navegador inicia o aplicativo web, onde ficam cadastro e login.', 'Chamadas e conversas estão disponíveis conforme suporte do navegador e permissões de câmera e microfone. A confirmação de cadastro público depende de SMTP configurado.']]
};
const dialog = document.querySelector('#detail-dialog');
let dialogTrigger;
function openDetail(key, trigger) {
  const detail = details[key];
  if (!detail) return;
  dialogTrigger = trigger;
  document.querySelector('#dialog-kicker').textContent = detail[0];
  document.querySelector('#dialog-title').textContent = detail[1];
  const body = document.querySelector('#dialog-body');
  body.replaceChildren(...detail[2].map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  dialog.showModal();
}
document.querySelectorAll('[data-detail], [data-platform]').forEach(button => button.addEventListener('click', () => openDetail(button.dataset.detail || button.dataset.platform, button)));
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => dialogTrigger?.focus());
dialog.addEventListener('click', event => { if (event.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); });

