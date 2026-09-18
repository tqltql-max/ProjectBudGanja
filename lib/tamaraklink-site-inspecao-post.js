'use strict';

/**
 * Inspeção: site oficial tamaraklink.com
 * Objeto = o site (carta náutica digital), distinto da ficha de pessoa e do canal YouTube.
 */

function sitePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series || 'legado-pessoas',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Tamara Klink · site',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

const COVER = 'imagens/inspecoes/tamara-klink-cover.jpg';
const SITE = 'https://www.tamaraklink.com';
const SITE_TRAIL = SITE + '/';
const PROJECTS = SITE + '/items-1';
const NW = SITE + '/c%C3%B3pia-passage-du-nord-ouest-3';
const OVERWINTER = SITE + '/general-clean';
const ARCTIC = SITE + '/c%C3%B3pia-solo-arctic-overwinter';
const ATLANTIC = SITE + '/c%C3%B3pia-arctic-circle';
const NORTH_SEA = SITE + '/c%C3%B3pia-the-atlantic-singlehanded';
const LECTURES = SITE + '/lectures-2';
const CONTACT = SITE + '/contact';
const TRACK =
  'https://forecast.predictwind.com/tracking/display/TAMARA_KLINK/?useGoogle';
const IG = 'https://www.instagram.com/tamaraklink/';
const LI = 'https://www.linkedin.com/in/tamaraklink/';
const YT = 'https://www.youtube.com/@TamaraKlink';
const TT = 'https://www.tiktok.com/@tamara_klink';
const MAIL = 'mailto:contato@tamaraklink.com';

const PESSOA = '/posts/post-inspecao-tamara-klink.html';
const CANAL = '/posts/post-inspecao-canal-tamaraklink.html';
const AMYR = '/posts/post-inspecao-amyr-klink.html';
const BOM_DIA = '/posts/post-inspecao-arte-bom-dia-inverno.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const RISCO = '/posts/post-inspecao-palavra-risco.html';
const SOLITARIO = '/posts/post-inspecao-palavra-solitario.html';
const GELO = '/posts/post-inspecao-palavra-gelo.html';
const INVERNO = '/posts/post-inspecao-palavra-inverno.html';
const INVERNAGEM = '/posts/post-inspecao-palavra-invernagem.html';
const NAVEGAR = '/posts/post-inspecao-palavra-navegar.html';
const BARCO = '/posts/post-inspecao-palavra-barco.html';
const MAR = '/posts/post-inspecao-palavra-mar.html';
const FANTÁSTICO = '/posts/post-inspecao-palavra-fantastico.html';
const INCRÍVEL = '/posts/post-inspecao-palavra-incrivel.html';
const MARAVILHOSO = '/posts/post-inspecao-palavra-maravilhoso.html';
const MANTRA = '/posts/post-inspecao-expressao-faca-o-melhor.html';
const LEGADO = '/biblioteca/inspecoes/#inspecoes-pessoas';
const VIDEOS = '/videos/?channel=tamara';
const INVERNO_HUB = '/inverno/';
const WIKI = 'https://pt.wikipedia.org/wiki/Tamara_Klink';

function buildTamaraklinkSiteBodies(inspected) {
  const body = `## Escopo

Inspeção editorial **do site oficial** [tamaraklink.com](${SITE}) — a **carta náutica digital** de Tamara Klink: vitrine, arquivo de expedições, agenda de palestras e porta de contacto. O objecto aqui **não é a biografia** (isso vive na [ficha de legado](${PESSOA})) nem o **arquivo YouTube** (isso vive na [ficha do canal](${CANAL})): é o **próprio website** — arquitectura, tom, mapa de páginas, tracking do *Sardinha 2* e o modo como a navegadora traduz gelo, vento e solitário em interface pública.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja, com leitura directa das páginas públicas em ${inspected}. Plataforma observada: **Wix**. Idiomas de interface: **inglês**, **português** e **francês**. **Sem afiliação** com Tamara Klink, sponsors (Itaú, NTT Data) ou a editora. Indexar ≠ endossar. Números de recordes e patrocínios são os **declarados no site** — confirmar sempre na fonte oficial se forem usados fora desta ficha.

![Tamara Klink — capa editorial BudGanja](/${COVER})

*Capa editorial do laboratório — referência visual; fotografias e vídeos oficiais vivem em [tamaraklink.com](${SITE}).*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| URL canónica | [https://www.tamaraklink.com](${SITE}) |
| Título público | *Tamara Klink \\| Arctic Sailor and International Speaker* |
| Tagline (home) | **solo sailor, writer and speaker** |
| Quem | [Tamara Wolff Bandeira Klink](${PESSOA}) (n. 1997, São Paulo) |
| Ofício no site | Velejadora solo · escritora · oradora internacional · voz do gelo ártico |
| Embarcação | *Sardinha* / **Sardinha 2** (34 pés) — marca e rodapé © **Sardinha** |
| Plataforma | Wix (CMS visual; slugs legados tipo \`cópia-…\` / \`general-clean\`) |
| Idiomas | EN · PT · FR (selectores na navegação) |
| Secções âncora | About · [Sailing Projects](${PROJECTS}) · [Lectures](${LECTURES}) · [Contact](${CONTACT}) |
| Tracking vivo | [PredictWind · TAMARA_KLINK](${TRACK}) — «Where is Tamara today?» / TRACKING SARDINHA 2 |
| Redes | [Instagram](${IG}) · [LinkedIn](${LI}) · [YouTube](${YT}) · [TikTok](${TT}) |
| Contacto | [contato@tamaraklink.com](${MAIL}) · formulário em [Contact](${CONTACT}) |
| Distinção BudGanja | **Site ≠ pessoa ≠ canal** |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O laboratório já honra Tamara como [legado vivo](${PESSOA}) e como [arquivo em vídeo](${CANAL}). Faltava a **terceira âncora**: o lugar onde a própria navegadora **escolhe como aparecer** ao mundo — minimalismo branco, peixe *Sardinha*, projectos em escada do Mar do Norte à Passagem Noroeste, palestras em três línguas, e um link que responde à pergunta mais humana do Ártico: **onde está ela hoje?**

Inspecionar o site é inspecionar o **gesto de publicar o risco**. No BudGanja isso cruza [caminho](${CAMINHO}), [navegar](${NAVEGAR}), [risco](${RISCO}), [solitário](${SOLITARIO}), [gelo](${GELO}) e o elogio alto de [fantástico](${FANTÁSTICO}) — não como hype vazio, mas como reconhecimento de ofício rastreável.

## Hipóteses e método

- **H1:** o site funciona como **bitácula pública** — cronologia de expedições mais clara do que um feed social.
- **H2:** o minimalismo (branco, tipografia forte, pouco ruído) ecoa a disciplina do solo: **espaço = silêncio navegável**.
- **H3:** «Where is Tamara today?» + PredictWind transforma a marca numa **presença em tempo quase real** — o visitante não só lê; **acompanha**.
- **H4:** Lectures + Contact fazem do site um **instrumento profissional** (palestras, empresas, escolas), não só memorial de feitos.
- **Método:** (1) home e identidade; (2) mapa de Sailing Projects; (3) Lectures; (4) Contact / tracking / redes; (5) achados e elos BudGanja; (6) status.

## Arquitectura do site (mapa verificado)

| Nó | URL observada | Função |
|----|---------------|--------|
| Home / About | [tamaraklink.com](${SITE_TRAIL}) | Bio curta, hero, galeria, projectos em síntese, CTA de tracking |
| Sailing Projects (índice) | [/items-1](${PROJECTS}) | Cinco expedições em escada temporal |
| Solo Northwest Passage | [página Noroeste](${NW}) | 2025 · 6 500 km · 60 dias · COP30 · sponsors |
| Solo-arctic-overwinter | [/general-clean](${OVERWINTER}) | 2023/24 · 8 meses · Disko Bay · −40 °C |
| Arctic Polar Circle | [página Círculo Polar](${ARCTIC}) | 2023 · França → Groenlândia · ~2 500 mn |
| Atlantic · Equator | [página Atlântico](${ATLANTIC}) | 2021 · Lorient → Paraty · livro *Nós* |
| North Sea | [página Mar do Norte](${NORTH_SEA}) | 2020 · Ålesund → Dunkerque · *Mil Milhas* |
| Lectures | [/lectures-2](${LECTURES}) | +300 palestras · temas · TEDx · testemunhos |
| Contact | [/contact](${CONTACT}) | Formulário · newsletter · e-mail · redes |

> **Nota de CMS:** vários slugs Wix ainda levam prefixos \`cópia-\` ou nomes internos (\`general-clean\`, \`items-1\`). O conteúdo é sólido; a URL é herança de plataforma — não diminui o mérito narrativo, mas a ficha regista o facto para honestidade técnica.

## Home — «solo sailor, writer and speaker»

A home abre com identidade tipográfica **TAMARA KLINK**, peixe *Sardinha*, navegação limpa e o H1 em caixa alta: **solo sailor, writer and speaker**. Abaixo, a pergunta viva **Where is Tamara today?** e o atalho **TRACKING SARDINHA 2** — o site não espera que o visitante procure o AIS; **oferece o mapa**.

Bio pública (síntese do site): aos 28 anos, invernagem solo no pack ice ártico, Passagem Noroeste em solitário, dois Atlânticos solo; nascida em São Paulo (1997); arquitectura naval e terrestre na **ENSA Nantes**; **quatro livros**; **mais de 300 palestras** em inglês, português e francês; voz sobre a fragilidade do gelo marinho ártico; uma das maiores comunidades de vela nas redes.

Cronologia de projectos na home:

| Ano | Projecto (texto do site) |
|-----|--------------------------|
| 2025 | Solo Northwest Passage |
| 2023/24 | Solo overwintering in the Arctic |
| 2023 | Solo Atlantic crossing (France – Greenland) |
| 2020/21 | Solo Atlantic crossing (Norway – Brazil) |

Rodapé: **© 2024 Sardinha** — a marca do barco (nome da avó Ana Francesca, na [ficha de pessoa](${PESSOA})) fecha o site como assinatura de família e ofício.

## Sailing Projects — a escada do gelo

O índice [/items-1](${PROJECTS}) ordena a vida náutica como **capítulos de um romance verdadeiro**:

### 1. One Thousand Miles in the North Sea (2020)

Primeiro projecto solo, aos 23 anos. O *Sardinha* — barco velho, «preço de uma bicicleta» — de **Ålesund** a **Dunkerque**. Mau tempo, falhas técnicas, desencorajamento sistemático: rito de passagem. Livros *Mil Milhas* e *Um Mundo em Poucas Linhas* (Peirópolis); box *Crescer e Partir*; série YouTube *O mar nos une*. → [página](${NORTH_SEA})

### 2. The Atlantic singlehanded: Equator (2021)

Após o diploma em Nantes, o *Sardinha* (26 pés) de **Lorient** a **Paraty**: ~**5 000** milhas náuticas em **3 meses** — mais jovem latino-americana a cruzar o Atlântico em solitário (texto do site). Livro *Nós: o Atlântico em solitário* (Companhia das Letras) + documentário em dois episódios. → [página](${ATLANTIC})

### 3. Arctic Polar Circle (2023)

Bretanha francesa → **Disko Bay**, rumo ao fiorde da invernagem. ~**2 500** mn em **25** dias; fulmares, icebergues, nevoeiro, baleias-jubarte. Primeira mulher latino-americana (e mais jovem brasileira) a cruzar o Círculo Polar Ártico em solitário. **200 mil** pessoas no tracking em tempo real. → [página](${ARCTIC})

### 4. Solo-overwinter in the Arctic (2023/24)

Dois anos a preparar o **Sardinha 2** (34 pés) em **Lorient**; ancoragem num fiorde desabitado na baía de Disko; **8 meses** de autonomia — **primeira invernagem feminina solo registada** no Ártico (texto do site). Condições: 3 meses sem sol; até **−40 °C**; icebergues e neve como água; **+300 h** a pé/ski no gelo; raposas-do-ártico e focas-aneladas. Artigo *Voiles & Voiliers*; elo literário com [*Bom dia, Inverno*](${BOM_DIA}). → [página](${OVERWINTER}) · léxico lab: [invernagem](${INVERNAGEM}) · [inverno](${INVERNO}) · [gelo](${GELO})

### 5. Solo Northwest Passage (2025)

**6 500 km** solo Groenlândia → Alasca pelo Oceano Ártico; **60 dias**; mais jovem mulher e **primeira pessoa da América Latina** a completar a travessia (texto do site), 120 anos depois de Amundsen. Condições: cartas escassas, icebergues, gelo à deriva, ursos-polares, vento violento, sono em ciclos de **20 minutos**. Gelo marinho encontrado em apenas **9%** da rota — argumento climático vivo. Depois: **COP30** (UNFCCC); planos de livro e documentário; sponsors **Itaú** e **NTT Data**. → [página](${NW})

## Lectures — o gelo sobe ao palco

Em [/lectures-2](${LECTURES}) o site declara **oradora internacional experiente**: humor, inteligência e sensibilidade; **+300** palestras para empresas, universidades, escolas e eventos literários em **PT / FR / EN**.

Temas frequentes (lista do site):

- Coragem e medo  
- Compromisso com um projecto ou um sonho  
- Gestão de risco  
- Equidade de género  
- Mudanças ambientais  
- Inteligência emocional  

Exemplos embutidos: TEDx Clermont, TEDx São Paulo, TEDx IE Madrid, conversas longas sobre os 8 meses no gelo. Testemunho em destaque (Ricardo Neves, CEO NTT DATA Brasil): a história *move* e faz pensar **como e quando** mudamos de vida.

No laboratório: Lectures = ponte entre [risco](${RISCO}) calculado e [Faça o melhor!](${MANTRA}) — ofício que se conta sem banalizar o perigo.

## Contact, tracking e ecossistema

| Canal | Papel no site |
|-------|----------------|
| [Contact](${CONTACT}) | Formulário (nome, e-mail, assunto, mensagem) + newsletter («Sing up» — typo Wix registado) |
| E-mail | [contato@tamaraklink.com](${MAIL}) |
| [PredictWind](${TRACK}) | Posição do *Sardinha 2* / Tamara — ícone de localização no header |
| Instagram / LinkedIn / YouTube / TikTok | Comunidade e arquivo audiovisual (YouTube detalhado na [ficha do canal](${CANAL})) |

O site é **hub**, não silo: empurra o visitante para o mar (tracking), para a voz (palestras), para o arquivo (vídeos) e para o ofício (contacto profissional).

## Achados (mérito devido)

1. **Tríade clara** — About + Projects + Lectures/Contact: biografia, prova e oferta profissional num só domínio.
2. **Escada narrativa** — 2020→2025 lê-se como [caminho](${CAMINHO}) crescente: Mar do Norte → Atlântico → Círculo Polar → invernagem → Noroeste.
3. **Presença viva** — tracking PredictWind evita que o site seja só museu de feitos.
4. **Multilinguismo** — EN/PT/FR alinhado à vida entre Brasil, França e o Ártico internacional.
5. **Tom** — minimalismo sem frialdade comercial; o peixe *Sardinha* humaniza o heroísmo.
6. **Clima sem panfleto** — o Noroeste (9% de gelo) e a COP30 ligam aventura a advocacia do gelo marinho.
7. **Limites técnicos** — slugs Wix opacos e typo «Sing up»; não apagam o valor, mas a inspeção não os esconde.
8. **Distinção de objectos** — esta ficha **não substitui** [pessoa](${PESSOA}) nem [canal](${CANAL}); completa o triângulo.

## Complementaridade com o Inspetor BudGanja

| Tema no site | Recurso BudGanja |
|--------------|------------------|
| Pessoa / legado | [Tamara Klink](${PESSOA}) · [Amyr Klink](${AMYR}) |
| Arquivo YouTube | [Canal @TamaraKlink](${CANAL}) · [Vídeos](${VIDEOS}) |
| Livro da invernagem | [*Bom dia, Inverno*](${BOM_DIA}) · hub [/inverno/](${INVERNO_HUB}) |
| Rota e ofício | [caminho](${CAMINHO}) · [passar](${PASSAR}) · [navegar](${NAVEGAR}) · [barco](${BARCO}) · [mar](${MAR}) |
| Gelo e estação | [gelo](${GELO}) · [inverno](${INVERNO}) · [invernagem](${INVERNAGEM}) · [solitário](${SOLITARIO}) · [risco](${RISCO}) |
| Elogio de ofício | [fantástico](${FANTÁSTICO}) · [incrível](${INCRÍVEL}) · [maravilhoso](${MARAVILHOSO}) · [Faça o melhor!](${MANTRA}) |
| Hub Legado | [Inspeções · Pessoas / Legado](${LEGADO}) |

## Créditos e referências

**Todo o mérito náutico, literário, oratório e de marca pertence a Tamara Klink e à equipa Sardinha.** Esta inspeção apenas documenta o site público — sem apropriação de texto literário integral nem de imagens oficiais além da capa editorial do laboratório.

Fontes consultadas (não exaustivo):

- [tamaraklink.com](${SITE}) · [Sailing Projects](${PROJECTS}) · [Northwest Passage](${NW}) · [Overwinter](${OVERWINTER}) · [Arctic Circle](${ARCTIC}) · [Atlantic](${ATLANTIC}) · [North Sea](${NORTH_SEA}) · [Lectures](${LECTURES}) · [Contact](${CONTACT})
- [PredictWind · TAMARA_KLINK](${TRACK})
- Cruzamentos: [Wikipédia · Tamara Klink](${WIKI}) · [ficha de pessoa](${PESSOA}) · [ficha do canal](${CANAL}) · [*Bom dia, Inverno*](${BOM_DIA})

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como carta náutica digital de referência** — [tamaraklink.com](${SITE}) é o **site oficial** onde a Passagem Noroeste, a invernagem e o Atlântico se tornam interface: limpa, multilíngue, rastreável e profissional. Recomendado ler em tríade com a [pessoa](${PESSOA}), o [canal](${CANAL}) e o léxico do [/inverno/](${INVERNO_HUB}).

[Site](${SITE}) · [Pessoa](${PESSOA}) · [Canal](${CANAL}) · [Bom dia, Inverno](${BOM_DIA}) · [Legado](${LEGADO}) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial inspection of the **official website** [tamaraklink.com](${SITE}) — Tamara Klink’s **digital nautical chart**: showcase, expedition archive, lecture desk and contact door. Object here is **not** the biography ([legacy sheet](${PESSOA})) nor the **YouTube archive** ([channel sheet](${CANAL})): it is the **website itself**.

> Independent audit by Inspector BudGanja from public pages dated ${inspected}. Platform: **Wix**. UI languages: **EN · PT · FR**. **No affiliation**. Indexing ≠ endorsement. Feat and sponsor figures are **as stated on the site**.

![Tamara Klink — BudGanja editorial cover](/${COVER})

## Inspected subject

| Field | Value |
|-------|-------|
| Canonical URL | [https://www.tamaraklink.com](${SITE}) |
| Public title | *Tamara Klink \\| Arctic Sailor and International Speaker* |
| Tagline | **solo sailor, writer and speaker** |
| Vessel / brand | *Sardinha* / **Sardinha 2** · footer © **Sardinha** |
| Anchor sections | About · [Projects](${PROJECTS}) · [Lectures](${LECTURES}) · [Contact](${CONTACT}) |
| Live tracking | [PredictWind · TAMARA_KLINK](${TRACK}) |
| Social | [Instagram](${IG}) · [LinkedIn](${LI}) · [YouTube](${YT}) · [TikTok](${TT}) |
| Mail | [contato@tamaraklink.com](${MAIL}) |
| BudGanja distinction | **Site ≠ person ≠ channel** |
| Inspection date | ${inspected} |

## Why this inspection exists

The lab already honours Tamara as [living legacy](${PESSOA}) and [video archive](${CANAL}). The missing third anchor was the place where she **chooses how to appear**: white minimalism, Sardinha fish, expedition ladder from the North Sea to the Northwest Passage, lectures in three languages, and the human Arctic question — **where is she today?**

## Site map (verified)

| Node | Observed URL | Role |
|------|--------------|------|
| Home / About | [tamaraklink.com](${SITE_TRAIL}) | Bio, hero, tracking CTA |
| Projects index | [/items-1](${PROJECTS}) | Five expeditions |
| Northwest Passage | [page](${NW}) | 2025 · 6,500 km · 60 days · COP30 |
| Arctic overwinter | [/general-clean](${OVERWINTER}) | 8 months · Disko Bay · −40 °C |
| Polar Circle | [page](${ARCTIC}) | 2023 · ~2,500 nm |
| Atlantic Equator | [page](${ATLANTIC}) | 2021 · *Nós* |
| North Sea | [page](${NORTH_SEA}) | 2020 · *Mil Milhas* |
| Lectures | [/lectures-2](${LECTURES}) | 300+ talks · TEDx |
| Contact | [/contact](${CONTACT}) | Form · newsletter · mail |

> **CMS note:** some Wix slugs still use \`cópia-\` / internal names — content is strong; URLs are platform legacy.

## Expedition ladder (site text)

1. **North Sea (2020)** — first solo; *Sardinha*; Ålesund → Dunkirk; books *Mil Milhas* / *Um Mundo em Poucas Linhas*.
2. **Atlantic Equator (2021)** — ~5,000 nm · 3 months · Lorient → Paraty; *Nós* (Companhia das Letras).
3. **Arctic Polar Circle (2023)** — ~2,500 nm · 25 days; 200k live trackers.
4. **Solo overwinter (2023/24)** — first registered female solo Arctic overwinter; 8 months; *Sardinha 2* 34 ft; links to [*Bom dia, Inverno*](${BOM_DIA}).
5. **Northwest Passage (2025)** — youngest woman & first Latin American (site claim); sea ice on only **9%** of the route; COP30; Itaú & NTT Data.

## Lectures & contact

[+300 lectures](${LECTURES}) in PT/FR/EN on courage, commitment, risk, gender equity, environment, emotional intelligence. [Contact](${CONTACT}) + [PredictWind](${TRACK}) make the site a **professional instrument**, not only a memorial.

## Findings

Clear triad (bio / proof / offer); rising narrative path; live tracking; multilingual voice; climate without empty pamphlet; honest note on opaque Wix slugs. Completes the triangle with [person](${PESSOA}) and [channel](${CANAL}).

## Status

**Approved with highest merit as a reference digital nautical chart** — read as a triad with [person](${PESSOA}), [channel](${CANAL}) and [/inverno/](${INVERNO_HUB}).

[Site](${SITE}) · [Person](${PESSOA}) · [Channel](${CANAL}) · [Bom dia, Inverno](${BOM_DIA}) · [Legacy](${LEGADO}) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial del **sitio oficial** [tamaraklink.com](${SITE}) — la **carta náutica digital** de Tamara Klink: vitrina, archivo de expediciones, escritorio de conferencias y puerta de contacto. El objeto **no es** la biografía ([ficha de legado](${PESSOA})) ni el **archivo de YouTube** ([ficha del canal](${CANAL})): es el **sitio mismo**.

> Auditoría independiente del Inspector BudGanja sobre páginas públicas (${inspected}). Plataforma: **Wix**. Idiomas: **EN · PT · FR**. **Sin afiliación**. Indexar ≠ respaldar.

![Tamara Klink — cubierta editorial BudGanja](/${COVER})

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| URL canónica | [https://www.tamaraklink.com](${SITE}) |
| Tagline | **solo sailor, writer and speaker** |
| Embarcación / marca | *Sardinha* / **Sardinha 2** · © **Sardinha** |
| Secciones | About · [Projects](${PROJECTS}) · [Lectures](${LECTURES}) · [Contact](${CONTACT}) |
| Tracking | [PredictWind · TAMARA_KLINK](${TRACK}) |
| Redes | [Instagram](${IG}) · [LinkedIn](${LI}) · [YouTube](${YT}) · [TikTok](${TT}) |
| Distinción | **Sitio ≠ persona ≠ canal** |
| Fecha | ${inspected} |

## Por qué existe

El laboratorio ya honra a Tamara como [legado vivo](${PESSOA}) y [archivo en vídeo](${CANAL}). Faltaba el lugar donde ella **elige cómo aparecer**: minimalismo, pez Sardinha, escalera de expediciones hasta el Paso del Noroeste, y la pregunta — **¿dónde está hoy?**

## Mapa del sitio

| Nodo | URL | Función |
|------|-----|---------|
| Home | [tamaraklink.com](${SITE_TRAIL}) | Bio + tracking |
| Projects | [/items-1](${PROJECTS}) | Cinco expediciones |
| Noroeste | [página](${NW}) | 2025 · 6 500 km · COP30 |
| Invernada | [/general-clean](${OVERWINTER}) | 8 meses · Disko Bay |
| Círculo Polar | [página](${ARCTIC}) | 2023 · ~2 500 mn |
| Atlántico | [página](${ATLANTIC}) | 2021 · *Nós* |
| Mar del Norte | [página](${NORTH_SEA}) | 2020 · *Mil Milhas* |
| Lectures | [/lectures-2](${LECTURES}) | +300 charlas |
| Contact | [/contact](${CONTACT}) | Formulario · correo |

## Escalera de expediciones

Mar del Norte (2020) → Atlántico (2021) → Círculo Polar (2023) → invernada ártica (2023/24) → Paso del Noroeste (2025: hielo en solo **9%** de la ruta). Lecturas cruzadas: [*Bom dia, Inverno*](${BOM_DIA}), [camino](${CAMINHO}), [riesgo](${RISCO}), [hielo](${GELO}).

## Estado

**Aprobado con mérito máximo como carta náutica digital de referencia** — leer en tríada con [persona](${PESSOA}), [canal](${CANAL}) y [/inverno/](${INVERNO_HUB}).

[Sitio](${SITE}) · [Persona](${PESSOA}) · [Canal](${CANAL}) · [Bom dia, Inverno](${BOM_DIA}) · [Legado](${LEGADO}) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildTamaraklinkSiteInspecaoPost() {
  const inspected = '2026-08-18';
  const { body, contentEn, contentEs } = buildTamaraklinkSiteBodies(inspected);
  return sitePost({
    title: 'Inspeção: tamaraklink.com — carta náutica digital do Ártico',
    titleEn: 'Inspection: tamaraklink.com — digital nautical chart of the Arctic',
    titleEs: 'Inspección: tamaraklink.com — carta náutica digital del Ártico',
    excerpt:
      'Site oficial de Tamara Klink: mapa de expedições (Mar do Norte → Passagem Noroeste), Lectures, tracking PredictWind do Sardinha 2 — distinto da ficha de pessoa e do canal YouTube.',
    excerptEn:
      'Tamara Klink’s official site: expedition map (North Sea → Northwest Passage), Lectures, PredictWind tracking of Sardinha 2 — distinct from person sheet and YouTube channel.',
    excerptEs:
      'Sitio oficial de Tamara Klink: mapa de expediciones (Mar del Norte → Paso del Noroeste), Lectures, tracking PredictWind del Sardinha 2 — distinto de la ficha de persona y del canal de YouTube.',
    slug: 'inspecao-site-tamaraklink',
    date: inspected + 'T18:00:00.000Z',
    seriesOrder: 9,
    seriesLabel: 'Tamara Klink · site',
    coverImage: COVER,
    sourceUrl: SITE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTamaraklinkSiteInspecaoPost,
  buildTamaraklinkSiteBodies
};
