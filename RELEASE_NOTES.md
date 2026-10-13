# VoxLink 0.6.5 — temas de banner e atualizações pelo app

Nova beta para Windows, Android ARM64 e Web. Build 22; a versão 0.6.4 continua disponível.

- Personalização ampliada: 39 molduras, 19 banners de arte, 16 opções de adorno e 16 estilos de fonte além do padrão. As peças são individuais; as fontes são arquivos reais com licenças. Algumas opções de adorno reutilizam aros existentes.
- Opção **Usar tema do banner** com prévia: cores, fonte, moldura, fundo e superfícies acompanham a estética escolhida. Aplicação opcional, ajustes individuais e restauração da aparência anterior. Fonte só no nome ou na interface.
- Efeitos diferentes por banner, incluindo estrelas, pétalas, bolhas, névoa, brasas e luzes. Pintura decorativa limitada, suspensão em segundo plano e opção de reduzir movimento. Posicionamento dos adornos ajustado à abertura da foto, incluindo orelhas de gato.
- GIFs/WebP menores no chat: base de 112 pontos, limite pela largura da tela e controles para ajustar o tamanho ou acompanhar a fonte. Os arquivos originais e suas durações são preservados.
- Atualização pelo aplicativo: download oficial com progresso, cancelamento, verificação de tamanho e SHA-256 e preparação da instalação. Windows encerra a call, abre o instalador e reabre o app; Android confere versão, pacote e assinatura e usa a autorização/confirmação do sistema. Textos em português, inglês e espanhol. **A primeira atualização da 0.6.4 deve ser feita pelos instaladores desta página.**
- Importação de playlists oficiais PL/UU/OLAK preparada no servidor, com prévia e inserção de até 30 faixas na fila. Ainda depende de YOUTUBE_API_KEY, não configurada nesta entrega; não é suporte ao link de rádio RD enviado anteriormente.

Validação: 240 testes Flutter aprovados, análise sem problemas, builds release Windows/Android/Web, APK com assinatura válida e igual à anterior, hashes dos pacotes conferidos e 97 arquivos de artes/fontes/licenças comparados à fonte nas três plataformas. Windows 0.6.5 instalado e aberto; código instalado igual ao build. Fluxo do atualizador testado com lançamento simulado e downloads reais verificados. Ainda não houve upgrade físico Android de uma versão com atualizador para a seguinte nem teste de chamada humana em aparelhos reais.

Continuam em desenvolvimento: editor de múltiplos adornos por mouse/toque, catálogo remoto sem nova versão, integração das últimas pranchas enviadas, redução do tamanho do pacote, player fixo no topo do chat, escolha imediata de faixa, rádio/recomendações automáticas, ouvir só eu, modo independente sem vídeo, Spotify e pareamento local de figurinhas. O player oficial do YouTube pode exibir anúncios; busca por nome/playlist depende da chave do servidor. Tradução PT↔EN e música de arquivos dependem dos serviços online deste PC ligado. As artes raster são estáticas com efeitos procedurais; não foram extraídos GIFs dos JPEGs.

Android usa assinatura de teste e instalação manual com confirmação do sistema. Windows não possui assinatura digital de publicador. Nenhuma compra/moeda ativa. Esta beta publica os recursos validados acima; não encerra o restante do escopo.

Site: https://blackfoxy0.github.io/voxlink-site/ — Android: voxlink-android-arm64.apk — Windows: voxlink-windows-setup.exe. Checksums em SHA256SUMS.txt.
