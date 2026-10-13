# Publicar no GitHub e Render

## 1. GitHub

1. Extraia o ZIP e abra a pasta `LAVA_MAIS_Site`.
2. Crie um repositório vazio, por exemplo `LAVA-MAIS-Site`.
3. Use **Add file → Upload files** e envie o conteúdo da pasta. `render.yaml`, `render-build.mjs`, `build_site.py` e a pasta `dist` devem ficar na raiz do repositório, sem outra pasta acima deles.
4. Confirme o upload com **Commit changes**. A página inicial estará em `dist/index.html`.

## 2. Render

Em **New → Static Site**, conecte esse repositório e use:

| Campo | Valor |
| --- | --- |
| Branch | `main` |
| Root Directory | deixar vazio |
| Build Command | `node render-build.mjs` |
| Publish Directory | `dist` |

Em Environment, adicione `SKIP_INSTALL_DEPS=true`. Também é possível usar **New → Blueprint** para ler o `render.yaml` já incluído.

Não há servidor, banco de dados nem comando de início. As páginas de serviços são HTML próprios, então não é necessário criar uma regra global de reescrita para a página inicial.

O build usa automaticamente a URL pública informada pelo Render para atualizar canonical, sitemap, dados estruturados e metadados sociais.

## 3. Quando conectar um domínio

Após conectar seu domínio no Render, adicione a variável `SITE_URL` com a origem HTTPS exata — o endereço completo do seu domínio, sem caminho. Escolha **Save, rebuild, and deploy** para atualizar todas as referências de SEO. Se não houver `SITE_URL`, o site usa a URL `.onrender.com` disponibilizada pelo Render.

## 4. Preparar para marketing

- Conferir marca e número de WhatsApp: **(21) 99822-2062**. Esse número completo foi encontrado no cadastro do mesmo CNPJ; a versão enviada tinha um dígito a menos.
- Confirmar área de atendimento e opções de retirada/atendimento. Os textos atuais orientam consultar a disponibilidade.
- Trocar imagens ilustrativas por fotos reais autorizadas quando disponíveis.
- Verificar propriedade no Google Search Console; enviar `https://SEU-DOMINIO/sitemap.xml` e inspecionar as páginas.
- Criar ou atualizar o Perfil da Empresa no Google com nome, telefone e área de atendimento consistentes.
- Configurar medição de conversões no WhatsApp/e-mail conforme a plataforma de anúncios escolhida. Não há pixels ou campanhas ativos nesta versão.

O site está preparado tecnicamente para SEO. Posição e prazo para aparecer no Google dependem do rastreamento, da concorrência e do trabalho de marketing; não são garantidos.

## Contato já configurado

- WhatsApp: +55 21 99822-2062.
- E-mail: josecarvalho121057@gmail.com.
- Instagram indicado: @josecarvalho121057; o conteúdo do perfil não pôde ser lido.
- Empresa: 67.629.591 Jose de Ribamar Costa Carvalho — CNPJ 67.629.591/0001-31.

Referências oficiais: https://render.com/docs/static-sites e https://render.com/docs/environment-variables .
