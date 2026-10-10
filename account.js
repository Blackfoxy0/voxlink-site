'use strict';
(() => {
  const origin = 'https://dpjncogddnknjdsirrdg.supabase.co';
  const publishable = 'sb_publishable_-tgxLhtbKFR2lvQIDLtDJQ_ldKxP99B';
  const $ = id => document.getElementById(id);
  let mode = 'signup', session = null, profile = null, generation = 0, busy = false, expiry;
  const say = (id, text) => { $(id).textContent = text; };
  function clearSession() {
    generation++; session = null; profile = null; clearTimeout(expiry);
    $('account-profile').hidden = true; $('account-auth').hidden = false;
    $('profile-heading').textContent = ''; $('profile-code').textContent = '';
    $('people-results').replaceChildren(); $('friend-results').replaceChildren();
    $('account-password').value = '';
  }
  async function request(path, {method='GET', body, authorized=false, headers={}}={}) {
    if (authorized && !session) throw new Error('Entre na sua conta primeiro.');
    const version = generation;
    const response = await fetch(origin + path, {
      method, credentials:'omit', signal:AbortSignal.timeout(20000),
      headers:{apikey:publishable, ...(authorized ? {Authorization:'Bearer ' + session.access_token} : {}), ...(body !== undefined ? {'Content-Type':'application/json'} : {}), ...headers},
      ...(body !== undefined ? {body:JSON.stringify(body)} : {})
    });
    const content = await response.text();
    let result; try { result = content ? JSON.parse(content) : null; } catch { throw new Error('O serviço retornou uma resposta inválida.'); }
    if (authorized && generation !== version) throw new Error('A sessão mudou. Entre novamente.');
    if (!response.ok) {
      if (response.status === 401 && authorized) { clearSession(); throw new Error('Sua sessão terminou. Entre novamente.'); }
      const code = result?.error_code || result?.code;
      const messages = {
        invalid_credentials:'E-mail ou senha incorretos.',
        email_not_confirmed:'Confirme seu e-mail antes de entrar.',
        over_email_send_rate_limit:'Limite de e-mails atingido. Aguarde antes de tentar novamente.',
        email_address_not_authorized:'O envio de e-mail público ainda precisa ser configurado pelo administrador.',
        user_already_exists:'Confira seu e-mail ou entre na conta existente.',
        weak_password:'Escolha uma senha mais forte, com pelo menos 12 caracteres.',
        '23505':'Nickname indisponível ou convite já existente.', unexpected_failure:'O servidor não concluiu o cadastro. Confira o nickname e a configuração de envio de e-mail.',
        '42501':'Você não tem permissão para essa ação.'
      };
      throw new Error(messages[code] || (response.status === 429 ? 'Muitas tentativas. Aguarde e tente novamente.' : 'Não foi possível concluir. Verifique os dados e tente novamente.'));
    }
    return result;
  }
  function choose(next) {
    mode=next; $('signup-fields').hidden=next==='login';
    $('account-name').required=next==='signup';
    $('account-password').autocomplete=next==='login'?'current-password':'new-password';
    $('account-submit').textContent=next==='login'?'Entrar na conta':'Criar minha conta';
    $('mode-signup').setAttribute('aria-pressed',String(next==='signup'));
    $('mode-login').setAttribute('aria-pressed',String(next==='login'));
    say('account-status','');
  }
  $('mode-login').addEventListener('click',()=>{ if(!busy) choose('login'); });
  $('mode-signup').addEventListener('click',()=>{ if(!busy) choose('signup'); });
  async function activate(value) {
    if (!value?.access_token || !value.user?.id) throw new Error('Confira seu e-mail para ativar a conta.');
    session=value; generation++;
    const user=await request('/auth/v1/user',{authorized:true});
    if (!user.email_confirmed_at || user.is_anonymous) { clearSession(); throw new Error('Confirme seu e-mail para ativar sua conta.'); }
    const rows=await request('/rest/v1/profiles?id=eq.'+encodeURIComponent(user.id)+'&select=id,display_name,native_language,discoverable,friend_tag',{authorized:true});
    profile=rows[0];
    if (!profile) {
      const metadata=user.user_metadata || {};
      const name=String(metadata.display_name || 'Pessoa VoxLink').trim().slice(0,48);
      const language=['pt-BR','en-US','es-ES','ja-JP'].includes(metadata.native_language)?metadata.native_language:'pt-BR';
      const created=await request('/rest/v1/profiles',{method:'POST',authorized:true,headers:{Prefer:'return=representation'},body:{id:user.id,display_name:name.length>=2?name:'Pessoa VoxLink',native_language:language,discoverable:metadata.discoverable===true}});
      profile=created[0];
    }
    $('account-auth').hidden=true; $('account-profile').hidden=false;
    $('profile-heading').textContent='Olá, '+profile.display_name+'.';
    $('profile-code').textContent='Sua identidade: '+profile.friend_tag;
    $('profile-discoverable').checked=profile.discoverable;
    $('account-password').value='';
    expiry=setTimeout(()=>{ clearSession(); say('account-status','Sua sessão terminou. Entre novamente.'); },Math.max(1000,(value.expires_in || 3600)*1000-30000));
    say('account-status','Conta conectada. Você pode buscar pessoas e acessar os downloads.');
    await loadFriends();
  }
  $('account-form').addEventListener('submit',async event=>{
    event.preventDefault(); if(busy) return; busy=true; $('account-submit').disabled=true;
    try {
      say('account-status',mode==='signup'?'Criando sua conta…':'Entrando…');
      const email=$('account-email').value.trim(), password=$('account-password').value;
      if (mode==='signup') {
        const nickname=$('account-name').value.trim().toLowerCase(); if(!/^[a-z0-9_]{3,24}$/.test(nickname)) throw new Error('Use nickname de 3 a 24 letras, números ou _.'); const result=await request('/auth/v1/signup?redirect_to='+encodeURIComponent(location.origin+'/'),{method:'POST',body:{email,password,data:{display_name:nickname,nickname,native_language:$('account-language').value,discoverable:$('account-discoverable').checked}}});
        $('account-password').value='';
        if(result?.access_token) await activate(result);
        else { choose('login'); say('account-status','Confira seu e-mail para confirmar o cadastro. Depois entre com sua senha.'); }
      } else await activate(await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password}}));
    } catch(error) { if(session && !profile) clearSession(); say('account-status',error.message || 'Não foi possível conectar.'); }
    finally { busy=false; $('account-submit').disabled=false; }
  });
  $('account-signout').addEventListener('click',async()=>{
    const token=session?.access_token; clearSession(); say('account-status','Você saiu da conta.');
    if(token) try { await fetch(origin+'/auth/v1/logout?scope=local',{method:'POST',credentials:'omit',signal:AbortSignal.timeout(10000),headers:{apikey:publishable,Authorization:'Bearer '+token}}); } catch {}
  });
  $('save-privacy').addEventListener('click',async()=>{
    try {
      if(!profile) throw new Error('Entre primeiro.');
      const enabled=$('profile-discoverable').checked;
      await request('/rest/v1/profiles?id=eq.'+encodeURIComponent(profile.id),{method:'PATCH',authorized:true,body:{discoverable:enabled}});
      profile.discoverable=enabled; say('account-status','Preferência de busca salva.');
    } catch(error) {say('account-status',error.message);}
  });
  function personRow(name, actions) {
    const row=document.createElement('div'); row.className='person-row';
    const label=document.createElement('span'); label.textContent=name; row.append(label);
    actions.forEach(([text,fn])=>{const button=document.createElement('button');button.type='button';button.className='button secondary';button.textContent=text;button.addEventListener('click',async()=>{button.disabled=true;try{await fn();}catch(error){say('people-status',error.message);}finally{button.disabled=false;}});row.append(button);});
    return row;
  }
  $('people-search').addEventListener('submit',async event=>{
    event.preventDefault();
    try {
      const people=await request('/rest/v1/rpc/search_people',{method:'POST',authorized:true,body:{term:$('people-term').value.trim()}});
      $('people-results').replaceChildren(...people.map(person=>personRow(person.display_name,[
        ['Adicionar',async()=>{await request('/rest/v1/friendships',{method:'POST',authorized:true,body:{requester_id:profile.id,recipient_id:person.id}});say('people-status','Solicitação enviada.');await loadFriends();}],
        ['Bloquear',async()=>{await request('/rest/v1/contact_blocks',{method:'POST',authorized:true,body:{blocker_id:profile.id,blocked_id:person.id}});$('people-results').replaceChildren();say('people-status','Contato bloqueado.');await loadFriends();}]
      ])));
      say('people-status',people.length?people.length+' pessoa(s) encontrada(s).':'Nenhuma pessoa encontrada. Peça o código de amigo ou confirme se ela ativou a busca.');
    } catch(error) {say('people-status',error.message);}
  });
  async function loadFriends() {
    const friends=await request('/rest/v1/rpc/list_friends',{method:'POST',authorized:true,body:{}});
    $('friend-results').replaceChildren(...friends.map(friend=>{
      const actions=[];
      if(friend.status==='pending' && friend.incoming) actions.push(['Aceitar',async()=>{await request('/rest/v1/friendships?id=eq.'+encodeURIComponent(friend.request_id),{method:'PATCH',authorized:true,body:{status:'accepted'}});await loadFriends();}]);
      actions.push([friend.status==='accepted'?'Remover':'Cancelar / recusar',async()=>{await request('/rest/v1/friendships?id=eq.'+encodeURIComponent(friend.request_id),{method:'DELETE',authorized:true});await loadFriends();}]);
      actions.push(['Bloquear',async()=>{await request('/rest/v1/contact_blocks',{method:'POST',authorized:true,body:{blocker_id:profile.id,blocked_id:friend.profile_id}});await loadFriends();}]);
      return personRow(friend.display_name+' · '+(friend.status==='accepted'?'Amigo':friend.incoming?'Convite recebido':'Convite enviado'),actions);
    }));
  }
  $('refresh-friends').addEventListener('click',()=>loadFriends().catch(error=>say('people-status',error.message)));
  document.querySelectorAll('[data-download]').forEach(button=>button.addEventListener('click',async()=>{
    button.disabled=true;
    try {
      say('download-status','Preparando o download…');
      const filename=button.dataset.download;
      if(!['voxlink-android-arm64.apk','voxlink-windows-setup.exe'].includes(filename)) throw new Error('Arquivo inválido.');
      const link=document.createElement('a'); link.href='https://github.com/Blackfoxy0/voxlink-site/releases/download/v0.5.1/'+filename; link.rel='noopener'; link.download=button.dataset.download; link.click();
      say('download-status','Download solicitado. Esta é uma versão beta.');
    } catch(error) {say('download-status',error.message);}
    finally {button.disabled=false;}
  }));
  // Auth confirmation returns here. The hash is removed before further rendering.
  const hash=new URLSearchParams(location.hash.slice(1));
  if(hash.has('access_token')) {
    const token=hash.get('access_token'); history.replaceState(null,'',location.pathname+'#conta');
    request('/auth/v1/user',{headers:{Authorization:'Bearer '+token}}).then(user=>activate({access_token:token,user,expires_in:Number(hash.get('expires_in'))||3600})).catch(error=>{clearSession();say('account-status',error.message);});
  }
  choose('signup');
})();


