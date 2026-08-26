'use strict';

/**
 * Inspeção Palavras · Porta Palavra #5
 * Uma página: mequetrefe + todas as palavras do vídeo (brechó do dicionário).
 * Âncora: Gregorio Duvivier / Porta dos Fundos.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mequetrefe-palavra-cover.jpg';
const YT_ID = '4Ot7Mqlhlbo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKT = 'https://pt.wiktionary.org/wiki/mequetrefe';
const DICIO = 'https://www.dicio.com.br/mequetrefe/';
const HOUAISS_CITA =
  'https://www1.folha.uol.com.br/fsp/cotidiano/61146-mequetrefes-urbanos-e-viloes.shtml';
const COROMINAS =
  'https://bibliamedieval.es/bibliateca.es/corominas/DATA/HTML/mequetrefe.html';

function buildMequetrefeBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-mequetrefe.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const canal = 'https://www.youtube.com/@portadosfundos';

  const body = `## Escopo

Inspeção editorial de **todas as palavras** de **[MEQUETREFE | PORTA PALAVRA #5](${YT})** — [Gregorio Duvivier](${duvivier}) no [Porta dos Fundos](${canal}) — **nesta mesma página**. A porta do sketch é **[mequetrefe](${self})** (pedido de campo: *meqyetrefe*, lapso *y*/*u*). O resto entra como **brechó**: caducas, substitutos clínicos, anglicismos e peças que ainda servem. Uma página, um vídeo, o léxico inteiro do palco.

> **Nota metodológica:** auditoria independente. Fontes: [vídeo](${YT}), [Wikcionário · mequetrefe](${WIKT}), [Dicio](${DICIO}), [Houaiss na Folha](${HOUAISS_CITA}), [Corominas](${COROMINAS}), série [Palavras](${hub}). **Ficha ≠ dicionário completo, ≠ sátira política, ≠ lista de insultos, ≠ aconselhamento clínico.** Sem afiliação com Porta dos Fundos. Crédito da peça: Gregorio Duvivier / Porta dos Fundos. Grafias ASR corrigidas (*sigaíta*, *estroina*, *boêmia*, *Venvanse*).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | Léxico de **Porta Palavra #5** — todas as peças do sketch, **uma página** |
| Porta | **mequetrefe** (lapso de campo: **meqyetrefe**) |
| Tese do palco | Palavras nascem, caducam e morrem; o dicionário é um **brechó** |
| Canal / voz | [Porta dos Fundos](${canal}) · [Gregorio Duvivier](${duvivier}) |
| Tipo BudGanja | Palavra — arquivo de vocábulos caducos × ofício de guardar |
| Elo língua | [língua portuguesa](${lingua}) · [passar](${passar}) · [caminho](${caminho}) |
| Elo pulso | [tristeza](${tristeza}) · [alegria](${alegria}) · [respeito](${respeito}) · [verdade](${verdade}) |
| Vídeo | [Porta Palavra #5](${YT}) — \`${YT_ID}\` |
| Data | ${inspected} |

**H1:** o mérito **não** é o punch — é **nomear cada peça** que o palco desfila, com sentido e substituto.  
**H2:** mequetrefe é a **porta**; as vizinhas não saem da página.  
**H3:** «caduca» ≠ lixo: vocábulo antigo é **arquivo**.  
**H4:** diagnóstico e inglês **convivem** com o léxico antigo; não o apagam.  
**H5:** fecho = [Valeu !!!](${mantra}).

## 2. Vídeo âncora (embed)

**[MEQUETREFE \\| PORTA PALAVRA #5](${YT})** — ~3 min 24 s

@youtube ${YT_ID}

Gregorio abre: *«as palavras são como a gente, nascem e morrem, mas antes de morrer ficam caducas»*. Fecha: os **cacarecos** da língua estão no brechó que atende por **dicionário**.

## 3. Porta — mequetrefe

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Intrometido** | Enxerido; mete-se no que não é da sua conta | Alta (Houaiss) |
| **Patife** | Biltre, mariola | Alta |
| **João-ninguém** | Insignificante, borra-botas — a camada que o palco trata como «velha» | Alta |
| **Adjetivo** | Coisa / desculpa **ordinária** | Alta |
| **Cognato ES** | Espanhol *mequetrefe* | Alta |
| **Étimo** | Melhor hipótese: *meco* + *trefe* (Corominas, PT → ES, séc. XVI–XVII). Árabe *mugatrif* = satélite. Inglês *make-trifle* = **rejeitado** | Média–alta / baixa |

No palco: *«a palavra mequetrefe, por exemplo, é uma velha coroca»*. Ainda vive, rarefeita — crónica, tribunal, palco.

## 4. Caducas de pessoa (o que mequetrefe puxa)

| Palavra | Sentido no sketch / no uso | Nota BudGanja |
|---------|----------------------------|---------------|
| **coroca** | Velha; «já está com o pé na cova» | Peça de idade — não é só insulto de género se o ofício for o **arquivo** |
| **lambisgóia** | Senil; pessoa caduca / afetada | Vizinha directa de coroca |
| **sigaíta** | Amiga da lambisgóia no texto | Grafia viva rara; fica no brechó como o palco a deixou |

## 5. Escada da tristeza (nuance → diagnóstico)

O palco: antigamente havia **nuances**; hoje a tristeza ganhou **diagnóstico**. Elo: [tristeza](${tristeza}).

| Peça antiga | Sentido de ofício | Substituta no sketch |
|-------------|-------------------|----------------------|
| **jururu** | Tristeza miúda, amuada | **distímico** |
| **borocochô** | Tristeza mais funda / acabrunhada | (degrau da escada) |
| **cabisbaixo** | Cabeça baixa; desalento visível | — |
| **melancólico** | Humor negro clássico | — |
| **macambúzio** | Tristeza pesada, taciturna | percebeu que tinha **depressão** |
| **taciturno** | Calado, sombrio | — |
| **sorumbático** | Último degrau da escada no texto | — |

**Correção:** nome clínico **não apaga** o vocábulo. Distimia / depressão são eixos de cuidado; jururu e macambúzio são **arquivo de nuance**. Esta ficha **não** diagnostica.

## 6. Atenção, alegria, «loucura» — o que a clínica substituiu

| Peça antiga | Substituta no sketch | Leitura |
|-------------|----------------------|---------|
| **desligado** | **TDAH** | Atenção virou sigla |
| **geniosa** | **bipolar** | Humor vivo ≠ diagnóstico |
| **faceiro** · **serelepe** | episódio de **mania** | Elo [alegria](${alegria}): a festa tinha nome miúdo |
| **biruta** · **zureta** · **avariado** · **lelé** · **lelé da cuca** | **psicótico** | Léxico de rua × termo clínico; [respeito](${respeito}) manda não xingar com o diagnóstico |

**Correção:** o palco critica a **perda de nuance**, não a existência da clínica. O laboratório guarda as duas camadas.

## 7. Criança difícil e o que substituiu o cascudo

| Peça | Papel no sketch |
|------|-----------------|
| **peralta** · **traquinas** | Criança difícil — agora **transtorno opositor desafiador (TOD)** |
| **supapo** (= **safanão**) · **cascudo** | Castigo físico — o palco diz que melhorou: saíram, entraram **Ritalina** e **Venvanse** |

**Limite:** ficha de palavras, **não** de pediatria nem de psicofármacos. Nomear o substituto ≠ endossar nem condenar o fármaco.

## 8. Intensidade, pânos e o que saiu de moda

| Peça | Sentido | Substituta / nota |
|------|---------|-------------------|
| **agasalho** | Abrigo contra o frio | **casaco** (no texto: quando está frio) |
| **pra Dedel** | Intensificador («muito») | o palco quer a palavra de volta; irmãs: **pra burro**, **pra cachorro**, **pra caramba** |
| **caraca** · **caracoles** | Interjeição de espanto | rarefeitas |
| **pinimba** | Birra / rancor miúdo («pegar pinimba») | **ranço** |
| **zoeira** · **troça** · **galhofa** | Zombaria | **bullying** (inglês institucional) |
| **estroina** | Quem vive na folia | **boêmia** · **fusarca** (peças do mesmo cabide) |
| **cooper** | Correr «fazendo cooper» | **running** — «nunca se correu tanto; ninguém corre, só se faz *running*» |
| **janota** · **frajola** | Arrumadinho demais (Frajola = gato do Piu-Piu) | elegância caduca |
| **garbo** · **galhardia** | Elegância com porte | sumiram «com os **suspensórios** e as **abotoaduras**» |

## 9. Mentira, marca e ressurreição

| Peça | Sentido | Substituta no sketch |
|------|---------|----------------------|
| **lorota** | Mentira com charme | **fake news** |
| **caô** · **balela** · **embuste** | Mentira / logro | **narrativa** · **storytelling** |
| **rebranding** | Palavra nova para **repaginada** | o palco nota o rebranding do próprio *rebranding* |
| **flirt** | Palavra moribunda que voltou | desbancou **paquera** |
| **cacarecos** | Sobras da língua | todas no **brechó** |
| **brechó** · **dicionário** | Fecho do sketch | inspecionar = **provar a peça**, não só apontar a arara |

## 10. Inventário (todas as peças desta página)

**mequetrefe** · meqyetrefe · coroca · lambisgóia · sigaíta · jururu · borocochô · cabisbaixo · melancólico · macambúzio · taciturno · sorumbático · depressão · distímico · desligado · TDAH · geniosa · bipolar · faceiro · serelepe · mania · biruta · zureta · avariado · lelé · lelé da cuca · psicótico · peralta · traquinas · TOD · supapo · safanão · cascudo · Ritalina · Venvanse · agasalho · casaco · pra Dedel · pra burro · pra cachorro · pra caramba · caraca · caracoles · pinimba · ranço · zoeira · troça · galhofa · bullying · estroina · boêmia · fusarca · cooper · running · janota · frajola · garbo · galhardia · suspensórios · abotoaduras · lorota · fake news · caô · balela · embuste · narrativa · storytelling · rebranding · repaginada · flirt · paquera · cacarecos · brechó · dicionário.

Cada uma **inspecionada acima** (sentido + substituto). Nenhuma sai para ficha própria neste recorte — o pedido de campo foi **uma página**.

## 11. Correção BudGanja

**Mequetrefe ≠ xingamento de prateleira.** Se ouvires *meqyetrefe*, lê **mequetrefe**. Caduca ≠ lixo. Diagnóstico ≠ apagar nuance. Inglês ≠ matar o hábito — às vezes só muda o cabide. Guardar a peça **não** é usá-la para diminuir gente: [respeito](${respeito}) manda. Fechar com [Valeu !!!](${mantra}).

## Status

**Aprovada** — **todas** as palavras de Porta Palavra #5 nesta página; porta **mequetrefe**; elos [Duvivier](${duvivier}) · [língua portuguesa](${lingua}) · [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Guia](${guia}) · [▶ Duvivier](${duvivier}) · [▶ Porta Palavra #5](${YT}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **every word** in **[MEQUETREFE | PORTA PALAVRA #5](${YT})** (Gregorio Duvivier / Porta dos Fundos) **on this same page**. Door-word: **mequetrefe** (field slip *meqyetrefe*). The rest is the thrift shop: aging words, clinical substitutes, Anglicisms.

> Independent audit. **Not a full dictionary, not political satire, not clinical advice.** Credit: Duvivier / Porta dos Fundos.

## Anchor video

@youtube ${YT_ID}

Thesis: words are born, go senile, die; the dictionary is a **thrift shop**.

## Clusters (all on this page)

| Cluster | Pieces |
|---------|--------|
| Door | **mequetrefe** (busybody / rascal / nobody; etymon disputed: *meco+trefe*) · coroca · lambisgóia · sigaíta |
| Sadness ladder | jururu · borocochô · cabisbaixo · melancólico · macambúzio · taciturno · sorumbático → depression / dysthymia |
| Attention / joy / “madness” | desligado→ADHD · geniosa→bipolar · faceiro/serelepe→mania · biruta/zureta/avariado/lelé→psychotic |
| Child / blow | peralta/traquinas→ODD · supapo/safanão/cascudo → Ritalin / Venvanse |
| Intensity / clothes / sport | pra Dedel/burro/cachorro/caramba · caraca/caracoles · pinimba→ranço · zoeira/troça/galhofa→bullying · cooper→running · janota/frajola · garbo/galhardia |
| Lie / brand / revival | lorota→fake news · caô/balela/embuste→narrative/storytelling · rebranding · flirt/paquera · cacarecos · brechó · dicionário |

**Correction:** clinical names do not erase nuance; keeping an old word is not using it to shrink people. Close with [Valeu !!!](${mantra}).

## Status

**Approved** — full Porta Palavra #5 lexicon on one page.

[▶ Words](${hub}) · [▶ Duvivier](${duvivier}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **todas las palabras** de **[MEQUETREFE | PORTA PALAVRA #5](${YT})** (Gregorio Duvivier / Porta dos Fundos) **en esta misma página**. Puerta: **mequetrefe** (lapsus *meqyetrefe*). El resto es el rastro: vocablos caducos, sustitutos clínicos, anglicismos.

> Auditoría independiente. **No es diccionario completo ni consejo clínico.** Crédito: Duvivier / Porta dos Fundos.

## Vídeo ancla

@youtube ${YT_ID}

Tesis: las palabras nacen, envejecen y mueren; el diccionario es un **rastro**.

## Racimos (todos aquí)

| Racimo | Piezas |
|--------|--------|
| Puerta | **mequetrefe** (entrometido / patán / don nadie; étimo en disputa) · coroca · lambisgóia · sigaíta |
| Escalera de la tristeza | jururu · borocochô · cabisbaixo · melancólico · macambúzio · taciturno · sorumbático → depresión / distimia |
| Atención / alegría / «locura» | desligado→TDAH · geniosa→bipolar · faceiro/serelepe→manía · biruta/zureta/lelé→psicótico |
| Infancia / golpe | peralta/traquinas→TOD · supapo/cascudo → Ritalina / Venvanse |
| Intensidad / ropa / deporte | pra Dedel · pinimba→ranço · zoeira→bullying · cooper→running · janota · garbo |
| Mentira / marca / resurreción | lorota→fake news · caô/embuste→narrativa/storytelling · rebranding · flirt/paquera · cacarecos · brechó · dicionário |

**Corrección:** el nombre clínico no borra la matiz. Guardar la pieza no es usarla para empequeñecer gente. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — léxico completo de Porta Palavra #5 en una página.

[▶ Palabras](${hub}) · [▶ Duvivier](${duvivier}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMequetrefePost() {
  const { body, contentEn, contentEs } = buildMequetrefeBodies();
  let seriesOrder = 128;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-mequetrefe');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 128 */
  }

  const post = makePalavra({
    title: 'Inspeção: Porta Palavra #5 — mequetrefe e o brechó do dicionário',
    titleEn: 'Inspection: Porta Palavra #5 — mequetrefe and the dictionary thrift shop',
    titleEs: 'Inspección: Porta Palavra #5 — mequetrefe y el rastro del diccionario',
    excerpt:
      'Palavras: todas as peças de Porta Palavra #5 (Gregorio) nesta página — mequetrefe, jururu, pinimba, cooper, lorota, brechó; Valeu !!!',
    excerptEn:
      'Words: every piece of Porta Palavra #5 (Gregorio) on this page — mequetrefe, jururu, pinimba, cooper, lorota, thrift shop; Valeu !!!',
    excerptEs:
      'Palabras: todas las piezas de Porta Palavra #5 (Gregorio) en esta página — mequetrefe, jururu, pinimba, cooper, lorota, rastro; ¡Valeu !!!',
    slug: 'inspecao-palavra-mequetrefe',
    date: '2026-08-20T04:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Mequetrefe · Porta Palavra #5',
    coverImage: COVER,
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = YT;
  post.videoId = YT_ID;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = {
  buildMequetrefePost,
  buildMequetrefeBodies
};
