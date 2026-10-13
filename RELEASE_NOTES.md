# VoxLink 0.6.4 — beta de personalização, mídia e fluidez

Build 21. Windows, Android ARM64 e Web.

- GIF/WebP estáticos e animados originais, seletor Android sem filtro MIME incorreto; favoritos locais por conta, inclusive figurinhas recebidas. Removido o limite de 120 quadros ao favoritar. Até 5 MB por arquivo e 2 MP, sem quota de quantidade local; coleção ainda não pareia entre dispositivos.
- Mensagens privadas e de comunidades com eco local, estado de envio/falha e reenvio sem duplicar. Cache e pré-carregamento limitados para avatares, mídia e históricos. Recebimento depende da rede e ainda usa consultas periódicas.
- Até seis fotos por publicação. Troca de calls protegida contra credenciais atrasadas; presença de membros autorizados sem exigir amizade. Navegação preserva a call e o player.
- Área própria de Personalização: 33 molduras, 12 banners, quatro adornos e dez estilos de fonte. Fonte só no nome ou na plataforma; prévia sem aplicar. Artes separadas dos painéis de referência; PNGs estáticos com efeitos leves procedurais, não GIFs extraídos de JPEGs.
- Animações decorativas com limite de 30 notificações de pintura/s e suspensão em segundo plano/telas ocultas; opção de reduzir movimento. Avisos com volume próprio e proteção contra rajadas. Android usa SoundPool para avisos sem solicitar foco exclusivo nem alterar a rota global de áudio.
- Instalador com identidade VoxLink, atalhos normais e abertura maximizada ao concluir.
- Música em beta: fila única, controles compartilhados, biblioteca de áudio própria e player oficial visível de links YouTube. Volume separado da voz/tela. Busca por nome requer YOUTUBE_API_KEY no servidor, ainda ausente.
- Tradução de texto/voz PT↔EN com opções de autorização, serviço online e faixas separadas. Transporte validado com áudio sintético; ainda falta chamada humana em aparelhos reais. Serviços dependem deste PC ligado e da internet.

Validação: 213 testes Flutter passaram; análise sem problemas. Verificação dos pacotes e publicação registradas separadamente após compilação.

Continuam em desenvolvimento: rádio/recomendações automáticas, ouvir só eu, transmitir vídeo musical, bloqueio de anúncios (player oficial YouTube pode exibi-los), pareamento de figurinhas PC/Android, artes da última prancha e otimização do tamanho dos arquivos. Nenhuma compra/moeda ativa. APK assinado para testes, Windows sem assinatura de publicador; instalação Android manual pelo usuário.
