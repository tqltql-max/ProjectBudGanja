'use strict';

/**
 * Inspeção Palavras · incrível
 * Eixos: Lat. incredibilis · incredulidade + elogio BR ·
 * escala (legal · genial · fantástico se existirem) · Faça o melhor!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function slugExists(slug) {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    return posts.some((p) => p.slug === slug);
  } catch (_) {
    return false;
  }
}

function buildIncrivelBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/incr%C3%ADvel';
  const wikiLat = 'https://en.wiktionary.org/wiki/incredibilis';

  const hasLegal = slugExists('inspecao-palavra-legal');
  const hasGenial = slugExists('inspecao-palavra-genial');
  const hasFantastico = slugExists('inspecao-palavra-fantastico');
  const hasMaravilhoso = slugExists('inspecao-palavra-maravilhoso');

  const scaleRows = [];
  if (hasLegal) {
    scaleRows.push(
      `| Aprovação leve / «bacana» | [legal](${legal}) (eixo gíria) | Ok, massa, segue |`
    );
  }
  if (hasGenial) {
    scaleRows.push(
      `| Engenho reconhecido | [genial](${genial}) | Feito com método |`
    );
  }
  if (hasFantastico) {
    scaleRows.push(
      `| Louvor alto / «fora do comum» | [fantástico](${fantastico}) | Uau com cor |`
    );
  }
  if (hasMaravilhoso) {
    scaleRows.push(
      `| Maravilha / assombro doce | [maravilhoso](/posts/post-inspecao-palavra-maravilhoso.html) | Peito aberto |`
    );
  }
  scaleRows.push(
    `| Fora do crível / uau dilatado | **incrível** (esta ficha) | Incredulidade ou louvor alto |`
  );

  const eloElogio = [
    hasLegal ? `[legal](${legal}) (gíria bacana)` : null,
    hasGenial ? `[genial](${genial}) (engenho)` : null,
    hasFantastico ? `[fantástico](${fantastico})` : null,
    hasMaravilhoso
      ? `[maravilhoso](/posts/post-inspecao-palavra-maravilhoso.html)`
      : null
  ]
    .filter(Boolean)
    .join(' · ');

  const missingNote = [
    !hasMaravilhoso ? '*maravilhoso*' : null,
    !hasFantastico ? '*fantástico*' : null
  ]
    .filter(Boolean)
    .join(', ');

  const scaleIntro = missingNote
    ? `liga a escala de elogio já fichada` +
      (hasLegal || hasGenial || hasFantastico
        ? ` (${[hasLegal && 'legal', hasGenial && 'genial', hasFantastico && 'fantástico']
            .filter(Boolean)
            .join(' · ')})`
        : '') +
      ` — sem inventar fichas ainda inexistentes (${missingNote})`
    : `liga a escala de elogio já fichada (legal · genial · fantástico · maravilhoso)`;

  const contrastGenial = hasGenial
    ? `| **Contraste com genial** | [Genial](${genial}) = engenho; *incrível* = fora do crível / uau | Bom: separar ferramentas · Mau: fundir tudo em «elogio» |`
    : '';
  const contrastLegal = hasLegal
    ? `| **Contraste com legal (gíria)** | [Legal](${legal}) «bacana» = aprovação leve; *incrível* = grau mais alto | Bom: escala · Mau: tudo no mesmo tom |`
    : '';
  const contrastFant = hasFantastico
    ? `| **Contraste com fantástico** | [Fantástico](${fantastico}) = louvor colorido; *incrível* = «não cabe no crível» | Bom: matiz · Mau: sinónimo cego |`
    : '';

  const scaleLinksPt = [
    hasLegal ? `[legal](${legal})` : null,
    hasGenial ? `[genial](${genial})` : null,
    hasFantastico ? `[fantástico](${fantastico})` : null
  ]
    .filter(Boolean)
    .join(' · ');

  const body = `## Escopo

Inspeção editorial da palavra **incrível** — do latim *incredibilis* («que não se pode crer») ao português do Brasil, onde a mesma forma serve **dois ofícios**: (1) marcar o **inacreditável** (assombro, incredulidade); (2) elogiar o quotidiano («que incrível!» ≈ massa / top). No projecto **Inspetor BudGanja**, a ficha separa os eixos e ${scaleIntro}.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · incrível](${wiki}), [incredibilis](${wikiLat}), [língua portuguesa](${lingua}), série [Palavras](${hub}). **Ficha ≠ dicionário académico completo.** Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **incrível** |
| Classe | Adjetivo · interjeição de elogio / assombro (uso oral BR) |
| Étimo (trabalho) | Latim *incredibilis* ← *in-* («não») + *credibilis* («acreditável») ← *credere* («crer») — confiança: **alta** |
| Família | *inacreditável* · *crédulo* · *crédito* · *acreditar* · *incrívelmente* · fr. *incroyable* · esp. *increíble* · ing. *incredible* |
| Tipo BudGanja | Palavra — incredulidade × elogio BR × escala de louvor |
| Elo elogio | ${eloElogio || '— (escala a completar)'} |
| Elo assombro | [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · incrível](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que diz «isto **não cabe** no crível» — e, no BR vivo, também «isto **merece** o peito alto» («incrível!» como elogio dilatado). O lab inspeciona **qual ferramenta** está na frase.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *credere* | Crer, confiar | Alta |
| Lat. *credibilis* | Digno de crédito / acreditável | Alta |
| Lat. *incredibilis* | Que não se pode crer | Alta |
| Romance → PT | *incrível* / *inacreditável* (vizinho) | Alta |
| Assombro / incredulidade | «É incrível que…» · facto difícil de aceitar | Alta |
| Elogio BR oral | «Que incrível!» ≈ top / massa / uau | Alta (uso vivo) |
| Intensificador | «Incrivelmente bom» — grau alto | Alta |
| Risco de diluição | Tudo «incrível» = nada incrível | Alta (ofício) |

**H1:** *incrível* nasce no **não-crível** (*in-* + *credibilis*) — o chão etimológico é a incredulidade.  
**H2:** no Brasil, o sentido **elogio** («que incrível!») é expansão afectiva estável, não erro.  
**H3:** confundir assombro com flattery (ou o inverso) é falha de [verdade](${verdade}) — não «falta de cultura».

## 3. Dois eixos — incredulidade × elogio BR

| Eixo | Exemplo | Bom × mau no lab |
|------|---------|------------------|
| **Inacreditável** | «É incrível que ainda falte ficha» | Bom: nomear o espanto · Mau: negar o facto |
| **Assombro alto** | Cruzar com [meudeusdoceu](${meudeusdoceu}) | Bom: peito com objecto · Mau: grito sem relatório |
| **Elogio dilatado** | «Relato incrível!» | Bom: calor + o quê acertou · Mau: hype sem [gesto](${gesto}) |
| **Grau / intensificador** | «Incrivelmente claro» | Bom: marcar qualidade · Mau: adorno vazio |
${contrastGenial}
${contrastLegal}
${contrastFant}

### Escala de elogio (só fichas existentes)

No laboratório, a escada viva (sem inventar Cap. futuros):

| Degrau | Ficha | Tom |
|--------|-------|-----|
${scaleRows.join('\n')}

${
  missingNote
    ? `${missingNote.charAt(0).toUpperCase() + missingNote.slice(1)} entra(m) na conversa oral BR, mas **ainda não tem/têm ficha** — não inventamos elos mortos. Quando existirem Cap., esta rede atualiza.`
    : 'Escala completa no catálogo — actualizar matizes sem fundir as ferramentas.'
}

**Veredicto contraste:** *incrível* sobe o grau do «não-crível»; literacia = **nomear o degrau** (${scaleLinksPt || 'escala em construção'}).

## 4. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Marcar o inacreditável** | Facto / achado que desafia o esperado | Relatório com [verdade](${verdade}) |
| **Elogiar com peito** | «Que incrível!» no grupo | Objecto + crédito — não flattery |
| **Subir o grau** | Acima da aprovação leve | Escala ${scaleLinksPt || 'em construção'} |
| **Assombro oral** | Irmão de [meudeusdoceu](${meudeusdoceu}) | Peito sem proselitismo |
| **Criar com método** | Espanto ≠ inventar dados | [Criatividade](${criatividade}) · [gesto](${gesto}) |
| **Fechar** | Depois do uau, o acto | [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** usar **incrível** com **clareza de eixo** — incredulidade quando for facto difícil; elogio quando for peito; nunca um no lugar do outro sem aviso; e nunca «tudo incrível» a apagar o próximo [gesto](${gesto}).

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, mesmo sem ser «incrível» |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se é incrível, não precisa inspecionar» = falso |
| Anti-armadilha 2 | «Não sou incrível, então paro» = falso · o BudGanja corre no mantra |
| Anti-diluição | Tudo incrível = nada incrível · escolher o degrau (${scaleLinksPt || 'escala'}) |
| Par de método | [Verdade](${verdade}) · [gesto](${gesto}) · [caminho](${caminho}) |
| Rede oral | [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) · [aff](${aff}) · [já](${ja}) |

**Veredicto:** Faça o melhor **com incrível** — inspecionar o eixo, celebrar com objecto, subir o grau sem esvaziar a palavra.

## Hipóteses (síntese)

**H1:** objeto = lat. *incredibilis* → incredulidade + elogio BR.  
**H2:** escala viva = ${scaleLinksPt || '(a completar)'} → **incrível**.  
**H3:** elos = [verdade](${verdade}) · [gesto](${gesto}) · [meudeusdoceu](${meudeusdoceu}) · [criatividade](${criatividade}).  
**H4:** fecho = [Faça o melhor!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| ${scaleLinksPt || 'Escala (em construção)'} | Escala de elogio já fichada |
| [Meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) | Assombro oral BR |
| [Verdade](${verdade}) · [Gesto](${gesto}) · [Criatividade](${criatividade}) | Ofício sem flattery |
| [Aff](${aff}) · [Já](${ja}) | Termómetro / fecho prematuro |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo da polissemia |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não esgota sinonímia de elogio (fichas futuras da escala).  
- Não moraliza o uso oral «incrível!» (= uau).  
- Não trata «incrível» como prova científica — é mapa lexical e de ofício.

## Status

**Aprovado** — **incrível** fichado: Lat. *incredibilis*; eixos incredulidade × elogio BR; escala ${scaleLinksPt || 'parcial'}; elos assombro e ofício; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub})${hasLegal ? ` · [▶ Legal](${legal})` : ''}${hasGenial ? ` · [▶ Genial](${genial})` : ''}${hasFantastico ? ` · [▶ Fantástico](${fantastico})` : ''} · [▶ Meudeusdoceu](${meudeusdoceu}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **incrível** (“incredible”) — Latin *incredibilis* (“not believable”) to Brazilian use: (1) the **unbelievable**; (2) everyday praise (“how incredible!” ≈ awesome). Praise-scale links only when on file: ${scaleLinksPt || '(building)'}.

> Method note: [Wiktionary · incrível](${wiki}), [incredibilis](${wikiLat}). Not a full dictionary.

## Object

| Field | Value |
|-------|-------|
| Word | **incrível** |
| Etymon | Latin *incredibilis* ← *in-* + *credibilis* ← *credere* — high confidence |
| Lab type | Unbelief × BR praise × praise scale |
| Links | ${scaleLinksPt || '—'} · [truth](${verdade}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Senses

Unbelievable / hard to accept · BR oral praise (“que incrível!”) · intensifier · dilution risk. Scale on file → **incrível** (high wow / unbelief).

## Purpose

Name the unbelievable · praise with an object · climb the degree without emptying the word · close with [Do your best!](${mantra}).

## Status

**Approved** — *incredibilis*; unbelief × BR praise; scale linked; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **incrível** («increíble») — latín *incredibilis* al uso BR: (1) lo **inacreditável**; (2) elogio cotidiano («¡qué incrível!»). Escala solo con fichas existentes: ${scaleLinksPt || '(en construcción)'}.

> Nota: [Wikcionario · incrível](${wiki}), [incredibilis](${wikiLat}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **incrível** |
| Étimo | Latín *incredibilis* ← *in-* + *credibilis* ← *credere* |
| Vínculos | ${scaleLinksPt || '—'} · [verdad](${verdade}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Sentidos

Inacreditável · elogio oral BR · intensificador · riesgo de dilución. Escala → **incrível**.

## Para qué sirve

Nombrar lo increíble · elogiar con objeto · subir el grado · cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — *incredibilis*; incredulidad × elogio BR; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildIncrivelPost() {
  const { body, contentEn, contentEs, wiki } = buildIncrivelBodies();
  // Re-read free Cap at build time (concurrent agents).
  let seriesOrder = 48;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-incrivel');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 120) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 48 */
  }

  return makePalavra({
    title:
      'Inspeção: Incrível — incredibilis, elogio BR e a escala legal→genial',
    titleEn:
      'Inspection: Incrível — incredibilis, BR praise, and the legal→genial scale',
    titleEs:
      'Inspección: Incrível — incredibilis, elogio BR y la escala legal→genial',
    excerpt:
      'Palavras: «incrível» (lat. *incredibilis*) — incredulidade e elogio BR «uau»; escala com fichas existentes (legal, genial, fantástico…); Faça o melhor!',
    excerptEn:
      'Words: “incrível” (Lat. *incredibilis*) — unbelief and BR praise “wow”; scale with sheets on file (legal, genial, fantástico…); Do your best!',
    excerptEs:
      'Palabras: «incrível» (lat. *incredibilis*) — incredulidad y elogio BR «uau»; escala con fichas existentes; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-incrivel',
    date: '2026-08-03T22:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Incrível · palavra',
    coverImage: '/imagens/inspecoes/incrivel-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIncrivelPost,
  buildIncrivelBodies
};
