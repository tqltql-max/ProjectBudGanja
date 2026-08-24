'use strict';

/**
 * Inspeção Palavras · script
 * Eixos: lat. scrīptum ← scrībere · empréstimo EN → BR ·
 * sequência escrita (código / roteiro) · ≠ destino · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/script-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/script';
const WIKT_PT = 'https://pt.wiktionary.org/wiki/script';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/scriptum#Latin';
const WIKI = 'https://en.wikipedia.org/wiki/Scripting_language';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildScriptBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const lab = '/laboratorio/';
  const self = '/posts/post-inspecao-palavra-script.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const receitas = '/posts/post-inspecao-guia-receitas-plantas.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';

  const body = `## Escopo

Inspeção editorial da palavra **[script](${self})** — empréstimo inglês vivo no português do Brasil para a **sequência escrita** que alguém (ou um interpretador) **segue**. Pedido de campo: *inspeção da palavra script*. Esta ficha cobre o **objecto** (lat. *scrīptum* ← *scrībere* «escrever»), as camadas **código / roteiro / letra cursiva / tag HTML**, o contraste com **roteiro** e **escrito**, o ofício da pasta \`scripts/\` (ficheiros \`upsert-*.js\` — lema EN no disco; gesto [opsert](${upsert})), a **correção BudGanja** (script ≠ destino, ≠ [skill](${skill})), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · script](${WIKT}), [script (PT)](${WIKT_PT}), [scrīptum](${WIKT_LAT}), [scripting language](${WIKI}). **Ficha ≠ curso de programação, ≠ manual de roteiro, ≠ protocolo de automação ofensiva.** Empréstimo consciente, como [skill](${skill}), [pattern](${pattern}) e [commitar](${commitar}). Étimo: [latim](${latim}) · [étimo](${etimo}).

**Gatilho:** *script* / *scripts* / *scriptar* / *roteiro* / \`<script>\` / *JavaScript* → lema **script**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **script** (EN em uso BR) |
| Irmãs PT | **roteiro** (cinema/palco) · **escrito** / **escritura** (herança latina) · **receita** (procedimento) |
| Família | *scripts* · *scriptar* (verbo informal) · *JavaScript* · *shell script* · \`<script>\` · *screenplay* |
| Classe | Empréstimo EN → uso BR; latim já deu *escrito* ao PT |
| Étimo (trabalho) | Lat. *scrīptum* (n. de *scrīptus* ← *scrībere* «escrever») → FR/EN *script* → BR tech/cinema/oral — confiança: **alta** |
| Tipo BudGanja | Palavra — sequência escrita × ofício de seguir sem virar destino |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo código | [pattern](${pattern}) (molde) · [skill](${skill}) (craft) · [commitar](${commitar}) (rasto) · [opsert](${upsert}) (identidade) |
| Elo lab | Pasta \`scripts/\` · \`upsert-*.js\` (lema EN no disco) · [homepage](${homepage}) (tag na página) |
| Elo étimo | [latim](${latim}) · [étimo](${etimo}) — *scrīptum* é a peça |
| Elo tranco | [buguei](${buguei}) · [backspace](${backspace}) · [exit](${exit}) · [risco](${risco}) |
| Elo língua | [língua portuguesa](${lingua}) · [mensagem](${mensagem}) · [Grok](${grok}) |
| Elo planta | [Guia de receitas](${receitas}) — receita = script de ofício, não destino da planta |
| Fonte | [script (EN)](${WIKT}) · [scrīptum](${WIKT_LAT}) |
| Data | ${inspected} |

**Objeto:** não é «o filme da vida» nem «automação mágica». É um **texto ordenado** — linhas que um leitor humano ou uma máquina **executa**. O lab fiche o **vocábulo**.

## 2. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Cinema / série** | Destino já escrito («está no script») | **Roteiro** — linhas de cena; a vida não é o filme |
| **Tech / lab** | Mágica que «roda sozinha» | Sequência **inspecionável** — alguém escreveu cada passo |
| **CV / hype** | Ter *scripts* = ser [skill](${skill})ado | Arquivo ≠ craft; craft é o [gesto](${gesto}) de escrever e rever |
| **Conversa** | «Segue o script» = não improvisar | Pode ser ofício (ensaio) **ou** máscara (recusar [verdade](${verdade})) |
| **HTML** | Tag invisível que «faz o site» | Instrução nomeada; **não** é tutorial de injecção |
| **BudGanja** | Palavra de informático | **Sequência escrita** a serviço do [caminho](${caminho}) |

**H-parece:** *script* vende **destino** (filme) ou **mágica** (código).  
**H-é:** no ofício, *script* é **o que está escrito para ser seguido** — e por isso pode ser lido, corrigido, [commitado](${commitar}).

**Veredicto contraste:** o que parece = destino/mágica; o que é = sequência com autor. Corrigir a palavra = preferir o rasto ao mito.

## 3. Origens (etimologia)

O núcleo é estável.

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| **Lat. *scrībere* → *scrīptum*** | «O escrito» — particípio que vira substantivo | **Alta** |
| **EN *script*** | Via francês antigo *escript* / latim: letra, documento, depois palco e ecrã | **Alta** |
| **BR empréstimo** | Tech (*script* de shell/JS), cinema (ao lado de *roteiro*), oral («seguir o script») | **Alta** (uso vivo) |
| **PT herdado** | *escrito*, *escritura*, *manuscrito*, *prescrever* — **mesma família**, outro registo | **Alta** |
| **Scriptura / escritura sagrada** | Irmã semântica (*scriptura*) — **não** é esta ficha | Alta na separação |

**Veredicto etimológico:** *script* no BR **não apaga** *escrito* nem *roteiro*. Volta o latim pela porta inglesa. Preferir PT em texto formal do lab quando o sentido for palco (*roteiro*) ou documento (*escrito*).

## 4. Script × roteiro × pattern × skill

| Termo | Ofício | Diferença útil |
|-------|--------|----------------|
| **script** | Loan EN (tech / cinema / oral) | Sequência a **seguir** |
| **roteiro** | PT nativo de palco/ecrã | Preferir em ficha formal de filme |
| **escrito / escritura** | PT herdado do mesmo étimo | Documento, não interpretador |
| **[pattern](${pattern})** | Molde que se **repete** | O molde não é a sequência |
| **[skill](${skill})** | Habilidade / craft | Saber escrever o script ≠ ter o ficheiro |
| **[commitar](${commitar})** | Gravar o rasto | O script muda; o commit fica |
| **[opsert](${upsert})** | Identidade (insert/update) | O **script** da casa chama-se *upsert* no disco; o gesto chama-se opsert |
| **[mensagem](${mensagem})** | Conteúdo enviado | Mensagem informa; script **ordena passos** |
| **receita** | Procedimento de planta / cozinha | Ver [guia de receitas](${receitas}) — ofício, não destino |

**H1:** no lab BR, *script* = sequência escrita emprestada do inglês (alta confiança no uso).  
**H2:** [pattern](${pattern}) acelera a leitura; *script* nomeia os **passos**. Copiar cego é [risco](${risco}).  
**H3:** [skill](${skill}) é o craft; o ficheiro sem craft é papel (ou bytes) sem rasto.  
**H4:** pasta \`scripts/\` + \`upsert-*.js\` = lema EN no disco; o gesto vivo é [opsert](${upsert}).

## 5. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Código / interpretador** | Ficheiro de comandos (shell, Python, JS…) | Alta |
| **Palco / ecrã** | Linhas da cena (EN *screenplay*; PT *roteiro*) | Alta |
| **Letra cursiva** | *script* = tipo de letra (EN) | Alta (EN); média no BR oral |
| **Tag HTML** | \`<script>\` — bloco de código na página | Alta (jargão) |
| **«Seguir o script»** | Não sair da linha combinada | Alta (uso vivo BR) |
| **Destino / conspiração** | «Já estava no script» | Folclórica como étimo; viva como **metáfora** — o lab **recusa** como facto |
| **Ofício lab** | Pasta \`scripts/\` deste site: gerar ficha, capa, [opsert](${upsert}) | Alta (mapa BudGanja) |

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «A vida já está no script» | A [vida](${vida}) não é filme. Roteiro é ofício de cena; peito não é personagem de catálogo |
| «Tenho uns scripts, logo tenho [skill](${skill})» | Ficheiro ≠ craft. Skill pede rasto — [gesto](${gesto}) + [verdade](${verdade}) |
| «É só correr o script» | Sem ler, é [risco](${risco}). Sequência alheia não inspecionada = fé no autor errado |
| «Siga o pattern / cole o script» | [Pattern](${pattern}) revela estrutura; colar sem caso = cópia. Serve *aqui*? |
| «Buguei o script» | [Buguei](${buguei}) é tranco; depois [backspace](${backspace}) (rever) ou [exit](${exit}) (sair) — não humilhar o rasto |
| «A IA escreve o script, Valeu» | [Grok](${grok}) é camada de ofício; humano guarda [verdade](${verdade}) e o [commitar](${commitar}) |

### Ofício correcto (mapa curto)

1. Nomear **o que** o script faz (um [caminho](${caminho}), não dez milagres).  
2. Ler antes de correr — [gesto](${gesto}) de inspeção.  
3. Se travar: [buguei](${buguei}) → [backspace](${backspace}) → voltar à linha.  
4. Gravar o que ficou: [commitar](${commitar}).  
5. Fechar com [Valeu !!!](${mantra}) — o melhor **nesta** sequência, hoje.

**Veredicto correção:** **script ≠ destino.** No lab, *script* só vale com autor, leitura e rasto.

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Oficina / lab** | «O script gera a capa» | Bom: nomear o passo · Mau: esconder o [gesto](${gesto}) |
| **Cinema** | «Muda o script da cena 3» | Bom: se o sentido for roteiro · Mau: apagar a palavra *roteiro* |
| **Oral** | «Não sai do script» | Bom: ensaio · Mau: recusar a [verdade](${verdade}) do caso |
| **Tech talk** | «Sobe um script de deploy» | Bom: sequência nomeada · Mau: fé cega no ficheiro |
| **Metáfora fatalista** | «Já tava no script» | Bom: ironia consciente · Mau: teologia do destino |

**Finalidade-mãe:** nomear o **script** para **seguir com ofício** — útil quando a sequência é lida; perigoso quando vira destino ou mágica.

## 8. Rede (só fichas existentes)

| Ficha | Relação com *script* |
|-------|----------------------|
| [Skill](${skill}) | Craft de escrever/correr; o ficheiro não basta |
| [Pattern](${pattern}) | Molde × passos — não confundir os eixos |
| [Commitar](${commitar}) | Depois da sequência, o snapshot |
| [Opsert](${upsert}) | Scripts da casa: \`upsert-*.js\` no disco; o gesto é opsert |
| [Homepage](${homepage}) | A tag \`<script>\` vive na página; a home não é o filme |
| [Latim](${latim}) · [étimo](${etimo}) | *scrīptum* ← *scrībere* — a peça |
| [Buguei](${buguei}) · [backspace](${backspace}) · [exit](${exit}) | Tranco, rever, sair |
| [Gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) | Ofício de seguir sem congelar |
| [Risco](${risco}) | Correr o que não se leu |
| [Mensagem](${mensagem}) | Informa; script **ordena** |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo no solo BR |
| [Grok](${grok}) | Ferramenta escreve rascunho; humano inspeciona |
| [Receitas](${receitas}) · [Laboratório](${lab}) | Procedimento de planta / lab = script de ofício |
| [Vida](${vida}) · [Diário](${diario}) | Não são o filme |

## 9. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **nesta sequência escrita**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Está no script» ≠ argumento fechado · «quem escreveu e para quê?» = ofício |
| Par vivo | [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) |

**Veredicto:** Valeu !!! **também ao escrever o que se vai seguir**. Script sem leitura = fé; script com [verdade](${verdade}) = ofício.

## Hipóteses (síntese)

**H1:** objecto = lat. *scrīptum* ← *scrībere* → EN *script* → BR (código, palco, oral).  
**H2:** parece destino/mágica; é sequência escrita com autor.  
**H3:** irmãs = **roteiro** / **escrito**; elos = [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}).  
**H4:** fecho = [Valeu !!!](${mantra}) — sem teologia do filme.

## Limites

- Não é curso de linguagem de programação nem de roteiro audiovisual.  
- Não ensina automação ofensiva, exploração de sistemas nem injecção de código.  
- Loanword ≠ apagar *roteiro* / *escrito*.  
- JavaScript, shell e HTML entram como **registo social** da palavra, não como tutorial.  
- Receita de planta é analogia de **procedimento**, não étimo botânico.

## Status

**Aprovado** — **script** fichado: *scrīptum*; sequência escrita EN→BR; ≠ destino; elos [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}); elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Skill](${skill}) · [▶ Pattern](${pattern}) · [▶ Commitar](${commitar}) · [▶ Opsert](${upsert}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[script](${self})** — English loan alive in Brazilian Portuguese for a **written sequence** that a person (or an interpreter) **follows**. Field request: *inspeção da palavra script*. Covers Latin *scrīptum* ← *scrībere*, layers **code / screenplay / HTML tag**, house folder \`scripts/\` ([opsert](${upsert})), contrast with PT **roteiro** / **escrito**, **BudGanja correction** (script ≠ destiny, ≠ [skill](${skill})), and [Valeu !!!](${mantra}).

> Method note: [script](${WIKT}), [scrīptum](${WIKT_LAT}). Not a programming course, screenplay manual, or offensive-automation guide.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **script** · PT sisters **roteiro** / **escrito** |
| Path | Lat. *scrībere* → *scrīptum* → EN *script* → BR tech/stage/oral |
| Links | [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Seems:** destiny (the film) or magic (code that “just runs”).  
**Is:** an ordered text with an author — readable, correctable, [committed](${commitar}).

## 2. BudGanja correction

**script ≠ destiny.** A file is not [skill](${skill}). [Pattern](${pattern}) is the mold; script is the steps. Read before running ([risco](${risco})); if it stalls → [buguei](${buguei}) → [backspace](${backspace}). Close with [Valeu !!!](${mantra}).

## Status

**Approved** — EN loan → BR; written sequence; anti-destiny; links [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Skill](${skill}) · [▶ Pattern](${pattern}) · [▶ Commitar](${commitar}) · [▶ Opsert](${upsert}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[script](${self})** — préstamo inglés vivo en el portugués de Brasil para la **secuencia escrita** que alguien (o un intérprete) **sigue**. Pedido de campo: *inspeção da palavra script*. Cubre lat. *scrīptum* ← *scrībere*, capas **código / guion / etiqueta HTML**, carpeta \`scripts/\` ([opsert](${upsert})), contraste con **roteiro** / **escrito**, **corrección BudGanja** (script ≠ destino, ≠ [skill](${skill})) y [¡Valeu !!!](${mantra}).

> Nota: [script](${WIKT}), [scrīptum](${WIKT_LAT}). No es curso de programación, manual de guion ni guía de automatización ofensiva.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **script** · hermanas PT **roteiro** / **escrito** |
| Camino | Lat. *scrībere* → *scrīptum* → EN *script* → BR tech/escena/oral |
| Vínculos | [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Parece:** destino (la película) o magia (código que «corre solo»).  
**Es:** texto ordenado con autor — se lee, se corrige, se [commitea](${commitar}).

## 2. Corrección BudGanja

**script ≠ destino.** El archivo no es [skill](${skill}). [Pattern](${pattern}) es el molde; script son los pasos. Leer antes de ejecutar ([risco](${risco})); si traba → [buguei](${buguei}). Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — préstamo EN→BR; secuencia escrita; anti-destino; vínculos [skill](${skill}) · [pattern](${pattern}) · [commitar](${commitar}) · [opsert](${upsert}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Skill](${skill}) · [▶ Pattern](${pattern}) · [▶ Commitar](${commitar}) · [▶ Opsert](${upsert}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildScriptPost() {
  const { body, contentEn, contentEs, wiki } = buildScriptBodies();
  const seriesOrder = pickOrder('inspecao-palavra-script', 199);

  return makePalavra({
    title: 'Inspeção: Script — sequência escrita, não destino',
    titleEn: 'Inspection: Script — written sequence, not destiny',
    titleEs: 'Inspección: Script — secuencia escrita, no destino',
    excerpt:
      'Palavras: «script» (lat. scrīptum ← scrībere) — sequência escrita EN→BR; roteiro × código; ≠ destino; elos skill/pattern/commitar/opsert; Valeu !!!',
    excerptEn:
      'Words: “script” (Lat. scrīptum ← scrībere) — written sequence EN→BR; roteiro × code; ≠ destiny; links skill/pattern/commitar/opsert; Valeu !!!',
    excerptEs:
      'Palabras: «script» (lat. scrīptum ← scrībere) — secuencia escrita EN→BR; roteiro × código; ≠ destino; vínculos skill/pattern/commitar/opsert; ¡Valeu !!!',
    slug: 'inspecao-palavra-script',
    date: '2026-08-22T05:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Script · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildScriptPost,
  buildScriptBodies
};
