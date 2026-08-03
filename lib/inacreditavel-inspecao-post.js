'use strict';

/**
 * Inspeção Palavras · inacreditável
 * Eixos: in- + acreditável (← credere) · incredulidade literal × elogio BR ·
 * escala com incrível / fabuloso / genial · Faça o melhor!
 * Gatilho tipográfico: ianfreditala → inacreditável
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildInacreditavelBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/inacredit%C3%A1vel';
  const wikiAcreditar = 'https://pt.wiktionary.org/wiki/acreditar';
  const wikiCredere = 'https://en.wiktionary.org/wiki/credere';

  const body = `## Escopo

Inspeção editorial da palavra **inacreditável** — adjetivo (e sopro de elogio no português do Brasil) formado por **in-** + **acreditável**: o que **não se pode acreditar**. No uso vivo BR, a mesma forma serve **dois ofícios**: (1) marcar o **além da crença** (facto / feito difícil de aceitar); (2) elogiar no topo da escala («que inacreditável!» ≈ uau / beyond belief). Irmão lexical de [incrível](${incrivel}) (*incredibilis*). Esta ficha cobre o **objeto**, os **sentidos**, a **escala de louvor** com fichas existentes ([legal](${legal}), [especial](${especial}), [genial](${genial}), [incrível](${incrivel}), [fabuloso](${fabuloso})), e o fecho [Faça o melhor!](${mantra}). Gatilho tipográfico: *ianfreditala* → **inacreditável**. Tom: **calor + precisão**, não sermão.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · inacreditável](${wiki}), [acreditar](${wikiAcreditar}), [credere](${wikiCredere}), ficha irmã [incrível](${incrivel}), uso oral BR. **Ficha ≠ culto do «impossível» nem guia de autoajuda.** Sem afiliação comercial. (*maravilhoso* / *fantástico* — citar só quando houver ficha.)

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **inacreditável** |
| Classe | Adjetivo (também interjeição informal: «inacreditável!») |
| Étimo (trabalho) | Prefixo *in-* («não») + *acreditável* ← *acreditar* ← lat. *credere* («crer, confiar») — confiança: **alta** |
| Família | *acreditar* · *crédito* · *crédulo* · *inacreditavelmente* · [incrível](${incrivel}) · fr. *incroyable* · esp. *increíble* · ing. *unbelievable* / *incredible* |
| Cognatos de eixo | *incredibilis* (via [incrível](${incrivel})) · *unbelievable* (EN) |
| Tipo BudGanja | Palavra — incredulidade literal × elogio BR «beyond belief» × ofício |
| Elo elogio | [legal](${legal}) (gíria «bacana») · [especial](${especial}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [incrível](${incrivel}) · **inacreditável** (topo / além da crença) |
| Elo assombro | [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) |
| Elo contraste | [aff](${aff}) — enfado (polo oposto do peito) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · inacreditável](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que diz «isto **não cabe** no acreditável» — e, no BR vivo, também «isto **abriu o peito** além do crível» («inacreditável!» como louvor máximo). No BudGanja: celebra o feito **com** o método à vista.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *credere* | Crer, confiar | Alta |
| PT *acreditar* / *acreditável* | Digno de crédito / que se pode crer | Alta |
| Prefixo *in-* + adj. | Negação → **não acreditável** | Alta |
| Literal / incredulidade | «É inacreditável que…» — facto difícil de aceitar | Alta |
| Elogio BR oral | «Que inacreditável!» ≈ beyond belief / uau alto | Alta (uso vivo) |
| Par com [incrível](${incrivel}) | Quase sinónimos afectivos; *inacreditável* soa um grau mais «cheio» / analítico | Média–alta (mapa lab) |
| Ofício lab | Elogio depois do [gesto](${gesto}) rastreável | Média–alta (mapa BudGanja) |
| Risco de diluição | Tudo «inacreditável» = nada inacreditável | Alta (ofício) |

**H1:** *inacreditável* nasce no **não-acreditável** (*in-* + *acreditável* ← *credere*) — o chão etimológico é a incredulidade.  
**H2:** no BR, o sentido **elogio** («que inacreditável!») é expansão afectiva estável — praise *and* literal «beyond belief».  
**H3:** no lab, «inacreditável» **bom** = celebra o feito com [verdade](${verdade}); **mau** = flattery que fecha a ficha sem relatório.

## 3. Escala de intensidade (oralidade BR)

Mapa aproximado do peito — não ranking moral. Só fichas existentes:

| Intensidade | Palavra / sopro | O que marca | Elo |
|-------------|-----------------|-------------|-----|
| Baixa / peso | [aff](${aff}) | Enfado, decepção, «já chega» | Contraste |
| Média / aprovação | [legal](${legal}) (gíria) | «Bacana / ok / massa» — elogio leve | Escada BR |
| Média+ / particular | [especial](${especial}) | Destaque sem necessariamente «uau» | Irmão |
| Média+ / engenho | [genial](${genial}) | Ideia ou feito que **acertou o engenho** | Irmão de elogio |
| Alta / conto | [fabuloso](${fabuloso}) | Louvor com matiz de maravilha / fábula | Escada |
| Alta / assombro | [incrível](${incrivel}) | Incredulidade × elogio «uau» | Irmão etimológico |
| Muito alta / além | **inacreditável** | Beyond belief — peito no teto | Esta ficha |
| Alta / exclamação | [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) | Assombro / afeto em sopro colado | Expressões |

**Leitura da escala:** [aff](${aff}) fecha; [legal](${legal}) (gíria) aprova com leveza; [genial](${genial}) aponta o **engenho**; [incrível](${incrivel}) e **inacreditável** apontam o **além do crível** (elogio ou espanto). Podem coexistir («genial e inacreditável») — não são rivais. (*maravilhoso* / *fantástico* entram na escala quando tiverem ficha.)

**Veredicto escala:** escolher a palavra com [verdade](${verdade}) — hipérbole gentil ok; elogio vazio que dispensa inspeção = ressalva.

## 4. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Literal / incredulidade** | «É inacreditável que ainda falte ficha» | Bom: nomear o espanto · Mau: negar o facto |
| **Elogio afectivo** | «Que inacreditável ficou!» | Bom: calor com objecto · Mau: bajulação sem [gesto](${gesto}) |
| **Obra / feito** | Ficha, verso, cultivo que «não cabe na cabeça» | Bom: [criatividade](${criatividade}) · Mau: culto sem método |
| **Hipérbole quotidiana** | «Trânsito inacreditável» | Bom: humor / grau · Mau: esvaziar a palavra |
| **Par com incrível** | Quase sinónimos; escolher o tom | Bom: [incrível](${incrivel}) · Mau: fingir diferença sem [verdade](${verdade}) |
| **Assombro colado** | Peito alto em sopro | Bom: [meudeusdoceu](${meudeusdoceu}) · Mau: negar o [aff](${aff}) quando ele chega |

## 5. Para que serve · Faça o melhor!

| Finalidade | Leitura |
|------------|---------|
| **Nomear o além da crença** | Sem vergonha de admirar ou de espantar-se |
| **Aquecer o ofício** | Elogio que aponta o feito, não a vaidade |
| **Separar calor de flattery** | Inacreditável **com** relatório ≠ atalho |
| **Voltar ao acto** | Depois do «não acredito», o próximo [gesto](${gesto}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, mesmo quando o peito está no teto |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Já é inacreditável, não preciso inspecionar» = falso |
| Termómetros | [aff](${aff}) · [legal](${legal}) · [genial](${genial}) · [incrível](${incrivel}) · [fabuloso](${fabuloso}) · [meudeusdoceu](${meudeusdoceu}) |

**Veredicto:** Faça o melhor **com o inacreditável** — deixar o peito abrir (praise / beyond belief), creditando o feito; depois continuar o ofício. Inacreditável sem [caminho](${caminho}) = pose; inacreditável com método = lareira de admiração.

## Hipóteses (síntese)

**H1:** objeto = *in-* + *acreditável* ← *credere* → **inacreditável** (não acreditável).  
**H2:** usos = incredulidade literal · elogio BR «beyond belief» · hipérbole · ofício.  
**H3:** escala = [aff](${aff}) ← → [legal](${legal}) ← → [especial](${especial}) / [genial](${genial}) ← → [fabuloso](${fabuloso}) / [incrível](${incrivel}) ← → **inacreditável**.  
**H4:** fecho = [Faça o melhor!](${mantra}) depois do «não acredito».

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Incrível](${incrivel}) · [Fabuloso](${fabuloso}) · [Genial](${genial}) · [Legal](${legal}) · [Especial](${especial}) · [Aff](${aff}) | Escala de elogio × enfado |
| [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) | Peito que abre em sopro |
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Criatividade](${criatividade}) | Ofício sob o elogio |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo BR |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Depois do assombro |

## Limites

- Não exige milagre nem fé para usar a palavra.  
- Não romantiza hipérbole vazia («tudo é inacreditável») como método.  
- Escala oral = mapa de laboratório, não dicionário normativo fechado.  
- *ianfreditala* = gatilho tipográfico desta ficha; não é étimo.

## Status

**Aprovado** — **inacreditável** fichado: *in-* + *acreditável* → incredulidade × elogio BR; escala com [incrível](${incrivel}) / [fabuloso](${fabuloso}) / [genial](${genial}); elo [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Incrível](${incrivel}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **inacreditável** — adjective and BR praise from **in-** + **acreditável** (*credere*): literally “unbelievable / beyond belief,” and orally a top-tier “wow.” Sister sheet: [incrível](${incrivel}). Covers **object**, **senses**, an **intensity scale** with [legal](${legal}), [genial](${genial}), [fabuloso](${fabuloso}) and [incrível](${incrivel}), and [Do your best!](${mantra}). Typo trigger: *ianfreditala* → **inacreditável**.

> Method note: [Wiktionary · inacreditável](${wiki}), [acreditar](${wikiAcreditar}). Not miracle cult or self-help.

## Object

| Field | Value |
|-------|-------|
| Word | **inacreditável** |
| Etymon | *in-* + *acreditável* ← *acreditar* ← Lat. *credere* |
| Links | [incrível](${incrivel}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [aff](${aff}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Senses

Literal unbelief (“it’s unbelievable that…”) · everyday BR praise (“how unbelievable!”) · affective hyperbole · lab praise after a traceable [gesture](${gesto}).

## Intensity scale

[aff](${aff}) ← → [legal](${legal}) ← → [genial](${genial}) ← → [fabuloso](${fabuloso}) / [incrível](${incrivel}) ← → **inacreditável** (beyond belief). Choose with [truth](${verdade}).

## Do your best!

After the “I can’t believe it,” keep the craft — [Do your best!](${mantra}). Unbelievable without [path](${caminho}) = pose; with method = lasting admiration.

## Status

**Approved** — *in-* + *acreditável*; unbelief × BR praise; scale linked; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Incrível](${incrivel}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **inacreditável** — adjetivo y elogio BR desde **in-** + **acreditável** (*credere*): literalmente «increíble / más allá de lo creíble», y en el habla un «guau» alto. Hermana: [incrível](${incrivel}). Cubre **objeto**, **sentidos**, una **escala** con [legal](${legal}), [genial](${genial}), [fabuloso](${fabuloso}) e [incrível](${incrivel}), y [¡Haz lo mejor!](${mantra}). Gatillo tipográfico: *ianfreditala* → **inacreditável**.

> Nota: [Wikcionario · inacreditável](${wiki}), [acreditar](${wikiAcreditar}). No es culto del milagro.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **inacreditável** |
| Étimo | *in-* + *acreditável* ← *acreditar* ← lat. *credere* |
| Vínculos | [incrível](${incrivel}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [aff](${aff}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Sentidos

Incredulidad literal · elogio cotidiano BR («¡qué inacreditável!») · hipérbole afectiva · elogio de lab tras un [gesto](${gesto}) rastreable.

## Escala

[aff](${aff}) ← → [legal](${legal}) ← → [genial](${genial}) ← → [fabuloso](${fabuloso}) / [incrível](${incrivel}) ← → **inacreditável**. Elegir con [verdad](${verdade}).

## ¡Haz lo mejor!

Después del «no lo creo», seguir el oficio — [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — *in-* + *acreditável*; incredulidad × elogio BR; escala enlazada; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Incrível](${incrivel}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildInacreditavelPost() {
  const { body, contentEn, contentEs, wiki } = buildInacreditavelBodies();
  return makePalavra({
    title:
      'Inspeção: Inacreditável — beyond belief, elogio BR e Faça o melhor!',
    titleEn:
      'Inspection: Inacreditável — beyond belief, BR praise and Do your best!',
    titleEs:
      'Inspección: Inacreditável — más allá de lo creíble, elogio BR y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «inacreditável» (in- + acreditável ← credere) — incredulidade e elogio BR «beyond belief»; escala com incrível, fabuloso e genial; Faça o melhor!',
    excerptEn:
      'Words: “inacreditável” (in- + acreditável ← credere) — unbelief and BR praise “beyond belief”; scale with incrível, fabuloso and genial; Do your best!',
    excerptEs:
      'Palabras: «inacreditável» (in- + acreditável ← credere) — incredulidad y elogio BR «beyond belief»; escala con incrível, fabuloso y genial; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-inacreditavel',
    date: '2026-08-03T23:45:00.000Z',
    seriesOrder: 64,
    seriesLabel: 'Inacreditável · palavra',
    coverImage: '/imagens/inspecoes/inacreditavel-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInacreditavelPost,
  buildInacreditavelBodies
};
