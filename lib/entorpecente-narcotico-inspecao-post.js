'use strict';

/**
 * Inspeção Palavras: Entorpecente × Narcótico — classificação legal
 * Elo: Guia de Palavras (grupo classificacao) · Droga · rede canábica.
 */

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildEntorpecenteNarcoticoBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html?group=classificacao';
  const droga = '/posts/post-inspecao-palavra-droga.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const cannabis = '/posts/post-inspecao-palavra-cannabis.html';
  const marijuana = '/posts/post-inspecao-palavra-marijuana.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const ganja = '/posts/post-inspecao-palavra-ganja.html';
  const canhamo = '/posts/post-inspecao-palavra-canhamo.html';
  const planta = '/plantas/cannabis-sativa/';
  const xiv = '/biblioteca/unifesp/livro-xiv.html';
  const cobertura = '/posts/post-inspecao-guia-palavras-cobertura.html';
  const psicoativo = '/guia/palavras.html?q=Psicoativo';

  const body = `## Escopo

Primeira inspeção editorial do par **entorpecente** × **narcótico** — rótulos de **classificação legal / médico-policial** que o laboratório separa do léxico popular ([maconha](${maconha}), [erva](${erva}), [ganja](${ganja})) e do duplo sentido de [droga](${droga}). Grupo no glossário: [Classificação legal](${guia}).

> **Nota metodológica:** auditoria independente BudGanja. **Não é parecer jurídico nem aconselhamento clínico.** Indexar ≠ endossar. Listas oficiais de substâncias controladas mudam — confirmar sempre nas fontes do Estado. O objecto aqui é a **palavra e a rede semântica no projecto**, não o texto integral de uma portaria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavras | **entorpecente** · **narcótico** |
| Tipo BudGanja | Palavra — classificação legal (par) |
| Grupo no Guia | [Classificação legal](${guia}) |
| Elo Palavras | [Droga](${droga}) (duplo sentido remédio ↔ ilícito) |
| Elo planta | [Cannabis sativa](${planta}) |
| Elo formação | [Rascunhos XIV](${xiv}) · entrada [Psicoativo](${psicoativo}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «entorpecente» no Brasil funciona sobretudo como **rótulo de controlo** (listas, polícia, processo) — descreve efeito e, ao mesmo tempo, **categoria jurídica**.  
**H2:** «narcótico» é rótulo **médico/legal antigo e amplo** (sono, entorpecimento, analgésicos opiáceos na tradição clínica) — **não** é sinónimo exacto de «entorpecente» nas listas modernas.  
**H3:** no BudGanja, misturar estes rótulos com [maconha](${maconha}) / [droga](${droga}) no senso comum **apagaria** a literacia que o laboratório exige: nome popular ≠ nome científico ≠ categoria de controlo.  
**H4:** a primeira ficha do par deve **mapear a rede do projecto** antes de pretender esgotar o direito positivo.

Passos:

1. Fixar os dois sentidos de trabalho.  
2. Separar do campo semântico de [droga](${droga}).  
3. Cruzar com a rede canábica já inspeccionada.  
4. Ligar ao Guia (grupo classificação) e à formação XIV.  
5. Limites + status.

## Entorpecente — sentido de trabalho

| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Substância que **entorpece** (diminui sensação / reacção) |
| Uso dominante | **Jurídico-policial** — entra em listas e discurso de controlo |
| Risco semântico | Usar como insulto genérico («é um entorpecente») sem método |
| Elo no Guia | [Classificação legal](${guia}) |

## Narcótico — sentido de trabalho

| Aspecto | Leitura BudGanja |
|---------|------------------|
| Núcleo | Substância associada a **sono / entorpecimento** (tradição clínica) |
| Uso dominante | Rótulo **médico/legal antigo** — amplo, às vezes impreciso |
| Distinção | **Não** equivale automaticamente a «entorpecente» nas listas brasileiras modernas |
| Elo no Guia | [Classificação legal](${guia}) |

## Por que inspeccionar o par (e não só «droga»)

[Droga](${droga}) documenta o arco **remédio → ilícito no senso comum**.  
**Entorpecente** e **narcótico** documentam outra camada: a língua do **controlo e da clínica**, que o projecto precisa nomear para não confundir:

- o que a planta **é** ([Cannabis sativa](${planta}));  
- como o povo a **chama** ([maconha](${maconha}), [diamba](${diamba}), [ganja](${ganja}), [marijuana](${marijuana}), [erva](${erva}));  
- como o Estado / a clínica a **classificam** (este par);  
- como a farmácia ainda diz «drogaria» sem querer dizer tráfico ([droga](${droga})).

## Rede no laboratório

| Recurso | Papel nesta inspeção |
|---------|----------------------|
| [Droga](${droga}) | Duplo sentido — remédio vs ilícito |
| [Maconha](${maconha}) | Nome popular afro-atlântico — estigma e viagem |
| [Cannabis](${cannabis}) · [Cannabis sativa](${planta}) | Nome científico / ficha de planta |
| [Marijuana](${marijuana}) · [Erva](${erva}) · [Diamba](${diamba}) · [Ganja](${ganja}) | Rede de nomes — rotas distintas |
| [Cânhamo](${canhamo}) | Fibra industrial — confusão moral com «droga» |
| [Psicoativo](${psicoativo}) (Guia) | Classe de efeito — não é sinónimo automático de entorpecente |
| [Rascunhos XIV](${xiv}) | Formação: psicoativos, taxonomia, literacia |
| [Guia · Classificação legal](${guia}) | Porta de entrada do par |
| [Cobertura do Guia](${cobertura}) | Auditoria das 139 entradas |

## Contrastes úteis (mapa rápido)

| Não confundir | Com |
|---------------|-----|
| Entorpecente (lista / controlo) | Droga (senso comum = ilícito) |
| Narcótico (rótulo antigo amplo) | Entorpecente (lista moderna) |
| Psicoativo (efeito na mente) | Entorpecente (categoria de controlo) |
| Cânhamo (uso fibroso) | «É droga» (colapso semântico) |
| Cannabis medicinal (discurso clínico) | Insulto policial sem método |

## Limites

- Esta ficha **não** reproduz anexos da Portaria SVS/MS nem listas da ONU — aponta o **tipo de linguagem**.  
- Não decide se uma substância «deve» ou «não deve» estar controlada.  
- Não substitui a [inspeção de Droga](${droga}) nem as fichas de nomes populares.  
- Próximos passos possíveis: fichas individuais se o mapa legal do projecto crescer (ex. psicotrópico, lista F).

## Status

**Aprovado — primeira ficha do par.** Entorpecente e Narcótico documentados como **classificação legal**, cruzados com [Droga](${droga}), a rede canábica inspeccionada, o [Guia](${guia}) e a formação XIV.

[▶ Classificação legal](${guia}) · [▶ Droga](${droga}) · [▶ Maconha](${maconha}) · [▶ Cannabis sativa](${planta}) · [▶ Hub Palavras](${hub})
`;

  const contentEn = `## Scope

First editorial inspection of the pair **entorpecente** × **narcótico** — **legal / medical-police classification** labels, kept distinct from folk names ([maconha](${maconha})) and from the double sense of [droga](${droga}). Glossary group: [Legal classification](${guia}).

> **Method note:** independent BudGanja audit. **Not legal advice.** Indexing ≠ endorsement. Official control lists change — verify state sources.

## Object

| Field | Value |
|-------|-------|
| Words | **entorpecente** · **narcótico** |
| Type | Words — legal classification (pair) |
| Guide group | [Legal classification](${guia}) |
| Link | [Droga](${droga}) · [Cannabis sativa](${planta}) · [XIV drafts](${xiv}) |
| Date | ${inspected} |

## Working senses

| Word | BudGanja reading |
|------|------------------|
| Entorpecente | Dulls sensation/reaction; dominant **control-list / police-legal** use in Brazil |
| Narcótico | Older **medical/legal** label tied to sleep/dulling — **not** an exact synonym of modern «entorpecente» lists |

## Project network

Cross [Droga](${droga}), [maconha](${maconha}), [cannabis](${cannabis}), [marijuana](${marijuana}), [erva](${erva}), [diamba](${diamba}), [ganja](${ganja}), [cânhamo](${canhamo}), [Cannabis sativa](${planta}), [Psicoativo](${psicoativo}), [XIV drafts](${xiv}), and the [Guide group](${guia}).

## Status

**Approved — first sheet of the pair.**
`;

  const contentEs = `## Alcance

Primera inspección editorial del par **entorpecente** × **narcótico** — rótulos de **clasificación legal / médico-policial**, separados de los nombres populares ([maconha](${maconha})) y del doble sentido de [droga](${droga}). Grupo del glosario: [Clasificación legal](${guia}).

> **Nota metodológica:** auditoría independiente BudGanja. **No es asesoría jurídica.** Indexar ≠ respaldar.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabras | **entorpecente** · **narcótico** |
| Tipo | Palabra — clasificación legal (par) |
| Grupo | [Clasificación legal](${guia}) |
| Vínculos | [Droga](${droga}) · [Cannabis sativa](${planta}) · [Borradores XIV](${xiv}) |
| Fecha | ${inspected} |

## Sentidos de trabajo

| Palabra | Lectura BudGanja |
|---------|------------------|
| Entorpecente | Atenúa sensación/reacción; uso dominante **jurídico-policial / listas de control** |
| Narcótico | Rótulo **médico/legal antiguo** (sueño/entumecimiento) — **no** es sinónimo exacto de «entorpecente» en listas modernas |

## Red del proyecto

Cruzar [Droga](${droga}), [maconha](${maconha}), [cannabis](${cannabis}), [marijuana](${marijuana}), [erva](${erva}), [diamba](${diamba}), [ganja](${ganja}), [cânhamo](${canhamo}), [Cannabis sativa](${planta}), [Psicoativo](${psicoativo}), [XIV](${xiv}) y el [grupo del Guía](${guia}).

## Estado

**Aprobado — primera ficha del par.**
`;

  return { body, contentEn, contentEs };
}

function buildEntorpecenteNarcoticoPost() {
  const { body, contentEn, contentEs } = buildEntorpecenteNarcoticoBodies();
  return palavraPost({
    title: 'Inspeção: Entorpecente e Narcótico — classificação legal no laboratório',
    titleEn: 'Inspection: Entorpecente and Narcótico — legal classification in the lab',
    titleEs: 'Inspección: Entorpecente y Narcótico — clasificación legal en el laboratorio',
    excerpt:
      'Palavras: entorpecente × narcótico — rótulos de controlo e clínica, distintos de droga no senso comum e da rede de nomes (maconha, cannabis, ganja…).',
    excerptEn:
      'Words: entorpecente × narcótico — control and clinical labels, distinct from everyday “drug” and from the name network (maconha, cannabis, ganja…).',
    excerptEs:
      'Palabras: entorpecente × narcótico — rótulos de control y clínica, distintos de droga en el habla común y de la red de nombres (maconha, cannabis, ganja…).',
    slug: 'inspecao-palavra-entorpecente-narcotico',
    date: '2026-08-02T06:15:00.000Z',
    seriesOrder: 20,
    seriesLabel: 'Entorpecente · Narcótico · classificação',
    coverImage: 'imagens/og-default.jpg',
    sourceUrl: '/guia/palavras.html?group=classificacao',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEntorpecenteNarcoticoPost,
  buildEntorpecenteNarcoticoBodies
};
