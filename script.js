'use strict';
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
  chat: { kicker: 'CONVERSAS', title: 'Perto, mesmo de longe.', status: 'Chats de texto já estão na beta. Os perfis e mensagens deste exemplo são fictícios.', html: '<div class="bubble-row"><span class="mini-avatar">A</span><div class="bubble">Bora reunir a galera hoje?<small>Ana · exemplo</small></div></div><div class="bubble-row reverse"><span class="mini-avatar violet">L</span><div class="bubble">Bora! Te encontro no lounge. ✦<small>Léo · exemplo</small></div></div><div class="bubble-row"><span class="mini-avatar">A</span><div class="bubble">Uma conversa. Um mundo de possibilidades.</div></div>' },
  community: { kicker: 'COMUNIDADES', title: 'Um lugar para pertencer.', status: 'Comunidades, canais e convites já existem na beta. Estes nomes são apenas exemplos.', html: '<div class="community-row"><span>✕</span><div><strong>Depois da partida</strong><small>Games · canal de texto</small></div><span class="hash">#</span></div><div class="community-row"><span>◎</span><div><strong>Vozes do mundo</strong><small>Idiomas · lounge de voz</small></div><span class="hash">◉</span></div><div class="community-row"><span>✦</span><div><strong>Ideias em órbita</strong><small>Criatividade · canal de texto</small></div><span class="hash">#</span></div>' },
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
  world: ['CONEXÕES ENTRE IDIOMAS', 'Você fala. O mundo se aproxima.', ['O projeto prepara uma ponte entre português, inglês, espanhol e japonês. Pessoas com o mesmo idioma continuam ouvindo a voz original.', 'O processamento de tradução precisa de um provedor de IA configurado no servidor. O exemplo desta página usa frases prontas e não captura seu microfone.']],
  privacy: ['PRIVACIDADE & TRANSPARÊNCIA', 'Você no controle da conexão.', ['O cadastro opcional envia e-mail, nickname e preferências ao Supabase. A página não acessa microfone ou câmera e não envia o idioma da demonstração para tradução. Não adicionamos analytics nem rastreadores próprios. A hospedagem pode manter registros técnicos necessários ao serviço.', 'No aplicativo, mensagens e perfis são processados pelo servidor configurado. O histórico de chats ainda não usa criptografia ponta a ponta. Uma tradução real exige enviar a fala ao provedor de IA escolhido pelo operador.', 'As chaves de LiveKit e IA ficam no backend. Recursos de bloqueio, denúncia, contas verificadas, retenção e moderação devem ser concluídos antes do lançamento público. Esta descrição corresponde à beta em desenvolvimento; ela não é uma certificação de segurança.']],
  android: ['ANDROID · BETA 0.3.0', 'O VoxLink no seu celular.', ['O APK de testes já foi compilado e instalado nos dois aparelhos usados no desenvolvimento. A distribuição pública e a assinatura definitiva ainda estão em preparação.', 'Esta beta se conecta ao servidor do projeto. Em testes locais, o computador e a conexão configurada precisam estar disponíveis. O download público será colocado aqui quando houver um endereço de distribuição validado.']],
  windows: ['WINDOWS · BETA 0.4.0', 'Seu espaço no desktop.', ['A versão nativa para Windows foi compilada, instalada e aberta no PC de desenvolvimento. Ela conta com atalhos na Área de Trabalho e no menu Iniciar.', 'O instalador público ainda não está disponível neste site. A versão de teste depende do servidor local do VoxLink.']],
  web: ['NAVEGADOR · PRÉVIA LOCAL', 'A sua órbita em uma aba.', ['A interface web do VoxLink já funciona no ambiente de desenvolvimento. O endereço público do aplicativo será disponibilizado quando o servidor estiver acessível pela internet.', 'Este site é a apresentação oficial do projeto e uma demonstração de sua experiência. A área de conta usa Supabase; chamadas e conversas são acessadas pelo aplicativo. O envio público de confirmação ainda depende da configuração de SMTP.']]
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

