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

Experiência profissional de 10 anos na Europa e 15 anos no Brasil, atendimento aos clientes mais exigentes e uso de equipamentos de alta tecnologia, conforme informações fornecidas pelo responsável. Destaque na abertura e em uma faixa de diferenciais nas cinco páginas comerciais; reforço na seção Nosso cuidado e nos metadados da página inicial. A experiência não foi usada como data de fundação do CNPJ. Agilidade no atendimento, sem promessas de prazo ou secagem imediata.

## Revisão geral v1.10

Corrigidos: navegação de Dúvidas e Contato dentro das páginas de serviço; contatos rápidos com o serviço da página na mensagem; rótulo neutro de nome nos comentários; alternativas de WhatsApp/e-mail disponíveis se o script não carregar; botões habilitados somente após registro dos eventos; contraste de placeholders, rodapé e foco no fundo escuro; botão Menu com altura mínima de 44 px.

O build valida nomes de domínio e portas e preserva o texto autorizado dos comentários durante mudanças de domínio. A documentação agora informa a publicação nas cinco páginas comerciais. O schema inclui o Instagram informado pela empresa.

Validação: 14 testes Node de publicação/build passaram; 160 verificações de interações em DOM simulado passaram; 630 verificações locais de HTML, links, SEO e assets sem falhas. Verificação estrutural de responsividade e contraste concluída. GitHub main ff39ee28e6bf68469b74d76d43f4e362b6b1f99b conferido: os 32 arquivos recebidos correspondem exatamente à v1.9 anterior.

Limites: não houve inspeção visual em navegador/dispositivo real, abertura real de WhatsApp/e-mail, confirmação do serviço Render ao vivo nem Search Console. Mensagens de e-mail muito longas dependem do cliente externo. Esta entrega mantém a aprovação manual de comentários e não instala pixels de anúncios.

Para testar o build e a publicação: `node --test tests/comments.test.mjs tests/build.test.mjs`.

## Revisão de composição v1.11

Títulos da abertura e margens laterais passam a variar gradualmente no celular, evitando o salto de tipografia e largura entre 360 e 361 px. As páginas de serviço mantêm uma escala própria. Nome e bairro ficam em uma coluna até 480 px para oferecer mais espaço para digitar.

Logo, menu, cards, legenda da foto, comentários, rodapé e botões conferidos pela cascata e por cálculos de largura em telas de 320 a 1280 px. Não houve inspeção visual em navegador/aparelho, e a interação da barra fixa com o teclado virtual permanece sem teste real. Aprovação por link continua adiada; o procedimento atual de comentários não foi alterado.

## Experiência por região v1.12

Destaque atualizado conforme informação do responsável: 10 anos na Europa e 15 anos no Brasil. Os dois períodos aparecem separadamente no selo da abertura, na faixa de diferenciais e no conteúdo e metadados pertinentes. Não foram somados em 25 anos nem usados como data de fundação do CNPJ; a área de atendimento permanece Rio de Janeiro. Selo com quebra entre regiões para acomodar telas pequenas.

## Escritórios e serviços especiais v1.13

A abertura passa a destacar Limpeza de estofados, representando melhor o conjunto dos serviços. A rota e o conteúdo de Limpeza de sofás no Rio de Janeiro continuam próprios. A página inicial inclui escritórios, helicópteros, aviões e barcos em uma seção de ambientes com links de orçamento. As quatro opções adicionais estão disponíveis nos cinco formulários comerciais e no catálogo estruturado. Os textos descrevem limpeza de estofados e tecidos conforme avaliação; não afirmam manutenção, certificações ou limpeza técnica integral de aeronaves/embarcações.

Mantidos: 10 anos de experiência na Europa, 15 anos no Brasil, atendimento personalizado a domicílio e cortinas a seco. Aprovação de comentários permanece manual; a solução por link continua adiada. Testes em DOM simulado e de build não substituem inspeção visual em navegador nem envio real por serviços externos.

## Aviso visual v1.14

Retirado o aviso de imagens ilustrativas abaixo dos serviços e dos links relacionados nas cinco páginas comerciais, conforme solicitação. A informação sobre as imagens na página de privacidade permanece correta.
