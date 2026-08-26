'use strict';

/**
 * Inspeção Pessoas · homenagem a Robson Gonçalves de Oliveira e à família.
 * Elo: juntos / dois são mais fortes que um × Faça o seu melhor × Valeu !!!
 * Pessoa viva — honrar o ofício público; não inventar nomes nem intimidade.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function poemRobsonPt() {
  return `Não pedimos capa de jornal.
Pedimos só a casa que acorda
quando o turno ainda é noite
e o peito ainda cabe na palma.

Pai pedreiro.
Mãe de ofício doméstico.
Ceará no ABC.
Filhos na mesma mesa
que o treino das quatro da manhã.

Boston não inventou o homem.
Inventou a foto.
O ofício já era:
máquina, turno, estrada,
o melhor nesta mão.

Faltavam trezentos metros.
O cronómetro pedia recorde.
Um irmão de prova não se aguentava em pé.
Dois pararam.
Dois são mais fortes que um.

O tempo ficou em segundo plano.
A família ficou em primeiro —
a que veio,
a que espera em São Bernardo,
a que ele quer deixar de legado.

Valeu !!!

Não o melhor dos outros.
O teu.
O de hoje.
O que cabe nesta mão que carrega —
ainda nossa.`;
}

function poemRobsonEn() {
  return `We do not ask for a newspaper cover.
We ask only for the house that wakes
when the shift is still night
and the chest still fits in a palm.

A bricklayer father.
A mother of domestic craft.
Ceará in the ABC.
Children at the same table
as the four-a.m. training.

Boston did not invent the man.
It invented the photo.
The craft was already there:
machine, shift, road,
the best in this hand.

Three hundred metres left.
The watch asked for a record.
A brother of the race could not stand.
Two stopped.
Two are stronger than one.

Time fell to second place.
The family stayed first —
the one that came,
the one that waits in São Bernardo,
the one he wants to leave as legacy.

Valeu !!!

Not someone else’s best.
Yours.
Today’s.
What fits in this carrying hand —
still ours.`;
}

function poemRobsonEs() {
  return `No pedimos portada de periódico.
Pedimos solo la casa que despierta
cuando el turno todavía es noche
y el pecho aún cabe en la palma.

Padre albañil.
Madre de oficio doméstico.
Ceará en el ABC.
Hijos en la misma mesa
que el entrenamiento de las cuatro de la mañana.

Boston no inventó al hombre.
Inventó la foto.
El oficio ya era:
máquina, turno, camino,
lo mejor en esta mano.

Faltaban trescientos metros.
El cronómetro pedía récord.
Un hermano de prueba no se tenía en pie.
Dos pararon.
Dos son más fuertes que uno.

El tiempo quedó en segundo plano.
La familia quedó primero —
la que vino,
la que espera en São Bernardo,
la que él quiere dejar de legado.

¡Valeu !!!

No lo mejor de los otros.
Lo tuyo.
El de hoy.
Lo que cabe en esta mano que carga —
aún nuestro.`;
}

function buildRobsonOliveiraBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const self = '/posts/post-inspecao-figura-robson-oliveira.html';
  const poem = '/vida/#poema=dois-sao-mais-fortes';
  const vida = '/vida/';
  const g1 =
    'https://g1.globo.com/sp/sao-paulo/noticia/2026/04/22/brasileiro-de-sp-e-chamado-de-heroi-da-maratona-de-boston-ao-carregar-corredor-ate-reta-final-da-competicao-nos-eua.ghtml';
  const cnn =
    'https://www.cnnbrasil.com.br/esportes/outros-esportes/quem-e-o-brasileiro-que-virou-heroi-na-maratona-de-boston/';
  const folha =
    'https://www1.folha.uol.com.br/esporte/2026/05/heroi-improvavel-paulista-robson-de-oliveira-equilibra-exigencias-da-maratona-com-jornada-proletaria.shtml';
  const agencia =
    'https://agenciabrasil.ebc.com.br/esportes/noticia/2026-04/brasileiro-vira-manchete-por-ato-de-empatia-na-maratona-de-boston';
  const nbc =
    'https://www.nbcnews.com/sports/track-field/man-helped-competitor-boston-marathon-explains-rcna341852';
  const ig = 'https://www.instagram.com/oliveirarobson89';
  const juntos = '/posts/post-inspecao-palavra-juntos.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const amoVida = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Robson Gonçalves de Oliveira** (São Bernardo do Campo, ~1990) — maratonista amador, operador de máquinas, pai de família — e da **casa** que o torna possível: pais migrantes do Ceará, filhos, turnos na metalúrgica, treino às quatro da manhã. O recorte BudGanja **não** é capa de herói nem ranking de tempo: é a **pessoa e o ofício** — [gesto](${gesto}) de parar quando o outro cai — com elo principal em [juntos](${juntos}) («dois são mais fortes que um») e no mantra [Faça o seu melhor](${faca}) / [Valeu !!!](${mantra}). Poema Vida: [Dois são mais fortes](${poem}).

> **Nota metodológica:** auditoria independente. Fontes públicas: [G1](${g1}), [CNN Brasil](${cnn}), [Folha](${folha}), [Agência Brasil](${agencia}), [NBC](${nbc}), [Instagram](${ig}). **Pessoa viva:** honrar o que ele e a família **publicaram** (entrevistas, prova, ofício). **Não** inventar nomes de cônjuge ou filhos, **não** abrir intimidade médica, **não** transformar o colapso de Boston em espectáculo. Distinto do [Legado](${legado}) canábico. Sem afiliação à B.A.A., Scania ou marcas de corrida. **Ficha ≠ biografia fechada, ≠ protocolo clínico, ≠ culto de [ídolo](${idolo}).**

Pedido de campo: *Robson Corsuié maratonista* — a orelha ouviu **Gonçalves é**; a ficha ancora **Robson Gonçalves de Oliveira**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Robson Gonçalves de Oliveira** |
| Casa | São Bernardo do Campo (ABC paulista) |
| Ofícios | Operador de máquinas / técnico de produção (Senai) · maratonista amador · pai |
| Família (público) | Pais: pedreiro e trabalhadora doméstica, migração Ceará → ABC (anos 1970). Filhos — treino e turnos à volta da casa; legado que ele quer passar |
| Prova-âncora | Maratona de Boston, **20 abr. 2026** — com [Aaron Beggs](${nbc}) amparou **Ajay Haridasse** (~400 m da chegada) |
| Tempo Boston 2026 | **2h44min26s** (meta pessoal: baixar 2h40; recorde: 2h43min46s em Buenos Aires) |
| Frase-âncora | «Dois são mais fortes que um» · «o tempo fica em segundo plano» |
| Tipo BudGanja | Pessoa — ofício de casa × [juntos](${juntos}) × [Faça o seu melhor](${faca}) |
| Elo principal | [juntos](${juntos}) · [elo de ligação](${elo}) · poema [Dois são mais fortes](${poem}) |
| Elo Palavras / Expressões | [gesto](${gesto}) · [caminho](${caminho}) · [ação](${acao}) · [respeito](${respeito}) · [vida](${vidaPalavra}) · [eu amo a vida](${amoVida}) · [Valeu !!!](${mantra}) |
| Elo Pessoas (contraste) | [Ayrton Senna](${senna}) — excelência brasileira de ofício; **outra pista**, outro recorte |
| Fonte de partida | [G1 · herói de Boston](${g1}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Robson **não** é o recorde que quase veio — é o [gesto](${gesto}) de **parar** quando o [caminho](${caminho}) do outro treme.  
**H2:** «dois são mais fortes que um» é [juntos](${juntos}) com [elo](${elo}): sem o britânico, ele disse que talvez não conseguisse; o bem aqui é **par**, não pose de herói solo.  
**H3:** a homenagem à **família** é estrutural: a casa (pais, filhos, turnos) é o treino que a foto de Boston não inventou.  
**H4:** [Faça o seu melhor](${faca}) neste recorte **não** é o cronómetro — é o melhor **nesta mão**, hoje, quando a mão segura outra.  
**H5:** [risco](${risco}) da maratona é facto; a ficha lê **cuidado** e companhia, não culto do colapso.

Passos (variante «pessoa viva × casa × gesto»):

1. Pessoa, ofício e fontes jornalísticas.  
2. Nomear a **casa** só com o que é público.  
3. Extrair o método: parar, pedir força, aceitar o par.  
4. Elo obrigatório com [juntos](${juntos}) e [Faça o seu melhor](${faca}).  
5. Limite ético: honrar sem abrir intimidade.  
6. Status — homenagem completa ao que há de bom.

## Quem é (síntese verificável)

- Natural de São Bernardo do Campo; ~36 anos em 2026. Filho de pedreiro e de empregada doméstica que migraram do Ceará para o ABC nos anos 1970 ([Folha](${folha})).  
- Técnico de produção (Senai); opera máquinas numa indústria de motores / montagem de caminhões no ABC; turnos rotativos (manhã, tarde, noite) — treino às 4h quando o turno é de manhã.  
- Corre há cerca de 10 anos; primeira maratona em São Paulo (2019); cerca de dez maratonas até Boston 2026. Índice para Boston na Maratona do Rio (2024). Boston 2025: 2h45min49s. Recorde pessoal: Buenos Aires, 2h43min46s.  
- Pai: concilia fábrica, filhos e estrada; disse querer passar o legado da corrida como cuidado de saúde. O irmão, em entrevista, chamou-o de um dos mais generosos que conheceu ([Metrópoles](https://www.metropoles.com/sao-paulo/heroi-maratona-boston-paulista-prova) / família).  
- Boston, 20 abr. 2026: faltavam ~300–400 m; Ajay Haridasse (estudante, 21 anos) em colapso; Aaron Beggs (Irlanda do Norte) parou; Robson juntou-se. Tempo 2h44min26s. Voltou ao Brasil e foi direto ao turno.

## Tudo de bom (méritos BudGanja)

| Mérito | Leitura no laboratório |
|--------|------------------------|
| Parar no limite | O [gesto](${gesto}) que custa o recorde e salva o [caminho](${caminho}) do outro |
| Dois, não um | [Juntos](${juntos}) com [elo](${elo}) — ele pediu que alguém parasse; o par chegou |
| Tempo em segundo plano | [Faça o seu melhor](${faca}) **nesta mão**, não no ranking |
| Casa primeiro | Pais migrantes, filhos, turnos — o ofício **antes** da capa |
| Voltar ao turno | Excelência sem pedestal: o herói desembarca e bate ponto |
| Fé sem sermão | Pediu força a Deus e agradeceu o par — [respeito](${respeito}) à fala dele, sem catequese desta ficha |
| Legado aos filhos | Quer passar corrida como cuidado de [vida](${vidaPalavra}) — [eu amo a vida](${amoVida}) |
| Repetir o bem | Disse que já tinha parado noutra prova e que faria de novo |

## A família (homenagem, recorte público)

Esta ficha **honra a casa**, não a espiada:

| Elo da casa | O que a fonte pública permite dizer |
|-------------|-------------------------------------|
| Pais | Pedreiro e trabalhadora doméstica; Ceará → ABC — o chão de onde o ofício sobe |
| Filhos | Há filhos; o treino reorganiza-se para estar com eles; uma filha com deficiência auditiva foi referida em reportagem — a ficha lê **cuidado**, não diagnóstico de bancada |
| Irmão | Testemunho de generosidade de carácter |
| Turno | A metalúrgica não é obstáculo romântico: é o pão da casa e o horário do treino |

> Nomes de cônjuge e de crianças **não** entram. A homenagem é à **mesa**, não ao ficheiro.

## Boston, 20 de abril de 2026

| Peça | Nota |
|------|------|
| Meta | Baixar 2h40 — o melhor *dele* na distância |
| O que viu | Haridasse sem se aguentar em pé, Boylston à vista |
| O que fez | Pediu força; viu Beggs parar; juntou o braço |
| Frase | «Foi uma decisão de segundos» · «dois são mais fortes que apenas um» · «este é o espírito de Boston» |
| Tempo | 2h44min26s — ~40 s acima da meta de recorde |
| Depois | Exames da organização; avião; ponto na fábrica; plano 2027 para as 2h40 |

A cena viral **não** substitui o ofício de dez anos. A ficha recusa transformar o colapso em palco.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Juntos | Elo directo com [juntos](${juntos}) — estado, não slogan |
| Elo | [Elo de ligação](${elo}) — o anel que segura o par |
| Faça o melhor | [Mantra](${faca}) deslocado do cronómetro para a mão que carrega |
| Valeu !!! | [Fecho](${mantra}) da casa e da prova |
| Gesto | Parar = [gesto](${gesto}) treinado de carácter, não pose |
| Caminho | Ceará → ABC → Senai → fábrica → Boston = [caminho](${caminho}) |
| Ação | [Ação](${acao}) em segundos, sem comissão |
| Risco inspeccionado | Maratona desgasta; [risco](${risco}) lê-se **cuidado**, não desafio cego |
| Senna (contraste) | [Senna](${senna}) é excelência de elite; Robson é excelência de **CLT e casa** — as duas cabem no laboratório sem fundir |

## Elo com «juntos» e com a casa

| Camada | Ligação |
|--------|---------|
| Palavra | [juntos](${juntos}) — o estado que a foto mostra |
| Expressão | [elo de ligação](${elo}) · [Faça o seu melhor](${faca}) |
| Poesia Vida | [Dois são mais fortes](${poem}) |
| Vida | [Página Vida](${vida}) — ficar e cuidar |
| Fecho | [Valeu !!!](${mantra}) |

> Abrir primeiro [juntos](${juntos}) se o interesse for a **palavra**; [Faça o seu melhor](${faca}) se for o **mantra**; esta ficha se o interesse for a **pessoa e a família**.

## Limites (leitura responsável)

- Pessoa **viva**: a homenagem **não** autoriza stalking, dados de menores, endereço ou diagnóstico.  
- O colapso de Haridasse é facto da prova — **não** é conteúdo clínico nem meme.  
- Esta ficha **não** é ranking de maratonistas, protocolo de treino nem endosso de marca.  
- Distinto do [Legado](${legado}) canábico — aqui o ofício é empatia de estrada e casa de CLT.  
- Corte de orelha: pedido *Corsuié* **≠** outro atleta; ancora-se **Gonçalves de Oliveira**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}).  
- Tratar Robson no corpus como **homenagem de ofício, casa e gesto** — não como [ídolo](${idolo}) vazio.  
- O par Beggs + Oliveira ilustra [juntos](${juntos}) melhor do que qualquer slogan.

## Como repetir o método

1. Pessoa viva + fontes jornalísticas cruzadas.  
2. Extrair o **método** (como fez o bem), não só a viral.  
3. Honrar a **família** só com rasto público.  
4. Slug \`inspecao-figura-…\`.  
5. Declarar limites de intimidade.

## Status

**Aprovado na série Pessoas** — homenagem a Robson Gonçalves de Oliveira e à família: casa, turno, estrada e o gesto de Boston, com elo principal em [juntos](${juntos}) e [Faça o seu melhor](${faca}).

[▶ Pessoas](${hub}) · [▶ Juntos](${juntos}) · [▶ Faça o seu melhor](${faca}) · [▶ Poema](${poem}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra}) · [G1](${g1}) · [Instagram](${ig})
`;

  const contentEn = `## Scope

Homage and editorial inspection of **Robson Gonçalves de Oliveira** (São Bernardo do Campo) — amateur marathoner, machine operator, father — and the **house** that makes him possible. BudGanja focus: the **person and craft** — the [gesture](${gesto}) of stopping when another runner falls — with primary links to [juntos](${juntos}) (“two are stronger than one”) and [Faça o seu melhor](${faca}) / [Valeu !!!](${mantra}). Vida poem: [Two are stronger](${poem}).

> **Method note:** independent audit from [G1](${g1}), [CNN Brasil](${cnn}), [Folha](${folha}), [Agência Brasil](${agencia}), [NBC](${nbc}). **Living person:** honour what is public. Do **not** invent names of spouse or children. Distinct from cannabis Legacy.

Field request: *Robson Corsuié* — the ear heard **Gonçalves é**; this sheet anchors **Robson Gonçalves de Oliveira**.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Robson Gonçalves de Oliveira** |
| Home | São Bernardo do Campo (Greater São Paulo) |
| Crafts | Machine operator (Senai) · amateur marathoner · father |
| Family (public) | Parents: bricklayer and domestic worker, Ceará → ABC (1970s). Children — training around shifts |
| Anchor race | Boston Marathon, **20 Apr 2026** — with Aaron Beggs helped Ajay Haridasse |
| Time | **2:44:26** (goal sub-2:40; PR 2:43:46 Buenos Aires) |
| Lab type | Person — house × [juntos](${juntos}) × [do your best](${faca}) |
| Source | [G1](${g1}) |
| Date | ${inspected} |

## Hypotheses

**H1:** BudGanja value is the [gesture](${gesto}) of **stopping**, not the record that almost came.  
**H2:** “Two are stronger than one” is [juntos](${juntos}) with a [link](${elo}) — he said he might not have managed alone.  
**H3:** Homage to the **family** is structural: the house trained him before Boston.  
**H4:** [Do your best](${faca}) here is the best **in this hand**, when the hand holds another.

## Who he is (verifiable)

- From São Bernardo do Campo; about 36 in 2026. Parents migrated from Ceará in the 1970s.  
- Production technician; rotating factory shifts; trains at 4 a.m. when the morning shift hits.  
- Running ~10 years; first marathon São Paulo 2019; Boston index at Rio 2024; Boston 2025 2:45:49; PR Buenos Aires 2:43:46.  
- Father: wants to pass running as care for health.  
- Boston 2026: ~300–400 m left; Haridasse collapsing; Beggs stopped; Robson joined. Flew home and went straight to work.

## All the good

| Merit | Reading |
|-------|---------|
| Stop at the limit | Gesture that costs a PR and saves another’s path |
| Two, not one | [Juntos](${juntos}) with a ring — he asked for someone to stop |
| Time second | [Do your best](${faca}) in this hand, not the ranking |
| House first | Migrant parents, children, shifts — craft before the cover |
| Clock in at the plant | Excellence without a pedestal |

## Family (public cut)

Honour the **table**, not the file. Spouse and children’s **names** stay out. A daughter’s hearing disability appeared in reporting — this sheet reads **care**, not a bench diagnosis.

## Limits

- Living person: no stalking, no minors’ data, no medical protocol.  
- Haridasse’s collapse is race fact — not meme or clinic.  
- Not a training plan or brand endorsement.

## Status

**Approved in People series** — homage to Robson and his family; primary links [juntos](${juntos}) and [Faça o seu melhor](${faca}).

[▶ People](${hub}) · [▶ Juntos](${juntos}) · [▶ Poem](${poem}) · [▶ Valeu !!!](${mantra}) · [G1](${g1})
`;

  const contentEs = `## Alcance

Homenaje e inspección editorial de **Robson Gonçalves de Oliveira** (São Bernardo do Campo) — maratonista aficionado, operador de máquinas, padre — y de la **casa** que lo hace posible. Recorte BudGanja: la **persona y el oficio** — el [gesto](${gesto}) de parar cuando el otro cae — con vínculo principal en [juntos](${juntos}) («dos son más fuertes que uno») y [Faça o seu melhor](${faca}) / [¡Valeu !!!](${mantra}). Poema Vida: [Dos son más fuertes](${poem}).

> **Nota metodológica:** auditoría independiente con [G1](${g1}), [CNN Brasil](${cnn}), [Folha](${folha}), [Agência Brasil](${agencia}), [NBC](${nbc}). **Persona viva:** honrar lo público. **No** inventar nombres de cónyuge o hijos. Distinto del Legado cannábico.

Pedido de campo: *Robson Corsuié* — el oído oyó **Gonçalves é**; la ficha ancla **Robson Gonçalves de Oliveira**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Robson Gonçalves de Oliveira** |
| Casa | São Bernardo do Campo |
| Oficios | Operador de máquinas (Senai) · maratonista aficionado · padre |
| Familia (público) | Padres: albañil y trabajadora doméstica, Ceará → ABC (años 1970). Hijos — entrenamiento alrededor de turnos |
| Prueba | Maratón de Boston, **20 abr. 2026** — con Aaron Beggs amparó a Ajay Haridasse |
| Tiempo | **2:44:26** (meta sub-2:40; récord 2:43:46 Buenos Aires) |
| Tipo lab | Persona — casa × [juntos](${juntos}) × [haz lo mejor](${faca}) |
| Fuente | [G1](${g1}) |
| Fecha | ${inspected} |

## Hipótesis

**H1:** el valor es el [gesto](${gesto}) de **parar**, no el récord que casi llegó.  
**H2:** «dos son más fuertes que uno» es [juntos](${juntos}) con [eslabón](${elo}).  
**H3:** el homenaje a la **familia** es estructural.  
**H4:** [Haz lo mejor](${faca}) aquí es lo mejor **en esta mano**.

## Quién es (verificable)

- De São Bernardo do Campo; ~36 años en 2026. Padres migrantes de Ceará.  
- Técnico de producción; turnos rotativos; entrena a las 4 h.  
- Corre ~10 años; primera maratón São Paulo 2019; índice Boston en Río 2024.  
- Boston 2026: ~300–400 m; Haridasse en colapso; Beggs paró; Robson se unió. Volvió y fichó en la fábrica.

## Todo lo bueno

| Mérito | Lectura |
|--------|---------|
| Parar en el límite | Gesto que cuesta el récord y salva el camino del otro |
| Dos, no uno | [Juntos](${juntos}) con anillo |
| Tiempo segundo | [Haz lo mejor](${faca}) en esta mano |
| Casa primero | Oficio antes de la portada |

## Familia (recorte público)

Honrar la **mesa**, no el fichero. Los **nombres** de cónyuge e hijos no entran.

## Límites

- Persona viva: sin intimidad inventada ni datos de menores.  
- El colapso no es meme ni clínica.  
- No es plan de entrenamiento ni aval de marca.

## Estado

**Aprobado en serie Personas** — homenaje a Robson y a la familia; vínculos [juntos](${juntos}) y [Faça o seu melhor](${faca}).

[▶ Personas](${hub}) · [▶ Juntos](${juntos}) · [▶ Poema](${poem}) · [▶ ¡Valeu !!!](${mantra}) · [G1](${g1})
`;

  return { body, contentEn, contentEs, sourceUrl: g1 };
}

function buildRobsonOliveiraPost(seriesOrder) {
  const { body, contentEn, contentEs, sourceUrl } = buildRobsonOliveiraBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 30;
  return figuraPost({
    title:
      'Inspeção: Robson Oliveira — a casa, Boston e dois são mais fortes que um',
    titleEn:
      'Inspection: Robson Oliveira — the house, Boston and two are stronger than one',
    titleEs:
      'Inspección: Robson Oliveira — la casa, Boston y dos son más fuertes que uno',
    excerpt:
      'Pessoas: homenagem a Robson Gonçalves de Oliveira e à família — maratonista CLT de São Bernardo; o gesto de Boston (2026) e o elo juntos / Faça o seu melhor; Valeu !!!',
    excerptEn:
      'People: homage to Robson Gonçalves de Oliveira and his family — amateur marathoner from São Bernardo; the Boston 2026 gesture and the juntos / do-your-best link; Valeu !!!',
    excerptEs:
      'Personas: homenaje a Robson Gonçalves de Oliveira y a la familia — maratonista de São Bernardo; el gesto de Boston (2026) y el vínculo juntos / haz lo mejor; ¡Valeu !!!',
    slug: 'inspecao-figura-robson-oliveira',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Robson Oliveira · pessoa',
    coverImage: '/imagens/inspecoes/robson-oliveira-cover.jpg',
    sourceUrl,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRobsonOliveiraPost,
  buildRobsonOliveiraBodies,
  poemRobsonPt,
  poemRobsonEn,
  poemRobsonEs
};
