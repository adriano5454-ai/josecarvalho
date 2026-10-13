# Receber, aprovar e publicar comentários

Esta versão continua sendo um Static Site no Render. O cliente escreve na página e escolhe WhatsApp ou e-mail. O site prepara a mensagem; o cliente revisa e confirma o envio nesse canal. Não há uma fila automática nem um painel administrativo de comentários.

## Receber e revisar

1. Leia o comentário recebido no WhatsApp ou e-mail da empresa.
2. Confira se a experiência é real e se o cliente autorizou publicar nome e texto. A mensagem enviada pelo formulário registra essa escolha. Se acrescentar um rótulo de serviço ao comentário, confirme essa informação e a autorização com o cliente.
3. Se a mensagem disser que o comentário é privado, não publique. Se quiser editar o texto ou nome, combine a versão final com o cliente.
4. Guarde os comentários pendentes e os dados do atendimento no canal de contato. Não coloque mensagens pendentes, telefone, e-mail ou outros dados privados no repositório público.

## Publicar um comentário aprovado

No GitHub, abra `content/comentarios-aprovados.json` e use o botão de edição. O arquivo começa com `[]`: nenhum depoimento foi inventado.

Adicione somente comentários reais, aprovados e autorizados, seguindo esta estrutura. Os textos abaixo são campos de exemplo para substituir, não depoimentos para publicar:

```json
[
  {
    "name": "NOME AUTORIZADO PELO CLIENTE",
    "service": "SERVIÇO RECEBIDO",
    "comment": "TEXTO REAL APROVADO E AUTORIZADO PELO CLIENTE",
    "approved": true,
    "consent": true
  }
]
```

`service` é opcional. Nome: até 80 caracteres. Comentário: de 10 a 1.200 caracteres. Serviço: até 80 caracteres. Separe vários registros por vírgula e mantenha o JSON válido.

O formulário pede apenas nome e comentário, para ficar mais simples no celular. A caixa aparece nas cinco páginas comerciais e pode ser acessada pelo item **Comentários** do menu, antes do pedido de orçamento.

Confirme com **Commit changes**. O build `node render-build.mjs` valida o arquivo e inclui os comentários aprovados na página inicial e nas quatro páginas de serviço. Com o deploy automático ativado, a atualização segue para o Render; caso contrário, faça o deploy do último commit.

Não é preciso alterar o HTML nem rodar Python para publicar ou remover comentários. Para retirar um comentário, apague seu registro do JSON e confirme a alteração.

## Proteção de publicação

Cada registro exige `approved: true` e `consent: true`. Um registro pendente, sem autorização ou inválido interrompe o build antes de alterar as páginas. Os textos são escapados para impedir que HTML digitado vire código. Isso ajuda a evitar publicações acidentais; a aprovação e a conferência da autorização continuam sendo feitas pela pessoa que mantém o site.

Para conferir a validação: `node --test tests/comments.test.mjs`.
