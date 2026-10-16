# VoxLink 0.9.0 — beta: nova sala e aplicativo mais leve

Android ARM64, Windows 64 bits e Web. Fonte 0.9.0+30; Android código 2030.

- Novo layout responsivo da sala de voz: chat lateral no computador e alternância entre sala e mensagens no celular, preservando o texto digitado e o estado dos controles.
- Controles com nomes visíveis para tela, câmera, microfone, fone e saída. Cores e detalhes acompanham o tema escolhido.
- 103 imagens convertidas para WebP de qualidade 85, preservando dimensões e transparência. As imagens ocupam 83,37% menos espaço; APK ARM64 de 76,6 MB, contra 231,5 MB do candidato anterior.
- Busca de faixas no YouTube Music e reprodução de áudio na sala pelo serviço online. Foram verificados busca, início de áudio, pausa, retomada e parada em teste isolado. O serviço ainda depende do computador do operador ligado e da disponibilidade da fonte externa.
- Inclui as correções acumuladas de perfil, posicionamento de foto/moldura/adornos, senha, recarga de mídia e limites de envio, além dos temas e artes já integrados.

Esta é uma beta com parte do novo design. A reconstrução completa de início, comunidades, perfil, personalização e acessibilidade continua em desenvolvimento. As novas pranchas não representam funcionalidades já prontas. Pets não foi adicionado. Nem todas as artes, fontes e banners recebidos estão integrados.

Verificação: 359 testes Flutter passaram, 10 capturas opcionais omitidas e análise limpa; 43 testes TypeScript e 18 testes Python de música passaram. Windows, Android e Web compilados; 138 arquivos de recursos conferidos nas três plataformas, sem PNGs antigos duplicados. Assinatura e identidade Android preservadas. Não houve teste físico no celular nem instalação local desta versão nesta rodada.

Para atualizar, use o instalador Windows ou o APK Android. Não é necessário remover a versão anterior ou apagar dados. Android pede a confirmação de instalação. O aplicativo Windows ainda não possui assinatura digital de editor. Versões anteriores permanecem disponíveis no histórico do GitHub; no Android, retornar ao comportamento anterior exige um pacote com código maior, sem apagar os dados.

Downloads e checksums abaixo. Site: https://blackfoxy0.github.io/voxlink-site/
