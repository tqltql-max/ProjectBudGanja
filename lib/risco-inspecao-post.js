'use strict';

/**
 * Inspeção Palavras · risco
 * Eixos: perigo calculado · risco gráfico · medo × método ·
 * Tamara / Amyr / Bom dia, Inverno · sinal · caminho · EXIT ·
 * Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildRiscoBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const solitario = '/posts/post-inspecao-palavra-solitario.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/risco';
  const wikiRiscar = 'https://pt.wiktionary.org/wiki/riscar';
  const wikiIt = 'https://en.wiktionary.org/wiki/rischio';
  const videoQa = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';

  const body = `## Escopo

Inspeção editorial da palavra **risco** — o nome do **perigo calculável** e, em paralelo ortográfico, do **traço gráfico** («fazer um risco»). No laboratório BudGanja, *risco* não é pose de coragem nem pânico: é **mapa do que pode falhar**, com método. Esta ficha cobre o **objeto**, as camadas (perigo × cálculo × traço × saúde/finanças), o contraste com [medo](${medo}), a rede com [sinal](${sinal}), [caminho](${caminho}), [EXIT](${exit}), [verdade](${verdade}) e o legado [Tamara](${tamara}) / [Amyr](${amyr}) / [*Bom dia, Inverno*](${bomDia}), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · risco](${wiki}), [riscar](${wikiRiscar}), [rischio (IT/EN)](${wikiIt}), [Q&A Tamara](${videoQa}), série [Palavras](${hub}). **Ficha ≠ avaliação actuarial, protocolo clínico nem manual de sobrevivência.** Tom: Inspetor BudGanja — nomear o risco com [verdade](${verdade}); [Amyr](${amyr}) planeia; [Tamara](${tamara}) assume o próprio. Catalogar ≠ vender livro; palavra ≠ biografia.

**Gatilho tipográfico:** *Risco* / *RISCO* → lema canónico **risco** (minúscula no Guia, maiúscula só em título).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **risco** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | (A) perigo: it. *risco* / *rischio* (via romance; hipóteses árabe/grega em debate) · (B) traço: *riscar* («fazer linha / risca») — **dois eixos semânticos** sob a mesma forma — confiança: **média–alta** (perigo); **alta** (traço ← *riscar*) |
| Família | *arriscar* · *arriscado* · *arriscar-se* · *riscar* · *riscado* · *correr risco* · *factor de risco* |
| Cognatos / paralelos | esp. *riesgo* · fr. *risque* · it. *rischio* · ing. *risk* · al. *Risiko* |
| Tipo BudGanja | Palavra — perigo calculado × traço × ofício |
| Elo peito | [medo](${medo}) · [verdade](${verdade}) · [alma](${alma}) · [respeito](${respeito}) |
| Elo mapa | [sinal](${sinal}) · [caminho](${caminho}) · [EXIT](${exit}) · [gesto](${gesto}) |
| Elo gelo / legado | [Tamara](${tamara}) · [Amyr](${amyr}) · [solitário](${solitario}) · [*Bom dia, Inverno*](${bomDia}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · risco](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **perigo com contorno** — o que se pode medir, planear ou assumir — e, noutra camada viva, o **risco** como linha no papel. No lab: separar **cálculo** de **pânico**, e **traço gráfico** de **ameaça**.

## 2. Hipóteses e método

**H1:** *risco* (perigo) chega ao PT via romance (it. *rischio* / esp. *riesgo*); o étimo remoto tem **debate** — registar dúvida, não fingir consenso.  
**H2:** *risco* (traço) vive com *riscar* — «fazer um risco» = marcar linha; eixo **distinto** do perigo, útil no ofício (riscar o mapa, riscar o que não serve).  
**H3:** no BudGanja, *risco* = **perigo com método**: [Amyr](${amyr}) planeia; [Tamara](${tamara}) assume o próprio — elo vivo em [*Bom dia, Inverno*](${bomDia}).  
**H4:** [medo](${medo}) é afecto; *risco* é **mapa**. Confundi-los gera pose ou paralisia.  
**H5:** fecho = ler o [sinal](${sinal}), calcular o risco, escolher [gesto](${gesto}) / [EXIT](${exit}) com [verdade](${verdade}) — [Valeu !!!](${mantra}).

Passos:

1. Fixar forma + dois eixos (perigo / traço).  
2. Tabela de camadas sem fundir.  
3. Contraste *risco* × [medo](${medo}) × *perigo*.  
4. Rede Tamara / lab com URLs reais.  
5. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| It. *risco* / *rischio* → PT *risco* | Perigo / aventura calculada (via romance) | Alta (via); média (étimo remoto) |
| Esp. *riesgo* / fr. *risque* / ing. *risk* | Família europeia moderna do «risk» | Alta (paralelos) |
| Étimo remoto (árabe *rizq*, gr. *rhíza*, etc.) | Hipóteses em disputa nos dicionários | Baixa–média — **não fechar** |
| *riscar* → *risco* (traço) | Linha, risca, marca no suporte | Alta (uso e morfologia) |

**Veredicto etimológico:** forma PT estável; **dois núcleos semânticos** (perigo × traço). Para o perigo, a via romance é clara; a raiz última fica **aberta**. No lab, o ofício não depende de fechar o debate — depende de **nomear o perigo com método**.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Perigo calculado | correr risco; risco calculado | Núcleo do ofício — mapa, não pose |
| Probabilidade / saúde | factor de risco; risco relativo | Registo técnico vizinho — não monografar clínica |
| Finanças / seguro | risco de crédito; prémio de risco | Outro registo — literacia, não consultoria |
| Traço gráfico | fazer um risco; risco a lápis | Eixo *riscar* — marcar / apagar |
| Legado gelo | travessia; invernagem | [Amyr](${amyr}) planeia; [Tamara](${tamara}) assume |
| Ofício lab | ler [sinal](${sinal}) → medir risco → [gesto](${gesto}) | Método BudGanja |

## 5. Risco × medo × perigo × sinal

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **risco** | Perigo **com contorno** (e/ou traço) | Calculável; nomeável; planável |
| **[medo](${medo})** | Afecto de protecção / alarme | Sente-se; não substitui o mapa |
| **perigo** | Ameaça mais «nua» | Pode ser imediato; *risco* insiste no cálculo |
| **[sinal](${sinal})** | Marca / aviso | O indício que pede medir o risco |
| **[EXIT](${exit})** | Saída do aperto | Quando o risco pede sair, não fingir |
| **[caminho](${caminho})** | Via | Onde o risco se percorre com [gesto](${gesto}) |
| **[verdade](${verdade})** | Nomear sem pose | Risco mentido = armadilha |

**Anti-armadilha:** «não tenho medo = não há risco» = falso. Outra: romantizar o risco (heroísmo vazio) ou negar o risco (cego). Outra: confundir *risco* gráfico com ameaça — às vezes riscar o mapa **é** o método.

**Leitura Tamara / Amyr:** Amyr = planeamento do risco; Tamara = **assumir o próprio** no gelo ([solitário](${solitario}), invernagem) — sem romantizar isolamento.

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Medo](${medo}) · [Verdade](${verdade}) | Afecto × nomeação |
| [Sinal](${sinal}) · [Gesto](${gesto}) | Aviso e acto mínimo |
| [Caminho](${caminho}) · [EXIT](${exit}) | Via e saída |
| [Tamara](${tamara}) · [Amyr](${amyr}) · [solitário](${solitario}) | Legado do risco com método |
| [*Bom dia, Inverno*](${bomDia}) · [Q&A](${videoQa}) | Obra e fala âncora |
| [Alma](${alma}) · [Vida](${vidaPalavra}) · [respeito](${respeito}) | Peito e ética |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |
| Hub [Palavras](${hub}) · [Inspeções](${hubAll}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha).  
2. Separar: perigo calculado · traço · registo técnico.  
3. Se for afecto, cruzar [medo](${medo}) — sem fundir.  
4. Se for aviso, cruzar [sinal](${sinal}); se for saída, [EXIT](${exit}).  
5. Se for gelo / legado, cruzar [Tamara](${tamara}) / [*Bom dia, Inverno*](${bomDia}).  
6. Fechar com [Valeu !!!](${mantra}) — e voltar ao [hub](${hubAll}).

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com o risco à vista**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se arrisquei e deu certo, era destino» = falso · sorte ≠ método |
| Anti-armadilha 2 | «Zero risco» como religião = falso · ofício mede, não apaga o mundo |
| Par de método | [Sinal](${sinal}) · [medo](${medo}) · [verdade](${verdade}) · [gesto](${gesto}) |
| Solo | [Língua portuguesa](${lingua}) · [Guia](${guia}) · [caminho](${caminho}) |

**Veredicto:** Valeu !!! **com o risco nomeado** — calcular, assumir ou sair. Risco sem [verdade](${verdade}) = bluff; risco com ofício = mapa curto para o próximo [gesto](${gesto}).

## 8. Avaliação BudGanja

### Forças

- Documenta dois eixos (perigo × traço) sem forçar étimo remoto fechado.  
- Separa *risco* de [medo](${medo}) e liga [sinal](${sinal}) / [EXIT](${exit}).  
- Mantém o elo vivo Tamara / Amyr / [*Bom dia, Inverno*](${bomDia}).

### Limites

- Não é tabela actuarial, score clínico nem protocolo de segurança industrial.  
- Hipóteses etimológicas remotas ficam **abertas** — sem folklore de certeza.  
- Casos de risco grave (saúde, violência, crise) pedem apoio especializado — fora do escopo da ficha.

## 9. Como repetir o método

1. Fixar forma + eixos (perigo / traço).  
2. Tabela de camadas sem fundir.  
3. Um contraste afectivo ([medo](${medo})) + um elo de mapa ([sinal](${sinal})).  
4. Declaração: palavra ≠ biografia / ≠ manual de sobrevivência.  
5. Status.

## Status

**Aprovado** — **risco** fichado: eixos (perigo calculado × traço), contraste com [medo](${medo}), rede [sinal](${sinal}) · [caminho](${caminho}) · [EXIT](${exit}) · [verdade](${verdade}), legado [Tamara](${tamara}) / [Amyr](${amyr}) / [*Bom dia, Inverno*](${bomDia}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Medo](${medo}) · [▶ Sinal](${sinal}) · [▶ Tamara](${tamara}) · [▶ Bom dia, Inverno](${bomDia}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **risco** (“risk”) — **calculable danger** and, in a parallel sense, the **graphic stroke** (“fazer um risco”). In the BudGanja lab, risk is not bravado or panic: it is a **map of what can fail**, with method. Links [medo](${medo}), [sinal](${sinal}), [caminho](${caminho}), [EXIT](${exit}), [verdade](${verdade}), [Tamara](${tamara}) / [Amyr](${amyr}) / [*Bom dia, Inverno*](${bomDia}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · risco](${wiki}), [rischio](${wikiIt}), [Tamara Q&A](${videoQa}). Word sheet ≠ actuarial table or clinical protocol. Amyr plans; Tamara owns her own.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **risco** |
| Etymon | (A) danger via Romance (It. *rischio*; remote root debated) · (B) stroke via *riscar* — high for stroke; mid–high for danger path |
| Lab type | Calculated danger × stroke × craft |
| Links | [medo](${medo}) · [sinal](${sinal}) · [EXIT](${exit}) · [Tamara](${tamara}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Layers

**Calculated danger** · health/finance registers · **graphic stroke** (*riscar*) · ice legacy (Amyr plans; Tamara owns) · lab craft: read [sinal](${sinal}) → measure risk → [gesto](${gesto}) / [EXIT](${exit}).

## 3. Risk × fear

[Medo](${medo}) = feeling; *risco* = map. Confusing them yields pose or paralysis. Anti-trap: “no fear = no risk” is false.

## 4. Valeu !!!

Best possible **with risk in view**, today — calculate, own, or exit. Risk without [verdade](${verdade}) = bluff; risk with craft = a short map for the next step.

## Status

**Approved** — axes mapped · fear contrast · Tamara/Amyr link · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Medo](${medo}) · [▶ Sinal](${sinal}) · [▶ Tamara](${tamara}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **risco** («riesgo») — **peligro calculable** y, en paralelo, el **trazo gráfico** («fazer um risco»). En el lab BudGanja, el riesgo no es pose ni pánico: es **mapa de lo que puede fallar**, con método. Vínculos [medo](${medo}), [sinal](${sinal}), [caminho](${caminho}), [EXIT](${exit}), [verdade](${verdade}), [Tamara](${tamara}) / [Amyr](${amyr}) / [*Bom dia, Inverno*](${bomDia}), y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · risco](${wiki}), [rischio](${wikiIt}), [Q&A Tamara](${videoQa}). Ficha ≠ tabla actuarial ni protocolo clínico. Amyr planifica; Tamara asume el suyo.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **risco** |
| Étimo | (A) peligro vía romance (it. *rischio*; raíz remota en debate) · (B) trazo vía *riscar* |
| Tipo lab | Peligro calculado × trazo × oficio |
| Vínculos | [medo](${medo}) · [sinal](${sinal}) · [EXIT](${exit}) · [Tamara](${tamara}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Capas

**Peligro calculado** · registros salud/finanzas · **trazo** (*riscar*) · legado del hielo · oficio: leer [sinal](${sinal}) → medir riesgo → [gesto](${gesto}) / [EXIT](${exit}).

## 3. Riesgo × miedo

[Medo](${medo}) = afecto; *risco* = mapa. Anti-trampa: «sin miedo = sin riesgo» es falso.

## 4. ¡Valeu !!!

Lo mejor posible **con el riesgo a la vista**, hoy — calcular, asumir o salir. Riesgo sin [verdade](${verdade}) = farol; riesgo con oficio = mapa corto.

## Estado

**Aprobada** — ejes · contraste con miedo · vínculo Tamara/Amyr · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Medo](${medo}) · [▶ Sinal](${sinal}) · [▶ Tamara](${tamara}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRiscoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildRiscoBodies();
  const order = Number(seriesOrder) || 59;
  return makePalavra({
    title: 'Inspeção: Risco — perigo calculado, traço e ofício',
    titleEn: 'Inspection: Risco — calculated danger, stroke and craft',
    titleEs: 'Inspección: Risco — peligro calculado, trazo y oficio',
    excerpt:
      'Palavras: «risco» — perigo calculado × traço (*riscar*); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
    excerptEn:
      'Words: “risco” — calculated danger × stroke (*riscar*); links medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
    excerptEs:
      'Palabras: «risco» — peligro calculado × trazo (*riscar*); vínculos medo, sinal, caminho, EXIT, Tamara/Amyr; ¡Valeu !!!',
    slug: 'inspecao-palavra-risco',
    date: '2026-08-04T15:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Risco · palavra',
    coverImage: '/imagens/inspecoes/risco-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRiscoPost,
  buildRiscoBodies
};
