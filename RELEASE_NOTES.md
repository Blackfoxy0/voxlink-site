# VoxLink 0.6.6 — composição de adornos e música na call

Nova beta para Windows, Android ARM64 e Web. Build 23 (código Android 2023). As versões 0.6.4 e 0.6.5 continuam disponíveis.

- Na área Personalização, a aba **Composição** permite combinar os adornos disponíveis na foto, moldura ou banner. Arraste por mouse ou toque e ajuste tamanho, rotação e ordem das camadas. É possível duplicar, remover e mover o adorno atual. As mudanças ficam em prévia até clicar em Aplicar; Descartar restaura a composição salva.
- Composições são gravadas na conta. Apenas o dono pode editar; uma edição antiga não sobrescreve uma mudança feita em outro aparelho. Clientes anteriores preservam as novas camadas ao alterar outros dados do perfil.
- Player fixo no topo do conteúdo durante a call, inclusive nas comunidades. A mesma instância permanece ao navegar e redimensionar; fila e controles adicionais abrem por botão. Silenciar a música é individual e restaura o volume anterior, sem alterar o microfone ou a saída de voz.
- Teclado ou janela muito baixa recolhem e pausam o vídeo apenas neste aparelho para liberar o chat. O player sincroniza ao voltar. Isso ainda não é um modo de áudio independente do YouTube; reprodução automática pode exigir um gesto no navegador.
- Temas opcionais por banner, fontes reais licenciadas, GIF/WebP menores, tradução, navegação e atualização pelo aplicativo da beta anterior foram preservados. Android continua exigindo autorização e confirmação do sistema; os celulares são instalados manualmente pelo usuário.

Validação: 248 testes Flutter aprovados, seis capturas opcionais omitidas, análise sem problemas. Testes de composição cobrem mouse, toque, teclado, rotação, ordem, duplicação, remoção, prévia, falha/repetição de gravação e descarte em layouts de celular e PC. Migração do servidor aplicada após testes com rollback; autorização de dono, leitura de contato, rejeição de usuário não autorizado e conflito entre edições verificados. Builds e integridade dos pacotes são conferidos antes da publicação.

Continuam em desenvolvimento: catálogo remoto sem nova versão, novas artes e fontes das últimas pranchas, temas completos para essas artes, redução do pacote, seleção imediata de faixa, rádio RD, ouvir só eu, modo independente sem vídeo, Spotify e pareamento local de figurinhas. Importação de playlists PL/UU/OLAK e busca por nome dependem de YOUTUBE_API_KEY, ainda ausente; o link de rádio RD enviado não está coberto. O player oficial pode exibir anúncios. Tradução PT↔EN e música de arquivos dependem dos serviços online deste PC. As artes raster são estáticas com efeitos procedurais; não foram extraídos GIFs dos JPEGs. Chamadas humanas e upgrade físico Android entre versões com atualizador ainda não foram validados.

Android usa assinatura de teste; Windows não tem assinatura digital de publicador. Nenhuma compra/moeda ativa. Esta beta entrega a etapa validada e não encerra o escopo integral.

Site: https://blackfoxy0.github.io/voxlink-site/ — Instaladores e checksums na release v0.6.6.
