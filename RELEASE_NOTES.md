# VoxLink 0.6.1 — Conversas e comunidades mais simples

Conversas com barra compacta, áudio quando o campo está vazio, Enter para enviar e Shift+Enter para quebrar linha no PC. Prévias de imagem e áudio sem nomes de arquivos extensos; indicador de digitação e convites de chamada privada com aceitar/recusar.

- Perfil no rodapé da lateral; abertura com Saturno animado; filtros secundários recolhidos.
- Fontes Nunito, Space Grotesk e JetBrains Mono incluídas com licenças. Papel de parede Buraco negro e fundo individual de conversa. Paleta do fundo opcional, desligada por padrão.
- Aparência privada sincronizada entre aparelhos da mesma conta. Conflitos entre alterações exigem escolha explícita; trocar de conta não aplica a resposta anterior.
- Gestão dentro da comunidade: nome, descrição, foto, capa, entrada livre ou por aprovação, pedidos, transferência e exclusão com confirmação. Pedidos pendentes não abrem chat privado.
- Mixer compacto com volume separado de voz e transmissão. Câmera do mesmo dispositivo sobreposta à tela; escolha do canto é local para quem assiste. Seleção individual de até duas telas mantém as demais transmissões disponíveis.
- Salas ativas renovam a validade sem encerramento artificial após uma hora. Fechar uma presença não remove outra presença ativa da mesma conta.
- Barra de atualização apenas para versões posteriores; dispensar mantém o layout, e a versão já instalada não mostra aviso antigo.

Validação: análise Flutter sem problemas e 146 testes aprovados (145 na rodada completa e o teste ajustado da barra aprovado na repetição). Testes SQL transacionais passaram para acesso, aprovação, transferência, imagens privadas e aparência com controle de revisão. Nenhum dado real foi excluído ou transferido nos testes.

Limitações: confirmação de e-mail obrigatória e SMTP público ainda pendente; Windows sem assinatura de editor e APK com assinatura de teste. Tradução hospedada, áudio interno Android, QR de login, NFC entre telefones, música, pets compartilhados, moedas e benefícios pagos automáticos ainda estão em desenvolvimento. Histórico dos chats não possui criptografia ponta a ponta. Evite reproduzir a mesma call simultaneamente no navegador e programa ao compartilhar a tela inteira: isso pode recapturar a saída do navegador.

Não houve teste físico de dez horas de chamada. Builds, instalação e publicação serão registrados separadamente. Remover o seletor de qualidade anterior ao estúdio e escolher automaticamente o melhor microfone são pedidos para atualização posterior.

Idealização e direção: Isaque Prussak Silveira.