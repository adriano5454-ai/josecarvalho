# LAVA MAIS — Zé Carvalho

Site estático em português, responsivo, com página inicial, quatro páginas de serviços, privacidade, pedido de orçamento por WhatsApp e e-mail. Nenhum formulário é armazenado no site. A mensagem abre para revisão no canal escolhido.

## Manutenção

Conteúdo e metadados: `build_site.py`. Layout: `dist/assets/style.css`. Interações: `dist/assets/app.js`. Rode `python3 build_site.py` após editar conteúdo; o gerador usa Node para renderizar os comentários aprovados com a mesma validação do Render. O build no Render usa `node render-build.mjs` sobre as páginas já geradas; não instala dependências.

## Contatos e identidade

- WhatsApp: +55 21 99822-2062. O usuário enviou uma versão com oito dígitos locais; o número completo foi conferido no cadastro público do mesmo CNPJ.
- E-mail: josecarvalho121057@gmail.com.
- CNPJ: 67.629.591/0001-31.
- Marca comercial confirmada pelo usuário e pela referência enviada: LAVA MAIS, de Zé Carvalho.
- Base: Rua Arapoca, 642, Casa 1, Gardênia Azul, Rio de Janeiro, RJ.
- Instagram indicado: @josecarvalho121057. O perfil bloqueou a leitura. A identidade agora usa a referência da logo enviada diretamente pelo usuário.
- Imagens ilustrativas geradas digitalmente, identificadas na página. Sem depoimentos, avaliações, resultados, estatísticas ou certificados inventados.

## SEO e lançamento

Implementado: conteúdo HTML rastreável, títulos e descrições individuais, um H1 por página, canonical absoluto, links internos, metadados sociais, sitemap, robots.txt, JSON-LD LocalBusiness, Service e BreadcrumbList, dimensões de imagem, imagens WebP, carregamento prioritário do hero e lazy loading das demais imagens.

A versão inicial Sites é privada. Google não consegue indexar uma página que exige acesso. Antes de iniciar campanhas públicas:

1. Conferir WhatsApp e área de atendimento; a marca LAVA MAIS foi confirmada e a nova logo vetorial já foi aplicada. Incorporar fotos reais autorizadas quando fornecidas.
2. Publicar no Render e conectar o domínio escolhido. O build usa `SITE_URL` (domínio próprio) ou `RENDER_EXTERNAL_URL` (endereço Render), atualizando páginas, canonical e sitemap. As instruções completas estão em `COMECAR_AQUI.md`.
3. Verificar propriedade no Google Search Console e enviar `/sitemap.xml`; conferir inspeção de URL e dados estruturados.
4. Criar ou atualizar o Perfil da Empresa no Google com dados consistentes e configurar corretamente a área de serviço; não presumir atendimento presencial no endereço.
5. Medição de anúncios e conversões depende da plataforma e dos identificadores de conta. Esta entrega não instala pixels, não envia eventos de conversão e não configura campanhas.

SEO não garante posição nem indexação. Documentação oficial: https://developers.google.com/search/docs/essentials/technical e https://developers.google.com/search/docs/appearance/structured-data/local-business .

## Imagens

Assets gerados com a ferramenta integrada de geração de imagens; arquivos publicados `dist/assets/hero.webp`, `sofa.webp`, `curtains.webp`, `mattress.webp`. Prompt: fotografias editoriais naturais de sala brasileira aconchegante, sofá claro de tecido, cortinas leves e tapete de textura, luz natural, sem pessoas, texto ou logos. As imagens não representam trabalhos da empresa.

## Nova identidade visual

Identidade Contemporânea aprovada: monograma LM entrelaçado e lettering lava mais, com assinatura Zé Carvalho. Logo nativa vetorial. SVGs com letras em contornos, sem fontes externas nem imagens raster incorporadas. Versões de site, símbolo/favicon, perfil WhatsApp e compartilhamento estão em `dist/assets/brand`. Paleta da marca: navy #153C42, teal #2F897D, creme #F7F3E9 e verde claro #86C5B5. O layout e as cores do site aprovados foram preservados.

## Destaques comerciais confirmados

Atendimento personalizado a domicílio e lavagem de cortinas a seco destacados na abertura, seção de serviços, FAQ, contato e metadados. A página de cortinas conserva seu endereço, com título e Service/catalog atualizados para lavagem a seco. Sem promessas de zero água, secagem imediata, dispensa de retirada/instalação ou atendimento ilimitado por bairro.

## Revisão funcional v1.5

Links, seleção de serviço e mensagens por WhatsApp/e-mail conferidos. Contraste dos textos pequenos e botões secundários reforçado. Sem JavaScript, o site mantém a navegação e os links diretos de contato; o formulário que prepara mensagens é ocultado para evitar abertura no canal incorreto.

## Contato no celular v1.6

A barra fixa de WhatsApp/e-mail fica oculta na abertura. Ela aparece quando o botão principal de orçamento passa acima da tela e se oculta ao retornar. Nas páginas sem botão principal, o contato rápido permanece disponível. Sem JavaScript, os links de contato da página continuam acessíveis.

## Marca e comentários v1.7

Marca maior no cabeçalho, com uma versão do SVG sem excesso de espaço vazio (`logo-site.svg`). O vetor mestre e a identidade aprovados foram preservados.

O formulário de comentários envia a mensagem pelo WhatsApp ou e-mail escolhido pelo cliente. Revisão e aprovação são manuais. Só comentários reais, aprovados e autorizados entram em `content/comentarios-aprovados.json`; o Render atualiza o HTML no build. Não existe uma fila automática de envios nem um painel administrativo. O arquivo começa vazio, sem avaliações ou depoimentos fictícios. Veja `COMENTARIOS.md` para receber, publicar e retirar comentários.

## Comentários no celular v1.8

Caixa compacta com visual próprio, disponível na página inicial e nas quatro páginas de serviço, antes da área de contato. O menu tem acesso a Comentários. Apenas nome e texto são pedidos; autorização continua opcional. O formulário permanece visível sem JavaScript, com orientação de envio direto; os botões que preparam a mensagem só são habilitados quando os eventos estão registrados.

## Experiência e tecnologia v1.9

Mais de 10 anos de experiência profissional, atendimento aos clientes mais exigentes e uso de equipamentos de alta tecnologia, conforme informações fornecidas pelo responsável. Destaque na abertura e em uma faixa de diferenciais nas cinco páginas comerciais; reforço na seção Nosso cuidado e nos metadados da página inicial. A experiência não foi usada como data de fundação do CNPJ. Agilidade no atendimento, sem promessas de prazo ou secagem imediata.
