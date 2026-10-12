# VoxLink 0.6.3

Navegação mais previsível e acabamento visual consistente no PC e no Android.

- Início volta à visão geral mesmo durante uma call. Voltar de uma comunidade retorna ao catálogo, preservando a chamada.
- Corrigido o bloco branco ao passar o mouse no X do aviso de atualização: as dicas dos controles agora têm a camada de exibição correta.
- Ícones arredondados, controles, menus, campos, painéis e cartões acompanham o arredondamento escolhido na personalização.
- Melhor contraste de texto secundário, filtros com limites visíveis e contato selecionado destacado.
- Transições suaves nas abas e conversas, painéis recolhíveis e navegação; respeitam Reduzir animações e a preferência de acessibilidade do dispositivo. Não mantêm cópias da call ou do rascunho durante a troca.
- GIF salvo usa animação original completa e envio direto, sem extrair os primeiros 12 quadros. O criador com fotos permanece disponível separadamente.
- Miniaturas de GIFs usam decodificação dimensionada; selecionar um GIF já carregado da coleção reutiliza o download.

Mantém os recursos da 0.6.2: canais e favoritos laterais, sons de entrada/saída, controles por ícones, volume separado até 200%, coleção privada de GIFs sincronizada, banners e molduras opcionais, presença, Reuniões e cursores Lua/Planeta.

Música ainda não está incluída: próxima prioridade é integrar reprodução, fila e worker para fontes próprias ou autorizadas. Contas ADM, banners próprios animados, pets compartilhados e moedas permanecem pendentes. Tradução por IA, SMTP público, assinatura de produção e captura de áudio interno Android seguem os limites registrados.

Validação: análise Flutter sem problemas e 163 testes aprovados, incluindo hover do X, navegação com call ativa, redução de movimento e GIF completo. Validação física de chamadas entre aparelhos continua necessária; estes testes não substituem o teste real de transmissão.
