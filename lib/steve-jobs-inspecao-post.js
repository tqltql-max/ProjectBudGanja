'use strict';

/**
 * Inspeção Pessoas · Steve Jobs
 * Recorte: ofício × mito; casa vs produto; afirmação viral «celular só aos 18».
 * Ficha ≠ biografia fechada, ≠ review da Apple, ≠ manual de parentalidade.
 */

const fs = require('fs');
const path = require('path');
const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildSteveJobsBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Steve_Jobs';
  const wikiEn = 'https://en.wikipedia.org/wiki/Steve_Jobs';
  const nyt = 'https://www.nytimes.com/2014/09/11/fashion/steve-jobs-apple-was-a-low-tech-parent.html';
  const palavra = '/posts/post-inspecao-palavra-jobs.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial de **Steve Jobs** — **Steven Paul Jobs** (São Francisco, 24 fev. 1955 — Palo Alto, 5 out. 2011). Cofundador da Apple; figura pública do computador pessoal, do iPod, do iPhone e do iPad. O recorte BudGanja **não** é discografia de produtos nem culto do turtleneck: é a **pessoa** no mapa (ofício × [ídolo](${idolo})), a **palavra** [Jobs](${palavra}), e uma afirmação que circula no BR — *«os filhos só tiveram celular depois dos 18»*.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Steve Jobs](${wiki}), [EN](${wikiEn}), [Nick Bilton · *The New York Times*, 10 set. 2014](${nyt}) (relato de conversa no **fim de 2010**), Walter Isaacson citado no mesmo artigo. **Ficha ≠ biografia autorizada, ≠ defesa ou ataque à Apple.** Sem afiliação comercial. A casa Jobs é **privada**: o lab inspeciona o que foi **dito em público**, não o quarto das crianças.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Steven Paul Jobs** (Steve Jobs) |
| Nascimento / morte | 24 fev. 1955 (São Francisco) — 5 out. 2011 (Palo Alto), 56 anos |
| Ofícios | Empresário · desenhador de produto · cofundador Apple (e NeXT, Pixar no mapa público) |
| Tipo BudGanja | Pessoa — ofício de produto × mito de fundador × casa vs ecrã |
| Elo Palavras | [Jobs](${palavra}) · [ídolo](${idolo}) · [skill](${skill}) · [criatividade](${criatividade}) |
| Elo equipamento / criança | [Celular — riscos à saúde das crianças](${celular}) |
| Fonte | [Wikipédia](${wiki}) · [NYT 2014](${nyt}) |
| Data | ${inspected} |

## Quem foi (síntese verificável)

- Adoptado; California; breve passagem pela Reed College; Apple (1976) com Steve Wozniak.  
- Macintosh, afastamento, NeXT, Pixar; regresso à Apple (1997); iMac, iPod, iPhone (2007), iPad (2010).  
- Filhos no mapa público: **Lisa Brennan-Jobs** (1978); com Laurene Powell Jobs: **Reed** (1991), **Erin** (1995), **Eve** (1998).  
- Morre em 2011 (cancro pancreático / complicações — síntese wiki, não laudo).

O ofício que interessa ao lab: **atenção** — o produto pede o olhar; a casa, segundo ele, **limitava** o olhar.

## Afirmação inspecionada: «só tiveram celular aos 18»

| Versão | O que diz | Confiança |
|--------|-----------|-----------|
| **Viral BR** | Os filhos do Jobs só ganharam telemóvel **depois dos 18 anos** | **Fraca** como citação dele — **não** aparece na fala documentada |
| **Documentada (Jobs, 2010)** | Os filhos **não tinham usado o iPad**; «limitamos o quanto de tecnologia os miúdos usam em casa» | **Alta** no relato [Bilton / NYT 2014](${nyt}) |
| **Documentada (Isaacson)** | Jantar na mesa da cozinha: livros, história; **ninguém** puxava iPad nem computador; as crianças **não** pareciam viciadas em aparelhos | **Alta–média** (testemunho do biógrafo, citado no mesmo artigo) |
| **Confusão frequente** | *Wait Until **8th*** (8.º ano, ~13–14) lido como **18 anos**; outros pais de Silicon Valley (ex.: relatos de telemóvel ~14, dados ~16) colados ao nome Jobs | **Alta** como hipótese de *meme* |

**H-viral:** «18» é número redondo de meme — empacota *limite* + *8th* + outros CEOs.  
**H-facto:** o que Jobs **disse** foi **limite em casa** e **iPad ainda não usado** (2010) — não uma idade legal de telemóvel.

### Calendário (por que «18» não fecha)

O iPhone sai em **2007**. Jobs morre em **outubro de 2011**.

| Filho/a (público) | ~idade no iPhone (2007) | ~idade na morte do pai (2011) |
|-------------------|-------------------------|--------------------------------|
| Lisa (1978) | adulta | adulta |
| Reed (1991) | ~16 | ~20 |
| Erin (1995) | ~12 | ~16 |
| Eve (1998) | ~9 | ~13 |

**Veredicto de calendário:** Eve tinha **cerca de 13 anos** quando o pai morreu. Jobs **não pôde**, em vida, aplicar «telemóvel aos 18» a Erin e Eve. Se alguma regra de idade existiu **depois** de 2011, seria da casa (Laurene Powell Jobs / família) — e o lab **não** tem fonte primária pública que fixe **18**.

## Por que limitavam — o *porquê* inspecionável

Não é «porque o iPhone é veneno depois dos 17». O que as fontes públicas sustentam:

1. **Presença.** Isaacson: o jantar era conversa (livros, história) **sem** ecrã na mesa. O limite protege o [gesto](${gesto}) da mesa — olhar uns para os outros.  
2. **O produto captura.** Quem desenha o aparelho sabe que ele **pede atenção**. Limitar em casa ≠ confessar crime; é tratar a criança como **não-cliente**. Elo: [celular e crianças](${celular}).  
3. **Casa ≠ palco.** Vender iPad no palco e **não** o pôr no colo dos filhos (2010) é tensão, não hipocrisia automática — é **dois ofícios**: mercado e parentalidade. Inspecionar a tensão; não canonizar nem cancelar.  
4. **Não é catecismo.** Jobs **não** publicou um manifesto «proíbam até aos 18». Publicou (via jornalista) um **limite doméstico**. O lab traduz: [verdade](${verdade}) do que foi dito; [ídolo](${idolo}) quando o meme vira religião anti-ecrã *ou* religião de fundador.

**Veredicto do *porquê*:** limitavam para **não entregar a atenção da criança sem medida** — mesa, conversa, teto de uso em casa. O «18» é atalho que **come** essa inspeção.

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Meme dos 18** | Regra clara do pai génio | Slogan; **não** citado na fala de 2010 |
| **«Jobs odiava o iPhone para crianças»** | Arrependimento secreto | Limite doméstico + produto de massa — duas camadas |
| **«Hipócrita»** | Vende vício e esconde dos filhos | Tensão real; moralismo fácil apaga o [caminho](${caminho}) |
| **Ídolo** | Santo da inovação *ou* vilão do ecrã | Pessoa; ver [ídolo](${idolo}) e [Jobs](${palavra}) |

## Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Jobs só deu celular aos 18» | **Não documentado** nessa forma; o documentado é **limite em casa** + iPad não usado (2010) |
| «Então o iPhone é proibido até 18» | Conclusão de meme; saúde infantil = [ficha do celular](${celular}), não oráculo Jobs |
| «Se o Jobs limitou, eu também sou santo» | Parentalidade não é cosplay de fundador |
| «Se vendeu, não pode limitar» | Pode: mercado ≠ quarto. Inspecionar **ambos** |

Fecho: [Valeu !!!](${mantra}) **nesta** casa, **hoje** — com [verdade](${verdade}) do que se sabe, sem número inventado.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Jobs (palavra)](${palavra}) | Emprego EN × nome próprio × pedestal |
| [Ídolo](${idolo}) · [Genial](${genial}) · [Skill](${skill}) | Admirar o feito sem altar |
| [Celular e crianças](${celular}) | Riscos, limites, legislação — outro ofício |
| [Criatividade](${criatividade}) · [Gesto](${gesto}) · [Caminho](${caminho}) | Ofício de produto e de mesa |
| [Grok](${grok}) | Outro nome tech: intensidade sem divinizar |
| [NYT · Bilton 2014](${nyt}) | Fonte da fala sobre o iPad / limite em casa |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho sem culto |

## Limites

- Não é biografia completa, nem história da Apple, nem aconselhamento médico.  
- A vida privada dos filhos **não** é objecto a bisbilhotar: só o que entrou no registo público.  
- Lisa Brennan-Jobs (*Small Fry*) é testemunho **dela** — outra camada, não citada aqui como prova do «18».

## Status

**Aprovado em Pessoas** — Steve Jobs fichado; afirmação «celular aos 18» **reprovada como citação**, **aprovada como meme a inspecionar**; facto: limite em casa / iPad (2010) / mesa sem ecrã (Isaacson). Elo [Jobs](${palavra}) · [celular](${celular}) · [Valeu !!!](${mantra}).

[▶ Pessoas](${hub}) · [▶ Palavra Jobs](${palavra}) · [▶ Celular e crianças](${celular}) · [▶ Ídolo](${idolo}) · [NYT 2014](${nyt}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Steve Jobs** (1955–2011). Not a product history: **person** vs [ídolo](${idolo}), the word [Jobs](${palavra}), and the viral claim *“his kids only got phones after 18.”*

> Sources: [Wikipedia](${wikiEn}), [Bilton, *NYT*, 10 Sep 2014](${nyt}) (late-2010 call). **Not an authorized biography.**

## The “until 18” claim

**Documented (Jobs, 2010):** the kids **hadn’t used the iPad**; “we limit how much technology our kids use at home.”  
**Documented (Isaacson):** kitchen-table dinners — books, history; no iPad/computer at the table.  
**Viral “18”:** **weak** as a quote from him. Likely mix of *Wait Until **8th*** (8th grade) + other Valley parents (~14 / ~16 in Bilton’s wider reporting).

**Calendar:** Eve was ~13 when Jobs died (Oct 2011). He **could not** apply “phone at 18” to the younger children in his lifetime.

## Why they limited (inspectable)

Presence at dinner; the product captures attention by design; home ≠ keynote. Not a published manifesto “ban until 18.” See [phone & children](${celular}). Close with [Valeu !!!](${mantra}) — with the [truth](${verdade}) of what was said, without an invented age.

## Status

**Approved** — “phone at 18” **fails as a citation**, **passes as a meme to inspect**; fact = home limit + unused iPad (2010).

[▶ People](${hub}) · [▶ Word Jobs](${palavra}) · [▶ Phone & children](${celular}) · [NYT 2014](${nyt})
`;

  const contentEs = `## Alcance

Inspección de **Steve Jobs** (1955–2011). No es historia de producto: **persona** × [ídolo](${idolo}), la palabra [Jobs](${palavra}) y la afirmación viral *«sus hijos solo tuvieron móvil a los 18»*.

> Fuentes: [Wikipedia](${wiki}), [Bilton, *NYT*, 10 sep. 2014](${nyt}). **No es biografía autorizada.**

## La afirmación «a los 18»

**Documentado (Jobs, 2010):** los hijos **no habían usado el iPad**; «limitamos cuánta tecnología usan en casa».  
**Documentado (Isaacson):** cena en la mesa — libros, historia; sin iPad/ordenador.  
**Viral «18»:** **débil** como cita suya. Probable mezcla de *Wait Until **8th*** (8.º curso) + otros padres de Silicon Valley.

**Calendario:** Eve tenía ~13 años cuando Jobs murió (oct. 2011). **No pudo** aplicar «móvil a los 18» a los más pequeños en vida.

## Por qué limitaban

Presencia en la mesa; el producto captura atención; casa ≠ escenario. No hay manifiesto «prohibido hasta los 18». Ver [celular e niños](${celular}). Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobado** — «móvil a los 18» **no pasa como cita**, **sí como meme a inspeccionar**; hecho = límite en casa + iPad (2010).

[▶ Personas](${hub}) · [▶ Palabra Jobs](${palavra}) · [▶ Celular](${celular}) · [NYT 2014](${nyt})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSteveJobsPost() {
  const { body, contentEn, contentEs, wiki } = buildSteveJobsBodies();
  let seriesOrder = 22;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-figura-steve-jobs');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 80) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 22 */
  }

  return figuraPost({
    title:
      'Inspeção: Steve Jobs — ofício, casa sem iPad e o mito do celular aos 18',
    titleEn:
      'Inspection: Steve Jobs — craft, a low-tech home, and the “phone at 18” myth',
    titleEs:
      'Inspección: Steve Jobs — oficio, casa sin iPad y el mito del móvil a los 18',
    excerpt:
      'Pessoas: Steve Jobs (1955–2011). A fala documentada é limite de tecnologia em casa e iPad não usado (2010) — não «celular só aos 18». Elo palavra Jobs, ídolo e ficha do celular.',
    excerptEn:
      'People: Steve Jobs (1955–2011). The documented line is a home tech limit and unused iPad (2010) — not “phones only after 18.” Links word Jobs, ídolo and the phone sheet.',
    excerptEs:
      'Personas: Steve Jobs (1955–2011). Lo documentado es límite de tecnología en casa e iPad no usado (2010) — no «móvil solo a los 18». Vínculos palabra Jobs, ídolo y ficha del celular.',
    slug: 'inspecao-figura-steve-jobs',
    date: '2026-08-19T22:15:00.000Z',
    seriesOrder,
    seriesLabel: 'Steve Jobs · pessoa',
    coverImage: '/imagens/inspecoes/steve-jobs-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSteveJobsPost,
  buildSteveJobsBodies
};
