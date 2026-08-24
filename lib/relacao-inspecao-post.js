'use strict';

/**
 * Inspeção Palavras · relação
 * Eixos: objeto (lat. relatĭō) · vínculo × relato × proporção ·
 * variação verbal: cruzar (pôr A e B no entre) ·
 * simbiose × respeito × gesto · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildRelacaoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-relacao.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const patrao = '/posts/post-inspecao-palavra-patrao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const revoada = '/posts/post-inspecao-expressao-revoada.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const voar = '/posts/post-inspecao-palavra-voar.html';
  const wiki = 'https://pt.wiktionary.org/wiki/rela%C3%A7%C3%A3o';
  const wikiVerb = 'https://pt.wiktionary.org/wiki/relacionar';
  const wikiLat = 'https://en.wiktionary.org/wiki/relatio';
  const wikiCruzar = 'https://pt.wiktionary.org/wiki/cruzar';
  const wikiCruz = 'https://pt.wiktionary.org/wiki/cruz';
  const wikiSinal = 'https://pt.wikipedia.org/wiki/Sinal_da_cruz';

  const body = `## Escopo

Inspeção editorial da palavra **[relação](${self})** — o nome do **vínculo** entre coisas ou pessoas, do **relato** (levar de volta o que se viu), e da **proporção** (razão matemática). Do latim *relatĭō* ← *relātus* (*referre* = *re-* + *ferre*, «trazer de volta / reportar»). Pedido de campo: **voltar a relação**; **«cruzar» fica como variação**. Esta ficha cobre o **objeto**, a variação verbal **cruzar**, as camadas (vínculo × relato × proporção × peito), a rede com [simbiose](${simbiose}), [respeito](${respeito}) e [gesto](${gesto}), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · relação](${wiki}), [relacionar](${wikiVerb}), [relatio (EN)](${wikiLat}), [cruzar](${wikiCruzar}), [cruz](${wikiCruz}), [sinal da cruz](${wikiSinal}). **Ficha ≠ terapia de casal, ≠ tratado de conjuntos, ≠ teologia, ≠ grimório de sorte.** Tom: Inspetor BudGanja — *relação* nomeia o **entre**; *cruzar* é o **verbo** que põe A e B nesse entre, sem fundir. Ofício = ver o vínculo com [verdade](${verdade}) e [respeito](${respeito}).

**Gatilho tipográfico:** *relacao* / *Relacao* → **relação**. *cruzar* nesta ficha = variação — **não** abre lema próprio.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **relação** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | latim *relatĭō*, *-ōnis* ← *relātus* (pp. de *referre*: *re-* + *ferre*, «trazer de volta, reportar») — confiança: **alta** |
| Família | *relacionar* · *relacionamento* · *relacional* · *relato* · *relatar* · *em relação a* |
| Variação de ofício | **cruzar** — verbo que põe A e B no entre (irmãs de **uso**, não de raiz) |
| Cognatos / paralelos | esp. *relación* · fr. *relation* · it. *relazione* · ing. *relation* / *relationship* · lat. *relatĭō* |
| Tipo BudGanja | Palavra — vínculo × relato × proporção × peito × variação *cruzar* |
| Elo peito | [respeito](${respeito}) · [verdade](${verdade}) · [alma](${alma}) · [gesto](${gesto}) |
| Elo rede | [simbiose](${simbiose}) · [caminho](${caminho}) · [mensagem](${mensagem}) · [patrão](${patrao}) · [elo de ligação](/posts/post-inspecao-expressao-elo-de-ligacao.html) |
| Elo tempo / vida | [vida](${vidaPalavra}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · relação](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **entre** — o que liga A e B (pessoas, factos, números). No lab: separar **vínculo humano**, **relato/relatório**, **proporção** e **eufemismo íntimo**; nenhum eixo apaga os outros.

## 2. Hipóteses e método

**H1:** objeto = *relatĭō* → *relação* (romance; alta confiança).  
**H2:** o étimo aponta primeiro para **reportar / trazer de volta** — o vínculo social e a proporção matemática são expansões semânticas.  
**H3:** no BR vivo, *relação* cobre namoro, trabalho, «em relação a», relatório e «relação sexual»; o ofício é **nomear qual camada** está em jogo.  
**H4:** **cruzar** é variação **funcional** de [relação](${self}) — o verbo do entre («cruzar A com B» = relacionar sem fundir). Étimo outro: lat. *crux* ≠ *referre*. Como [Boa!!!](/posts/post-inspecao-palavra-boa.html) anda ao lado de [Valeu !!!](${mantra}): mesmo ofício, outra raiz.  
**H5:** fecho = [respeito](${respeito}) + [gesto](${gesto}) + [faça o melhor](${faca}) / [Valeu !!!](${mantra}) — cuidar do entre sem pose.

Passos:

1. Fixar forma + étimo (*re-* + *ferre* → *relatĭō*).  
2. Tabela de camadas (vínculo / relato / proporção / peito).  
3. Contraste *relação* × [simbiose](${simbiose}) × [respeito](${respeito}).  
4. Rede BudGanja com URLs reais.  
5. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *relatĭō* | Acto de reportar / o que se traz de volta (*referre*) | Alta |
| Morfologia PT | *-ção* nomeia acto / efeito / estado | Alta |
| Expansão «vínculo» | Do relato → ligação entre termos / pessoas | Alta |
| Expansão matemática | *relação* = razão / proporção entre quantidades | Alta |

**Veredicto etimológico:** origem **latina clara** (*relatĭō*); o núcleo antigo é **reportar**; o português vive sobretudo no **vínculo** e no **«em relação a»**.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Vínculo humano | relação de amizade, de trabalho, amorosa | O **entre** — [respeito](${respeito}) e [gesto](${gesto}) |
| Relato / relatório | relação de factos; fazer a relação | Eco do étimo — [mensagem](${mensagem}) / [verdade](${verdade}) |
| Proporção / razão | relação 2:1; relação causa-efeito | Ligação lógica — não é só peito |
| Locução | em relação a; no que diz respeito a | Âmbito / enquadramento |
| Íntimo / eufemismo | relação sexual | Camada real — sem prurido nem glamour |
| Poder / hierarquia | relação com o [patrão](${patrao}) | Vínculo nomeável — não destino |
| Biologia / metáfora | [simbiose](${simbiose}) | Relação de coabitação — caso especial |
| Animal / bando | [revoada](${revoada}) | O entre do [animal](${animal}) pássaro / Birds no [gesto](${gesto}) de [voar](${voar}) |

### Relação animal — pássaro / Birds / gesto de voar

Pedido de campo: *relação com animal pássaro Birds gesto de voar*. O nome vivo desse **entre** é **[Revoada](${revoada})**: vários corpos, o mesmo [gesto](${gesto}), o céu a abrir-se ao mesmo tempo. Um pássaro voa; a revoada **relaciona**. Ficha de palavra aqui; ficha de expressão lá. [Animal](${animal}) ≠ mascote; [voar](${voar}) Tamara (câmara) ≠ asa do bando.

## 5. Cruzar — variação de relação

Pedido de campo: *volte relação para «cruzar» — fica como variação de relação.* Não há ficha-lema **cruzar**. O verbo mora **aqui**.

| Forma | Ofício | Raiz | Papel |
|-------|--------|------|-------|
| **relação** | Nome do **entre** | *relatĭō* / *referre* | Âncora desta ficha |
| **cruzar** | Verbo: pôr A e B em contacto / no entre | lat. *crux* «cruz» | **Variação** — anda ao lado; não substitui o nome |
| **relacionar** | Verbo da mesma família | *relatĭō* | Irmão de raiz; primo de uso de *cruzar* |

**H-variação:** no lab, «cruzar com [simbiose](${simbiose})» já era este ofício — **relacionar** sem fundir. O campo só pediu o nome do verbo.

### Outras salas do *cruz-* (cortes)

A orelha cola tudo o que desenha uma cruz. O étimo **corta**. Relacionar ≠ fundir.

| Sopro | Sala | Corte |
|-------|------|-------|
| **Cruzar** (variação) | Pôr A e B no entre | Esta secção |
| **Sinal da Cruz** | Rito cristão — testa, peito, ombros ([sinal da cruz](${wikiSinal})) | **Fé / liturgia**, não o verbo de relacionar. [Respeito](${respeito}): nomear o rito ≠ zombar |
| **Cruzar os dedos** | Gesto de espera / sorte (calque EN *cross your fingers*) | **[Esperança](/posts/post-inspecao-palavra-esperanca.html)** miúda; não substitui [gesto](${gesto}) de ofício nem [faça o melhor](${faca}) |
| **Cruzar a rua / o caminho** | Atravessar ([passar](${passar}) / [caminho](${caminho})) | Tráfego / via — não o entre lógico |
| **[Mindinho](${mindinho})** | Parlenda que **conta** os cinco | Não cruza dois; nomeia cinco |
| **[Elo de ligação](${elo})** | Ponto das duas voltas (∞) | Cruzamento geométrico — outro objecto |
| **[Só os Loucos Sabem](${loucos})** | Ofício de **saber** pelo caminho | Saber ≠ cruzar no entre; relacionar a faixa ≠ chamar superstição de doença |
| **[Faça o melhor](${faca})** | A **ação** — o [gesto](${gesto}) que faz a relação existir no dia | O X dos dedos **espera**; o faça **faz**. [Valeu !!!](${mantra}) é a voz actual do mantra |

**Anti-armadilha:** abrir uma ficha-lema *cruzar* duplica o entre. **Anti-armadilha 2:** fundir sinal da Cruz com cruzar os dedos com relacionar — três cruzes, três salas.

## 6. Relação × simbiose × respeito × gesto

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **relação** | Nome genérico do **entre** | Ampla — vínculo, relato, proporção |
| **[simbiose](${simbiose})** | Viver juntos (*syn* + *bíos*) | Relação **específica** de coabitação |
| **[respeito](${respeito})** | Olhar de novo / considerar | **Como** se segura a relação |
| **[gesto](${gesto})** | Acto mínimo concreto | O que **faz** a relação existir no dia |
| **[verdade](${verdade})** | Nomear sem pose | Relato fiel do entre |
| **[alma](${alma})** | Centro vivo | Relação sem alma vira protocolo |

**Anti-armadilha:** reduzir *relação* a romance = apagar relato e proporção. Outra: «não tenho relação com isso» como fuga — às vezes é limite justo ([respeito](${respeito})); às vezes é negação do vínculo.

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [simbiose](${simbiose}) | Caso especial — viver juntos |
| [revoada](${revoada}) | Caso-ave — [relação](${self}) do bando no [gesto](${gesto}) de [voar](${voar}) |
| [respeito](${respeito}) · [gesto](${gesto}) | Ética e acto no entre |
| [verdade](${verdade}) · [mensagem](${mensagem}) | Relato / reportar (eco do étimo) |
| [patrão](${patrao}) | Relação de poder no trabalho |
| [alma](${alma}) · [vida](${vidaPalavra}) · [caminho](${caminho}) | Peito, duração, via |
| [Valeu !!!](${mantra}) | Ofício **na** relação — o melhor possível **hoje** |
| Hub [Palavras](${hub}) · [Inspeções](${hubAll}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha).  
2. Separar: vínculo · relato · proporção · peito.  
3. Se for coabitação viva, cruzar [simbiose](${simbiose}).  
4. Se for o bando no ar, cruzar [revoada](${revoada}).  
5. Se for cuidado do entre, cruzar [respeito](${respeito}) e [gesto](${gesto}).  
6. Fechar com [Valeu !!!](${mantra}) — e voltar ao [hub](${hubAll}).

## 7. Avaliação BudGanja

### Forças

- Documenta *relatĭō* e o núcleo «reportar / trazer de volta».  
- Separa vínculo, relato, proporção e eufemismo íntimo.  
- Liga [simbiose](${simbiose}), [respeito](${respeito}) e [gesto](${gesto}) sem moralismo barato.

### Limites

- Não é manual de relacionamentos nem curso de matemática.  
- Não inventaria todas as gírias regionais de «estar numa relação».  
- Casos de abuso / vínculo tóxico pedem apoio especializado — fora do escopo da ficha.

## 8. Como repetir o método

1. Fixar forma + étimo (*re-* + *ferre* → *relatĭō*).  
2. Tabela de camadas sem fundir.  
3. Um contraste lexical ([simbiose](${simbiose})) + um elo ético ([respeito](${respeito})).  
4. Declaração: palavra ≠ terapia.  
5. Status.

## Status

**Aprovado** — **relação** fichada: *relatĭō*, camadas (vínculo × relato × proporção × peito), contraste com [simbiose](${simbiose}), caso-ave [revoada](${revoada}), rede com [respeito](${respeito}), [gesto](${gesto}) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Simbiose](${simbiose}) · [▶ Revoada](${revoada}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **relação** (“relation / relationship / report / ratio”) — the name of the **link** between things or people, the **account** (bringing back what was seen), and **proportion**. From Lat. *relatĭō* ← *relātus* (*referre* = *re-* + *ferre*). Covers layers, links to [simbiose](${simbiose}), [respeito](${respeito}), [gesto](${gesto}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · relação](${wiki}), [relatio](${wikiLat}). Word sheet ≠ couples therapy or set theory. Name the *between* with [verdade](${verdade}) and [respeito](${respeito}).

Typo trigger: *relacao* → **relação**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **relação** |
| Etymon | Lat. *relatĭō* ← *referre* (*re-* + *ferre*) — high confidence |
| Lab type | Bond × report × ratio × heart |
| Links | [simbiose](${simbiose}) · [respeito](${respeito}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Layers

Human bond · factual report · mathematical ratio · “em relação a” · intimate euphemism · power relations ([patrão](${patrao})). Contrast: [simbiose](${simbiose}) = living together; *relação* = the general *between*. Animal case: [revoada](${revoada}) — flock taking wing; bird / Birds; flying [gesto](${gesto}).

## 3. Valeu !!!

Best possible **inside the relation** — today — with [respeito](${respeito}) and [gesto](${gesto}).

## Status

**Approved** — *relatĭō* · layers mapped · links to simbiose, respeito, gesto · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Simbiose](${simbiose}) · [▶ Revoada](${revoada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **relação** («relación / vínculo / informe / proporción») — el nombre del **entre**, del **relato** y de la **proporción**. Del lat. *relatĭō* ← *relātus* (*referre* = *re-* + *ferre*). Cubre capas, vínculos con [simbiose](${simbiose}), [respeito](${respeito}), [gesto](${gesto}), y [¡Valeu !!!](${mantra}).

> Nota metodológica: [Wikcionario · relação](${wiki}), [relatio](${wikiLat}). Ficha ≠ terapia de pareja ni teoría de conjuntos. Nombrar el *entre* con [verdade](${verdade}) y [respeito](${respeito}).

Gatillo tipográfico: *relacao* → **relação**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **relação** |
| Étimo | lat. *relatĭō* ← *referre* (*re-* + *ferre*) |
| Tipo lab | Vínculo × relato × proporción × pecho |
| Vínculos | [simbiose](${simbiose}) · [respeito](${respeito}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Capas

Vínculo humano · relato · proporción · «em relação a» · eufemismo íntimo · poder ([patrão](${patrao})). Contraste: [simbiose](${simbiose}) = vivir juntos; *relação* = el *entre* general.

## 3. ¡Valeu !!!

Lo mejor posible **dentro de la relación** — hoy — con [respeito](${respeito}) y [gesto](${gesto}).

## Estado

**Aprobada** — *relatĭō* · capas mapeadas · vínculos con simbiose, respeito, gesto · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Simbiose](${simbiose}) · [▶ Revoada](${revoada}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRelacaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildRelacaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 109;
  return makePalavra({
    title: 'Inspeção: Relação — o entre, o relato e a proporção',
    titleEn: 'Inspection: Relação — the between, the report, and the ratio',
    titleEs: 'Inspección: Relação — el entre, el relato y la proporción',
    excerpt:
      'Palavras: «relação» (lat. *relatĭō*) — vínculo × relato × proporção; elos simbiose, respeito, gesto; Valeu !!!',
    excerptEn:
      'Words: “relação” (Lat. *relatĭō*) — bond × report × ratio; links simbiose, respeito, gesto; Valeu !!!',
    excerptEs:
      'Palabras: «relação» (lat. *relatĭō*) — vínculo × relato × proporción; vínculos simbiose, respeito, gesto; ¡Valeu !!!',
    slug: 'inspecao-palavra-relacao',
    date: '2026-08-03T18:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Relação · palavra',
    coverImage: '/imagens/inspecoes/relacao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRelacaoPost,
  buildRelacaoBodies
};
