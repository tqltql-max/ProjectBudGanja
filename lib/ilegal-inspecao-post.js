'use strict';

/**
 * Inspeção Palavras · ilegal
 * Eixos: antónimo de legal (jurídico) · prefixo i-/in- · ilegal × ilícito · Valeu !!!
 * Elos: legal · ilícito · Lei 11.343 · porte×tráfico · descriminalização · risco · verdade
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildIlegalBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const ilicito = '/posts/post-inspecao-palavra-ilicito.html';
  const lei11343 = '/posts/post-inspecao-palavra-lei-11-343.html';
  const porteTrafico = '/posts/post-inspecao-palavra-porte-trafico.html';
  const descrim = '/posts/post-inspecao-palavra-descriminalizacao.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/ilegal';
  const wikiEn = 'https://en.wiktionary.org/wiki/illegal';
  const wikiLei = 'https://pt.wikipedia.org/wiki/Lei';

  const body = `## Escopo

Inspeção editorial da palavra **ilegal** — antónimo clássico de [legal](${legal}) no eixo **jurídico** (contrário à lei), formado pelo prefixo negativo **i- / in-** + *legal*. Esta ficha cobre o **objeto**, a **morfologia**, o contraste útil com [ilícito](${ilicito}), e o fecho [Valeu !!!](${mantra}). Elos naturais: [legal](${legal}), [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ilegal](${wiki}), [Wiktionary · illegal](${wikiEn}), [Lei](${wikiLei}), série [Palavras](${hub}). **Ficha ≠ parecer jurídico** — mapa lexical e de ofício. Sem afiliação política ou comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **ilegal** |
| Classe | Adjetivo (também substantivado: «o ilegal», «os ilegais») |
| Étimo (trabalho) | Prefixo lat. *in-* («não») + *legālis* («relativo à lei») → pt. *ilegal* — confiança: alta |
| Família | *legal* · *ilegalidade* · *ilegalizar* · *lei* · *legalidade* · *ilícito* (vizinho de registo) |
| Cognatos | esp. *ilegal* · fr. *illégal* · it. *illegale* · ing. *illegal* |
| Tipo BudGanja | Palavra — jurídico × morfologia × literacia |
| Elo antónimo | [Legal](${legal}) — eixo **lei**, não a gíria «bacana» |
| Elo vizinho | [Ilícito](${ilicito}) — polo «fora da lei»; registo mais formal / técnico |
| Elo normativo | [Lei 11.343](${lei11343}) · [porte × tráfico](${porteTrafico}) · [descriminalização](${descrim}) |
| Elo ofício | [verdade](${verdade}) · [risco](${risco}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) — prefixo + polarização |
| Fonte | [Wikcionário · ilegal](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que **nega a conformidade com a lei**. No Brasil, *ilegal* fala quase só do eixo jurídico — **não** herda a gíria «bacana» de [legal](${legal}). O lab inspeciona a **ferramenta de polarização**, sem moralizar a palavra nem a conduta.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Prefixo *in-* / *i-* | Negação («não») antes de *legal* | Alta |
| Lat. *legālis* | Relativo à *lex* (lei) | Alta |
| Jurídico PT | Contrário ao direito; fora da lei; «caminho ilegal» | Alta |
| Antónimo | [Legal](${legal}) (eixo jurídico) | Alta |
| Vizinho | [Ilícito](${ilicito}) — sobreposição forte; nuance de registo | Alta |
| Substantivado | «O ilegal» / «entrada ilegal» — pessoa ou acto | Alta (uso vivo) |
| Inglês *illegal* | Quase só jurídico — alinhado com o PT neste eixo | Alta |
| Gíria BR | **Não** espelha «bacana»: «que ilegal!» ≠ elogio estável | Alta (contraste) |

**H1:** *ilegal* nasce da **negação da lei** (*in-* + *legālis*) — o chão é jurídico.  
**H2:** ao contrário de [legal](${legal}), *ilegal* **não** carrega gíria afectiva estável no BR.  
**H3:** [ilícito](${ilicito}) e *ilegal* sobrepõem-se; misturar sem nomear o registo é falha de [verdade](${verdade}) no lab.

## 3. Dois contrastes — legal × ilegal · ilegal × ilícito

### A. Legal (jurídico) × ilegal

| Polo | Exemplo | Bom × mau no lab |
|------|---------|------------------|
| **Legal** | «Via legal / lícita» | Bom: citar norma · Mau: usar gíria «bacana» como se fosse parecer |
| **Ilegal** | «Cultivo ilegal», «entrada ilegal» | Bom: marcar fora da lei com método · Mau: estigma sem ficha |
| **Lei 11.343** | Marco penal das drogas | Bom: [ficha da lei](${lei11343}) · Mau: slogan sem texto |
| **Porte × tráfico** | Distinção prática no Brasil | Bom: [porte × tráfico](${porteTrafico}) · Mau: colapsar categorias sob «é ilegal» |
| **Descriminalização** | Atipicidade / debate ≠ legalização | Bom: [descriminalização](${descrim}) · Mau: «ainda é ilegal» como sinónimo falso de tudo |

### B. Ilegal × ilícito

| Aspecto | **Ilegal** | **Ilícito** |
|---------|------------|-------------|
| Forma | Prefixo + *legal* | Lat. *illicitus* (não permitido) |
| Registo | Corrente, jornalístico, oral | Mais formal / técnico / doutrinário |
| Uso BudGanja | Polarizar com [legal](${legal}) | Fechar o contraste da ficha [droga](/posts/post-inspecao-palavra-droga.html) (remédio ↔ ilícito) |
| Sobreposição | Forte no senso comum («fora da lei») | Forte — **não** são sinónimos exactos de ofício |
| Armadilha | Tratar a planta como «o ilegal» | Idem — planta ≠ rótulo penal |

**Veredicto contraste:** no lab, *ilegal* é o **antónimo transparente** de [legal](${legal}); *ilícito* é o **polo técnico** da classificação. Usar os dois sem aviso = confusão de ferramenta.

### C. O que *ilegal* não faz (e *legal* faz)

| Situação | *Legal* | *Ilegal* |
|----------|---------|----------|
| Eixo jurídico | Conforme a lei | Contrário à lei |
| Gíria BR «bacana» | Sim — «que legal!» | **Não** espelha |
| Inglês | *legal* ≈ jurídico (quase só) | *illegal* ≈ jurídico (alinhado) |
| Ofício | Nomear **qual** eixo | Nomear **negação da lei**, sem gíria falsa |

## 4. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Negar a lei** | Marcar o que a norma não permite | Elo [legal](${legal}) · [ilícito](${ilicito}) |
| **Separar mapas** | Ilegal ≠ imoral ≠ perigoso ≠ «droga» | [Droga](/posts/post-inspecao-palavra-droga.html) · [proibição × proibicionismo](${proibicao}) |
| **Calcular risco** | Consequência jurídica real | [Risco](${risco}) com método |
| **Evitar colapso** | Não chamar a planta de «o ilegal» | [Cannabis sativa](/plantas/cannabis-sativa/) ≠ rótulo penal |
| **Dizer a verdade** | Qual ferramenta está na frase | [Verdade](${verdade}) · [gesto](${gesto}) |
| **Fechar** | Depois do mapa, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** usar **ilegal** com **clareza** — fora da lei quando for lei; nunca como atalho moral, estigma de planta, nem «antónimo da gíria bacana».

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com a palavra certa**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se não é legal (bacana), então é ilegal (crime)» = falso |
| Anti-armadilha 2 | «Ilegal = ilícito = droga = planta» = colapso — inspecionar cada camada |
| Par de método | [Verdade](${verdade}) · [risco](${risco}) · [caminho](${caminho}) |
| Rede normativa | [Legal](${legal}) · [ilícito](${ilicito}) · [proibição × proibicionismo](${proibicao}) · [Lei 11.343](${lei11343}) |

**Veredicto:** Valeu !!! **com ilegal** — polarizar com método, citar quando for norma, separar de [ilícito](${ilicito}) e da gíria de [legal](${legal}), sem misturar as ferramentas.

## Hipóteses (síntese)

**H1:** objeto = *in-* + *legālis* → **ilegal** (negação da lei).  
**H2:** antónimo de [legal](${legal}) no eixo jurídico — **não** da gíria «bacana».  
**H3:** elos = [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [descriminalização](${descrim}) · [risco](${risco}) · [verdade](${verdade}).  
**H4:** fecho = [Valeu !!!](${mantra}) com clareza de eixo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) | Antónimo (eixo lei) · gíria fica do outro lado |
| [Ilícito](${ilicito}) · [Proibição × proibicionismo](${proibicao}) | Polo e camada política |
| [Lei 11.343](${lei11343}) · [Porte × tráfico](${porteTrafico}) · [Descriminalização](${descrim}) | Mapa normativo BR |
| [Risco](${risco}) · [Verdade](${verdade}) · [Gesto](${gesto}) | Ofício sem confusão de eixos |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo da morfologia e da polissemia |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é consultoria jurídica nem interpretação oficial de leis.  
- Não classifica condutas penais concretas.  
- Não trata *ilegal* e *ilícito* como sinónimos exactos de ofício.  
- Não usa *ilegal* como rótulo da planta.

## Status

**Aprovado** — **ilegal** fichado: antónimo de [legal](${legal}) (eixo jurídico); contraste com [ilícito](${ilicito}); elos Lei 11.343 / descriminalização / risco / verdade; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Descriminalização](${descrim}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ilegal** — classical antonym of [legal](${legal}) on the **juridical** axis (contrary to law), formed by negative prefix **i- / in-** + *legal*. Covers **object**, **morphology**, useful contrast with [ilícito](${ilicito}), and [Valeu !!!](${mantra}). Links: [legal](${legal}), [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> Method note: [Wiktionary · ilegal](${wiki}), [illegal (EN)](${wikiEn}). Not legal advice.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **ilegal** |
| Etymon | Lat. *in-* (“not”) + *legālis* ← *lex* — high confidence |
| Lab type | Juridical × morphology × literacy |
| Links | [legal](${legal}) · [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [truth](${verdade}) · [risk](${risco}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses

Contrary to law · antonym of [legal](${legal}) (juridical axis only — **not** BR slang “cool”) · neighbor [ilícito](${ilicito}) (more formal register) · English *illegal* aligns on the juridical axis. Trap: collapsing plant / drug / crime under “it’s illegal.”

## 4. Purpose

Name what the law does not allow · separate maps · calculate [risk](${risco}) · refuse plant-as-label · close with [Valeu !!!](${mantra}).

## 5. Valeu !!!

Best possible **with the right tool** — unlawful when law; never as moral shortcut or antonym of slang “bacana.” Trap: “not legal (cool) → therefore ilegal (crime)” = false.

## Status

**Approved** — antonym of [legal](${legal}); contrast with [ilícito](${ilicito}); network linked; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Legal](${legal}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Truth](${verdade}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ilegal** — antónimo clásico de [legal](${legal}) en el eje **jurídico** (contrario a la ley), formado por el prefijo negativo **i- / in-** + *legal*. Cubre **objeto**, **morfología**, contraste con [ilícito](${ilicito}), y [¡Valeu !!!](${mantra}). Vínculos: [legal](${legal}), [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> Nota: [Wikcionario · ilegal](${wiki}), [illegal (EN)](${wikiEn}). No es dictamen jurídico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **ilegal** |
| Étimo | Lat. *in-* («no») + *legālis* ← *lex* |
| Tipo lab | Jurídico × morfología × literacia |
| Vínculos | [legal](${legal}) · [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [verdad](${verdade}) · [riesgo](${risco}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos

Contrario a la ley · antónimo de [legal](${legal}) (eje jurídico — **no** la jerga «bacán») · vecino [ilícito](${ilicito}) · inglés *illegal* alineado. Trampa: colapsar planta / droga / delito bajo «es ilegal».

## 4. Para qué sirve

Nombrar lo que la norma no permite · separar mapas · calcular [riesgo](${risco}) · negar la planta como rótulo · cerrar con [¡Valeu !!!](${mantra}).

## 5. ¡Valeu !!!

Lo mejor posible **con la herramienta correcta**. Trampa: «no es legal (bacán) → entonces es ilegal (crimen)» = falso.

## Estado

**Aprobada** — antónimo de [legal](${legal}); contraste con [ilícito](${ilicito}); red enlazada; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Legal](${legal}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Verdad](${verdade}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildIlegalPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildIlegalBodies();
  const order = Number(seriesOrder) || 118;
  return makePalavra({
    title:
      'Inspeção: Ilegal — antónimo de legal, ilícito e Valeu !!!',
    titleEn:
      'Inspection: Ilegal — antonym of legal, illicit, and Valeu !!!',
    titleEs:
      'Inspección: Ilegal — antónimo de legal, ilícito y ¡Valeu !!!',
    excerpt:
      'Palavras: «ilegal» (*in-* + *legālis*) — fora da lei; antónimo de legal (eixo jurídico, não a gíria); contraste com ilícito; elos Lei 11.343, risco e verdade.',
    excerptEn:
      'Words: “ilegal” (*in-* + *legālis*) — unlawful; antonym of legal (juridical axis, not slang); contrast with illicit; links Lei 11.343, risk and truth.',
    excerptEs:
      'Palabras: «ilegal» (*in-* + *legālis*) — fuera de la ley; antónimo de legal (eje jurídico, no jerga); contraste con ilícito; vínculos Lei 11.343, riesgo y verdad.',
    slug: 'inspecao-palavra-ilegal',
    date: '2026-08-04T18:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Ilegal · palavra',
    coverImage: '/imagens/inspecoes/ilegal-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIlegalPost,
  buildIlegalBodies
};
