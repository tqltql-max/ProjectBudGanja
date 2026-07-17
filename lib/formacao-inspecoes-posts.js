'use strict';

function formacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'formacao-academica',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Formação acadêmica',
    content_raw: opts.body
  };
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  return post;
}

function buildUnifespCannabisMedicinalPost() {
  return formacaoPost({
    title: 'Inspeção: Curso UNIFESP — Cannabis sativa L. medicinal',
    excerpt:
      'Auditoria do XIV Curso de extensão da UNIFESP em parceria com o MovReCam — 10 mil vagas gratuitas, 57 h EaD via YouTube, certificado com 75% de presença e grade clínica, legislativa e de cultivo.',
    excerptEn:
      'Audit of UNIFESP’s 14th extension course on therapeutic Cannabis sativa L. — 10k free seats, 57h distance learning via YouTube, certificate at 75% attendance, clinical and legislative syllabus.',
    excerptEs:
      'Auditoría del XIV Curso de extensión de la UNIFESP con MovReCam — 10 mil vacantes gratuitas, 57 h EaD por YouTube, certificado con 75% de asistencia y plan clínico y legislativo.',
    slug: 'inspecao-curso-unifesp-cannabis-medicinal',
    date: '2026-06-30T12:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'UNIFESP · XIV edição',
    coverImage: '/imagens/icon-512.png',
    body: `## Escopo

Inspeção documental do **XIV Curso sobre o uso terapêutico da Cannabis sativa L.**, curso de **extensão universitária** da Universidade Federal de São Paulo (UNIFESP), em parceria com o **Movimento pela Regulamentação da Cannabis (MovReCam)**. O programa é oferecido desde 2018, com mais de **100 mil participantes** acumulados nas edições anteriores, e recebeu o **CannaPortugal Global Cannabis Awards 2025** como referência em educação canábica democrática.

> **Nota metodológica:** auditoria editorial independente do Inspetor BudGanja com base no catálogo oficial **SIEX/PROEC** (código 30063), plano de ensino público e comunicados institucionais da UNIFESP. **Sem vínculo** com a universidade ou o MovReCam; prazos, vagas e regras de certificado podem ser atualizados — confirmar sempre no [SIEX](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info) antes de se inscrever.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Instituição | [UNIFESP](https://www.unifesp.br/) — Universidade Federal de São Paulo |
| Ação SIEX | Código **30063** · Ano base **2026** |
| Título oficial | XIV Curso sobre o uso terapêutico da Cannabis sativa L. |
| Tipo | Curso de extensão · Educação continuada · Área **Saúde** |
| Parceria | MovReCam ([youtube.com/movrecam](https://www.youtube.com/movrecam)) |
| Coordenação (RTC) | Profa. Dra. **Eliana Rodrigues** |
| Vice-coordenação | Luciana Togni de Lima Surjus · Gabrielle Dainezi (externo) |
| Vagas | **10 000** |
| Modalidade | A distância (EaD) — aulas no YouTube |
| Carga horária | **57 h** teóricas (sem prática presencial obrigatória) |
| Período (XIV) | **16/06/2026** a **12/11/2026** |
| Inscrições (XIV) | **03/06/2026** a **30/06/2026** |
| Horário | Terças e quintas, a partir das **19h30** (exceto feriados nacionais) |
| Pré-requisito | Maior de **18 anos** |
| Taxas | Inscrição e certificado **gratuitos** |
| Certificado | ≥ **75%** de presença · emissão pelo aluno no SIEX até 30 dias após a última aula |
| Contato | [curso.cannabismedicinal@unifesp.br](mailto:curso.cannabismedicinal@unifesp.br) |
| Data da inspeção | 2026-06-30 |

## Hipóteses e método

- **H1:** Um curso federal gratuito e aberto reduz barreiras de acesso à informação sobre cannabis medicinal para pacientes, familiares e profissionais de saúde.
- **H2:** A transmissão via YouTube com formulários de presença equilibra escala (10 mil vagas) e rastreabilidade mínima para certificação.
- **H3:** A grade interdisciplinar — botânica, farmacologia, clínica, legislação e cultivo — aproxima-se do que o laboratório BudGanja documenta em [inspeções de cultivo](/biblioteca/inspecoes/) e [calculadoras](/calculadoras/), mas com foco **terapêutico e regulatório**, não em rendimento agronómico.
- **Método:** (1) leitura da ficha SIEX 30063 e plano de ensino; (2) mapeamento temático das 42 aulas agendadas; (3) cruzamento com conteúdos do Inspetor BudGanja (ambiente indoor, propagação, nutrição); (4) verificação de requisitos de certificado e canais oficiais.

## Estrutura da grade (XIV edição)

O plano de ensino organiza o percurso em blocos progressivos — da base científica às aplicações clínicas, legislação e técnicas de produção:

| Bloco | Temas principais (amostra da grade oficial) |
|-------|---------------------------------------------|
| **Fundamentos** | História e proibicionismo · Botânica · Etnobotânica · Fitoterapia |
| **Sistema e farmacologia** | SUS e cannabis · Farmácia viva · Endocanabinoidoma · Canabimiméticos · Composição química e quimiotipos |
| **Clínica por patologia** | Epilepsia · TEA · Parkinson · Alzheimer · dor/fibromialgia · câncer e cuidados paliativos · ansiedade · sono · saúde da mulher · veterinária · redução de danos |
| **Prática assistencial** | Prescrição, dosagem e titulação · Enfermagem · Reações adversas · Interações medicamentosas |
| **Política e mercado** | Legislação brasileira e comparada · Movimentos sociais · Associativismo · Mercado nacional e internacional |
| **Produção e técnica** | Plantio, cultivo orgânico e clonagem (2 aulas) · Métodos de extração |

### Achados — pedagogia e acesso

1. **Democratização real** — sem processo seletivo, sem mensalidade, público-alvo amplo (não exige graduação). Nasceu de demanda comunitária (origem ligada ao Padre Ticão e ao prof. **Elisaldo Carlini**, conforme [portal UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)).
2. **Presença assíncrona rastreável** — cada aula disponibiliza **Google Forms** com o **mesmo e-mail da inscrição**; o aluno deve guardar comprovantes (prints). Aulas permanecem no YouTube para consulta posterior.
3. **Grade clínica densa** — cobertura ampla de especialidades; útil como mapa de estudo, não substitui protocolo hospitalar nem residência médica.
4. **Módulos de cultivo** — alinham-se parcialmente ao [Guia de Cultivo Básico](/biblioteca/inspecoes/) e à [propagação/clonagem](/posts/post-inspecao-propagacao-clonagem.html) do laboratório, mas **sem métricas de ambiente** (PPFD, VPD, EC) exigidas no nosso diário.

### Achados — certificação e limites

| Critério | Regra oficial | Implicação |
|----------|---------------|------------|
| Frequência mínima | 75% das aulas | Controle individual; formulários por encontro |
| Emissão | Pelo próprio aluno no [SIEX](https://siex.siiu.unifesp.br/catalogo-siex) → «consultar inscrição» | Prazo: até 30 dias após a última aula |
| Natureza do certificado | Extensão universitária UNIFESP | **Não** equivale a graduação nem habilitação profissional automática — validar com conselho de classe ou empregador |
| Alterações de grade | Ordem das aulas pode mudar conforme palestrantes | Conteúdo final preservado, conforme SIEX |

## Complementaridade com o Inspetor BudGanja

| Tema do curso UNIFESP | Recurso BudGanja |
|----------------------|------------------|
| Botânica, quimiotipos, extração | [Inspeções](/biblioteca/inspecoes/) · [Pesquisas](/biblioteca/pesquisas/) |
| Transmissão e arquivo em vídeo | [Inspeção: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Plantio, clonagem, cultivo orgânico | [Propagação e clonagem](/posts/post-inspecao-propagacao-clonagem.html) · [Diário de cultivo](/cultivo/) |
| Ambiente indoor (não central no curso) | [PPFD indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) · [Calculadora Luxímetro](/calculadoras/luximetro.html) · [VPD](/calculadoras/cultivo-lab.html?mode=vpd) |
| Nutrição e substrato | [Nutrição](/posts/post-inspecao-nutricao-cannabis.html) · [Solo vivo](/posts/post-inspecao-solo-vivo-organico.html) |
| Legislação e mercado BR | [Inspeção Mars Hydro](/posts/post-inspecao-marshydro-brasil.html) (catálogo comercial) · [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) (advocacia) |

## Como participar (XIV edição)

1. **Inscrição** — [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/inscricao-acao/inscrever) (dentro do prazo publicado).
2. **Aulas** — [YouTube MovReCam](https://www.youtube.com/movrecam) ([inspeção do canal](/posts/post-inspecao-canal-movrecam.html)), terças e quintas às 19h30.
3. **Presença** — preencher o formulário de cada aula com nome, e-mail e CPF (e-mail igual ao da inscrição).
4. **Certificado** — após ≥75% de frequência, emitir em [consultar inscrição](https://siex.siiu.unifesp.br/catalogo-siex) (orientações [PROEC](https://www.unifesp.br/reitoria/proec/consultar-)).

## Créditos e transparência

- **Curso, grade e certificados** © UNIFESP / PROEC — [siex.siiu.unifesp.br](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info)
- **Transmissão e arquivo em vídeo** © MovReCam — [inspeção do canal](/posts/post-inspecao-canal-movrecam.html) · [youtube.com/movrecam](https://www.youtube.com/movrecam)
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** orientar cultivadores e interessados em formação — **não** constitui endosso institucional nem garantia de vaga

## Status

**Aprovado como referência de formação pública** — maior programa gratuito de extensão em cannabis medicinal no Brasil, com grade clínica robusta, acesso aberto e certificado federal. Recomendado cruzar módulos de cultivo com medições reais no [laboratório BudGanja](/cultivo/) e validar certificado conforme a sua área profissional.

[▶ Inscrição SIEX (XIV)](https://siex.siiu.unifesp.br/catalogo-siex/30063/inscricao-acao/inscrever) · [Plano de ensino](https://siex.siiu.unifesp.br/catalogo-siex/plano-ensino/30063) · [Todas as inspeções](/biblioteca/inspecoes/)`
  });
}

const FORMACAO_INSPECOES_POSTS = [buildUnifespCannabisMedicinalPost()];

module.exports = {
  FORMACAO_INSPECOES_POSTS,
  buildUnifespCannabisMedicinalPost
};
