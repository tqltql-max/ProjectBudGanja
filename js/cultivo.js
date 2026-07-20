document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('perfil-loading');
  const appEl = document.getElementById('perfil-app');
  const onboardingEl = document.getElementById('perfil-onboarding');
  const dashboardEl = document.getElementById('perfil-dashboard');
  const form = document.getElementById('perfil-form');
  const formStatus = document.getElementById('perfil-form-status');
  const formTitle = document.getElementById('perfil-form-title');
  const onboardingIntro = document.getElementById('perfil-onboarding-intro');
  const editBtn = document.getElementById('perfil-edit-btn');
  const cancelEditBtn = document.getElementById('perfil-cancel-edit-btn');
  const logoutBtn = document.getElementById('perfil-logout-btn');
  const phaseSelectEl = document.getElementById('perfil-phase-select');
  const planoList = document.getElementById('perfil-plano-list');
  const planoAddForm = document.getElementById('perfil-plano-add');
  const planoInput = document.getElementById('perfil-plano-input');
  const planoStatus = document.getElementById('perfil-plano-status');
  const planoMetrics = document.getElementById('perfil-plano-metrics');
  const customGuideEl = document.getElementById('profile-custom-guide');
  const guiaSaveBtn = document.getElementById('perfil-guia-save-btn');
  const guiaTemplateBtn = document.getElementById('perfil-guia-template-btn');
  const guiaStatus = document.getElementById('perfil-guia-status');
  const timelineEl = document.getElementById('perfil-timeline');
  const timelineSub = document.getElementById('perfil-timeline-sub');
  const weekPills = document.getElementById('perfil-week-pills');
  const phaseResetBtn = document.getElementById('perfil-phase-reset-btn');
  const weekContentEl = document.getElementById('perfil-week-content');
  const weekNotesEl = document.getElementById('perfil-week-notes');
  const weekNotesSaveBtn = document.getElementById('perfil-week-notes-save-btn');
  const cultivoHubView = document.getElementById('cultivo-hub-view');
  const cultivoHubList = document.getElementById('cultivo-hub-list');
  const cultivoHubSummary = document.getElementById('cultivo-hub-summary');
  const cultivoHubStats = document.getElementById('cultivo-hub-stats');
  const cultivoHubEmpty = document.getElementById('cultivo-hub-empty');
  const cultivoHubEmptyBtn = document.getElementById('cultivo-hub-empty-btn');
  const cultivoHubNewBtn = document.getElementById('cultivo-hub-new-btn');
  const cultivoTasksView = document.getElementById('cultivo-tasks-view');
  const cultivoTasksList = document.getElementById('cultivo-tasks-list');
  const cultivoTasksEmpty = document.getElementById('cultivo-tasks-empty');
  const cultivoTasksStatus = document.getElementById('cultivo-tasks-status');
  const cultivoTasksBackBtn = document.getElementById('cultivo-tasks-back-btn');
  const cultivoWizardView = document.getElementById('cultivo-wizard-view');
  const cultivoWizardForm = document.getElementById('cultivo-wizard-form');
  const cultivoWizardName = document.getElementById('cultivo-wizard-name');
  const cultivoWizardSpecies = document.getElementById('cultivo-wizard-species');
  const cultivoWizardDate = document.getElementById('cultivo-wizard-date');
  const cultivoWizardPlants = document.getElementById('cultivo-wizard-plants');
  const cultivoWizardBack = document.getElementById('cultivo-wizard-back');
  const cultivoWizardCancel = document.getElementById('cultivo-wizard-cancel');
  const cultivoWizardStatus = document.getElementById('cultivo-wizard-status');
  const cultivoGrowView = document.getElementById('cultivo-grow-view');
  const cultivoGrowBack = document.getElementById('cultivo-grow-back');
  const cultivoGrowHeader = document.getElementById('cultivo-grow-header');
  const growDetailPhase = document.getElementById('perfil-grow-detail-phase');
  const growEntriesEl = document.getElementById('perfil-grow-entries');
  const growEntriesEmpty = document.getElementById('perfil-grow-entries-empty');
  const growEntryForm = document.getElementById('perfil-grow-entry-form');
  const growEntryDate = document.getElementById('perfil-grow-entry-date');
  const growEntryText = document.getElementById('perfil-grow-entry-text');
  const growEntryPh = document.getElementById('perfil-grow-entry-ph');
  const growEntryEc = document.getElementById('perfil-grow-entry-ec');
  const growEntryTemp = document.getElementById('perfil-grow-entry-temp');
  const growEntryRh = document.getElementById('perfil-grow-entry-rh');
  const growEntryTypes = document.getElementById('perfil-grow-entry-types');
  const growEntryPhotos = document.getElementById('perfil-grow-entry-photos');
  const growEntryCapturePhoto = document.getElementById('perfil-grow-entry-capture-photo');
  const growEntryCaptureVideo = document.getElementById('perfil-grow-entry-capture-video');
  const growSelectMediaBtn = document.getElementById('perfil-grow-select-media-btn');
  const growCapturePhotoBtn = document.getElementById('perfil-grow-capture-photo-btn');
  const growCaptureVideoBtn = document.getElementById('perfil-grow-capture-video-btn');
  const growEntryPhotosPreview = document.getElementById('perfil-grow-entry-photos-preview');
  const growEntryMetricsHint = document.getElementById('perfil-grow-entry-metrics-hint');
  const growEntrySubmitBtn = document.getElementById('perfil-grow-entry-submit');
  const growSubmitLabBtn = document.getElementById('perfil-grow-submit-lab');
  const growSubmissionStatus = document.getElementById('perfil-grow-submission-status');
  const growExportMdBtn = document.getElementById('perfil-grow-export-md');
  const growExportCsvBtn = document.getElementById('perfil-grow-export-csv');
  const growRenameBtn = document.getElementById('perfil-grow-rename');
  const cultivoEditForm = document.getElementById('cultivo-edit-form');
  const cultivoEditName = document.getElementById('cultivo-edit-name');
  const cultivoEditSpecies = document.getElementById('cultivo-edit-species');
  const cultivoEditDate = document.getElementById('cultivo-edit-date');
  const cultivoEditPlants = document.getElementById('cultivo-edit-plants');
  const cultivoEditEnvironment = document.getElementById('cultivo-edit-environment');
  const cultivoEditSubstrate = document.getElementById('cultivo-edit-substrate');
  const cultivoEditStatus = document.getElementById('cultivo-edit-status');
  const cultivoEditConfirm = document.getElementById('cultivo-edit-confirm');
  const growDeleteBtn = document.getElementById('perfil-grow-delete');
  const growPrintBtn = document.getElementById('perfil-grow-print');
  const reminderAddForm = document.getElementById('perfil-reminder-add');
  const reminderActionEl = document.getElementById('perfil-reminder-action');
  const reminderDateEl = document.getElementById('perfil-reminder-date');
  const reminderLabelEl = document.getElementById('perfil-reminder-label');
  const growDetailStatus = document.getElementById('perfil-grow-detail-status');
  const liveStatusEl = document.getElementById('perfil-live-status');
  const accountEl = document.getElementById('perfil-account');
  const accountEditBtn = document.getElementById('perfil-account-edit-btn');
  const cultivoSectionNav = document.getElementById('cultivo-section-nav');
  const cultivoOnboardingRoot = document.getElementById('cultivo-onboarding-root');
  const weekInspectionLink = document.getElementById('perfil-week-inspection-link');
  const cultivoSubmissionNotify = document.getElementById('cultivo-submission-notify');
  const cultivoAutosaveStatus = document.getElementById('cultivo-autosave-status');
  const growMetricsCharts = document.getElementById('perfil-grow-metrics-charts');
  const growEnvironmentEl = document.getElementById('perfil-grow-environment');
  const growSubstrateEl = document.getElementById('perfil-grow-substrate');
  const growDuplicateBtn = document.getElementById('perfil-grow-duplicate');
  const growCompareBtn = document.getElementById('perfil-grow-compare');
  const growActionsMenu = document.getElementById('perfil-grow-actions-menu');
  const growActionsToggle = document.getElementById('perfil-grow-actions-toggle');
  const growActionsPanel = document.getElementById('perfil-grow-actions-panel');
  const cultivoWizardEnvironment = document.getElementById('cultivo-wizard-environment');
  const cultivoWizardSubstrate = document.getElementById('cultivo-wizard-substrate');
  const cultivoMetricModal = document.getElementById('cultivo-metric-modal');
  const cultivoMetricModalTitle = document.getElementById('cultivo-metric-modal-title');
  const cultivoMetricModalHint = document.getElementById('cultivo-metric-modal-hint');
  const cultivoMetricModalStatus = document.getElementById('cultivo-metric-modal-status');
  const cultivoMetricSlider = document.getElementById('cultivo-metric-slider');
  const cultivoMetricSliderTrack = document.getElementById('cultivo-metric-slider-track');
  const cultivoMetricSliderWrap = document.querySelector('.cultivo-metric-slider-wrap');
  const cultivoMetricSliderValue = document.getElementById('cultivo-metric-slider-value');
  const cultivoCommunityModal = document.getElementById('cultivo-community-modal');
  const cultivoCommunityShareBlock = document.getElementById('cultivo-community-share-block');
  const cultivoCommunitySuccessBlock = document.getElementById('cultivo-community-success-block');
  const cultivoCommunitySuccessMsg = document.getElementById('cultivo-community-success-msg');
  const cultivoCommunityPreviewImg = document.getElementById('cultivo-community-preview-img');
  const cultivoCommunityCaption = document.getElementById('cultivo-community-caption');
  const cultivoCommunityHelp = document.getElementById('cultivo-community-help');
  const cultivoCommunityConfirm = document.getElementById('cultivo-community-confirm');
  const cultivoCommunityStatus = document.getElementById('cultivo-community-modal-status');
  let communityShares = new Map();
  let communityShareDraft = null;
  let communityTermsAccepted = false;
  let communityShareBusy = false;
  const cultivoMetricSliderMin = document.getElementById('cultivo-metric-slider-min');
  const cultivoMetricSliderMax = document.getElementById('cultivo-metric-slider-max');
  const cultivoMetricSliderIdealNote = document.getElementById('cultivo-metric-slider-ideal-note');
  const cultivoMetricNudgeDown = document.getElementById('cultivo-metric-nudge-down');
  const cultivoMetricNudgeUp = document.getElementById('cultivo-metric-nudge-up');
  const cultivoMetricApply = document.getElementById('cultivo-metric-apply');
  const cultivoMetricClear = document.getElementById('cultivo-metric-clear');

  const IS_CULTIVO_PAGE = true;
  const PAGE_SELF = '/cultivo/';
  const CShared = window.BudGanjaCultivoShared || {};
  const COnboard = window.BudGanjaCultivoOnboarding || {};
  const CMarkdown = window.BudGanjaCultivoMarkdown || {};
  const CCharts = window.BudGanjaCultivoCharts || {};
  const CAutosave = window.BudGanjaCultivoAutosave || {};
  const SELECTED_GROW_KEY = CShared.SELECTED_GROW_KEY || 'budganja_selected_grow_id';
  const SUBMISSION_NOTIFY_KEY = CShared.SUBMISSION_NOTIFY_KEY || 'budganja_submission_notify_v1';
  const PHASE_INSPECTION_LINKS = CShared.PHASE_INSPECTION_LINKS || {};
  const CALCULATOR_LABELS = CShared.CALCULATOR_LABELS || {};
  const ENTRY_ACTIONS = CShared.ENTRY_ACTIONS || [];
  const MIN_USER_AGE = CShared.MIN_USER_AGE || 18;
  const TAB_STORAGE_KEY = IS_CULTIVO_PAGE ? 'budganja_cultivo_tab' : 'budganja_perfil_tab';
  const DEFAULT_AVATAR = CShared.DEFAULT_AVATAR || '/imagens/avatars/inspector.svg';
  const PRESET_AVATARS = CShared.PRESET_AVATARS || [];
  const escapeHtml = CShared.escapeHtml || function (t) { return String(t); };
  const formatDate = CShared.formatDate || function (iso) { return iso || ''; };
  const todayDateInputValue = CShared.todayDateInputValue || function () { return new Date().toISOString().slice(0, 10); };
  const cloneGrowLogs = CShared.cloneGrowLogs || function (l) { return (l || []).slice(); };
  const createGrowLogObject = CShared.createGrowLogObject || function (n) { return { id: 'g' + Date.now(), name: n, entries: [] }; };
  const growWeekNumber = CShared.growWeekNumber || function () { return 1; };
  const growWeekDayRange = CShared.growWeekDayRange || function () { return ''; };
  const formatMetricsPlain = CShared.formatMetricsPlain || function () { return ''; };
  const daysSincePlanted = CShared.daysSincePlanted || function () { return 0; };
  const formatEntrySource = CShared.formatEntrySource || function () { return ''; };
  const csvEscape = CShared.csvEscape || function (v) { return String(v == null ? '' : v); };

  let user = null;
  let liveStatusTimer = null;
  let profileSaving = false;
  let entryMediaSaving = false;
  let planSaving = false;
  let selectedWeek = null;
  let selectedGrowLogId = null;
  let editingEntryId = null;
  let cultivoView = 'hub';
  let globalTasksBoardOpen = false;
  let growPostSaveActionsEl = null;
  let cultivoWizardPhase = 'germinacao';
  let editGrowPhase = 'germinacao';
  let editingGrowId = null;
  let selectedEntryAction = '';
  let pendingEntryPhotoFiles = [];
  let submissionStatusByGrow = null;
  let sectionNavBound = false;
  let activeSectionTab = 'diario';
  let cultivoAutosave = null;
  let activeMetricKey = '';
  let activeMetricInput = null;
  let activeMetricConfig = null;
  let activeMetricDraftValue = null;
  let lastMetricInIdeal = null;
  let lastMetricHapticAt = 0;

  const ENTRY_MEDIA_MAX_ITEMS = 4;
  const ENTRY_MEDIA_MAX_IMAGE_BYTES = 6 * 1024 * 1024;
  const ENTRY_MEDIA_MAX_IMAGE_RAW_BYTES = 25 * 1024 * 1024;
  const ENTRY_MEDIA_MAX_VIDEO_BYTES = 25 * 1024 * 1024;
  const ENTRY_IMAGE_MAX_SIDE = 1600;
  const ENTRY_IMAGE_TARGET_BYTES = 700 * 1024;
  const METRIC_PICKER_META = {
    ph: { label: 'pH', min: 0, max: 14, unit: '' },
    ec: { label: 'EC', min: 0, max: 10, unit: 'mS/cm' },
    temp: { label: 'Temperatura', min: -10, max: 60, unit: '°C' },
    rh: { label: 'Humidade relativa', min: 0, max: 100, unit: '%' }
  };
  const PHASE_LABELS_SHORT = {
    planejamento: 'Planejamento',
    germinacao: 'Germinação',
    vegetativo: 'Vegetativo',
    floracao: 'Floração',
    colheita: 'Colheita'
  };

  function persistSelectedGrowId(growId) {
    try {
      if (growId) sessionStorage.setItem(SELECTED_GROW_KEY, growId);
      else sessionStorage.removeItem(SELECTED_GROW_KEY);
    } catch (e) { /* ignore */ }
  }

  function setSectionNavVisible(visible) {
    if (!cultivoSectionNav) return;
    cultivoSectionNav.hidden = !visible;
  }

  function setActiveSectionTab(tabId) {
    activeSectionTab = tabId || 'diario';
    if (!cultivoSectionNav) return;
    cultivoSectionNav.querySelectorAll('.cultivo-section-nav-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === activeSectionTab);
    });
  }

  function initSectionNav() {
    if (!cultivoSectionNav || sectionNavBound) return;
    sectionNavBound = true;
    cultivoSectionNav.querySelectorAll('.cultivo-section-nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) {
          setActiveSectionTab(tab);
          switchTab(tab);
        }
      });
    });
    if ('IntersectionObserver' in window) {
      const sections = ['diario', 'semana', 'plano']
        .map((tab) => ({ tab, el: document.getElementById(
          tab === 'diario' ? 'cultivo-section-diario'
            : tab === 'semana' ? 'cultivo-section-roteiro'
              : 'cultivo-section-plano'
        ) }))
        .filter((item) => item.el);
      const observer = new IntersectionObserver((entries) => {
        if (cultivoView !== 'grow') return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
          const match = sections.find((item) => item.el === visible[0].target);
          if (match) setActiveSectionTab(match.tab);
        }
      }, { root: null, rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.2, 0.5] });
      sections.forEach((item) => observer.observe(item.el));
    }
  }

  async function loadSubmissionStatusMap(force) {
    if (submissionStatusByGrow && !force) return submissionStatusByGrow;
    const map = {};
    try {
      const res = await fetch('/api/cultivo/submissions', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        (data.submissions || []).forEach((sub) => {
          if (!sub.growId) return;
          const prev = map[sub.growId];
          if (!prev || String(sub.submittedAt || '') > String(prev.submittedAt || '')) {
            map[sub.growId] = sub;
          }
        });
      }
    } catch (e) { /* ignore */ }
    submissionStatusByGrow = map;
    return map;
  }

  function submissionBadgeHtml(sub) {
    if (!sub) return '';
    if (sub.status === 'pending') {
      return '<span class="cultivo-hub-card-badge is-pending">Em revisão</span>';
    }
    if (sub.status === 'approved') {
      return '<span class="cultivo-hub-card-badge is-approved">Publicada</span>';
    }
    if (sub.status === 'rejected') {
      return '<span class="cultivo-hub-card-badge is-rejected">Rejeitada</span>';
    }
    return '';
  }

  function growHasPublishableContent(log, profile) {
    if (CMarkdown.growHasPublishableContent) {
      return CMarkdown.growHasPublishableContent(log, profile);
    }
    const entries = log && Array.isArray(log.entries) ? log.entries : [];
    if (entries.length > 0) return true;
    const guide = log && log.customGuide ? String(log.customGuide).trim() : '';
    return guide.length >= 20;
  }

  function renderSubmitChecklist(log, profile) {
    const listEl = document.getElementById('cultivo-submit-checklist');
    const previewEl = document.getElementById('cultivo-submit-preview');
    const confirmBtn = document.getElementById('cultivo-submit-confirm');
    if (!log) return;
    const publishable = growHasPublishableContent(log, profile);
    const hasSpecies = !!(log.species && String(log.species).trim());
    const hasPhotos = (log.entries || []).some((entry) => Array.isArray(entry.photos) && entry.photos.length);
    const items = [
      { ok: !!(log.name && String(log.name).trim()), label: 'Nome da pesquisa definido', required: true },
      { ok: publishable, label: 'Pelo menos 1 registo no diário ou roteiro com 20+ caracteres', required: true },
      { ok: hasSpecies, label: 'Espécie ou linha indicada (recomendado)', required: false },
      { ok: hasPhotos, label: 'Fotos no diário (opcional, melhora a publicação)', required: false }
    ];
    if (listEl) {
      listEl.innerHTML = items.map((item) => {
        const cls = item.ok ? 'is-ok' : (item.required ? 'is-error' : 'is-warn');
        const icon = item.ok ? '✓' : (item.required ? '✕' : '!');
        return '<li class="' + cls + '"><span aria-hidden="true">' + icon + '</span><span>' + escapeHtml(item.label) + '</span></li>';
      }).join('');
    }
    if (previewEl && CMarkdown.buildGrowMarkdown) {
      const titleEl = document.getElementById('cultivo-submit-title');
      const title = titleEl ? String(titleEl.value).trim() : (log.name || 'Pesquisa');
      previewEl.textContent = CMarkdown.buildGrowMarkdown(log, profile, { title: title });
    }
    if (confirmBtn) confirmBtn.disabled = !publishable || !(log.name && String(log.name).trim());
  }

  function updateWeekInspectionLink(profile) {
    if (!weekInspectionLink || !profile) return;
    const phase = getEffectivePhase(profile);
    const inspection = PHASE_INSPECTION_LINKS[phase];
    const guide = getWeekGuideData(profile, getActiveWeek(profile));
    let href = inspection ? inspection.href : '/biblioteca/inspecoes/';
    let label = inspection ? inspection.label : 'Guia em vídeo';
    if (guide && Array.isArray(guide.tools)) {
      const libraryTool = guide.tools.find((tool) => tool.href && tool.href.indexOf('/biblioteca/') === 0);
      if (libraryTool) {
        href = libraryTool.href;
        label = libraryTool.label;
      }
    }
    weekInspectionLink.href = href;
    weekInspectionLink.textContent = label;
  }

  function maybeShowOnboarding(profile) {
    if (!cultivoOnboardingRoot || !COnboard.maybeStartTour) return;
    if (cultivoView !== 'hub') return;
    COnboard.maybeStartTour(cultivoOnboardingRoot, {
      growCount: profile && profile.growLogs ? profile.growLogs.length : 0
    });
  }

  function setWizardStatus(message, isError) {
    if (!cultivoWizardStatus) return;
    cultivoWizardStatus.textContent = message || '';
    cultivoWizardStatus.classList.toggle('is-error', !!isError);
  }

  const PHASE_LABELS = {
    planejamento: 'Planejamento',
    germinacao: 'Germinação',
    vegetativo: 'Vegetativo',
    floracao: 'Floração',
    colheita: 'Colheita'
  };

  const PHASE_ORDER = ['planejamento', 'germinacao', 'vegetativo', 'floracao', 'colheita'];

  /**
   * Arte do diário: cards dedicados (imagens/cultivo-cards/).
   * Planejamento e Sênior usam a série perfil-evolucao.
   */
  const PHASE_EVOLUTION = {
    planejamento: {
      dir: 'perfil-evolucao',
      file: '01-semente.png',
      short: 'Semente',
      blurb: 'O começo'
    },
    germinacao: {
      dir: 'cultivo-cards',
      file: 'germinacao.png',
      short: 'Germinação',
      blurb: 'A vida começa'
    },
    vegetativo: {
      dir: 'cultivo-cards',
      file: 'vegetativo.png',
      short: 'Vegetação',
      blurb: 'Crescimento'
    },
    floracao: {
      dir: 'cultivo-cards',
      file: 'floracao.png',
      short: 'Floração',
      blurb: 'O ciclo floresce'
    },
    colheita: {
      dir: 'cultivo-cards',
      file: 'colheita.png',
      short: 'Colheita',
      blurb: 'Momento da colheita'
    }
  };

  const SENIOR_EVOLUTION = {
    dir: 'perfil-evolucao',
    file: '07-cultivador-senior.png',
    short: 'Sênior',
    blurb: 'Experiência e excelência'
  };

  function assetVersionToken() {
    if (typeof ASSET_V !== 'undefined' && ASSET_V) return String(ASSET_V);
    const script = document.querySelector('script[src*="/js/layout.js"]');
    const match = script && String(script.getAttribute('src') || '').match(/[?&]v=([^&]+)/);
    return match ? match[1] : '241';
  }

  function phaseArtSrc(meta) {
    const dir = (meta && meta.dir) || 'cultivo-cards';
    const file = (meta && meta.file) || 'germinacao.png';
    return '/imagens/' + dir + '/' + file + '?v=' + encodeURIComponent(assetVersionToken());
  }

  function phaseIconHtml(phase, extraClass) {
    const meta = PHASE_EVOLUTION[phase] || PHASE_EVOLUTION.germinacao;
    const cls = 'cultivo-phase-art' + (extraClass ? ' ' + extraClass : '');
    return (
      '<img class="' + cls + '" src="' + escapeHtml(phaseArtSrc(meta)) + '"' +
      ' alt="" width="64" height="64" decoding="async" loading="lazy">'
    );
  }

  function phaseLabel(phase) {
    return PHASE_LABELS[phase] || phase || 'Germinação';
  }

  function phaseRank(phase) {
    const idx = PHASE_ORDER.indexOf(phase);
    return idx >= 0 ? idx : 1;
  }

  function renderEvolutionTrackHtml(currentPhase, options) {
    const opts = options || {};
    const current = currentPhase || 'germinacao';
    const currentIdx = phaseRank(current);
    const showSenior = !!opts.showSenior;
    const seniorUnlocked = !!opts.seniorUnlocked;
    const items = PHASE_ORDER.map((id, idx) => {
      const meta = PHASE_EVOLUTION[id];
      let state = 'is-upcoming';
      if (idx < currentIdx) state = 'is-done';
      if (idx === currentIdx) state = 'is-current';
      return (
        '<li class="cultivo-evo-step ' + state + '" data-phase="' + escapeHtml(id) + '">' +
        '<span class="cultivo-evo-step-icon" aria-hidden="true">' + phaseIconHtml(id) + '</span>' +
        '<span class="cultivo-evo-step-label">' + escapeHtml(meta.short) + '</span>' +
        '</li>'
      );
    }).join('');
    const seniorHtml = showSenior
      ? (
        '<li class="cultivo-evo-step cultivo-evo-step--senior ' + (seniorUnlocked ? 'is-current' : 'is-upcoming') + '">' +
        '<span class="cultivo-evo-step-icon" aria-hidden="true">' +
        '<img class="cultivo-phase-art" src="' + escapeHtml(phaseArtSrc(SENIOR_EVOLUTION)) + '"' +
        ' alt="" width="64" height="64" decoding="async" loading="lazy">' +
        '</span>' +
        '<span class="cultivo-evo-step-label">' + escapeHtml(SENIOR_EVOLUTION.short) + '</span>' +
        '</li>'
      )
      : '';
    return (
      '<div class="cultivo-evo-track" role="list" aria-label="Evolução do cultivo">' +
      '<ol class="cultivo-evo-steps">' + items + seniorHtml + '</ol>' +
      '</div>'
    );
  }

  function setCultivoWizardPhase(phase) {
    cultivoWizardPhase = phase || 'germinacao';
    const root = cultivoWizardForm || cultivoWizardView;
    if (!root) return;
    const hint = document.getElementById('cultivo-wizard-phase-hint');
    if (hint) {
      hint.innerHTML = 'Seleccionada: <strong>' + escapeHtml(phaseLabel(cultivoWizardPhase)) + '</strong>';
    }
    root.querySelectorAll('.cultivo-phase-chip').forEach((btn) => {
      const active = btn.getAttribute('data-phase') === cultivoWizardPhase;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function initCultivoWizardPhasePicker() {
    if (!cultivoWizardForm || cultivoWizardForm.dataset.phaseBound === '1') return;
    cultivoWizardForm.dataset.phaseBound = '1';
    cultivoWizardForm.addEventListener('click', (e) => {
      const chip = e.target.closest('.cultivo-phase-chip');
      if (!chip) return;
      e.preventDefault();
      e.stopPropagation();
      setCultivoWizardPhase(chip.getAttribute('data-phase'));
    });
  }

  function plantedAtToDateInput(plantedAt) {
    const match = String(plantedAt || '').match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : todayDateInputValue();
  }

  function setEditGrowPhase(phase) {
    editGrowPhase = phase || 'germinacao';
    const hint = document.getElementById('cultivo-edit-phase-hint');
    if (hint) {
      hint.innerHTML = 'Seleccionada: <strong>' + escapeHtml(phaseLabel(editGrowPhase)) + '</strong>';
    }
    if (!cultivoEditForm) return;
    cultivoEditForm.querySelectorAll('.cultivo-phase-chip').forEach((btn) => {
      const active = btn.getAttribute('data-phase') === editGrowPhase;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function initCultivoEditPhasePicker() {
    if (!cultivoEditForm || cultivoEditForm.dataset.phaseBound === '1') return;
    cultivoEditForm.dataset.phaseBound = '1';
    cultivoEditForm.addEventListener('click', (e) => {
      const chip = e.target.closest('.cultivo-phase-chip');
      if (!chip) return;
      e.preventDefault();
      e.stopPropagation();
      setEditGrowPhase(chip.getAttribute('data-phase'));
    });
  }

  function setEditModalStatus(message, isError) {
    if (!cultivoEditStatus) return;
    setStatus(cultivoEditStatus, message || '', !!isError);
  }

  function parseCultivoRoute() {
    const params = new URLSearchParams(window.location.search);
    const growId = params.get('grow');
    const tab = params.get('tab') || '';
    if (growId) return { view: 'grow', growId: growId, tab: tab };
    if (params.get('view') === 'novo') return { view: 'wizard' };
    return { view: 'hub' };
  }

  function cultivoRouteUrl(route) {
    if (route.view === 'grow' && route.growId) {
      let url = '/cultivo/?grow=' + encodeURIComponent(route.growId);
      if (route.tab) url += '&tab=' + encodeURIComponent(route.tab);
      return url;
    }
    if (route.view === 'wizard') return '/cultivo/?view=novo';
    return '/cultivo/';
  }

  function cultivoRoutesEqual(a, b) {
    if (!a || !b) return false;
    if (a.view !== b.view) return false;
    if (a.view === 'grow') {
      return a.growId === b.growId && (a.tab || '') === (b.tab || '');
    }
    return true;
  }

  function applyCultivoView(mode, growId, options) {
    const opts = options || {};
    cultivoView = mode || 'hub';

    if (cultivoHubView) cultivoHubView.hidden = cultivoView !== 'hub';
    if (cultivoTasksView) cultivoTasksView.hidden = cultivoView !== 'hub' || !globalTasksBoardOpen;
    if (cultivoWizardView) cultivoWizardView.hidden = cultivoView !== 'wizard';
    if (cultivoGrowView) cultivoGrowView.hidden = cultivoView !== 'grow';
    if (cultivoGrowBack) cultivoGrowBack.hidden = cultivoView !== 'grow';
    setSectionNavVisible(cultivoView === 'grow');
    if (cultivoView !== 'grow') closeGrowActionsMenu();

    if (cultivoView === 'hub') {
      selectedGrowLogId = null;
      persistSelectedGrowId(null);
      refreshCultivoHubFromServer();
      if (globalTasksBoardOpen && user && user.profile) {
        renderCultivoTasksBoard(user.profile);
      }
      return;
    }

    if (cultivoView === 'wizard') {
      if (opts.resetWizard !== false) {
        setCultivoWizardPhase('germinacao');
        if (cultivoWizardName) cultivoWizardName.value = '';
        if (cultivoWizardSpecies) cultivoWizardSpecies.value = '';
        if (cultivoWizardDate) cultivoWizardDate.value = todayDateInputValue();
        if (cultivoWizardPlants) cultivoWizardPlants.value = '1';
        if (cultivoWizardEnvironment) cultivoWizardEnvironment.value = '';
        if (cultivoWizardSubstrate) cultivoWizardSubstrate.value = '';
        setWizardDefaultsFromProfile(user && user.profile);
        setWizardStatus('');
        requestAnimationFrame(() => { if (cultivoWizardName) cultivoWizardName.focus(); });
      }
      return;
    }

    if (cultivoView === 'grow') {
      if (!user || !user.profile) {
        navigateCultivo({ view: 'hub' }, { replace: true, scroll: false });
        return;
      }
      ensureGrowLogs(user.profile);
      const logs = Array.isArray(user.profile.growLogs) ? user.profile.growLogs : [];
      const requestedGrowId = growId || '';
      const resolvedGrowId = requestedGrowId
        || selectedGrowLogId
        || user.profile.activeGrowLogId
        || (logs[0] && logs[0].id)
        || '';
      let log = logs.find((item) => item.id === resolvedGrowId) || null;
      if (!log && logs.length) {
        log = logs.find((item) => item.id === user.profile.activeGrowLogId)
          || logs.find((item) => item.id === selectedGrowLogId)
          || logs[0]
          || null;
      }
      if (!log) {
        navigateCultivo({ view: 'hub' }, { replace: true, scroll: false });
        return;
      }
      selectedGrowLogId = log.id;
      persistSelectedGrowId(log.id);
      user.profile.activeGrowLogId = log.id;
      syncPhaseFromActiveLog(user.profile);
      selectedWeek = getCurrentWeekNumber(user.profile.phaseStartedAt);
      const initialTab = opts.tab || new URLSearchParams(window.location.search).get('tab') || 'diario';
      setActiveSectionTab(initialTab);
      renderGrowPage(user.profile);
      if (!requestedGrowId || requestedGrowId !== log.id) {
        navigateCultivo({ view: 'grow', growId: log.id, tab: initialTab }, { replace: true, scroll: false, history: false });
      }
      if (initialTab && initialTab !== 'diario') {
        switchTab(initialTab, { skipRefresh: true, skipStash: true });
      }
      if (opts.scroll !== false && cultivoGrowView) {
        cultivoGrowView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function navigateCultivo(route, options) {
    const opts = Object.assign({ push: true, scroll: true }, options || {});
    const next = route || { view: 'hub' };
    const url = cultivoRouteUrl(next);
    const current = parseCultivoRoute();

    applyCultivoView(next.view, next.growId, {
      resetWizard: next.view === 'wizard' && opts.push !== false,
      scroll: opts.scroll,
      tab: next.tab || opts.tab || ''
    });

    if (opts.history === false) return;

    const state = { cultivo: next };
    if (opts.replace) {
      history.replaceState(state, '', url);
    } else if (opts.push && !cultivoRoutesEqual(current, next)) {
      history.pushState(state, '', url);
    }
  }

  function cultivoGoBack() {
    if (cultivoView === 'grow' || cultivoView === 'wizard') {
      navigateCultivo({ view: 'hub' }, { replace: false, scroll: true });
      return;
    }
    history.back();
  }

  function openGlobalTasksBoard(profile) {
    globalTasksBoardOpen = true;
    if (cultivoTasksView) cultivoTasksView.hidden = false;
    if (profile) renderCultivoTasksBoard(profile);
    if (cultivoTasksView) cultivoTasksView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeGlobalTasksBoard() {
    globalTasksBoardOpen = false;
    if (cultivoTasksView) cultivoTasksView.hidden = true;
    if (cultivoTasksStatus) setStatus(cultivoTasksStatus, '');
  }

  async function refreshCultivoHubFromServer() {
    try {
      await loadCultivoIntoProfile();
    } catch (e) { /* manter dados locais */ }
    if (user && user.profile) {
      await renderCultivoHub(user.profile);
    }
  }

  function initCultivoHistory() {
    if (window.__cultivoHistoryInit) return;
    window.__cultivoHistoryInit = true;
    window.addEventListener('popstate', (event) => {
      const route = (event.state && event.state.cultivo)
        ? event.state.cultivo
        : parseCultivoRoute();
      applyCultivoView(route.view, route.growId, { resetWizard: false, scroll: false });
    });
  }

  function renderGrowCardMeta(log) {
    const phaseLabel = formatProfileValue('phase', log.phase);
    const entryCount = Array.isArray(log.entries) ? log.entries.length : 0;
    const plants = log.plantCount != null ? log.plantCount : 1;
    return phaseLabel + ' · ' + plants + ' planta' + (plants === 1 ? '' : 's') +
      ' · dia ' + daysSincePlanted(log.plantedAt) +
      ' · ' + entryCount + ' registo' + (entryCount === 1 ? '' : 's');
  }

  function submissionStatusLabel(sub) {
    if (!sub) return '—';
    if (sub.status === 'pending') return 'Em revisão';
    if (sub.status === 'approved') return 'Publicada';
    if (sub.status === 'rejected') return 'Rejeitada';
    return '—';
  }

  function submissionStatusClass(sub) {
    if (!sub) return '';
    if (sub.status === 'pending') return 'is-pending';
    if (sub.status === 'approved') return 'is-approved';
    if (sub.status === 'rejected') return 'is-rejected';
    return '';
  }

  function countOpenPlanTasks(profile, growId) {
    const gid = growId || '';
    const all = Array.isArray(profile && profile.planTasks) ? profile.planTasks : [];
    return all.filter((task) => task && task.growId === gid && !task.done).length;
  }

  function formatRelativeUpdate(iso) {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (diffDays <= 0) return 'Actualizado hoje';
    if (diffDays === 1) return 'Actualizado ontem';
    if (diffDays < 7) return 'Actualizado há ' + diffDays + ' dias';
    return 'Actualizado em ' + formatDate(iso);
  }

  function computeHubTotals(profile, logs) {
    let entries = 0;
    let tasks = 0;
    logs.forEach((log) => {
      entries += Array.isArray(log.entries) ? log.entries.length : 0;
      tasks += countOpenPlanTasks(profile, log.id);
    });
    return { researches: logs.length, entries, tasks };
  }

  function renderHubStats(profile, logs) {
    if (!cultivoHubStats) return;
    if (!logs.length) {
      cultivoHubStats.hidden = true;
      cultivoHubStats.innerHTML = '';
      return;
    }
    const totals = computeHubTotals(profile, logs);
    cultivoHubStats.hidden = false;
    cultivoHubStats.innerHTML =
      '<button type="button" class="perfil-hub-chip cultivo-hub-stat" data-hub-stat="researches" aria-label="Ver pesquisas"><strong>' + totals.researches + '</strong> ' +
      (totals.researches === 1 ? 'pesquisa' : 'pesquisas') + '</button>' +
      '<button type="button" class="perfil-hub-chip cultivo-hub-stat" data-hub-stat="entries" aria-label="Abrir diário"><strong>' + totals.entries + '</strong> ' +
      (totals.entries === 1 ? 'registo' : 'registos') + '</button>' +
      '<button type="button" class="perfil-hub-chip cultivo-hub-stat' + (totals.tasks > 0 ? ' cultivo-hub-stat--alert' : '') + '" data-hub-stat="tasks" aria-label="Abrir tarefas"><strong>' + totals.tasks + '</strong> ' +
      (totals.tasks === 1 ? 'tarefa aberta' : 'tarefas abertas') + '</button>';

    cultivoHubStats.querySelectorAll('[data-hub-stat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const kind = btn.getAttribute('data-hub-stat');
        if (kind === 'researches') {
          if (cultivoHubList) cultivoHubList.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (kind === 'entries') {
          if (!logs.length) return;
          openGrowPage(logs[0].id, { tab: 'diario', scroll: true });
          return;
        }
        if (kind === 'tasks') {
          if (!logs.length) return;
          openGlobalTasksBoard(profile);
        }
      });
    });
  }

  function collectGlobalScheduledTasks(profile) {
    const growMap = new Map((profile.growLogs || []).map((log) => [log.id, log]));
    const tasks = Array.isArray(profile.planTasks) ? profile.planTasks.slice() : [];
    return tasks
      .filter((task) => task && task.growId && task.dueAt)
      .map((task) => {
        const grow = growMap.get(task.growId);
        return {
          id: task.id,
          label: task.label || 'Tarefa',
          dueAt: task.dueAt || '',
          done: !!task.done,
          actionType: task.actionType || '',
          growId: task.growId,
          growName: grow && grow.name ? grow.name : 'Pesquisa'
        };
      })
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return String(a.dueAt || '').localeCompare(String(b.dueAt || ''));
      });
  }

  async function setGlobalTaskDone(taskId, growId, done) {
    if (!user || !user.profile || !growId || !taskId) return;
    const tasks = planTasksForGrow(user.profile, growId);
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    task.done = !!done;
    setPlanTasksForGrow(user.profile, growId, tasks);
    renderCultivoTasksBoard(user.profile);
    await persistPlanTasks(cultivoTasksStatus || planoStatus);
  }

  function renderCultivoTasksBoard(profile) {
    if (!cultivoTasksList) return;
    const tasks = collectGlobalScheduledTasks(profile || {});
    if (!tasks.length) {
      cultivoTasksList.innerHTML = '';
      if (cultivoTasksEmpty) cultivoTasksEmpty.hidden = false;
      if (cultivoTasksStatus) setStatus(cultivoTasksStatus, 'Sem tarefas agendadas.');
      return;
    }
    if (cultivoTasksEmpty) cultivoTasksEmpty.hidden = true;
    if (cultivoTasksStatus) setStatus(cultivoTasksStatus, '');
    cultivoTasksList.innerHTML = tasks.map((task) =>
      '<li class="cultivo-task-item' + (task.done ? ' is-done' : '') + '">' +
      '<label class="cultivo-task-check">' +
      '<input type="checkbox" data-task-id="' + escapeHtml(task.id) + '" data-grow-id="' + escapeHtml(task.growId) + '"' + (task.done ? ' checked' : '') + '>' +
      '<span><strong>' + escapeHtml(task.label) + '</strong> · ' + escapeHtml(task.growName) +
      ' <span class="perfil-plano-due' + (isTaskOverdue(task) ? ' is-overdue' : '') + '">' + escapeHtml(formatTaskDueLabel(task)) + '</span></span>' +
      '</label>' +
      '<button type="button" class="cultivo-section-nav-btn cultivo-task-open" data-grow-id="' + escapeHtml(task.growId) + '">Abrir pesquisa</button>' +
      '</li>'
    ).join('');

    cultivoTasksList.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener('change', async () => {
        await setGlobalTaskDone(input.getAttribute('data-task-id'), input.getAttribute('data-grow-id'), input.checked);
      });
    });

    cultivoTasksList.querySelectorAll('.cultivo-task-open').forEach((btn) => {
      btn.addEventListener('click', () => {
        openGrowPage(btn.getAttribute('data-grow-id'), { tab: 'plano', scroll: true });
      });
    });
  }

  function buildResearchCardHtml(log, profile, statusMap) {
    const sub = statusMap[log.id];
    const phase = log.phase || 'germinacao';
    const phaseText = formatProfileValue('phase', phase);
    const phaseIcon = phaseIconHtml(phase);
    const entryCount = Array.isArray(log.entries) ? log.entries.length : 0;
    const plants = log.plantCount != null ? log.plantCount : 1;
    const dayNum = daysSincePlanted(log.plantedAt);
    const openTasks = countOpenPlanTasks(profile, log.id);
    const speciesLine = log.species
      ? escapeHtml(log.species)
      : '<span class="cultivo-research-card-muted">Espécie não indicada</span>';
    const statusCls = submissionStatusClass(sub);
    const statusText = submissionStatusLabel(sub);
    const statusHtml = sub && statusText !== '—'
      ? '<span class="cultivo-hub-card-badge ' + statusCls + '">' + escapeHtml(statusText) + '</span>'
      : '';
    const envLabel = log.environment ? formatProfileValue('environment', log.environment) : '';
    const subLabel = log.substrate ? formatProfileValue('substrate', log.substrate) : '';
    const tagsHtml = [envLabel, subLabel].filter(Boolean).map((label) =>
      '<span class="perfil-hub-chip">' + escapeHtml(label) + '</span>'
    ).join('');
    const updatedLine = formatRelativeUpdate(log.updatedAt || log.createdAt);
    const tasksStatClass = openTasks > 0 ? ' cultivo-research-stat--alert' : '';

    return (
      '<article class="card cultivo-research-card cultivo-research-card--' + escapeHtml(phase) + '" role="listitem" data-grow-id="' + escapeHtml(log.id) + '">' +
      '<a class="cultivo-research-card-link" href="/cultivo/?grow=' + encodeURIComponent(log.id) + '" data-grow-id="' + escapeHtml(log.id) + '" aria-label="Abrir pesquisa ' + escapeHtml(log.name) + '">' +
      '<div class="cultivo-research-card-top">' +
      '<div class="card-icon cultivo-research-phase-icon" aria-hidden="true">' + phaseIcon + '</div>' +
      '<div class="cultivo-research-card-heading">' +
      '<span class="cultivo-research-card-phase-pill">' + escapeHtml(phaseText) + '</span>' +
      '<h3 class="cultivo-research-card-name">' + escapeHtml(log.name) + '</h3>' +
      '<p class="cultivo-research-card-species">' + speciesLine + '</p>' +
      '</div>' +
      (statusHtml ? '<div class="cultivo-research-card-status-wrap">' + statusHtml + '</div>' : '') +
      '</div>' +
      (tagsHtml ? '<div class="cultivo-research-card-tags">' + tagsHtml + '</div>' : '') +
      '<div class="cultivo-research-card-stats" role="group" aria-label="Resumo da pesquisa">' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Dia</span><span class="cultivo-research-stat-value">' + dayNum + '</span></div>' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Registos</span><span class="cultivo-research-stat-value">' + entryCount + '</span></div>' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Plantas</span><span class="cultivo-research-stat-value">' + plants + '</span></div>' +
      '<div class="cultivo-research-stat' + tasksStatClass + '"><span class="cultivo-research-stat-label">Tarefas</span><span class="cultivo-research-stat-value">' + openTasks + '</span></div>' +
      '</div>' +
      '<div class="cultivo-research-card-footer">' +
      '<p class="cultivo-research-card-meta">Plantio ' + escapeHtml(formatDate(log.plantedAt)) +
      (updatedLine ? ' · ' + escapeHtml(updatedLine) : '') + '</p>' +
      '<span class="cultivo-research-card-cta">Abrir pesquisa<span class="cultivo-research-card-arrow" aria-hidden="true">→</span></span>' +
      '</div>' +
      '</a>' +
      '<div class="cultivo-research-card-quick">' +
      '<p class="cultivo-research-quick-label">Acesso rápido</p>' +
      '<div class="cultivo-research-quick-btns">' +
      '<button type="button" class="cultivo-section-nav-btn cultivo-research-quick-btn" data-grow-id="' + escapeHtml(log.id) + '" data-tab="diario">Diário</button>' +
      '<button type="button" class="cultivo-section-nav-btn cultivo-research-quick-btn" data-grow-id="' + escapeHtml(log.id) + '" data-tab="semana">Roteiro</button>' +
      '<button type="button" class="cultivo-section-nav-btn cultivo-research-quick-btn" data-grow-id="' + escapeHtml(log.id) + '" data-tab="plano">Plano</button>' +
      '<button type="button" class="cultivo-section-nav-btn cultivo-research-quick-btn cultivo-research-edit-btn" data-grow-id="' + escapeHtml(log.id) + '" data-action="edit" aria-label="Editar diário ' + escapeHtml(log.name) + '">Editar</button>' +
      '</div></div>' +
      '</article>'
    );
  }

  function bindResearchCards() {
    if (!cultivoHubList) return;
    cultivoHubList.querySelectorAll('.cultivo-research-card-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openGrowPage(link.getAttribute('data-grow-id'));
      });
    });
    cultivoHubList.querySelectorAll('.cultivo-research-quick-btn').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (btn.getAttribute('data-action') === 'edit') {
          openEditGrowModal(btn.getAttribute('data-grow-id'));
          return;
        }
        openGrowPage(btn.getAttribute('data-grow-id'), { tab: btn.getAttribute('data-tab') || 'diario' });
      });
    });
  }

  function closeGrowActionsMenu() {
    if (!growActionsToggle || !growActionsPanel || !growActionsMenu) return;
    growActionsPanel.hidden = true;
    growActionsToggle.setAttribute('aria-expanded', 'false');
    growActionsMenu.classList.remove('is-open');
  }

  function toggleGrowActionsMenu() {
    if (!growActionsToggle || !growActionsPanel || !growActionsMenu) return;
    const open = growActionsPanel.hidden;
    growActionsPanel.hidden = !open;
    growActionsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    growActionsMenu.classList.toggle('is-open', open);
  }

  function bindGrowActionsMenu() {
    if (!growActionsToggle || !growActionsPanel) return;
    growActionsToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleGrowActionsMenu();
    });
    growActionsPanel.querySelectorAll('button[role="menuitem"]').forEach((btn) => {
      btn.addEventListener('click', () => closeGrowActionsMenu());
    });
    document.addEventListener('click', (event) => {
      if (!growActionsMenu || growActionsPanel.hidden) return;
      if (!growActionsMenu.contains(event.target)) closeGrowActionsMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeGrowActionsMenu();
    });
  }

  async function renderCultivoHub(profile) {
    ensureGrowLogs(profile);
    const logs = (profile.growLogs || []).slice().sort((a, b) => {
      const ta = String(b.updatedAt || b.createdAt || b.plantedAt || '');
      const tb = String(a.updatedAt || a.createdAt || a.plantedAt || '');
      return ta.localeCompare(tb);
    });
    const hasLogs = logs.length > 0;
    if (cultivoHubEmpty) {
      cultivoHubEmpty.hidden = hasLogs;
    }
    if (cultivoHubList) cultivoHubList.hidden = !hasLogs;
    if (cultivoOnboardingRoot && hasLogs) {
      cultivoOnboardingRoot.hidden = true;
      cultivoOnboardingRoot.innerHTML = '';
    }
    renderHubStats(profile, logs);
    if (cultivoHubSummary) {
      cultivoHubSummary.textContent = hasLogs
        ? ''
        : 'Toque em «Nova pesquisa» para começar o primeiro diário de campo.';
    }
    if (!cultivoHubList) return;
    if (!hasLogs) {
      cultivoHubList.innerHTML = '';
      maybeShowOnboarding(profile);
      return;
    }
    const statusMap = await loadSubmissionStatusMap(true);
    cultivoHubList.innerHTML = logs.map((log) => buildResearchCardHtml(log, profile, statusMap)).join('');
    bindResearchCards();
    renderSubmissionNotifications(profile);
  }

  function renderGrowHeader(log, profile) {
    if (!cultivoGrowHeader || !log) return;
    const phase = log.phase || 'germinacao';
    cultivoGrowHeader.className =
      'cultivo-grow-header info-panel highlight-card card cultivo-research-card cultivo-research-card--' + phase;
    const phaseLabel = formatProfileValue('phase', log.phase);
    const phaseIcon = phaseIconHtml(log.phase || 'germinacao');
    const plants = log.plantCount != null ? log.plantCount : 1;
    const weeks = getRoteiroWeeks(profile || {});
    const current = getCurrentWeekNumber(log.plantedAt || profile.phaseStartedAt);
    const ctx = getGrowContext(log, profile);
    const envLabel = ctx.environment ? formatProfileValue('environment', ctx.environment) : '';
    const subLabel = ctx.substrate ? formatProfileValue('substrate', ctx.substrate) : '';
    const entryCount = Array.isArray(log.entries) ? log.entries.length : 0;
    const openTasks = countOpenPlanTasks(profile, log.id);
    const growUpdatedLine = formatRelativeUpdate(log.updatedAt || log.createdAt);
    cultivoGrowHeader.innerHTML =
      '<div class="cultivo-grow-header-top">' +
      '<span class="card-icon cultivo-research-phase-icon cultivo-grow-header-icon" aria-hidden="true">' + phaseIcon + '</span>' +
      '<div class="cultivo-grow-header-copy">' +
      '<span class="cultivo-research-card-phase-pill">' + escapeHtml(phaseLabel) + '</span>' +
      '<h2 class="cultivo-grow-title">' + escapeHtml(log.name) + '</h2>' +
      (log.species ? '<p class="cultivo-grow-species">' + escapeHtml(log.species) + '</p>' : '') +
      '</div></div>' +
      (function () {
        const tags = [envLabel, subLabel].filter(Boolean).map((label) =>
          '<span class="perfil-hub-chip">' + escapeHtml(label) + '</span>'
        ).join('');
        return tags ? '<div class="cultivo-research-card-tags cultivo-grow-header-tags">' + tags + '</div>' : '';
      })() +
      '<div class="cultivo-research-card-stats cultivo-grow-header-stats" role="group" aria-label="Resumo da pesquisa">' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Dia</span><span class="cultivo-research-stat-value">' + daysSincePlanted(log.plantedAt) + '</span></div>' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Registos</span><span class="cultivo-research-stat-value">' + entryCount + '</span></div>' +
      '<div class="cultivo-research-stat"><span class="cultivo-research-stat-label">Plantas</span><span class="cultivo-research-stat-value">' + plants + '</span></div>' +
      '<div class="cultivo-research-stat' + (openTasks > 0 ? ' cultivo-research-stat--alert' : '') + '"><span class="cultivo-research-stat-label">Tarefas</span><span class="cultivo-research-stat-value">' + openTasks + '</span></div>' +
      '</div>' +
      '<p class="cultivo-grow-meta">Plantio ' + escapeHtml(formatDate(log.plantedAt)) +
      (growUpdatedLine ? ' · ' + escapeHtml(growUpdatedLine) : '') +
      (weeks.length ? ' · semana ' + current + ' de ' + weeks.length + ' nesta fase' : '') + '</p>';
  }

  function openGrowPage(logId, options) {
    if (!user || !user.profile) return;
    const log = (user.profile.growLogs || []).find((item) => item.id === logId);
    if (!log) return;
    const opts = options || {};
    const route = { view: 'grow', growId: logId };
    if (opts.tab) route.tab = opts.tab;
    navigateCultivo(route, opts);
  }

  function renderGrowPage(profile) {
    let log = (profile.growLogs || []).find((item) => item.id === selectedGrowLogId);
    if (!log) {
      log = getSelectedGrowLog(profile) || getActiveGrowLog(profile) || (profile.growLogs && profile.growLogs[0]) || null;
      if (!log) {
        navigateCultivo({ view: 'hub' }, { replace: true, scroll: false });
        return;
      }
      selectedGrowLogId = log.id;
      persistSelectedGrowId(log.id);
      navigateCultivo({ view: 'grow', growId: log.id, tab: activeSectionTab || 'diario' }, { replace: true, scroll: false });
      return;
    }
    renderGrowHeader(log, profile);
    renderGrowDetailContent(log, profile);
    loadGrowSubmissionStatus(log.id);
    renderTimeline(profile);
    renderWeekGuide(profile);
    renderPlanTasks(profile);
    if (customGuideEl) customGuideEl.value = log.customGuide || '';
    fillGrowSetupFields(log);
    if (CCharts.renderMetricsCharts && growMetricsCharts) {
      CCharts.renderMetricsCharts(growMetricsCharts, log);
    }
  }

  async function createGrowFromWizard(name, phase, plantCount, species, environment, substrate, plantedDate) {
    if (!user || !user.profile) return null;
    const env = environment || (user.profile.environment || '');
    const sub = substrate || (user.profile.substrate || '');
    const chosenDate = plantedDate || todayDateInputValue();
    const plantedAt = chosenDate + 'T12:00:00';
    const log = createGrowLogObject(name, plantedAt, phase, plantCount, species, env, sub);
    ensureGrowLogs(user.profile);
    user.profile.growLogs.unshift(log);
    user.profile.activeGrowLogId = log.id;
    selectedGrowLogId = log.id;
    persistSelectedGrowId(log.id);
    syncPhaseFromActiveLog(user.profile);
    selectedWeek = getCurrentWeekNumber(user.profile.phaseStartedAt);
    if (COnboard.markDone) COnboard.markDone();
    await seedDefaultPlanIfEmpty(user.profile);
    const saved = await persistGrowLogs(cultivoWizardStatus);
    if (!saved) {
      user.profile.growLogs = user.profile.growLogs.filter((item) => item.id !== log.id);
      if (user.profile.activeGrowLogId === log.id) {
        user.profile.activeGrowLogId = user.profile.growLogs[0] ? user.profile.growLogs[0].id : '';
      }
      selectedGrowLogId = null;
      persistSelectedGrowId(null);
      return null;
    }
    return log;
  }

  const avatarPreviewEl = document.getElementById('profile-avatar-preview');
  const avatarPresetsEl = document.getElementById('profile-avatar-presets');
  const avatarUrlEl = document.getElementById('profile-avatar-url');
  const avatarFileEl = document.getElementById('profile-avatar-file');
  const avatarUploadLabelEl = document.getElementById('profile-avatar-upload-label');
  let avatarUploadPending = false;

  function getProfilePicture(data) {
    if (!data) return DEFAULT_AVATAR;
    const custom = data.profile && data.profile.avatarUrl ? String(data.profile.avatarUrl).trim() : '';
    if (custom) return custom;
    if (data.picture) return data.picture;
    if (data.googlePicture) return data.googlePicture;
    return DEFAULT_AVATAR;
  }

  function broadcastProfilePicture(data) {
    const source = data || user;
    const picture = getProfilePicture(source);
    const name = source && (source.name || (source.profile && source.profile.displayName) || '');
    window.dispatchEvent(new CustomEvent('budganja:user-profile', {
      detail: { picture: picture, name: name }
    }));
  }

  async function persistAvatarChoice(message) {
    if (!user || !user.profile) return null;
    const avatarUrl = user.profile.avatarUrl != null
      ? String(user.profile.avatarUrl).trim()
      : (avatarUrlEl ? avatarUrlEl.value.trim() : '');

    updateUserHeader(user);
    broadcastProfilePicture(user);

    try {
      const res = await fetch('/api/user/profile/avatar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ avatarUrl: avatarUrl })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        flashLiveStatus(data.error || 'Erro ao guardar foto do perfil.', true);
        setStatus(formStatus, data.error || 'Erro ao guardar foto.', true);
        return null;
      }
      user = data.user;
      if (user && user.profile) {
        if (avatarUrlEl) avatarUrlEl.value = user.profile.avatarUrl || '';
        ensureGrowLogs(user.profile);
      }
      updateUserHeader(user);
      broadcastProfilePicture(user);
      if (message) {
        flashLiveStatus(message);
        setStatus(formStatus, message);
      }
      return user;
    } catch (err) {
      flashLiveStatus('Servidor indisponível — tente de novo.', true);
      setStatus(formStatus, 'Servidor indisponível.', true);
      return null;
    }
  }

  function setAvatarPreview(url) {
    const src = url || DEFAULT_AVATAR;
    if (avatarPreviewEl) avatarPreviewEl.src = src;
    if (avatarUrlEl) avatarUrlEl.value = url || '';
    if (user && user.profile) {
      user.profile.avatarUrl = url || '';
    }
    if (avatarPresetsEl) {
      avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
        const match = btn.getAttribute('data-src') === url
          || (!url && btn.getAttribute('data-src') === DEFAULT_AVATAR);
        btn.classList.toggle('is-active', match);
        btn.setAttribute('aria-selected', match ? 'true' : 'false');
      });
    }
    updateAvatarStatus(url);
    if (user) updateUserHeader(user);
  }

  function updateAvatarStatus(url) {
    const statusEl = document.getElementById('profile-avatar-status');
    if (!statusEl) return;
    const custom = String(url || '').trim();
    if (!custom) {
      statusEl.textContent = user && user.googlePicture
        ? 'A usar a foto da conta Google.'
        : 'Escolha um avatar abaixo ou envie a sua foto.';
      return;
    }
    if (custom.indexOf('/uploads/avatar-') === 0) {
      statusEl.textContent = 'Foto personalizada seleccionada.';
      return;
    }
    const preset = PRESET_AVATARS.find((item) => item.src === custom);
    statusEl.textContent = preset
      ? 'Avatar «' + preset.label + '» seleccionado.'
      : 'Avatar seleccionado.';
  }

  function initAvatarPicker() {
    if (!avatarPresetsEl) return;
    avatarPresetsEl.innerHTML = PRESET_AVATARS.map((item) =>
      '<button type="button" class="perfil-avatar-option" role="option" data-src="' + item.src + '" ' +
      'data-label="' + escapeHtml(item.label) + '" aria-label="' + escapeHtml(item.label) + '" title="' + escapeHtml(item.label) + '">' +
      '<span class="perfil-avatar-option-img-wrap">' +
      '<img src="' + item.src + '" alt="" width="52" height="52" loading="lazy">' +
      '</span>' +
      '<span class="perfil-avatar-option-label">' + escapeHtml(item.label) + '</span>' +
      '</button>'
    ).join('');

    avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const src = btn.getAttribute('data-src');
        const label = btn.getAttribute('data-label') || 'Avatar';
        setAvatarPreview(src);
        if (avatarFileEl) avatarFileEl.value = '';
        if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Enviar foto';
        await persistAvatarChoice('Avatar «' + label + '» guardado.');
      });
    });

    const googleBtn = document.getElementById('profile-avatar-google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', async () => {
        if (!user || !user.googlePicture) return;
        user.profile.avatarUrl = '';
        if (avatarUrlEl) avatarUrlEl.value = '';
        if (avatarPreviewEl) avatarPreviewEl.src = user.googlePicture;
        if (avatarFileEl) avatarFileEl.value = '';
        if (avatarPresetsEl) {
          avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
          });
        }
        updateAvatarStatus('');
        await persistAvatarChoice('Foto Google restaurada.');
      });
    }

    if (avatarFileEl) {
      avatarFileEl.addEventListener('change', async () => {
        const file = avatarFileEl.files && avatarFileEl.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          setStatus(formStatus, 'A imagem deve ter no máximo 2 MB.', true);
          avatarFileEl.value = '';
          return;
        }
        if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
          setStatus(formStatus, 'Use JPG, PNG ou WebP.', true);
          avatarFileEl.value = '';
          return;
        }
        avatarUploadPending = true;
        if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'A enviar…';
        setStatus(formStatus, 'A enviar foto…');

        try {
          const dataUrl = await readFileAsDataUrl(file);
          const res = await fetch('/api/user/avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ data: dataUrl })
          });
          const payload = await res.json().catch(() => ({}));
          if (!res.ok) {
            setStatus(formStatus, payload.error || 'Falha no upload.', true);
            return;
          }
          if (payload.user) {
            user = payload.user;
            if (user.profile && user.profile.avatarUrl) {
              setAvatarPreview(user.profile.avatarUrl);
            } else if (payload.url) {
              setAvatarPreview(payload.url);
            }
          } else if (payload.url) {
            setAvatarPreview(payload.url);
            await persistAvatarChoice('Foto guardada no perfil.');
            return;
          }
          updateUserHeader(user);
          broadcastProfilePicture(user);
          if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Alterar foto';
          flashLiveStatus('Foto guardada no perfil.');
          setStatus(formStatus, 'Foto guardada no perfil.');
        } catch (err) {
          setStatus(formStatus, 'Servidor indisponível.', true);
        } finally {
          avatarUploadPending = false;
        }
      });
    }
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function fillAvatarFields(profile, data) {
    const custom = profile && profile.avatarUrl ? String(profile.avatarUrl).trim() : '';
    const googleBtn = document.getElementById('profile-avatar-google-btn');
    if (googleBtn) {
      googleBtn.hidden = !(data && data.googlePicture);
    }
    if (custom) {
      setAvatarPreview(custom);
      if (avatarUploadLabelEl) {
        avatarUploadLabelEl.textContent = custom.indexOf('/uploads/avatar-') === 0
          ? 'Alterar foto'
          : 'Enviar foto';
      }
      return;
    }
    const google = data && data.googlePicture;
    const preview = google || DEFAULT_AVATAR;
    if (avatarPreviewEl) avatarPreviewEl.src = preview;
    if (avatarUrlEl) avatarUrlEl.value = '';
    if (user && user.profile) user.profile.avatarUrl = '';
    if (avatarPresetsEl) {
      avatarPresetsEl.querySelectorAll('.perfil-avatar-option').forEach((btn) => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
    }
    if (avatarUploadLabelEl) avatarUploadLabelEl.textContent = 'Enviar foto';
    updateAvatarStatus('');
  }

  const PHASE_OPTIONS = [
    { id: 'planejamento', label: 'Planejamento' },
    { id: 'germinacao', label: 'Germinação' },
    { id: 'vegetativo', label: 'Vegetativo' },
    { id: 'floracao', label: 'Floração' },
    { id: 'colheita', label: 'Colheita' }
  ];

  const QUICK_LINKS = [
    { label: 'Sorteios', href: '/sorteios/', icon: '🎁', desc: 'Inscrição e prémios' },
    { label: 'Super Calculadora', href: '/calculadoras/cultivo-lab.html', icon: '🧪', desc: 'VPD, DLI, pH, EC e mais' },
    { label: 'Inspeções', href: '/biblioteca/inspecoes/', icon: '🔍', desc: 'Guia em relatórios técnicos' },
    { label: 'Luxímetro', href: '/calculadoras/luximetro.html', icon: '💡', desc: 'Medir luz' }
  ];

  const PROFILE_VALUE_LABELS = {
    experience: { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' },
    environment: { indoor: 'Indoor (tenda/gabinete)', outdoor: 'Outdoor', estufa: 'Estufa' },
    substrate: {
      'solo-organico': 'Solo orgânico',
      'super-solo': 'Super solo (amendments)',
      coco: 'Fibra de coco',
      hidroponia: 'Hidroponia (inerte)',
      outro: 'Outro'
    },
    method: { vaso: 'Vaso / pote', bed: 'Cama / raised bed', dwc: 'DWC', aeroponia: 'Aeroponia', outro: 'Outro' },
    phase: {
      planejamento: 'Planejamento',
      germinacao: 'Germinação',
      vegetativo: 'Vegetativo',
      floracao: 'Floração',
      colheita: 'Colheita / secagem'
    }
  };

  const PHASE_PLAN_DEFAULTS = {
    planejamento: [
      { label: 'Definir espaço e iluminação (W/m²)', href: '/calculadoras/cultivo-lab.html?mode=watts-m2' },
      { label: 'Planear substrato ou super solo', href: '/calculadoras/super-solo.html' },
      { label: 'Ver guia de cultivo em vídeo', href: '/biblioteca/inspecoes/' }
    ],
    germinacao: [
      { label: 'Controlar humidade e temperatura (VPD)', href: '/calculadoras/cultivo-lab.html?mode=vpd' },
      { label: 'Anotar data de germinação no diário', href: '' },
      { label: 'Consultar guia — germinação', href: '/biblioteca/inspecoes/' }
    ],
    vegetativo: [
      { label: 'Medir luz (luxímetro ou DLI)', href: '/calculadoras/luximetro.html' },
      { label: 'Ajustar VPD no ambiente', href: '/calculadoras/cultivo-lab.html?mode=vpd' },
      { label: 'Registar EC/pH se usar coco ou hidro', href: '/calculadoras/cultivo-lab.html?mode=ec' }
    ],
    floracao: [
      { label: 'Monitorizar VPD na floração', href: '/calculadoras/cultivo-lab.html?mode=vpd' },
      { label: 'Verificar faixa de pH', href: '/calculadoras/cultivo-lab.html?mode=ph' },
      { label: 'Anotar semanas de flora no diário', href: '' }
    ],
    colheita: [
      { label: 'Planear secagem e cura', href: '/biblioteca/inspecoes/' },
      { label: 'Registar peso e observações finais', href: '' }
    ]
  };

  const PHASE_WEEK_LIMITS = {
    planejamento: 12,
    germinacao: 8,
    vegetativo: 16,
    floracao: 16,
    colheita: 10
  };

  function setStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message || '';
    el.style.color = isError ? 'var(--color-danger)' : '';
  }

  function flashLiveStatus(message, isError) {
    if (!liveStatusEl || !message) return;
    liveStatusEl.hidden = false;
    liveStatusEl.textContent = message;
    liveStatusEl.classList.toggle('is-error', !!isError);
    liveStatusEl.classList.remove('is-fade');
    clearTimeout(liveStatusTimer);
    liveStatusTimer = setTimeout(() => {
      liveStatusEl.classList.add('is-fade');
      setTimeout(() => {
        liveStatusEl.hidden = true;
        liveStatusEl.classList.remove('is-fade');
      }, 350);
    }, 3200);
  }

  function ensureGrowPostSaveActions() {
    if (growPostSaveActionsEl) return growPostSaveActionsEl;
    const existing = document.getElementById('perfil-grow-postsave-actions');
    if (existing) {
      growPostSaveActionsEl = existing;
      return growPostSaveActionsEl;
    }
    if (!growEntryForm || !growDetailStatus || !growDetailStatus.parentNode) return null;
    const el = document.createElement('div');
    el.id = 'perfil-grow-postsave-actions';
    el.className = 'perfil-grow-postsave-actions';
    el.hidden = true;
    growDetailStatus.parentNode.insertBefore(el, growDetailStatus);
    growPostSaveActionsEl = el;
    return growPostSaveActionsEl;
  }

  function hideGrowPostSaveActions() {
    const el = ensureGrowPostSaveActions();
    if (!el) return;
    el.hidden = true;
    el.innerHTML = '';
  }

  function showGrowPostSaveActions() {
    const el = ensureGrowPostSaveActions();
    if (!el) return;
    el.innerHTML =
      '<p class="perfil-grow-postsave-title">Registo guardado. O que deseja fazer agora?</p>' +
      '<div class="perfil-grow-postsave-buttons">' +
      '<button type="button" class="botao botao-outline botao-sm" data-postsave-action="new">Adicionar outro registo</button>' +
      '<button type="button" class="botao botao-sm" data-postsave-action="hub">Voltar às pesquisas</button>' +
      '</div>';
    el.hidden = false;
    el.querySelectorAll('button[data-postsave-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-postsave-action');
        if (action === 'new') {
          hideGrowPostSaveActions();
          clearEntryForm();
          if (growEntryForm) growEntryForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          requestAnimationFrame(() => {
            if (growEntryText) growEntryText.focus();
          });
          return;
        }
        if (action === 'hub') {
          hideGrowPostSaveActions();
          navigateCultivo({ view: 'hub' }, { replace: false, scroll: true });
        }
      });
    });
  }

  function enhanceDatePickerTouch(inputEl) {
    if (!inputEl) return;
    const openPicker = () => {
      inputEl.focus({ preventScroll: true });
      if (typeof inputEl.showPicker === 'function') {
        try {
          inputEl.showPicker();
        } catch (_) {}
      }
    };
    const field = inputEl.closest('.conta-field');
    if (field) {
      field.addEventListener('click', (event) => {
        if (!event || event.target === inputEl) return;
        openPicker();
      });
    }
    inputEl.addEventListener('click', openPicker);
    inputEl.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPicker();
      }
    });
  }


  function mergeProfileFromPayload(serverProfile, payload) {
    if (!serverProfile || !payload) return serverProfile;
    const merged = Object.assign({}, serverProfile);
    if (Array.isArray(payload.growLogs)) {
      merged.growLogs = cloneGrowLogs(payload.growLogs);
      merged.activeGrowLogId = payload.activeGrowLogId || merged.activeGrowLogId;
    }
    if (Array.isArray(payload.planTasks)) merged.planTasks = payload.planTasks.slice();
    if (payload.guideWeekNotes && typeof payload.guideWeekNotes === 'object') {
      merged.guideWeekNotes = Object.assign({}, payload.guideWeekNotes);
    }
    if (payload.customGuide !== undefined) merged.customGuide = payload.customGuide;
    if (payload.phase) merged.phase = payload.phase;
    if (payload.phaseStartedAt) merged.phaseStartedAt = payload.phaseStartedAt;
    if (payload.avatarUrl !== undefined) merged.avatarUrl = payload.avatarUrl;
    ensureGrowLogs(merged);
    syncPhaseFromActiveLog(merged);
    return merged;
  }

  function updateUserHeader(data) {
    const avatar = document.getElementById('perfil-avatar');
    const nameEl = document.getElementById('perfil-name');
    const emailEl = document.getElementById('perfil-email');
    if (avatar && data) {
      const pic = getProfilePicture(data);
      avatar.src = pic;
      avatar.alt = data.name || 'Avatar';
      avatar.hidden = false;
    }
    if (nameEl) {
      if (IS_CULTIVO_PAGE) {
        nameEl.textContent = isUserProfileComplete(data)
          ? firstName(data.profile, data.name) + ' · pesquisas'
          : 'Minhas pesquisas';
      } else {
        nameEl.textContent = isUserProfileComplete(data)
          ? 'Olá, ' + firstName(data.profile, data.name) + '!'
          : ((data.profile && data.profile.displayName) || data.name || 'Meu perfil');
      }
    }
    if (emailEl) emailEl.textContent = data.email || '';
  }

  function refreshUI(options) {
    const opts = options || {};
    if (!user || !user.profile || !isUserProfileComplete(user)) return;
    ensureGrowLogs(user.profile);
    if (cultivoView === 'grow' && selectedGrowLogId) {
      renderGrowPage(user.profile);
    } else if (cultivoView === 'hub') {
      renderCultivoHub(user.profile);
      if (globalTasksBoardOpen) renderCultivoTasksBoard(user.profile);
    }
    if (opts.tab) switchTab(opts.tab, { skipRefresh: true, skipStash: opts.skipStash });
    if (opts.scrollTo) {
      requestAnimationFrame(() => {
        const target = typeof opts.scrollTo === 'string'
          ? document.getElementById(opts.scrollTo)
          : opts.scrollTo;
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }


  const JOURNAL_MAX_LENGTH = 8000;


  function getEffectivePhaseFromProfileOnly(profile) {
    const phase = profile && profile.phase;
    if (phase && getPhaseWeeks(phase).length) return phase;
    return 'planejamento';
  }

  function getActiveGrowLog(profile) {
    if (!profile || !Array.isArray(profile.growLogs) || !profile.growLogs.length) return null;
    const id = profile.activeGrowLogId;
    if (id) {
      const found = profile.growLogs.find((log) => log.id === id);
      if (found) return found;
    }
    return profile.growLogs[0] || null;
  }

  function getSelectedGrowLog(profile) {
    if (!profile || !Array.isArray(profile.growLogs) || !profile.growLogs.length) return null;
    const id = selectedGrowLogId || profile.activeGrowLogId;
    if (!id) return null;
    return profile.growLogs.find((log) => log.id === id) || null;
  }

  function ensureGrowFields(log) {
    if (!log) return;
    if (log.customGuide == null) log.customGuide = '';
    if (!log.guideWeekNotes || typeof log.guideWeekNotes !== 'object') log.guideWeekNotes = {};
    if (log.environment == null) log.environment = '';
    if (log.substrate == null) log.substrate = '';
  }

  function getGrowContext(log, profile) {
    const p = profile || (user && user.profile) || {};
    return {
      environment: (log && log.environment) || p.environment || '',
      substrate: (log && log.substrate) || p.substrate || ''
    };
  }

  function loadSubmissionNotifyState() {
    try {
      return JSON.parse(localStorage.getItem(SUBMISSION_NOTIFY_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveSubmissionNotifyState(state) {
    try {
      localStorage.setItem(SUBMISSION_NOTIFY_KEY, JSON.stringify(state || {}));
    } catch (e) { /* ignore */ }
  }

  function markSubmissionNotificationSeen(growId, submission) {
    if (!growId || !submission) return;
    const state = loadSubmissionNotifyState();
    state[growId] = {
      id: submission.id || submission.submittedAt || '',
      status: submission.status || '',
      seenAt: new Date().toISOString()
    };
    saveSubmissionNotifyState(state);
    renderSubmissionNotifications(user && user.profile);
  }

  function renderSubmissionNotifications(profile) {
    if (!cultivoSubmissionNotify) return;
    if (!profile || cultivoView !== 'hub') {
      cultivoSubmissionNotify.hidden = true;
      cultivoSubmissionNotify.innerHTML = '';
      return;
    }
    const statusMap = submissionStatusByGrow || {};
    const seen = loadSubmissionNotifyState();
    const notices = (profile.growLogs || []).map((log) => {
      const sub = statusMap[log.id];
      if (!sub || sub.status === 'pending') return null;
      const prev = seen[log.id];
      if (prev && prev.id === (sub.id || sub.submittedAt) && prev.status === sub.status) return null;
      return { log: log, sub: sub };
    }).filter(Boolean);
    if (!notices.length) {
      cultivoSubmissionNotify.hidden = true;
      cultivoSubmissionNotify.innerHTML = '';
      return;
    }
    cultivoSubmissionNotify.hidden = false;
    cultivoSubmissionNotify.className = 'cultivo-submission-notify' +
      (notices.some((item) => item.sub.status === 'rejected') ? ' is-rejected' : '');
    cultivoSubmissionNotify.innerHTML = notices.map((item) => {
      const growName = escapeHtml(item.log.name || 'Pesquisa');
      if (item.sub.status === 'approved') {
        return '<p><strong>«' + growName + '»</strong> foi publicada no site.' +
          (item.sub.postUrl ? ' <a href="' + escapeHtml(item.sub.postUrl) + '">Ver pesquisa</a>' : '') + '</p>';
      }
      return '<p><strong>«' + growName + '»</strong> — submissão rejeitada' +
        (item.sub.reviewerNote ? ': ' + escapeHtml(item.sub.reviewerNote) : '') + '.</p>';
    }).join('') +
      '<div class="cultivo-submission-notify-actions">' +
      notices.map((item) =>
        '<button type="button" class="botao botao-outline botao-sm" data-notify-grow="' + escapeHtml(item.log.id) + '" data-notify-id="' + escapeHtml(item.sub.id || item.sub.submittedAt || '') + '">Marcar «' + escapeHtml(item.log.name) + '» como lida</button>'
      ).join('') +
      '</div>';
    cultivoSubmissionNotify.querySelectorAll('[data-notify-grow]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const growId = btn.getAttribute('data-notify-grow');
        const sub = statusMap[growId];
        if (sub) markSubmissionNotificationSeen(growId, sub);
      });
    });
  }

  function duplicateGrowLog(sourceLog) {
    if (!sourceLog || !user || !user.profile) return null;
    const copy = createGrowLogObject(
      (sourceLog.name || 'Pesquisa') + ' (cópia)',
      sourceLog.plantedAt,
      sourceLog.phase,
      sourceLog.plantCount,
      sourceLog.species,
      sourceLog.environment,
      sourceLog.substrate
    );
    ensureGrowFields(copy);
    copy.customGuide = sourceLog.customGuide || '';
    copy.guideWeekNotes = Object.assign({}, sourceLog.guideWeekNotes || {});
    copy.entries = (sourceLog.entries || []).map((entry) => ({
      id: 'e' + Date.now() + Math.random().toString(36).slice(2, 6),
      date: entry.date,
      text: entry.text,
      source: entry.source,
      actionType: entry.actionType || 'obs',
      metrics: entry.metrics && typeof entry.metrics === 'object' ? Object.assign({}, entry.metrics) : {},
      photos: Array.isArray(entry.photos) ? entry.photos.slice() : [],
      createdAt: entry.createdAt || new Date().toISOString()
    }));
    const sourceTasks = planTasksForGrow(user.profile, sourceLog.id);
    if (sourceTasks.length) {
      const copiedTasks = sourceTasks.map((task) => Object.assign({}, task, {
        id: 'u' + Date.now() + Math.random().toString(36).slice(2, 4),
        done: false,
        growId: copy.id
      }));
      setPlanTasksForGrow(user.profile, copy.id, copiedTasks);
    }
    return copy;
  }

  function openCompareModal() {
    if (!user || !user.profile || !selectedGrowLogId) return;
    const current = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!current) return;
    const select = document.getElementById('cultivo-compare-select');
    const output = document.getElementById('cultivo-compare-output');
    const others = (user.profile.growLogs || []).filter((item) => item.id !== current.id);
    if (!select || !output) return;
    if (!others.length) {
      output.innerHTML = '<p class="perfil-plano-empty">Crie outra pesquisa para comparar métricas.</p>';
      openCultivoModal('cultivo-compare-modal');
      return;
    }
    select.innerHTML = others.map((log) =>
      '<option value="' + escapeHtml(log.id) + '">' + escapeHtml(log.name) + '</option>'
    ).join('');
    const renderCompare = () => {
      const other = user.profile.growLogs.find((item) => item.id === select.value);
      output.innerHTML = CCharts.renderCompareHtml
        ? CCharts.renderCompareHtml(current, other)
        : '<p class="perfil-plano-empty">Comparação indisponível.</p>';
    };
    if (!select.dataset.bound) {
      select.dataset.bound = '1';
      select.addEventListener('change', renderCompare);
    }
    renderCompare();
    openCultivoModal('cultivo-compare-modal');
  }

  function initCultivoAutosave() {
    if (!CAutosave.create || cultivoAutosave) return;
    cultivoAutosave = CAutosave.create({
      statusEl: cultivoAutosaveStatus,
      debounceMs: 3000,
      isActive: () => cultivoView === 'grow' && !!selectedGrowLogId,
      watchSelectors: [
        '#perfil-week-notes',
        '#profile-custom-guide',
        '#perfil-grow-detail-phase',
        '#perfil-grow-environment',
        '#perfil-grow-substrate'
      ],
      save: async () => {
        if (!user || !user.profile) return false;
        // Evitar corrida com upload/guardado do registo do diário.
        if (entryMediaSaving || profileSaving) return null;
        const result = await saveCultivoPayload(readForm(), null, { silent: true });
        return result ? true : false;
      }
    });
    cultivoAutosave.bind();
  }

  function initPhotoDropZone() {
    const field = document.querySelector('.cultivo-entry-photos-field');
    if (!field || field.dataset.dropBound === '1') return;
    field.dataset.dropBound = '1';
    ['dragenter', 'dragover'].forEach((type) => {
      field.addEventListener(type, (e) => {
        e.preventDefault();
        field.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach((type) => {
      field.addEventListener(type, (e) => {
        e.preventDefault();
        field.classList.remove('is-dragover');
      });
    });
    field.addEventListener('drop', (e) => {
      if (!growEntryPhotos || !e.dataTransfer || !e.dataTransfer.files) return;
      const incoming = Array.from(e.dataTransfer.files).filter((file) =>
        isEntryImageFile(file) || /^video\//i.test(file.type || '')
      );
      if (!incoming.length) return;
      void appendEntryMediaFiles(incoming);
    });
  }

  function fillGrowSetupFields(log) {
    if (!log) return;
    if (growEnvironmentEl) growEnvironmentEl.value = log.environment || '';
    if (growSubstrateEl) growSubstrateEl.value = log.substrate || '';
  }

  function readGrowSetupFields(log) {
    if (!log) return;
    if (growEnvironmentEl) log.environment = growEnvironmentEl.value || '';
    if (growSubstrateEl) log.substrate = growSubstrateEl.value || '';
  }

  function setWizardDefaultsFromProfile(profile) {
    if (cultivoWizardDate && !cultivoWizardDate.value) {
      cultivoWizardDate.value = todayDateInputValue();
    }
    if (!profile) return;
    if (cultivoWizardEnvironment && !cultivoWizardEnvironment.value && profile.environment) {
      cultivoWizardEnvironment.value = profile.environment;
    }
    if (cultivoWizardSubstrate && !cultivoWizardSubstrate.value && profile.substrate) {
      cultivoWizardSubstrate.value = profile.substrate;
    }
  }

  function migrateGlobalGuideToGrows(profile) {
    if (!profile || !Array.isArray(profile.growLogs) || !profile.growLogs.length) return;
    const globalGuide = String(profile.customGuide || '').trim();
    const globalNotes = profile.guideWeekNotes && typeof profile.guideWeekNotes === 'object'
      ? profile.guideWeekNotes
      : {};
    const hasGlobal = globalGuide || Object.keys(globalNotes).length > 0;
    if (!hasGlobal) return;
    const target = getSelectedGrowLog(profile) || getActiveGrowLog(profile) || profile.growLogs[0];
    if (!target) return;
    ensureGrowFields(target);
    if (!String(target.customGuide || '').trim() && globalGuide) target.customGuide = globalGuide;
    if (!Object.keys(target.guideWeekNotes).length && Object.keys(globalNotes).length) {
      target.guideWeekNotes = Object.assign({}, globalNotes);
    }
    profile.customGuide = '';
    profile.guideWeekNotes = {};
  }

  function openCultivoModal(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }

  function closeCultivoModal(idOrKey) {
    const map = {
      submit: 'cultivo-submit-modal',
      rename: 'cultivo-edit-modal',
      edit: 'cultivo-edit-modal',
      compare: 'cultivo-compare-modal',
      metric: 'cultivo-metric-modal',
      community: 'cultivo-community-modal'
    };
    const id = map[idOrKey] || idOrKey;
    const el = document.getElementById(id);
    if (el) el.hidden = true;
    if (id === 'cultivo-edit-modal') {
      editingGrowId = null;
      setEditModalStatus('');
    }
    if (id === 'cultivo-community-modal') {
      communityShareDraft = null;
      communityShareBusy = false;
      setCommunityModalStatus('');
      showCommunityShareForm();
      const communityTitle = document.getElementById('cultivo-community-modal-title');
      if (communityTitle) communityTitle.textContent = 'Publicar na comunidade';
    }
    if (id === 'cultivo-metric-modal') {
      if (activeMetricInput && typeof activeMetricInput.blur === 'function') {
        activeMetricInput.blur();
      }
      activeMetricKey = '';
      activeMetricInput = null;
      activeMetricConfig = null;
      activeMetricDraftValue = null;
      lastMetricInIdeal = null;
    }
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function getMetricContext() {
    const profile = user && user.profile ? user.profile : {};
    const logs = Array.isArray(profile.growLogs) ? profile.growLogs : [];
    const log = logs.find((item) => item.id === selectedGrowLogId) || logs.find((item) => item.id === profile.activeGrowLogId) || logs[0] || null;
    const phase = (log && log.phase) || profile.phase || 'germinacao';
    const substrate = String((log && log.substrate) || profile.substrate || '').toLowerCase();
    const hydroLike = /hidro|hidrop|coco|perlita|argila expandida/.test(substrate);
    return { phase, substrate, hydroLike };
  }

  function buildMetricConfig(metricKey) {
    const base = METRIC_PICKER_META[metricKey];
    if (!base) return null;
    const ctx = getMetricContext();
    const phaseLabel = PHASE_LABELS_SHORT[ctx.phase] || 'Atual';

    if (metricKey === 'ph') {
      const min = ctx.hydroLike ? 5.5 : 6.0;
      const max = ctx.hydroLike ? 6.2 : 6.8;
      const mid = round1((min + max) / 2);
      return {
        label: base.label,
        min: base.min,
        max: base.max,
        step: 0.1,
        unit: base.unit,
        hint: 'Substrato detectado: ' + (ctx.hydroLike ? 'hidro/coco' : 'solo') + '.',
        idealLabel: 'Faixa ideal: ' + min + '-' + max,
        idealMin: min,
        idealMax: max,
        defaultValue: mid,
        options: [
          { label: 'Ideal mínimo', value: min, helper: 'Início seguro da faixa' },
          { label: 'Ideal médio', value: mid, helper: 'Ponto recomendado' },
          { label: 'Ideal máximo', value: max, helper: 'Limite superior seguro' }
        ]
      };
    }

    if (metricKey === 'ec') {
      const map = {
        planejamento: [0.2, 0.6],
        germinacao: [0.6, 1.0],
        vegetativo: [1.2, 1.8],
        floracao: [1.8, 2.2],
        colheita: [0.4, 0.8]
      };
      const range = map[ctx.phase] || [1.2, 1.8];
      const min = range[0];
      const max = range[1];
      const mid = round1((min + max) / 2);
      return {
        label: base.label,
        min: base.min,
        max: base.max,
        step: 0.1,
        unit: base.unit,
        hint: 'Fase da pesquisa: ' + phaseLabel + '.',
        idealLabel: 'Faixa ideal: ' + min + '-' + max + ' mS/cm',
        idealMin: min,
        idealMax: max,
        defaultValue: mid,
        options: [
          { label: 'Ideal mínimo', value: min, helper: 'Nutrição leve' },
          { label: 'Ideal médio', value: mid, helper: 'Ponto recomendado' },
          { label: 'Ideal máximo', value: max, helper: 'Nutrição intensa' }
        ]
      };
    }

    if (metricKey === 'temp') {
      const map = {
        planejamento: [22, 26],
        germinacao: [24, 28],
        vegetativo: [24, 28],
        floracao: [22, 26],
        colheita: [20, 24]
      };
      const range = map[ctx.phase] || [24, 28];
      const min = range[0];
      const max = range[1];
      const mid = Math.round((min + max) / 2);
      return {
        label: base.label,
        min: base.min,
        max: base.max,
        step: 1,
        unit: base.unit,
        hint: 'Fase da pesquisa: ' + phaseLabel + '.',
        idealLabel: 'Dia ideal: ' + min + '-' + max + '°C',
        idealMin: min,
        idealMax: max,
        defaultValue: mid,
        options: [
          { label: 'Dia mínimo', value: min, helper: 'Faixa ideal inferior' },
          { label: 'Dia médio', value: mid, helper: 'Ponto recomendado' },
          { label: 'Dia máximo', value: max, helper: 'Faixa ideal superior' }
        ]
      };
    }

    const rhMap = {
      planejamento: [50, 60],
      germinacao: [65, 75],
      vegetativo: [55, 65],
      floracao: [45, 55],
      colheita: [40, 50]
    };
    const rhRange = rhMap[ctx.phase] || [55, 65];
    const rhMin = rhRange[0];
    const rhMax = rhRange[1];
    const rhMid = Math.round((rhMin + rhMax) / 2);
    return {
      label: base.label,
      min: base.min,
      max: base.max,
      step: 1,
      unit: base.unit,
      hint: 'Fase da pesquisa: ' + phaseLabel + '.',
      idealLabel: 'Faixa ideal: ' + rhMin + '-' + rhMax + '%',
      idealMin: rhMin,
      idealMax: rhMax,
      defaultValue: rhMid,
      options: [
        { label: 'Ideal mínimo', value: rhMin, helper: 'Ar mais seco' },
        { label: 'Ideal médio', value: rhMid, helper: 'Ponto recomendado' },
        { label: 'Ideal máximo', value: rhMax, helper: 'Ar mais húmido' }
      ]
    };
  }

  function syncPhaseFromActiveLog(profile) {
    const log = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
    if (!log) return profile;
    profile.phase = log.phase || profile.phase || 'germinacao';
    if (log.plantedAt) profile.phaseStartedAt = log.plantedAt;
    return profile;
  }

  function ensureGrowLogs(profile) {
    if (!profile) return profile;
    if (!Array.isArray(profile.growLogs)) profile.growLogs = [];

    if (!profile.growLogs.length) {
      const journal = String(profile.journal || '').trim();
      if (journal) {
        const log = createGrowLogObject(
          'Pesquisa anterior',
          profile.phaseStartedAt || new Date().toISOString(),
          getEffectivePhaseFromProfileOnly(profile)
        );
        log.entries = [{
          id: 'e' + Date.now(),
          date: todayDateInputValue(),
          text: journal,
          source: 'system',
          createdAt: new Date().toISOString()
        }];
        profile.growLogs = [log];
        profile.activeGrowLogId = log.id;
      }
    }

    if (profile.growLogs.length && !profile.activeGrowLogId) {
      profile.activeGrowLogId = profile.growLogs[0].id;
    }

    profile.growLogs.forEach((log) => ensureGrowFields(log));
    migrateGlobalGuideToGrows(profile);
    syncPhaseFromActiveLog(profile);
    return profile;
  }


  function createGrowEntry(text, opts) {
    const options = opts || {};
    const metrics = options.metrics && typeof options.metrics === 'object' ? options.metrics : {};
    const photos = Array.isArray(options.photos) ? options.photos.slice(0, 4) : [];
    return {
      id: 'e' + Date.now() + Math.random().toString(36).slice(2, 6),
      date: options.date || todayDateInputValue(),
      text: String(text || '').trim().slice(0, 2000),
      source: options.source || 'manual',
      actionType: options.actionType || selectedEntryAction || 'obs',
      metrics: metrics,
      photos: photos,
      createdAt: new Date().toISOString()
    };
  }

  function parseOptionalMetricInput(el, min, max, label) {
    if (!el || el.value === '') return { value: null };
    const raw = String(el.value).replace(',', '.');
    const n = parseFloat(raw);
    if (isNaN(n) || n < min || n > max) {
      return { value: null, error: label + ' deve estar entre ' + min + ' e ' + max + '.' };
    }
    return { value: n };
  }

  function validateEntryMetricsFromForm() {
    const errors = [];
    const ph = parseOptionalMetricInput(growEntryPh, 0, 14, 'pH');
    const ec = parseOptionalMetricInput(growEntryEc, 0, 10, 'EC');
    const temp = parseOptionalMetricInput(growEntryTemp, -10, 60, 'Temperatura');
    const rh = parseOptionalMetricInput(growEntryRh, 0, 100, 'RH');
    [ph, ec, temp, rh].forEach((item) => {
      if (item.error) errors.push(item.error);
    });
    if (growEntryMetricsHint) {
      if (errors.length) {
        growEntryMetricsHint.hidden = false;
        growEntryMetricsHint.classList.add('is-error');
        growEntryMetricsHint.textContent = errors.join(' ');
      } else {
        growEntryMetricsHint.hidden = true;
        growEntryMetricsHint.classList.remove('is-error');
        growEntryMetricsHint.textContent = '';
      }
    }
    return errors;
  }

  function readEntryMetricsFromForm() {
    const metrics = {};
    const ph = parseOptionalMetricInput(growEntryPh, 0, 14, 'pH');
    const ec = parseOptionalMetricInput(growEntryEc, 0, 10, 'EC');
    const temp = parseOptionalMetricInput(growEntryTemp, -10, 60, 'Temperatura');
    const rh = parseOptionalMetricInput(growEntryRh, 0, 100, 'RH');
    if (ph.value != null) metrics.ph = Math.round(ph.value * 10) / 10;
    if (ec.value != null) metrics.ec = Math.round(ec.value * 10) / 10;
    if (temp.value != null) metrics.temp = Math.round(temp.value);
    if (rh.value != null) metrics.rh = Math.round(rh.value);
    return metrics;
  }

  function clearEntryForm() {
    editingEntryId = null;
    if (growEntrySubmitBtn) growEntrySubmitBtn.textContent = 'Guardar registo';
    if (growEntryText) growEntryText.value = '';
    if (growEntryPh) growEntryPh.value = '';
    if (growEntryEc) growEntryEc.value = '';
    if (growEntryTemp) growEntryTemp.value = '';
    if (growEntryRh) growEntryRh.value = '';
    if (growEntryDate) growEntryDate.value = todayDateInputValue();
    if (growEntryPhotos) growEntryPhotos.value = '';
    pendingEntryPhotoFiles = [];
    renderEntryPhotoPreview();
    setSelectedEntryAction('');
    if (growEntryMetricsHint) {
      growEntryMetricsHint.hidden = true;
      growEntryMetricsHint.textContent = '';
    }
  }

  function fillEntryFormFromEntry(entry) {
    if (!entry) return;
    editingEntryId = entry.id;
    if (growEntrySubmitBtn) growEntrySubmitBtn.textContent = 'Actualizar registo';
    if (growEntryText) growEntryText.value = entry.text || '';
    if (growEntryDate) growEntryDate.value = entry.date || todayDateInputValue();
    if (growEntryPh) growEntryPh.value = entry.metrics && entry.metrics.ph != null ? entry.metrics.ph : '';
    if (growEntryEc) growEntryEc.value = entry.metrics && entry.metrics.ec != null ? entry.metrics.ec : '';
    if (growEntryTemp) growEntryTemp.value = entry.metrics && entry.metrics.temp != null ? entry.metrics.temp : '';
    if (growEntryRh) growEntryRh.value = entry.metrics && entry.metrics.rh != null ? entry.metrics.rh : '';
    setSelectedEntryAction(entry.actionType || 'obs');
    pendingEntryPhotoFiles = [];
    renderEntryPhotoPreview();
    if (growEntryForm) growEntryForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function deleteGrowEntry(log, entryId) {
    if (!log || !entryId || !Array.isArray(log.entries)) return false;
    const before = log.entries.length;
    log.entries = log.entries.filter((item) => item.id !== entryId);
    return log.entries.length < before;
  }

  function renderEntryPhotoPreview() {
    if (!growEntryPhotosPreview) return;
    if (!pendingEntryPhotoFiles.length) {
      growEntryPhotosPreview.innerHTML = '';
      return;
    }
    const renderPreviewMedia = (file) => {
      const objectUrl = URL.createObjectURL(file);
      if (/^video\//i.test(file.type)) {
        return '<video src="' + escapeHtml(objectUrl) + '" muted playsinline preload="metadata"></video>';
      }
      return '<img src="' + escapeHtml(objectUrl) + '" alt="">';
    };
    growEntryPhotosPreview.innerHTML = pendingEntryPhotoFiles.map((file, index) =>
      '<figure class="perfil-entry-photo-thumb">' +
      renderPreviewMedia(file) +
      '<button type="button" class="perfil-entry-photo-remove" data-photo-index="' + index + '" aria-label="Remover mídia">×</button>' +
      '</figure>'
    ).join('');
    growEntryPhotosPreview.querySelectorAll('.perfil-entry-photo-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-photo-index'), 10);
        if (isNaN(idx)) return;
        pendingEntryPhotoFiles.splice(idx, 1);
        renderEntryPhotoPreview();
      });
    });
  }

  function isEntryImageFile(file) {
    if (!file) return false;
    const type = String(file.type || '').toLowerCase();
    if (type.startsWith('image/')) return true;
    return /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name || '');
  }

  function prepareEntryImageForUpload(file) {
    if (!isEntryImageFile(file)) return Promise.resolve(file);

    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      let settled = false;
      function finish(result) {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(objectUrl);
        resolve(result);
      }
      function fail(message) {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(objectUrl);
        reject(new Error(message || 'Não foi possível ler esta foto.'));
      }

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        if (!width || !height) {
          fail('Foto inválida ou corrompida.');
          return;
        }
        const maxSide = Math.max(width, height);
        const type = String(file.type || '').toLowerCase();
        const looksHeic = /heic|heif/i.test(type) || /\.(heic|heif)$/i.test(file.name || '');
        const isJpegFamily = type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/webp';
        const needsResize = maxSide > ENTRY_IMAGE_MAX_SIDE;
        // Sempre re-codificar fotos de telemóvel (HEIC/unknown) para JPEG aceite pela API.
        const needsCompress = needsResize || file.size > ENTRY_IMAGE_TARGET_BYTES || looksHeic || !isJpegFamily;
        if (!needsCompress) {
          finish(file);
          return;
        }

        const scale = needsResize ? ENTRY_IMAGE_MAX_SIDE / maxSide : 1;
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          fail('Este dispositivo não conseguiu otimizar a foto.');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const qualities = [0.82, 0.72, 0.62, 0.5];
        const baseName = String(file.name || 'foto-cultivo').replace(/\.[^.]+$/, '') || 'foto-cultivo';

        function encodeAt(index) {
          const quality = qualities[index];
          canvas.toBlob((blob) => {
            if (!blob) {
              fail('Falha ao converter a foto para JPEG.');
              return;
            }
            if (blob.size > ENTRY_MEDIA_MAX_IMAGE_BYTES && index < qualities.length - 1) {
              encodeAt(index + 1);
              return;
            }
            if (blob.size > ENTRY_MEDIA_MAX_IMAGE_BYTES) {
              fail('Imagem muito grande mesmo após otimização (máx. 6 MB).');
              return;
            }
            finish(new File([blob], baseName + '.jpg', { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', quality);
        }

        encodeAt(0);
      };

      img.onerror = () => fail(
        'Não foi possível ler esta foto no telemóvel. Tire de novo em JPEG ou escolha «Carregar mídia».'
      );
      img.src = objectUrl;
    });
  }

  async function appendEntryMediaFiles(incoming) {
    const files = Array.isArray(incoming) ? incoming : [];
    const valid = [];
    let error = '';
    let optimizedCount = 0;

    for (const file of files) {
      if (!file) continue;
      const isImage = isEntryImageFile(file);
      const isVideo = /^video\//i.test(file.type || '');
      if (!isImage && !isVideo) {
        error = 'Use apenas fotos ou vídeos.';
        continue;
      }
      if (isVideo) {
        if (file.size > ENTRY_MEDIA_MAX_VIDEO_BYTES) {
          error = 'Vídeo muito grande (máx. 25 MB).';
          continue;
        }
        valid.push(file);
        continue;
      }

      if (file.size > ENTRY_MEDIA_MAX_IMAGE_RAW_BYTES) {
        error = 'Imagem muito grande (máx. 25 MB antes da otimização).';
        continue;
      }

      if (growDetailStatus) setStatus(growDetailStatus, 'A otimizar foto…');
      try {
        const prepared = await prepareEntryImageForUpload(file);
        if (prepared.size > ENTRY_MEDIA_MAX_IMAGE_BYTES) {
          error = 'Imagem muito grande mesmo após otimização (máx. 6 MB).';
          continue;
        }
        if (prepared !== file || prepared.size < file.size || prepared.type === 'image/jpeg') {
          optimizedCount += 1;
        }
        valid.push(prepared);
      } catch (err) {
        error = (err && err.message) || 'Não foi possível preparar a foto.';
      }
    }

    pendingEntryPhotoFiles = pendingEntryPhotoFiles.concat(valid).slice(0, ENTRY_MEDIA_MAX_ITEMS);
    renderEntryPhotoPreview();
    if (error) {
      setStatus(growDetailStatus, error, true);
    } else if (optimizedCount) {
      setStatus(growDetailStatus, optimizedCount === 1
        ? 'Foto otimizada para o diário.'
        : optimizedCount + ' fotos otimizadas para o diário.');
    } else if (valid.length) {
      setStatus(growDetailStatus, 'Mídia pronta para guardar.');
    }
  }

  function readEntryPhotoFilesFromInput() {
    if (!growEntryPhotos || !growEntryPhotos.files) return;
    const incoming = Array.from(growEntryPhotos.files);
    void appendEntryMediaFiles(incoming);
    growEntryPhotos.value = '';
  }

  async function uploadCultivoPhoto(file) {
    const prepared = isEntryImageFile(file) ? await prepareEntryImageForUpload(file) : file;
    if (isEntryImageFile(prepared) && prepared.size > ENTRY_MEDIA_MAX_IMAGE_BYTES) {
      throw new Error('Imagem muito grande mesmo após otimização (máx. 6 MB).');
    }
    const data = await readFileAsDataUrl(prepared);
    if (!/^data:image\/(png|jpeg|jpg|webp|gif);base64,/i.test(data) && !/^data:video\//i.test(data)) {
      throw new Error('Formato de foto inválido após otimização. Tire a foto de novo.');
    }
    const res = await fetch('/api/cultivo/photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ data: data })
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.error || 'Erro no upload da mídia.');
    if (!payload.url || String(payload.url).indexOf('/uploads/') !== 0) {
      throw new Error('O servidor não devolveu o URL da mídia.');
    }
    return payload.url;
  }

  async function uploadPendingEntryPhotos() {
    const urls = [];
    const files = pendingEntryPhotoFiles.slice(0, ENTRY_MEDIA_MAX_ITEMS);
    for (let i = 0; i < files.length; i++) {
      if (growDetailStatus) {
        setStatus(growDetailStatus, 'A enviar mídia ' + (i + 1) + '/' + files.length + '…');
      }
      urls.push(await uploadCultivoPhoto(files[i]));
    }
    return urls;
  }

  function setSelectedEntryAction(actionId) {
    selectedEntryAction = actionId || '';
    if (!growEntryTypes) return;
    growEntryTypes.querySelectorAll('.perfil-entry-type').forEach((btn) => {
      const active = selectedEntryAction && btn.getAttribute('data-action') === selectedEntryAction;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function metricValueForInput(metricKey, value) {
    if (value == null || value === '') return '';
    if (metricKey === 'temp' || metricKey === 'rh') return String(Math.round(value));
    return String(Math.round(value * 10) / 10);
  }

  function clampMetricValue(value, cfg) {
    if (!cfg) return value;
    return Math.min(cfg.max, Math.max(cfg.min, value));
  }

  function parseMetricInputValue(metricKey, rawValue) {
    if (rawValue == null || rawValue === '') return null;
    const parsed = parseFloat(String(rawValue).replace(',', '.'));
    if (isNaN(parsed)) return null;
    if (metricKey === 'temp' || metricKey === 'rh') return Math.round(parsed);
    return round1(parsed);
  }

  function updateMetricSliderUi() {
    if (!activeMetricConfig || !cultivoMetricSlider) return;
    const cfg = activeMetricConfig;
    const value = clampMetricValue(
      activeMetricDraftValue == null ? (cfg.defaultValue != null ? cfg.defaultValue : cfg.min) : activeMetricDraftValue,
      cfg
    );
    activeMetricDraftValue = value;
    cultivoMetricSlider.value = String(value);

    const unit = cfg.unit ? ' ' + cfg.unit : '';
    if (cultivoMetricSliderValue) {
      cultivoMetricSliderValue.textContent = metricValueForInput(activeMetricKey, value) + unit;
    }
    if (cultivoMetricSliderIdealNote) {
      const inIdeal = value >= cfg.idealMin && value <= cfg.idealMax;
      cultivoMetricSliderIdealNote.textContent = inIdeal
        ? 'Dentro da faixa ideal.'
        : 'Fora da faixa ideal.';
      const now = Date.now();
      const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
      if (lastMetricInIdeal === null) {
        lastMetricInIdeal = inIdeal;
      } else if (lastMetricInIdeal !== inIdeal && canVibrate && (now - lastMetricHapticAt) > 140) {
        navigator.vibrate(inIdeal ? 18 : [10, 24, 10]);
        lastMetricHapticAt = now;
        lastMetricInIdeal = inIdeal;
      } else {
        lastMetricInIdeal = inIdeal;
      }
      if (cultivoMetricSliderWrap) {
        cultivoMetricSliderWrap.classList.toggle('is-in-ideal', inIdeal);
        cultivoMetricSliderWrap.classList.toggle('is-out-ideal', !inIdeal);
      }
    }
    if (cultivoMetricSliderTrack && cfg.max > cfg.min) {
      const start = ((cfg.idealMin - cfg.min) / (cfg.max - cfg.min)) * 100;
      const end = ((cfg.idealMax - cfg.min) / (cfg.max - cfg.min)) * 100;
      cultivoMetricSliderTrack.style.setProperty('--ideal-start', String(Math.max(0, Math.min(100, start))) + '%');
      cultivoMetricSliderTrack.style.setProperty('--ideal-end', String(Math.max(0, Math.min(100, end))) + '%');
      const progress = ((value - cfg.min) / (cfg.max - cfg.min)) * 100;
      cultivoMetricSliderTrack.style.setProperty('--value-progress', String(Math.max(0, Math.min(100, progress))) + '%');
    }
    cultivoMetricSlider.setAttribute('aria-valuetext', metricValueForInput(activeMetricKey, value) + unit);
  }

  function nudgeMetricValue(direction) {
    if (!activeMetricConfig) return;
    const step = activeMetricConfig.step || 1;
    const current = activeMetricDraftValue == null ? activeMetricConfig.defaultValue : activeMetricDraftValue;
    activeMetricDraftValue = clampMetricValue(current + (step * direction), activeMetricConfig);
    updateMetricSliderUi();
  }

  function commitMetricSliderValue(mode) {
    if (!activeMetricInput || !activeMetricConfig) return;
    const cfg = activeMetricConfig;

    if (mode === 'clear') {
      activeMetricInput.value = '';
      validateEntryMetricsFromForm();
      closeCultivoModal('metric');
      return;
    }

    const value = clampMetricValue(
      activeMetricDraftValue == null ? (cfg.defaultValue != null ? cfg.defaultValue : cfg.min) : activeMetricDraftValue,
      cfg
    );
    activeMetricInput.value = metricValueForInput(activeMetricKey, value);
    validateEntryMetricsFromForm();
    closeCultivoModal('metric');
  }

  function openMetricPicker(metricKey, inputEl) {
    const cfg = buildMetricConfig(metricKey);
    if (!cfg) return;
    if (!cultivoMetricModal || !cultivoMetricSlider) {
      const fallback = window.prompt('Insira ' + cfg.label + ' (' + cfg.min + ' a ' + cfg.max + ')', inputEl && inputEl.value ? inputEl.value : '');
      if (fallback == null) return;
      const raw = String(fallback).replace(',', '.').trim();
      if (!raw) {
        if (inputEl) inputEl.value = '';
        return;
      }
      const parsed = parseFloat(raw);
      if (isNaN(parsed) || parsed < cfg.min || parsed > cfg.max) {
        setStatus(growDetailStatus, cfg.label + ' deve estar entre ' + cfg.min + ' e ' + cfg.max + '.', true);
        return;
      }
      if (inputEl) inputEl.value = metricValueForInput(metricKey, parsed);
      validateEntryMetricsFromForm();
      return;
    }
    activeMetricKey = metricKey;
    activeMetricInput = inputEl || null;
    activeMetricConfig = cfg;
    activeMetricDraftValue = parseMetricInputValue(metricKey, inputEl && inputEl.value);
    if (activeMetricDraftValue == null) activeMetricDraftValue = cfg.defaultValue;

    if (cultivoMetricModalTitle) cultivoMetricModalTitle.textContent = 'Selecionar ' + cfg.label;
    if (cultivoMetricModalHint) cultivoMetricModalHint.textContent = cfg.hint;
    if (cultivoMetricModalStatus) cultivoMetricModalStatus.textContent = '';
    if (cultivoMetricSlider) {
      cultivoMetricSlider.min = String(cfg.min);
      cultivoMetricSlider.max = String(cfg.max);
      cultivoMetricSlider.step = String(cfg.step || 1);
    }
    if (cultivoMetricSliderMin) cultivoMetricSliderMin.textContent = metricValueForInput(metricKey, cfg.min);
    if (cultivoMetricSliderMax) cultivoMetricSliderMax.textContent = metricValueForInput(metricKey, cfg.max);

    const idealBlock = document.getElementById('cultivo-metric-modal-ideal');
    if (idealBlock) {
      idealBlock.innerHTML =
        '<span class="cultivo-metric-ideal-chip">Ideal</span>' +
        '<strong>' + escapeHtml(cfg.idealLabel || '') + '</strong>';
    }
    updateMetricSliderUi();
    cultivoMetricModal.hidden = false;
  }

  function initEntryMetricPickers() {
    const inputs = [
      { el: growEntryPh, key: 'ph' },
      { el: growEntryEc, key: 'ec' },
      { el: growEntryTemp, key: 'temp' },
      { el: growEntryRh, key: 'rh' }
    ];

    inputs.forEach((item) => {
      if (!item.el || item.el.dataset.metricPickerBound === '1') return;
      item.el.dataset.metricPickerBound = '1';
      item.el.setAttribute('readonly', 'readonly');
      const openPicker = (evt) => {
        if (evt) evt.preventDefault();
        openMetricPicker(item.key, item.el);
      };
      item.el.addEventListener('click', openPicker);
      item.el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMetricPicker(item.key, item.el);
        }
      });
    });

    if (cultivoMetricSlider && cultivoMetricSlider.dataset.bound !== '1') {
      cultivoMetricSlider.dataset.bound = '1';
      cultivoMetricSlider.addEventListener('input', () => {
        activeMetricDraftValue = parseFloat(cultivoMetricSlider.value);
        updateMetricSliderUi();
      });
    }

    function bindNudgeButton(btn, direction) {
      if (!btn || btn.dataset.bound === '1') return;
      btn.dataset.bound = '1';
      let holdTimer = null;
      let repeatTimer = null;
      let repeated = false;
      const clearTimers = () => {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
        if (repeatTimer) {
          clearInterval(repeatTimer);
          repeatTimer = null;
        }
      };

      btn.addEventListener('click', () => {
        if (repeated) {
          repeated = false;
          return;
        }
        nudgeMetricValue(direction);
      });

      btn.addEventListener('pointerdown', () => {
        repeated = false;
        clearTimers();
        holdTimer = setTimeout(() => {
          repeated = true;
          nudgeMetricValue(direction);
          repeatTimer = setInterval(() => nudgeMetricValue(direction), 120);
        }, 380);
      });

      ['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) => {
        btn.addEventListener(evt, clearTimers);
      });
    }

    bindNudgeButton(cultivoMetricNudgeDown, -1);
    bindNudgeButton(cultivoMetricNudgeUp, 1);

    if (cultivoMetricApply && cultivoMetricApply.dataset.bound !== '1') {
      cultivoMetricApply.dataset.bound = '1';
      cultivoMetricApply.addEventListener('click', () => commitMetricSliderValue('apply'));
    }

    if (cultivoMetricClear && cultivoMetricClear.dataset.bound !== '1') {
      cultivoMetricClear.dataset.bound = '1';
      cultivoMetricClear.addEventListener('click', () => commitMetricSliderValue('clear'));
    }
  }

  function getEntryActionMeta(entry) {
    if (entry.source === 'calculator') {
      const slug = entry.metrics && entry.metrics.calculator;
      const label = slug && CALCULATOR_LABELS[slug] ? CALCULATOR_LABELS[slug] : 'Calculadora';
      return { icon: '🧮', label: label, id: 'calculator' };
    }
    if (entry.source === 'week-note') return ENTRY_ACTIONS.find((a) => a.id === 'roteiro') || { icon: '📋', label: 'Roteiro', id: 'roteiro' };
    if (entry.source === 'system') return { icon: '📥', label: 'Importado', id: 'system' };
    return ENTRY_ACTIONS.find((a) => a.id === entry.actionType) || ENTRY_ACTIONS.find((a) => a.id === 'obs');
  }


  function isVideoUrl(url) {
    return /\.(mp4|webm|mov)(\?|#|$)/i.test(String(url || ''));
  }

  function entryPhotoUrls(photos) {
    if (!Array.isArray(photos)) return [];
    return photos.filter((url) => String(url || '').startsWith('/uploads/') && !isVideoUrl(url));
  }

  function shareKey(entryId, photoUrl) {
    return String(entryId || '') + '|' + String(photoUrl || '');
  }

  function renderEntryPhotosHtml(photos) {
    if (!Array.isArray(photos) || !photos.length) return '';
    return (
      '<div class="perfil-grow-entry-photos">' +
      photos.map((url) =>
        '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' +
        (isVideoUrl(url)
          ? '<video src="' + escapeHtml(url) + '" preload="metadata" controls playsinline></video>'
          : '<img src="' + escapeHtml(url) + '" alt="Mídia do registo" loading="lazy">') +
        '</a>'
      ).join('') +
      '</div>'
    );
  }

  function renderCommunityShareActions(entry) {
    const photos = entryPhotoUrls(entry.photos);
    if (!photos.length) return '';
    return (
      '<div class="perfil-grow-entry-community">' +
      photos.map((url) => {
        const shared = communityShares.has(shareKey(entry.id, url));
        if (shared) {
          return '<a class="botao botao-outline botao-sm" href="/comunidade/">Já no feed</a>';
        }
        return (
          '<button type="button" class="botao botao-outline botao-sm perfil-grow-entry-share"' +
          ' data-entry-id="' + escapeHtml(entry.id) + '"' +
          ' data-photo-url="' + escapeHtml(url) + '">Publicar na comunidade</button>'
        );
      }).join('') +
      '</div>'
    );
  }

  function buildDefaultEntryText(actionType, metrics) {
    const metricLine = formatMetricsPlain(metrics);
    if (!actionType) {
      if (metricLine) return 'Registo — ' + metricLine;
      return '';
    }
    const action = ENTRY_ACTIONS.find((a) => a.id === actionType) || ENTRY_ACTIONS[2];
    if (metricLine) return action.label + ' — ' + metricLine;
    if (actionType === 'rega') return 'Rega registada.';
    if (actionType === 'adubo') return 'Adubação registada.';
    if (actionType === 'treino') return 'Treino registado.';
    return '';
  }



  function groupEntriesByGrowWeek(log, entries) {
    const groups = new Map();
    entries.forEach((entry) => {
      const week = growWeekNumber(log.plantedAt, entry.date);
      if (!groups.has(week)) groups.set(week, []);
      groups.get(week).push(entry);
    });
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }

  function renderEntryHtml(entry) {
    const meta = getEntryActionMeta(entry);
    const metricsHtml = formatMetricsPlain(entry.metrics)
      ? '<p class="perfil-grow-entry-metrics">' + escapeHtml(formatMetricsPlain(entry.metrics)) + '</p>'
      : '';
    const photosHtml = renderEntryPhotosHtml(entry.photos);
    const cssClass = 'perfil-grow-entry perfil-grow-entry--' + escapeHtml(meta.id || entry.source || 'manual');
    const calcBadge = entry.source === 'calculator'
      ? '<span class="perfil-grow-entry-tag perfil-grow-entry-tag--calc">Calculadora</span>'
      : '';
    return (
      '<li class="' + cssClass + '" data-entry-id="' + escapeHtml(entry.id) + '">' +
      '<div class="perfil-grow-entry-head">' +
      '<time datetime="' + escapeHtml(entry.date) + '">' + escapeHtml(formatDate(entry.date)) + '</time>' +
      '<span class="perfil-grow-entry-tag">' + escapeHtml(meta.icon + ' ' + meta.label) + '</span>' +
      calcBadge +
      '</div>' +
      metricsHtml +
      (entry.text ? '<p class="perfil-grow-entry-text">' + escapeHtml(entry.text) + '</p>' : '') +
      photosHtml +
      renderCommunityShareActions(entry) +
      '<div class="perfil-grow-entry-actions">' +
      '<button type="button" class="botao botao-outline botao-sm perfil-grow-entry-edit">Editar</button>' +
      '<button type="button" class="botao botao-outline botao-sm perfil-grow-entry-delete">Apagar</button>' +
      '</div>' +
      '</li>'
    );
  }

  function setCommunityModalStatus(msg, isError) {
    if (!cultivoCommunityStatus) return;
    cultivoCommunityStatus.textContent = msg || '';
    cultivoCommunityStatus.classList.toggle('is-error', !!isError);
    cultivoCommunityStatus.classList.toggle('is-success', !!msg && !isError);
  }

  function showCommunityShareForm() {
    if (cultivoCommunityShareBlock) cultivoCommunityShareBlock.hidden = false;
    if (cultivoCommunitySuccessBlock) cultivoCommunitySuccessBlock.hidden = true;
    if (cultivoCommunityConfirm) {
      cultivoCommunityConfirm.disabled = false;
      cultivoCommunityConfirm.textContent = 'Publicar';
    }
  }

  function showCommunityShareSuccess(reused) {
    if (cultivoCommunityShareBlock) cultivoCommunityShareBlock.hidden = true;
    if (cultivoCommunitySuccessBlock) cultivoCommunitySuccessBlock.hidden = false;
    if (cultivoCommunitySuccessMsg) {
      cultivoCommunitySuccessMsg.textContent = reused
        ? 'Esta foto já estava no feed da comunidade.'
        : 'Pedido enviado — a foto já está no feed da comunidade.';
    }
    const title = document.getElementById('cultivo-community-modal-title');
    if (title) title.textContent = 'Publicado';
  }

  function closeCommunityModal() {
    if (cultivoCommunityModal) cultivoCommunityModal.hidden = true;
    communityShareDraft = null;
    communityShareBusy = false;
    setCommunityModalStatus('');
    showCommunityShareForm();
    const title = document.getElementById('cultivo-community-modal-title');
    if (title) title.textContent = 'Publicar na comunidade';
  }

  function openCommunityShareModal(log, entry, photoUrl) {
    communityShareDraft = {
      growId: log.id,
      entryId: entry.id,
      photoUrl: photoUrl,
      caption: String(entry.text || '').trim().slice(0, 500)
    };
    if (cultivoCommunityPreviewImg) {
      cultivoCommunityPreviewImg.src = photoUrl;
      cultivoCommunityPreviewImg.alt = 'Foto do registo';
    }
    if (cultivoCommunityCaption) cultivoCommunityCaption.value = communityShareDraft.caption;
    if (cultivoCommunityHelp) cultivoCommunityHelp.checked = false;
    communityShareBusy = false;
    showCommunityShareForm();
    setCommunityModalStatus('');
    if (cultivoCommunityModal) cultivoCommunityModal.hidden = false;
  }

  async function loadCommunityShares() {
    try {
      const res = await fetch('/api/community/my-shares', { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json().catch(() => ({}));
      communityShares = new Map();
      (data.shares || []).forEach((share) => {
        communityShares.set(shareKey(share.entryId, share.photoUrl), share.id);
      });
    } catch (e) { /* ignore */ }
  }

  async function confirmCommunityShare() {
    if (!communityShareDraft || communityShareBusy) return;
    communityShareBusy = true;
    if (cultivoCommunityConfirm) {
      cultivoCommunityConfirm.disabled = true;
      cultivoCommunityConfirm.textContent = 'A publicar…';
    }
    setCommunityModalStatus('A publicar…');
    try {
      const res = await fetch('/api/community/share', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          growId: communityShareDraft.growId,
          entryId: communityShareDraft.entryId,
          photoUrl: communityShareDraft.photoUrl,
          caption: cultivoCommunityCaption ? cultivoCommunityCaption.value : '',
          helpRequest: !!(cultivoCommunityHelp && cultivoCommunityHelp.checked)
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        communityShareBusy = false;
        if (cultivoCommunityConfirm) {
          cultivoCommunityConfirm.disabled = false;
          cultivoCommunityConfirm.textContent = 'Publicar';
        }
        setCommunityModalStatus(data.error || 'Não foi possível publicar.', true);
        return;
      }
      communityTermsAccepted = true;
      if (data.post) {
        communityShares.set(
          shareKey(communityShareDraft.entryId, communityShareDraft.photoUrl),
          data.post.id
        );
      }
      showCommunityShareSuccess(!!data.reused);
      flashLiveStatus(data.reused ? 'Esta foto já estava no feed.' : 'Publicado na comunidade.');
      if (user && user.profile) renderGrowPage(user.profile);
      communityShareBusy = false;
    } catch (e) {
      communityShareBusy = false;
      if (cultivoCommunityConfirm) {
        cultivoCommunityConfirm.disabled = false;
        cultivoCommunityConfirm.textContent = 'Publicar';
      }
      setCommunityModalStatus('Servidor indisponível.', true);
    }
  }

  function bindGrowEntryActions(log) {
    if (!growEntriesEl || !log) return;
    growEntriesEl.querySelectorAll('.perfil-grow-entry-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const li = btn.closest('.perfil-grow-entry');
        const entryId = li && li.getAttribute('data-entry-id');
        const entry = (log.entries || []).find((item) => item.id === entryId);
        if (entry) fillEntryFormFromEntry(entry);
      });
    });
    growEntriesEl.querySelectorAll('.perfil-grow-entry-delete').forEach((btn) => {
      btn.addEventListener('click', async () => {
        hideGrowPostSaveActions();
        const li = btn.closest('.perfil-grow-entry');
        const entryId = li && li.getAttribute('data-entry-id');
        if (!entryId) return;
        if (!window.confirm('Apagar este registo?')) return;
        if (!deleteGrowEntry(log, entryId)) return;
        const keepGrowId = log.id;
        if (editingEntryId === entryId) clearEntryForm();
        flashLiveStatus('Registo apagado.');
        if (user && user.profile) {
          selectedGrowLogId = keepGrowId;
          persistSelectedGrowId(keepGrowId);
          user.profile.activeGrowLogId = keepGrowId;
          renderGrowPage(user.profile);
        }
        await persistGrowLogs(growDetailStatus, { tab: 'diario' });
        navigateCultivo({ view: 'grow', growId: keepGrowId, tab: 'diario' }, { replace: true, scroll: false });
      });
    });
    growEntriesEl.querySelectorAll('.perfil-grow-entry-share').forEach((btn) => {
      btn.addEventListener('click', () => {
        const entryId = btn.getAttribute('data-entry-id');
        const photoUrl = btn.getAttribute('data-photo-url');
        const entry = (log.entries || []).find((item) => item.id === entryId);
        if (entry && photoUrl) openCommunityShareModal(log, entry, photoUrl);
      });
    });
  }

  function ensureActiveGrowLog(profile, defaultName) {
    ensureGrowLogs(profile);
    let log = getActiveGrowLog(profile);
    if (log) return log;
    const name = defaultName
      || (profile.genetics && String(profile.genetics).trim())
      || 'Minha pesquisa';
    log = createGrowLogObject(name, new Date().toISOString(), getEffectivePhaseFromProfileOnly(profile));
    profile.growLogs.push(log);
    profile.activeGrowLogId = log.id;
    syncPhaseFromActiveLog(profile);
    return log;
  }

  function buildWeekNoteEntry(noteText, profile) {
    const weekNum = getActiveWeek(profile);
    const phaseLabel = formatProfileValue('phase', getEffectivePhase(profile));
    const log = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
    const prefix = log && log.name ? log.name + ' · ' : '';
    const context = prefix + 'Semana ' + weekNum + (phaseLabel ? ' (' + phaseLabel + ')' : '');
    return createGrowEntry(context + ': ' + noteText.trim(), { source: 'week-note', actionType: 'roteiro' });
  }

  function appendEntryToGrowLog(log, entry) {
    if (!log) return { ok: false, error: 'Diário não encontrado.' };
    if (!Array.isArray(log.entries)) log.entries = [];
    log.entries.unshift(entry);
    if (log.entries.length > 300) {
      log.entries = log.entries.slice(0, 300);
    }
    return { ok: true };
  }



  function initEntryTypeButtons() {
    if (!growEntryTypes || growEntryTypes.dataset.bound === '1') return;
    growEntryTypes.dataset.bound = '1';
    growEntryTypes.querySelectorAll('.perfil-entry-type').forEach((btn) => {
      btn.addEventListener('click', () => {
        const actionId = btn.getAttribute('data-action');
        setSelectedEntryAction(selectedEntryAction === actionId ? '' : actionId);
      });
    });
  }

  function initGrowDateDefaults() {
    if (growEntryDate && !growEntryDate.value) growEntryDate.value = todayDateInputValue();
  }

  function renderGrowDetailContent(log, profile) {
    if (!log) return;
    const phaseLabel = formatProfileValue('phase', log.phase);
    if (growDetailPhase) growDetailPhase.value = log.phase || 'germinacao';
    if (growEntryDate) growEntryDate.value = todayDateInputValue();
    clearEntryForm();
    initEntryTypeButtons();
    initEntryMetricPickers();

    const entries = Array.isArray(log.entries) ? log.entries.slice() : [];
    if (growEntriesEmpty) growEntriesEmpty.hidden = entries.length > 0;
    if (growEntriesEl) {
      if (!entries.length) {
        growEntriesEl.innerHTML = '';
      } else {
        const groups = groupEntriesByGrowWeek(log, entries);
        growEntriesEl.innerHTML = groups.map(([weekNum, weekEntries]) =>
          '<li class="perfil-grow-week-group">' +
          '<h3 class="perfil-grow-week-title">Semana ' + weekNum + ' da pesquisa · ' + growWeekDayRange(weekNum) + '</h3>' +
          '<ul class="perfil-grow-week-entries">' +
          weekEntries.map((entry) => renderEntryHtml(entry)).join('') +
          '</ul></li>'
        ).join('');
      }
      bindGrowEntryActions(log);
      const newest = growEntriesEl.querySelector('.perfil-grow-entry');
      if (newest) {
        newest.classList.add('is-new');
        setTimeout(() => newest.classList.remove('is-new'), 1800);
      }
    }
  }


  function formatProfileValue(key, value) {
    const trimmed = String(value || '').trim();
    if (!trimmed) return '';
    const map = PROFILE_VALUE_LABELS[key];
    if (map && map[trimmed]) return map[trimmed];
    return trimmed;
  }

  function isProfileComplete(profile) {
    if (!profile) return false;
    const name = String(profile.displayName || '').trim();
    const age = profile.age;
    return name.length >= 2 && age !== null && !isNaN(age) && age >= MIN_USER_AGE;
  }

  function validateRegistrationForm() {
    const nameEl = document.getElementById('profile-displayName');
    const usernameEl = document.getElementById('profile-username');
    const birthDateEl = document.getElementById('profile-birthDate');
    const name = nameEl ? nameEl.value.trim() : '';
    const username = sanitizeUsername(usernameEl && usernameEl.value);
    const age = calculateAgeFromBirthDate(birthDateEl && birthDateEl.value);
    if (name.length < 2) {
      return 'Informe um nome válido (mínimo 2 caracteres).';
    }
    if (!username) {
      return 'Use um nome de utilizador válido (3-32, letras, números, . _ -).';
    }
    if (isNaN(age) || age < MIN_USER_AGE) {
      return 'É necessário ter 18 anos ou mais para utilizar o site.';
    }
    if (age > 120) {
      return 'Informe uma idade válida.';
    }
    return '';
  }

  function getPhaseWeeks(phase) {
    const data = window.__CULTIVO_PHASE_WEEKS__ || {};
    const key = phase || 'planejamento';
    return data[key] || data.planejamento || [];
  }

  function getPhaseWeekLimit(phase) {
    const key = phase || 'planejamento';
    return PHASE_WEEK_LIMITS[key] || 12;
  }

  function getDynamicPhaseWeeks(phase, desiredCount) {
    const base = getPhaseWeeks(phase);
    if (!base.length) return [];
    const limit = getPhaseWeekLimit(phase);
    const target = Math.max(base.length, Math.min(limit, Math.max(1, desiredCount || base.length)));
    if (target <= base.length) return base.slice(0, target);

    const out = base.slice();
    const last = base[base.length - 1] || {};
    while (out.length < target) {
      const week = out.length + 1;
      out.push({
        week: week,
        title: (last.title || 'Manutenção') + ' · contínuo',
        focus: last.focus || 'Manter parâmetros estáveis e registos consistentes.',
        tasks: Array.isArray(last.tasks) ? last.tasks.slice() : [],
        tools: Array.isArray(last.tools) ? last.tools.slice() : []
      });
    }
    return out;
  }

  function getRoteiroWeeks(profile) {
    const phase = getEffectivePhase(profile);
    const base = getPhaseWeeks(phase);
    if (!base.length) return [];
    const current = getCurrentWeekNumber(profile && profile.phaseStartedAt);
    const desired = current + 1;
    return getDynamicPhaseWeeks(phase, desired);
  }

  function getEffectivePhase(profile) {
    if (!profile) return 'planejamento';
    if (Array.isArray(profile.growLogs) && profile.growLogs.length) {
      const log = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
      if (log && log.phase && getPhaseWeeks(log.phase).length) return log.phase;
    }
    return getEffectivePhaseFromProfileOnly(profile);
  }

  function firstName(profile, fallbackName) {
    const raw = (profile && profile.displayName) || fallbackName || '';
    return String(raw).trim().split(/\s+/)[0] || 'Cultivador';
  }

  function sanitizeUsername(raw) {
    const base = String(raw || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '')
      .replace(/[._-]{2,}/g, '-')
      .replace(/^[._-]+|[._-]+$/g, '');
    if (base.length < 3 || base.length > 32) return '';
    return base;
  }

  function calculateAgeFromBirthDate(raw) {
    const text = String(raw || '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
    const birth = new Date(text + 'T00:00:00.000Z');
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getUTCFullYear() - birth.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - birth.getUTCMonth();
    const dayDiff = now.getUTCDate() - birth.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
    if (age < 0 || age > 120) return null;
    return age;
  }

  function resolvedProfileAge(profile) {
    if (!profile) return null;
    const byBirthDate = calculateAgeFromBirthDate(profile.birthDate);
    if (byBirthDate != null) return byBirthDate;
    const raw = profile.age;
    if (raw === null || raw === undefined || raw === '') return null;
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) return null;
    return parsed;
  }

  function isUserProfileComplete(data) {
    if (!data) return false;
    return data.profileComplete === true || isProfileComplete(data.profile);
  }

  function switchTab(tabId, options) {
    const opts = options || {};
    if (!opts.skipStash) stashWeekNotes();
    const sectionMap = {
      diario: 'cultivo-section-diario',
      semana: 'cultivo-section-roteiro',
      plano: 'cultivo-section-plano'
    };
    const targetId = sectionMap[tabId];
    if (targetId && cultivoView === 'grow') {
      setActiveSectionTab(tabId);
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (!opts.skipRefresh && user && user.profile && isUserProfileComplete(user)) {
      renderHub(user.profile);
    }
  }

  function initTabs() {
    /* separadores removidos — página única */
  }

  function isTaskOverdue(task) {
    if (!task || !task.dueAt || task.done) return false;
    return String(task.dueAt) < todayDateInputValue();
  }

  function sortPlanTasks(tasks) {
    return tasks.slice().sort((a, b) => {
      const aDue = a.dueAt || '';
      const bDue = b.dueAt || '';
      if (aDue && bDue && aDue !== bDue) return aDue.localeCompare(bDue);
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;
      return 0;
    });
  }

  function formatTaskDueLabel(task) {
    if (!task.dueAt) return '';
    const prefix = isTaskOverdue(task) ? 'Atrasado · ' : '';
    return prefix + formatDate(task.dueAt);
  }

  function renderPlanMetrics(tasks) {
    if (!planoMetrics) return;
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const done = list.filter((task) => task.done).length;
    const open = Math.max(0, total - done);
    const overdue = list.filter((task) => !task.done && isTaskOverdue(task)).length;
    const nextDueTask = list
      .filter((task) => !task.done && task.dueAt)
      .sort((a, b) => String(a.dueAt || '').localeCompare(String(b.dueAt || '')))[0] || null;
    const nextDueLabel = nextDueTask ? formatDate(nextDueTask.dueAt) : '—';

    planoMetrics.innerHTML =
      '<div class="perfil-plano-metric"><strong>' + total + '</strong><span>Total</span></div>' +
      '<div class="perfil-plano-metric"><strong>' + open + '</strong><span>Em aberto</span></div>' +
      '<div class="perfil-plano-metric"><strong>' + done + '</strong><span>Concluídas</span></div>' +
      '<div class="perfil-plano-metric' + (overdue > 0 ? ' is-alert' : '') + '"><strong>' + overdue + '</strong><span>Atrasadas</span></div>' +
      '<div class="perfil-plano-metric perfil-plano-metric--wide"><strong>' + escapeHtml(nextDueLabel) + '</strong><span>Próximo prazo</span></div>';
  }

  function buildReminderLabel(actionType, customLabel) {
    const custom = String(customLabel || '').trim();
    if (custom) return custom;
    if (actionType === 'rega') return 'Rega agendada';
    if (actionType === 'adubo') return 'Adubação agendada';
    return 'Lembrete';
  }

  function getUpcomingReminders(profile, limit, growId) {
    const today = todayDateInputValue();
    const gid = growId || selectedGrowLogId || '';
    return sortPlanTasks(planTasksForGrow(profile, gid))
      .filter((task) => task.dueAt && !task.done)
      .filter((task) => task.dueAt >= today || isTaskOverdue(task))
      .slice(0, limit || 5);
  }

  function renderPlanPreview(profile) {
    const el = document.getElementById('perfil-plan-preview');
    if (!el) return;
    const tasks = getUpcomingReminders(profile, 5, selectedGrowLogId);
    if (!tasks.length) {
      el.hidden = true;
      el.innerHTML = '';
      return;
    }
    el.hidden = false;
    el.innerHTML =
      '<div class="perfil-plan-preview-head"><h2>Próximos lembretes</h2></div>' +
      tasks.map((task) => {
        const overdue = isTaskOverdue(task);
        return '<div class="perfil-plan-preview-item' + (overdue ? ' is-overdue' : '') + '">' +
          '<span class="perfil-plan-preview-dot" aria-hidden="true"></span>' +
          '<span>' + escapeHtml(task.label) +
          (task.dueAt ? ' <span class="perfil-plano-due' + (overdue ? ' is-overdue' : '') + '">' +
          escapeHtml(formatTaskDueLabel(task)) + '</span>' : '') +
          '</span></div>';
      }).join('');
  }


  function downloadCsv(filename, rows) {
    const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function downloadTextFile(filename, text, mime) {
    const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function exportGrowMarkdown(log, profile) {
    if (!log) return;
    const title = log.name || 'Pesquisa';
    const markdown = CMarkdown.buildGrowMarkdown
      ? CMarkdown.buildGrowMarkdown(log, profile, { title: title })
      : ('# ' + title);
    const safeName = String(log.name || 'pesquisa').replace(/[^\w\-]+/g, '-').slice(0, 40);
    downloadTextFile('pesquisa-' + safeName + '.md', markdown, 'text/markdown;charset=utf-8');
  }

  function openEditGrowModal(growId) {
    if (!user || !user.profile) return;
    const id = growId || selectedGrowLogId;
    const log = (user.profile.growLogs || []).find((item) => item.id === id);
    if (!log) return;
    editingGrowId = log.id;
    closeGrowActionsMenu();
    if (cultivoEditName) cultivoEditName.value = log.name || '';
    if (cultivoEditSpecies) cultivoEditSpecies.value = log.species || '';
    if (cultivoEditDate) cultivoEditDate.value = plantedAtToDateInput(log.plantedAt);
    if (cultivoEditPlants) cultivoEditPlants.value = String(log.plantCount != null ? log.plantCount : 1);
    if (cultivoEditEnvironment) cultivoEditEnvironment.value = log.environment || '';
    if (cultivoEditSubstrate) cultivoEditSubstrate.value = log.substrate || '';
    setEditGrowPhase(log.phase || 'germinacao');
    setEditModalStatus('');
    openCultivoModal('cultivo-edit-modal');
    if (cultivoEditName) cultivoEditName.focus();
  }

  async function renameActiveGrow() {
    openEditGrowModal(selectedGrowLogId);
  }

  async function confirmEditGrow(event) {
    if (event) event.preventDefault();
    if (!user || !user.profile || !editingGrowId) return;
    const log = user.profile.growLogs.find((item) => item.id === editingGrowId);
    if (!log) return;

    const name = cultivoEditName ? String(cultivoEditName.value).trim() : '';
    const plantedDate = cultivoEditDate ? cultivoEditDate.value : '';
    let plants = cultivoEditPlants ? parseInt(cultivoEditPlants.value, 10) : 1;
    if (!name) {
      setEditModalStatus('Informe o nome do diário.', true);
      if (cultivoEditName) cultivoEditName.focus();
      return;
    }
    if (!plantedDate) {
      setEditModalStatus('Selecione a data de início.', true);
      if (cultivoEditDate) cultivoEditDate.focus();
      return;
    }
    if (isNaN(plants) || plants < 1) plants = 1;
    if (plants > 99) plants = 99;

    const prevPlantedAt = log.plantedAt;
    const prevPhase = log.phase;
    log.name = name.slice(0, 80);
    log.species = cultivoEditSpecies ? String(cultivoEditSpecies.value || '').trim().slice(0, 120) : '';
    log.plantedAt = plantedDate + 'T12:00:00';
    log.phase = editGrowPhase || 'germinacao';
    log.plantCount = plants;
    log.environment = cultivoEditEnvironment ? String(cultivoEditEnvironment.value || '').trim().slice(0, 40) : '';
    log.substrate = cultivoEditSubstrate ? String(cultivoEditSubstrate.value || '').trim().slice(0, 80) : '';
    log.updatedAt = new Date().toISOString();

    if (user.profile.activeGrowLogId === log.id || selectedGrowLogId === log.id) {
      syncPhaseFromActiveLog(user.profile);
      if (prevPlantedAt !== log.plantedAt || prevPhase !== log.phase) {
        selectedWeek = getCurrentWeekNumber(user.profile.phaseStartedAt);
      }
    }
    if (selectedGrowLogId === log.id) {
      if (growDetailPhase) growDetailPhase.value = log.phase;
      fillGrowSetupFields(log);
    }

    if (cultivoEditConfirm) cultivoEditConfirm.disabled = true;
    setEditModalStatus('A guardar…');
    const statusTarget = growDetailStatus && cultivoGrowView && !cultivoGrowView.hidden ? growDetailStatus : null;
    const saved = await persistGrowLogs(statusTarget || cultivoEditStatus);
    if (cultivoEditConfirm) cultivoEditConfirm.disabled = false;
    if (!saved) {
      setEditModalStatus('Não foi possível guardar. Tente de novo.', true);
      return;
    }
    closeCultivoModal('cultivo-edit-modal');
    flashLiveStatus('Diário «' + log.name + '» actualizado.');
    refreshUI();
  }

  async function confirmRenameGrow(event) {
    return confirmEditGrow(event);
  }

  function openSubmitModal() {
    if (!user || !user.profile || !selectedGrowLogId) return;
    const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!log) return;
    const titleEl = document.getElementById('cultivo-submit-title');
    const excerptEl = document.getElementById('cultivo-submit-excerpt');
    const statusEl = document.getElementById('cultivo-submit-modal-status');
    if (titleEl) titleEl.value = log.name || 'Pesquisa';
    if (excerptEl) excerptEl.value = 'Pesquisa de cultivo — ' + (log.species || log.name || '');
    if (statusEl) statusEl.textContent = '';
    renderSubmitChecklist(log, user.profile);
    if (titleEl && !titleEl.dataset.checklistBound) {
      titleEl.dataset.checklistBound = '1';
      titleEl.addEventListener('input', () => {
        if (!user || !user.profile || !selectedGrowLogId) return;
        const current = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
        if (current) renderSubmitChecklist(current, user.profile);
      });
    }
    openCultivoModal('cultivo-submit-modal');
    if (titleEl) titleEl.focus();
  }

  async function submitActiveGrowToLab() {
    if (!user || !user.profile || !selectedGrowLogId) return;
    const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!log) return;
    if (!growHasPublishableContent(log, user.profile)) {
      flashLiveStatus('Adicione registos no diário ou um roteiro mais completo antes de submeter.', true);
      renderSubmitChecklist(log, user.profile);
      return;
    }
    const titleEl = document.getElementById('cultivo-submit-title');
    const excerptEl = document.getElementById('cultivo-submit-excerpt');
    const statusEl = document.getElementById('cultivo-submit-modal-status');
    const titleTrim = titleEl ? String(titleEl.value).trim() : '';
    if (!titleTrim) {
      if (statusEl) statusEl.textContent = 'Informe um título para a submissão.';
      return;
    }
    const confirmBtn = document.getElementById('cultivo-submit-confirm');
    if (confirmBtn) confirmBtn.disabled = true;
    if (growSubmitLabBtn) growSubmitLabBtn.disabled = true;
    if (statusEl) statusEl.textContent = 'A enviar submissão…';
    try {
      const res = await fetch('/api/cultivo/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          growId: log.id,
          title: titleTrim,
          excerpt: excerptEl ? String(excerptEl.value).trim() : ''
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (statusEl) statusEl.textContent = data.error || 'Não foi possível submeter.';
        flashLiveStatus(data.error || 'Não foi possível submeter.', true);
        if (growSubmitLabBtn) growSubmitLabBtn.disabled = false;
        if (confirmBtn) confirmBtn.disabled = false;
        return;
      }
      closeCultivoModal('cultivo-submit-modal');
      flashLiveStatus('Submissão enviada — o laboratório irá rever.');
      submissionStatusByGrow = null;
      await loadGrowSubmissionStatus(log.id);
      if (user && user.profile) renderCultivoHub(user.profile);
    } catch (e) {
      if (statusEl) statusEl.textContent = 'Erro de rede ao submeter.';
      flashLiveStatus('Erro de rede ao submeter.', true);
      if (growSubmitLabBtn) growSubmitLabBtn.disabled = false;
    }
    if (confirmBtn) confirmBtn.disabled = false;
  }

  async function loadGrowSubmissionStatus(growId) {
    if (!growSubmissionStatus) return;
    growSubmissionStatus.textContent = '';
    growSubmissionStatus.className = 'cultivo-submission-status conta-status';
    if (!growId) return;
    try {
      const res = await fetch('/api/cultivo/submissions?growId=' + encodeURIComponent(growId), { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json().catch(() => ({}));
      const list = data.submissions || [];
      const latest = list[0];
      if (!latest) {
        if (growSubmitLabBtn) growSubmitLabBtn.disabled = false;
        return;
      }
      if (latest.status === 'pending') {
        growSubmissionStatus.textContent = 'Submissão em revisão pelo laboratório — enviada em ' + formatDate(latest.submittedAt) + '.';
        growSubmissionStatus.classList.add('is-pending');
      } else if (latest.status === 'approved') {
        growSubmissionStatus.innerHTML = 'Publicada no site' +
          (latest.postUrl ? ' — <a href="' + escapeHtml(latest.postUrl) + '">ver pesquisa</a>' : '') + '.';
        growSubmissionStatus.classList.add('is-approved');
        if (submissionStatusByGrow) submissionStatusByGrow[growId] = latest;
        renderSubmissionNotifications(user && user.profile);
      } else if (latest.status === 'rejected') {
        growSubmissionStatus.textContent = 'Submissão rejeitada' +
          (latest.reviewerNote ? ': ' + latest.reviewerNote : '') + '. Pode editar o diário e submeter de novo.';
        growSubmissionStatus.classList.add('is-error');
        if (submissionStatusByGrow) submissionStatusByGrow[growId] = latest;
        renderSubmissionNotifications(user && user.profile);
      }
      if (growSubmitLabBtn) {
        growSubmitLabBtn.disabled = latest.status === 'pending' || latest.status === 'approved';
      }
    } catch (e) { /* ignore */ }
  }

  async function duplicateActiveGrow() {
    if (!user || !user.profile || !selectedGrowLogId) return;
    const source = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!source) return;
    const copy = duplicateGrowLog(source);
    if (!copy) return;
    user.profile.growLogs.unshift(copy);
    await persistGrowLogs(growDetailStatus);
    flashLiveStatus('Pesquisa duplicada.');
    navigateCultivo({ view: 'grow', growId: copy.id });
  }

  async function deleteActiveGrow() {
    if (!user || !user.profile || !selectedGrowLogId) return;
    const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!log) return;
    if (!window.confirm('Apagar a pesquisa «' + log.name + '» e todos os registos? Esta acção não pode ser desfeita.')) return;
    user.profile.growLogs = (user.profile.growLogs || []).filter((item) => item.id !== log.id);
    if (user.profile.activeGrowLogId === log.id) {
      user.profile.activeGrowLogId = user.profile.growLogs[0] ? user.profile.growLogs[0].id : '';
      syncPhaseFromActiveLog(user.profile);
    }
    selectedGrowLogId = null;
    await persistGrowLogs(growDetailStatus);
    flashLiveStatus('Pesquisa apagada.');
    navigateCultivo({ view: 'hub' }, { replace: true });
    renderCultivoHub(user.profile);
  }

  function exportGrowCsv(log) {
    if (!log) return;
    const rows = [['Diário', 'Data', 'Tipo', 'Texto', 'pH', 'EC', '°C', 'RH', 'VPD', 'DLI', 'Fonte', 'Mídia']];
    (log.entries || []).forEach((entry) => {
      const metrics = entry.metrics || {};
      rows.push([
        log.name,
        entry.date,
        entry.actionType || '',
        entry.text || '',
        metrics.ph != null ? metrics.ph : '',
        metrics.ec != null ? metrics.ec : '',
        metrics.temp != null ? metrics.temp : '',
        metrics.rh != null ? metrics.rh : '',
        metrics.vpd != null ? metrics.vpd : '',
        metrics.dli != null ? metrics.dli : '',
        entry.source || 'manual',
        Array.isArray(entry.photos) ? entry.photos.join(' ') : ''
      ]);
    });
    const safeName = String(log.name || 'pesquisa').replace(/[^\w\-]+/g, '-').slice(0, 40);
    downloadCsv('diario-' + safeName + '.csv', rows);
  }

  function exportAllGrowsCsv(profile) {
    ensureGrowLogs(profile);
    const rows = [['Diário', 'Data', 'Tipo', 'Texto', 'pH', 'EC', '°C', 'RH', 'VPD', 'DLI', 'Fonte', 'Mídia']];
    (profile.growLogs || []).forEach((log) => {
      (log.entries || []).forEach((entry) => {
        const metrics = entry.metrics || {};
        rows.push([
          log.name,
          entry.date,
          entry.actionType || '',
          entry.text || '',
          metrics.ph != null ? metrics.ph : '',
          metrics.ec != null ? metrics.ec : '',
          metrics.temp != null ? metrics.temp : '',
          metrics.rh != null ? metrics.rh : '',
          metrics.vpd != null ? metrics.vpd : '',
          metrics.dli != null ? metrics.dli : '',
          entry.source || 'manual',
          Array.isArray(entry.photos) ? entry.photos.join(' ') : ''
        ]);
      });
    });
    downloadCsv('diarios-pesquisas.csv', rows);
  }

  function printGrowDetail() {
    if (!selectedGrowLogId || !user || !user.profile) return;
    const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
    if (!log) return;
    document.body.classList.add('perfil-print-mode');
    const cleanup = () => document.body.classList.remove('perfil-print-mode');
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  }

  function logReminderToDiary(task, profile) {
    const log = getSelectedGrowLog(profile) || ensureActiveGrowLog(profile, '');
    if (!log) return;
    const actionType = task.actionType || 'obs';
    const text = task.label || buildReminderLabel(actionType, '');
    const entry = createGrowEntry(text, {
      date: todayDateInputValue(),
      actionType: actionType === 'rega' || actionType === 'adubo' ? actionType : 'obs',
      source: 'manual'
    });
    appendEntryToGrowLog(log, entry);
    if (profile.activeGrowLogId !== log.id) profile.activeGrowLogId = log.id;
  }

function renderInicioSummary() { /* hub dedicado */ }  function renderPhaseSelector(profile) {
    /* Fase gerida pela pesquisa activa — selector global removido */
  }

  function getCurrentWeekNumber(phaseStartedAt) {
    if (!phaseStartedAt) return 1;
    const start = new Date(phaseStartedAt);
    if (isNaN(start.getTime())) return 1;
    const diffMs = Date.now() - start.getTime();
    return Math.max(1, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1);
  }

  function getActiveWeek(profile) {
    const weeks = getRoteiroWeeks(profile);
    const current = getCurrentWeekNumber(profile && profile.phaseStartedAt);
    const num = selectedWeek != null ? selectedWeek : current;
    return Math.min(Math.max(1, num), weeks.length || 1);
  }

  function getWeekGuideData(profile, weekNumber) {
    const weeks = getRoteiroWeeks(profile);
    if (!weeks.length) return null;
    const idx = Math.min(Math.max(1, weekNumber), weeks.length) - 1;
    return weeks[idx];
  }

  function stashWeekNotes() {
    if (!weekNotesEl || !user || !user.profile) return;
    const log = getSelectedGrowLog(user.profile);
    if (!log) return;
    ensureGrowFields(log);
    const w = getActiveWeek(user.profile);
    log.guideWeekNotes[String(w)] = weekNotesEl.value.trim();
  }

  function readGuideWeekNotesFromProfile(profile) {
    const log = getSelectedGrowLog(profile);
    if (log && log.guideWeekNotes) return Object.assign({}, log.guideWeekNotes);
    const src = profile && profile.guideWeekNotes && typeof profile.guideWeekNotes === 'object'
      ? profile.guideWeekNotes
      : {};
    return Object.assign({}, src);
  }

  function readHubFields() {
    const log = user && user.profile ? getSelectedGrowLog(user.profile) : null;
    if (log) ensureGrowFields(log);
    const notes = readGuideWeekNotesFromProfile(user && user.profile);
    if (weekNotesEl && user && user.profile) {
      const w = getActiveWeek(user.profile);
      const key = String(w);
      if (weekNotesEl.dataset.weekKey !== key) {
        weekNotesEl.value = notes[key] || '';
        weekNotesEl.dataset.weekKey = key;
      } else if (log) {
        log.guideWeekNotes[key] = weekNotesEl.value.trim();
      }
    }
    if (customGuideEl && log) {
      log.customGuide = customGuideEl.value.trim();
    }
    if (log) readGrowSetupFields(log);
    return {
      customGuide: '',
      planTasks: user && user.profile && Array.isArray(user.profile.planTasks)
        ? user.profile.planTasks.slice()
        : [],
      guideWeekNotes: {},
      growLogs: cloneGrowLogs(user && user.profile ? user.profile.growLogs : []),
      activeGrowLogId: user && user.profile ? user.profile.activeGrowLogId || '' : '',
      phase: user && user.profile ? getEffectivePhase(user.profile) : 'planejamento',
      phaseStartedAt: user && user.profile ? user.profile.phaseStartedAt : null,
      journal: user && user.profile ? String(user.profile.journal || '').trim() : ''
    };
  }

  function applyCultivoState(profile, cultivo) {
    if (!profile || !cultivo) return profile;
    profile.phase = cultivo.phase;
    profile.phaseStartedAt = cultivo.phaseStartedAt;
    profile.activeGrowLogId = cultivo.activeGrowLogId;
    profile.customGuide = cultivo.customGuide;
    profile.guideWeekNotes = cultivo.guideWeekNotes && typeof cultivo.guideWeekNotes === 'object'
      ? Object.assign({}, cultivo.guideWeekNotes)
      : {};
    profile.growLogs = cloneGrowLogs(cultivo.growLogs);
    profile.planTasks = Array.isArray(cultivo.planTasks) ? cultivo.planTasks.slice() : [];
    ensureGrowLogs(profile);
    syncPhaseFromActiveLog(profile);
    return profile;
  }

  async function loadCultivoIntoProfile() {
    const res = await fetch('/api/cultivo', { credentials: 'include' });
    if (!res.ok) throw new Error('cultivo_load_failed');
    const data = await res.json();
    if (data.cultivo && user) {
      if (!user.profile) user.profile = {};
      applyCultivoState(user.profile, data.cultivo);
    }
    return data.cultivo;
  }

  function readAccountForm() {
    const nameEl = document.getElementById('profile-displayName');
    const usernameEl = document.getElementById('profile-username');
    const birthDateEl = document.getElementById('profile-birthDate');
    const base = user && user.profile ? Object.assign({}, user.profile) : {};
    if (nameEl) base.displayName = nameEl.value.trim();
    if (usernameEl) base.username = sanitizeUsername(usernameEl.value);
    if (birthDateEl) base.birthDate = String(birthDateEl.value || '').trim();
    base.age = calculateAgeFromBirthDate(base.birthDate);
    if (avatarUrlEl) {
      const picked = avatarUrlEl.value.trim();
      if (picked) base.avatarUrl = picked;
    }
    return base;
  }

  function readCultivoPayload() {
    return readHubFields();
  }

  function readForm() {
    if (IS_CULTIVO_PAGE) return readCultivoPayload();
    return readAccountForm();
  }

  function fillForm(profile) {
    const p = profile || {};
    const nameEl = document.getElementById('profile-displayName');
    const usernameEl = document.getElementById('profile-username');
    const birthDateEl = document.getElementById('profile-birthDate');
    if (nameEl) {
      nameEl.value = p.displayName || (user && user.name) || '';
    }
    if (usernameEl) usernameEl.value = p.username || (user && user.username) || '';
    if (birthDateEl) birthDateEl.value = p.birthDate || (user && user.birthDate) || '';
    if (customGuideEl) customGuideEl.value = p.customGuide || '';
    fillAvatarFields(p, user);
  }

  function showAccountView() {
    if (onboardingEl) onboardingEl.hidden = true;
    if (dashboardEl) dashboardEl.hidden = true;
    if (accountEl) accountEl.hidden = false;
    if (editBtn) editBtn.hidden = false;
    if (cancelEditBtn) cancelEditBtn.hidden = true;
  }

  function showDashboardView() {
    if (!IS_CULTIVO_PAGE) {
      showAccountView();
      return;
    }
    if (onboardingEl) onboardingEl.hidden = true;
    if (dashboardEl) dashboardEl.hidden = false;
    if (accountEl) accountEl.hidden = true;
    if (editBtn) editBtn.hidden = false;
    if (cancelEditBtn) cancelEditBtn.hidden = true;
    initTabs();
    if (formTitle) formTitle.textContent = 'Completar cadastro';
    if (onboardingIntro) {
      onboardingIntro.innerHTML = 'Primeira etapa: nome, username e data de nascimento. O resto pode completar depois.';
    }
  }

  function showOnboardingView(isEdit) {
    if (onboardingEl) onboardingEl.hidden = false;
    if (dashboardEl) dashboardEl.hidden = true;
    if (editBtn) editBtn.hidden = true;
    if (cancelEditBtn) cancelEditBtn.hidden = !isEdit;
    if (formTitle) {
      formTitle.textContent = isEdit ? 'Editar cadastro' : 'Completar cadastro';
    }
    if (onboardingIntro) {
      onboardingIntro.innerHTML = isEdit
        ? 'Altere nome, username, data de nascimento ou foto. O site é exclusivo para <strong>maiores de 18 anos</strong>.'
        : 'Primeira etapa: nome, username e data de nascimento. O resto pode completar depois.';
    }
    onboardingEl && onboardingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderHub(profile) {
    ensureGrowLogs(profile);
    if (selectedWeek == null) {
      selectedWeek = getCurrentWeekNumber(profile && profile.phaseStartedAt);
    }
    if (cultivoView === 'hub') {
      renderCultivoHub(profile);
    } else if (cultivoView === 'grow' && selectedGrowLogId) {
      renderGrowPage(profile);
    }
    fillForm(profile);
  }

  function renderTimeline(profile) {
    if (!timelineEl || !profile) return;
    const eff = getEffectivePhase(profile);
    const weeks = getRoteiroWeeks(profile);
    if (!weeks.length) {
      timelineEl.hidden = true;
      return;
    }
    const current = getCurrentWeekNumber(profile.phaseStartedAt);
    const active = getActiveWeek(profile);
    const phaseLabel = formatProfileValue('phase', eff);
    const since = profile.phaseStartedAt ? formatDate(profile.phaseStartedAt) : 'data não registada';

    timelineEl.hidden = false;
    if (timelineSub) {
      timelineSub.textContent = phaseLabel + ' — semana ' + current + ' de ' + weeks.length + ' (desde ' + since + ').';
    }

    if (weekPills) {
      weekPills.innerHTML = weeks.map((w) => {
        const isCurrent = w.week === current;
        const isActive = w.week === active;
        return (
          '<button type="button" class="perfil-week-pill' +
          (isActive ? ' is-active' : '') +
          (isCurrent ? ' is-current' : '') +
          '" role="tab" aria-selected="' + (isActive ? 'true' : 'false') + '" data-week="' + w.week + '">' +
          'S' + w.week +
          (isCurrent ? '<span class="perfil-week-pill-now">agora</span>' : '') +
          '</button>'
        );
      }).join('');

      weekPills.querySelectorAll('.perfil-week-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          stashWeekNotes();
          selectedWeek = parseInt(btn.getAttribute('data-week'), 10);
          renderWeekGuide(profile);
          renderTimeline(profile);
        });
      });
    }
  }

  function getWeekTaskCanonicalLabel(weekNum, taskText) {
    return '[Semana ' + weekNum + '] ' + String(taskText || '').trim();
  }

  function findWeekPlanTask(profile, growId, weekNum, taskText) {
    const canonical = getWeekTaskCanonicalLabel(weekNum, taskText);
    return planTasksForGrow(profile, growId).find((task) => String(task.label || '').trim() === canonical) || null;
  }

  function weekTaskStatus(profile, growId, weekNum, taskText) {
    const task = findWeekPlanTask(profile, growId, weekNum, taskText);
    if (!task) return 'pending';
    return task.done ? 'done' : 'doing';
  }

  function weekTaskDueAt(log, weekNum) {
    const start = new Date(log && log.plantedAt ? log.plantedAt : new Date().toISOString());
    if (Number.isNaN(start.getTime())) return todayDateInputValue();
    const due = new Date(start.getTime() + (((weekNum - 1) * 7) + 3) * 86400000);
    return due.toISOString().slice(0, 10);
  }

  function phaseMetricTargets(phase) {
    const key = phase || 'planejamento';
    const map = {
      planejamento: ['Plano de luz: W/m² definido', 'Ambiente alvo: 22-28°C', 'Risco máximo: checklist incompleto'],
      germinacao: ['Temperatura: 22-26°C', 'Humidade: 65-80%', 'Risco máximo: excesso de água'],
      vegetativo: ['Temperatura: 22-29°C', 'Humidade: 55-70%', 'VPD alvo: 0.8-1.2 kPa'],
      floracao: ['Temperatura: 20-28°C', 'Humidade: 40-55%', 'VPD alvo: 1.1-1.5 kPa'],
      colheita: ['Secagem: 18-22°C', 'Humidade: 50-60%', 'Risco máximo: mofo na cura']
    };
    return map[key] || map.planejamento;
  }

  function growOpenOverdueTasks(profile, growId) {
    return planTasksForGrow(profile, growId).filter((task) => !task.done && isTaskOverdue(task)).length;
  }

  function weekChecklistMetrics(profile, log, guide) {
    const tasks = Array.isArray(guide && guide.tasks) ? guide.tasks : [];
    const weekNum = guide && guide.week ? guide.week : getActiveWeek(profile);
    let done = 0;
    let doing = 0;
    tasks.forEach((item) => {
      const state = weekTaskStatus(profile, log.id, weekNum, item);
      if (state === 'done') done += 1;
      else if (state === 'doing') doing += 1;
    });
    const total = tasks.length || 1;
    const progress = Math.round((done / total) * 100);
    return { total: tasks.length, done, doing, pending: Math.max(0, tasks.length - done - doing), progress };
  }

  function setWeekTaskStatus(profile, log, guide, taskText, nextStatus) {
    if (!profile || !log || !guide || !taskText) return;
    const weekNum = guide.week || getActiveWeek(profile);
    const canonical = getWeekTaskCanonicalLabel(weekNum, taskText);
    const tasks = planTasksForGrow(profile, log.id);
    const idx = tasks.findIndex((item) => String(item.label || '').trim() === canonical);
    if (nextStatus === 'pending') {
      if (idx >= 0) {
        tasks.splice(idx, 1);
        setPlanTasksForGrow(profile, log.id, tasks);
      }
      return;
    }
    const existing = idx >= 0 ? tasks[idx] : null;
    const task = existing || {
      id: 'u' + Date.now() + Math.random().toString(36).slice(2, 6),
      label: canonical,
      done: false,
      toolHref: '',
      dueAt: weekTaskDueAt(log, weekNum),
      actionType: '',
      growId: log.id
    };
    task.done = nextStatus === 'done';
    if (!task.dueAt) task.dueAt = weekTaskDueAt(log, weekNum);
    if (idx >= 0) tasks[idx] = task;
    else tasks.push(task);
    setPlanTasksForGrow(profile, log.id, tasks);
  }

  async function saveWeekTaskStatus(profile, log, guide, taskText, nextStatus) {
    setWeekTaskStatus(profile, log, guide, taskText, nextStatus);
    renderWeekGuide(profile);
    renderPlanTasks(profile);
    renderHubStats(profile, profile.growLogs || []);
    await persistPlanTasks(planoStatus);
  }

  async function addAllWeekTasksToPlan(profile, log, guide) {
    const tasks = Array.isArray(guide && guide.tasks) ? guide.tasks : [];
    if (!tasks.length) return;
    tasks.forEach((taskText) => {
      if (weekTaskStatus(profile, log.id, guide.week, taskText) === 'pending') {
        setWeekTaskStatus(profile, log, guide, taskText, 'doing');
      }
    });
    renderWeekGuide(profile);
    renderPlanTasks(profile);
    renderHubStats(profile, profile.growLogs || []);
    flashLiveStatus('Checklist da semana adicionada ao Plano.');
    await persistPlanTasks(planoStatus);
  }

  async function closeActiveWeek(profile, log, guide) {
    const metrics = weekChecklistMetrics(profile, log, guide);
    const summary =
      'Fecho da Semana ' + guide.week + ' (' + guide.title + '): ' +
      metrics.done + '/' + metrics.total + ' concluídas, ' + metrics.pending + ' pendentes.';
    const entry = createGrowEntry(summary, {
      date: todayDateInputValue(),
      actionType: 'roteiro',
      source: 'week-note'
    });
    const result = appendEntryToGrowLog(log, entry);
    if (!result.ok) {
      setStatus(guiaStatus, result.error, true);
      return;
    }
    const phaseWeeks = getRoteiroWeeks(profile);
    selectedWeek = Math.min((guide.week || 1) + 1, phaseWeeks.length || (guide.week || 1));
    renderWeekGuide(profile);
    renderTimeline(profile);
    refreshUI({ tab: 'diario', skipStash: true, scrollTo: 'perfil-grow-entries' });
    setStatus(guiaStatus, 'Semana fechada e registada no diário.');
    flashLiveStatus('Resumo semanal guardado no diário.');
    await persistGrowLogs(growDetailStatus, { tab: 'diario', skipStash: true });
  }

  function bindWeekOperations(profile, log, guide) {
    if (!weekContentEl || weekContentEl.dataset.opsBound === '1') return;
    weekContentEl.dataset.opsBound = '1';
    weekContentEl.addEventListener('click', async (event) => {
      const taskBtn = event.target.closest('[data-week-task-index]');
      if (taskBtn) {
        const idx = parseInt(taskBtn.getAttribute('data-week-task-index'), 10);
        const nextStatus = taskBtn.getAttribute('data-next-status') || 'doing';
        const activeGuide = getWeekGuideData(profile, getActiveWeek(profile));
        const activeLog = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
        if (!activeGuide || !activeLog || Number.isNaN(idx)) return;
        const taskText = (activeGuide.tasks || [])[idx];
        if (!taskText) return;
        await saveWeekTaskStatus(profile, activeLog, activeGuide, taskText, nextStatus);
        return;
      }

      const actionBtn = event.target.closest('[data-week-action]');
      if (!actionBtn) return;
      const action = actionBtn.getAttribute('data-week-action');
      const activeGuide = getWeekGuideData(profile, getActiveWeek(profile));
      const activeLog = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
      if (!activeGuide || !activeLog) return;
      if (action === 'sync-plan') {
        await addAllWeekTasksToPlan(profile, activeLog, activeGuide);
        return;
      }
      if (action === 'close-week') {
        await closeActiveWeek(profile, activeLog, activeGuide);
        return;
      }
      if (action === 'next-week') {
        const weeks = getPhaseWeeks(getEffectivePhase(profile));
        selectedWeek = Math.min(getActiveWeek(profile) + 1, weeks.length || 1);
        renderWeekGuide(profile);
        renderTimeline(profile);
      }
    });
  }

  function renderWeekGuide(profile) {
    if (!weekContentEl || !profile) return;
    const log = getSelectedGrowLog(profile) || getActiveGrowLog(profile);
    if (!log) return;
    const weekNum = getActiveWeek(profile);
    const guide = getWeekGuideData(profile, weekNum);
    const notes = readGuideWeekNotesFromProfile(profile);
    if (weekNotesEl) {
      weekNotesEl.value = notes[String(weekNum)] || '';
      weekNotesEl.dataset.weekKey = String(weekNum);
    }

    if (!guide) {
      weekContentEl.innerHTML = '<p class="perfil-plano-empty">Sem roteiro para esta fase.</p>';
      updateWeekInspectionLink(profile);
      return;
    }

    bindWeekOperations(profile, log, guide);

    const phase = getEffectivePhase(profile);
    const checklist = weekChecklistMetrics(profile, log, guide);
    const overdue = growOpenOverdueTasks(profile, log.id);
    const riskLabel = overdue > 0 ? 'Risco alto' : (checklist.pending > 1 ? 'Atenção' : 'Operação estável');
    const riskClass = overdue > 0 ? 'is-high' : (checklist.pending > 1 ? 'is-mid' : 'is-low');
    const metricsTargets = phaseMetricTargets(phase);

    const toolsHtml = (guide.tools || []).map((t) =>
      '<li><a href="' + escapeHtml(t.href) + '">' + escapeHtml(t.label) + '</a></li>'
    ).join('');

    const taskRows = (guide.tasks || []).map((taskText, idx) => {
      const state = weekTaskStatus(profile, log.id, guide.week, taskText);
      const stateLabel = state === 'done' ? 'Concluída' : state === 'doing' ? 'Em andamento' : 'Pendente';
      const next = state === 'pending' ? 'doing' : state === 'doing' ? 'done' : 'pending';
      const nextLabel = next === 'doing' ? 'Iniciar' : next === 'done' ? 'Concluir' : 'Reabrir';
      return '<li class="perfil-week-op-item ' + 'is-' + state + '">' +
        '<div class="perfil-week-op-copy">' +
        '<p class="perfil-week-op-text">' + escapeHtml(taskText) + '</p>' +
        '<span class="perfil-week-op-state">' + stateLabel + '</span>' +
        '</div>' +
        '<button type="button" class="botao botao-outline botao-sm" data-week-task-index="' + idx + '" data-next-status="' + next + '">' + nextLabel + '</button>' +
      '</li>';
    }).join('');

    weekContentEl.innerHTML =
      '<header class="perfil-week-content-head">' +
      '<p class="perfil-week-label">Semana ' + guide.week + '</p>' +
      '<h3>' + escapeHtml(guide.title) + '</h3>' +
      '<p class="perfil-week-focus">' + escapeHtml(guide.focus) + '</p>' +
      '<div class="perfil-week-kpis">' +
      '<p><strong>Progresso</strong> ' + checklist.progress + '% · ' + checklist.done + '/' + checklist.total + ' concluídas</p>' +
      '<p class="perfil-week-risk ' + riskClass + '"><strong>Risco:</strong> ' + riskLabel + '</p>' +
      '</div>' +
      '<div class="perfil-week-progress"><span style="width:' + checklist.progress + '%"></span></div>' +
      '</header>' +
      '<ul class="perfil-week-op-list">' +
      taskRows +
      '</ul>' +
      '<p class="perfil-week-tools-title"><strong>Metas operacionais:</strong></p>' +
      '<ul class="info-list">' + metricsTargets.map((line) => '<li>' + escapeHtml(line) + '</li>').join('') + '</ul>' +
      '<div class="perfil-week-actions">' +
      '<button type="button" class="botao botao-outline botao-sm" data-week-action="sync-plan">Adicionar checklist ao Plano</button>' +
      '<button type="button" class="botao botao-outline botao-sm" data-week-action="next-week">Próxima semana</button>' +
      '<button type="button" class="botao botao-sm" data-week-action="close-week">Concluir semana no Diário</button>' +
      '</div>' +
      (toolsHtml ? '<p class="perfil-week-tools-title"><strong>Ferramentas:</strong></p><ul class="info-list">' + toolsHtml + '</ul>' : '');
    updateWeekInspectionLink(profile);
  }

  function defaultPlanTasks(profile, growId) {
    const phase = getEffectivePhase(profile);
    const list = PHASE_PLAN_DEFAULTS[phase] || PHASE_PLAN_DEFAULTS.planejamento || [];
    const gid = growId || selectedGrowLogId || '';
    return list.map((t, i) => ({
      id: 'd' + phase + i,
      label: t.label,
      done: false,
      toolHref: t.href || '',
      growId: gid
    }));
  }

  function planTasksForGrow(profile, growId) {
    if (!profile) return [];
    const gid = growId || selectedGrowLogId || '';
    const all = Array.isArray(profile.planTasks) ? profile.planTasks : [];
    const scoped = gid
      ? all.filter((task) => !task.growId || task.growId === gid)
      : all.filter((task) => !task.growId);
    return scoped.slice();
  }

  function setPlanTasksForGrow(profile, growId, tasks) {
    if (!profile || !growId) return;
    const others = (profile.planTasks || []).filter((task) => task.growId && task.growId !== growId);
    const tagged = (tasks || []).map((task) => Object.assign({}, task, { growId: growId }));
    profile.planTasks = others.concat(tagged);
  }

  function ensurePlanTasks(profile) {
    if (!profile) return [];
    return planTasksForGrow(profile, selectedGrowLogId);
  }

  function renderPlanTasks(profile) {
    if (!planoList) return;
    const growId = selectedGrowLogId;
    const tasks = sortPlanTasks(planTasksForGrow(profile, growId));
    if (user && user.profile && growId) {
      setPlanTasksForGrow(user.profile, growId, tasks);
    }

    if (!tasks.length) {
      planoList.innerHTML = '<li class="perfil-plano-empty">Adicione tarefas ou altere a fase desta pesquisa para sugestões automáticas.</li>';
      renderPlanMetrics(tasks);
      renderPlanPreview(profile);
      return;
    }

    planoList.innerHTML = tasks.map((task) => {
      const isOverdue = isTaskOverdue(task);
      const stateLabel = task.done ? 'Concluída' : (isOverdue ? 'Atrasada' : 'Em aberto');
      const toolLink = task.toolHref
        ? ' <a class="perfil-plano-tool" href="' + escapeHtml(task.toolHref) + '">Abrir ferramenta</a>'
        : '';
      const dueHtml = task.dueAt
        ? '<span class="perfil-plano-due' + (isTaskOverdue(task) ? ' is-overdue' : '') + '">' + escapeHtml(formatTaskDueLabel(task)) + '</span>'
        : '';
      return (
        '<li class="perfil-plano-item' + (task.done ? ' is-done' : '') + (isOverdue ? ' is-overdue' : '') + '" data-task-id="' + escapeHtml(task.id) + '">' +
        '<label class="perfil-plano-check">' +
        '<input type="checkbox"' + (task.done ? ' checked' : '') + ' aria-label="' + escapeHtml(task.label) + '">' +
        '<span class="perfil-plano-copy">' +
        '<strong class="perfil-plano-label">' + escapeHtml(task.label) + '</strong>' +
        '<span class="perfil-plano-meta"><span class="perfil-plano-state">' + escapeHtml(stateLabel) + '</span>' + dueHtml + '</span>' +
        '</span></label>' +
        toolLink +
        '<button type="button" class="perfil-plano-remove" aria-label="Remover tarefa">×</button>' +
        '</li>'
      );
    }).join('');

    planoList.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener('change', onPlanTaskToggle);
    });
    planoList.querySelectorAll('.perfil-plano-remove').forEach((btn) => {
      btn.addEventListener('click', onPlanTaskRemove);
    });
    renderPlanMetrics(tasks);
    renderPlanPreview(profile);
    renderInicioSummary(profile);
  }

  async function saveCultivoPayload(payload, statusEl, options) {
    if (profileSaving) return null;
    profileSaving = true;
    if (statusEl) setStatus(statusEl, 'A guardar…');
    try {
      const res = await fetch('/api/cultivo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (statusEl) setStatus(statusEl, data.error || 'Erro ao guardar.', true);
        if (!options || !options.silent) flashLiveStatus(data.error || 'Erro ao guardar.', true);
        return null;
      }
      if (data.cultivo && user) {
        if (!user.profile) user.profile = {};
        applyCultivoState(user.profile, mergeProfileFromPayload(
          applyCultivoState(user.profile, data.cultivo),
          payload
        ));
        if (cultivoView === 'grow' && user.profile) {
          const hasSelected = selectedGrowLogId && (user.profile.growLogs || []).some((g) => g.id === selectedGrowLogId);
          if (!hasSelected) {
            const fallback = getSelectedGrowLog(user.profile) || getActiveGrowLog(user.profile) || (user.profile.growLogs || [])[0] || null;
            if (fallback) {
              selectedGrowLogId = fallback.id;
              persistSelectedGrowId(fallback.id);
            }
          }
        }
      }
      if (data.user) {
        const accountProfile = data.user.profile && typeof data.user.profile === 'object'
          ? data.user.profile
          : {};
        const currentProfile = user && user.profile && typeof user.profile === 'object'
          ? user.profile
          : {};
        user = Object.assign({}, user, data.user, {
          // Keep cultivo fields from the just-updated in-memory profile.
          profile: Object.assign({}, accountProfile, currentProfile)
        });
      }
      if (user && user.profile) ensureGrowLogs(user.profile);
      updateUserHeader(user);
      fillForm(user.profile);
      if (!options || !options.silent) refreshUI();
      broadcastProfilePicture(user);
      if (statusEl) setStatus(statusEl, 'Guardado.');
      return user;
    } catch (err) {
      if (statusEl) setStatus(statusEl, 'Servidor indisponível.', true);
      flashLiveStatus('Servidor indisponível — os dados ficaram na tela; tente guardar de novo.', true);
      return null;
    } finally {
      profileSaving = false;
    }
  }

  async function saveProfilePayload(payload, statusEl) {
    if (IS_CULTIVO_PAGE) return saveCultivoPayload(payload, statusEl);
    if (profileSaving) return null;
    profileSaving = true;
    if (statusEl) setStatus(statusEl, 'A guardar…');
    try {
      const accountPayload = {
        displayName: payload.displayName,
        username: payload.username,
        birthDate: payload.birthDate,
        age: payload.age,
        avatarUrl: payload.avatarUrl
      };
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(accountPayload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (statusEl) setStatus(statusEl, data.error || 'Erro ao guardar.', true);
        flashLiveStatus(data.error || 'Erro ao guardar.', true);
        return null;
      }
      if (data.user && data.user.profile) {
        const merged = Object.assign({}, data.user.profile);
        if (payload.displayName !== undefined) merged.displayName = payload.displayName;
        if (payload.username !== undefined) merged.username = payload.username;
        if (payload.birthDate !== undefined) merged.birthDate = payload.birthDate;
        if (payload.age !== undefined) merged.age = payload.age;
        if (payload.avatarUrl !== undefined) merged.avatarUrl = payload.avatarUrl;
        data.user.profile = merged;
      }
      user = data.user;
      if (user && user.profile) ensureGrowLogs(user.profile);
      updateUserHeader(user);
      fillForm(user.profile);
      broadcastProfilePicture(user);
      if (statusEl) setStatus(statusEl, 'Guardado.');
      return user;
    } catch (err) {
      if (statusEl) setStatus(statusEl, 'Servidor indisponível.', true);
      flashLiveStatus('Servidor indisponível — os dados ficaram na tela; tente guardar de novo.', true);
      return null;
    } finally {
      profileSaving = false;
    }
  }

  async function persistGrowLogs(statusEl, uiOptions) {
    if (!user || !user.profile) return null;
    syncPhaseFromActiveLog(user.profile);
    const silent = !!(uiOptions && uiOptions.silent);
    const saved = await saveCultivoPayload(readForm(), statusEl, { silent: silent });
    if (saved && uiOptions) refreshUI(uiOptions);
    else if (saved && !silent) refreshUI();
    return saved;
  }

  async function persistPlanTasks(statusEl) {
    if (planSaving || !user || !user.profile) return;
    planSaving = true;
    const payload = readForm();
    await saveProfilePayload(payload, statusEl);
    planSaving = false;
  }

  function onPlanTaskToggle(event) {
    const li = event.target.closest('.perfil-plano-item');
    if (!li || !user || !user.profile || !selectedGrowLogId) return;
    const id = li.getAttribute('data-task-id');
    const tasks = planTasksForGrow(user.profile, selectedGrowLogId);
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const wasDone = task.done;
      task.done = event.target.checked;
      li.classList.toggle('is-done', task.done);
      if (task.done && !wasDone && task.dueAt && (task.actionType === 'rega' || task.actionType === 'adubo')) {
        logReminderToDiary(task, user.profile);
        flashLiveStatus('Lembrete concluído e registado no diário.');
      } else {
        flashLiveStatus(task.done ? 'Tarefa concluída.' : 'Tarefa reaberta.');
      }
      setPlanTasksForGrow(user.profile, selectedGrowLogId, tasks);
      renderPlanPreview(user.profile);
      renderInicioSummary(user.profile);
      persistPlanTasks(planoStatus);
      if (task.done && !wasDone && task.dueAt && (task.actionType === 'rega' || task.actionType === 'adubo')) {
        persistGrowLogs(growDetailStatus);
      }
    }
  }

  function onPlanTaskRemove(event) {
    const li = event.target.closest('.perfil-plano-item');
    if (!li || !user || !user.profile || !selectedGrowLogId) return;
    const id = li.getAttribute('data-task-id');
    const tasks = planTasksForGrow(user.profile, selectedGrowLogId).filter((t) => t.id !== id);
    setPlanTasksForGrow(user.profile, selectedGrowLogId, tasks);
    renderPlanTasks(user.profile);
    persistPlanTasks(planoStatus);
  }

  function addPlanTask(label, opts) {
    const options = opts || {};
    const trimmed = String(label || '').trim();
    if (!trimmed || !user || !user.profile || !selectedGrowLogId) return;
    const tasks = planTasksForGrow(user.profile, selectedGrowLogId);
    tasks.push({
      id: 'u' + Date.now(),
      label: trimmed,
      done: false,
      toolHref: options.toolHref || '',
      dueAt: options.dueAt || '',
      actionType: options.actionType || '',
      growId: selectedGrowLogId
    });
    setPlanTasksForGrow(user.profile, selectedGrowLogId, tasks);
    renderPlanTasks(user.profile);
    flashLiveStatus(options.dueAt ? 'Lembrete agendado.' : 'Tarefa adicionada ao plano.');
    persistPlanTasks(planoStatus);
  }

  function addPlanReminder(event) {
    if (event) event.preventDefault();
    if (!user || !user.profile) return;
    const actionType = reminderActionEl ? reminderActionEl.value : '';
    const dueAt = reminderDateEl ? reminderDateEl.value : '';
    if (!dueAt) {
      flashLiveStatus('Escolha a data do lembrete.', true);
      return;
    }
    const label = buildReminderLabel(actionType, reminderLabelEl ? reminderLabelEl.value : '');
    addPlanTask(label, { dueAt: dueAt, actionType: actionType });
    if (reminderLabelEl) reminderLabelEl.value = '';
    if (reminderDateEl) reminderDateEl.value = todayDateInputValue();
  }

  async function seedDefaultPlanIfEmpty(profile) {
    if (!profile || !selectedGrowLogId) return;
    const existing = planTasksForGrow(profile, selectedGrowLogId);
    if (existing.length) return;
    const tasks = defaultPlanTasks(profile, selectedGrowLogId);
    if (!tasks.length) return;
    setPlanTasksForGrow(profile, selectedGrowLogId, tasks);
    if (user && user.profile) setPlanTasksForGrow(user.profile, selectedGrowLogId, tasks);
    renderPlanTasks(profile);
    await saveProfilePayload(readForm(), null);
  }

  function renderUser(data) {
    user = data;
    if (user && user.profile) ensureGrowLogs(user.profile);
    updateUserHeader(data);
    fillForm(data.profile);
    broadcastProfilePicture(data);
    if (isUserProfileComplete(data) && IS_CULTIVO_PAGE) {
      renderHub(data.profile);
    }
  }

  async function loadUser() {
    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/entrar.html?returnTo=' + encodeURIComponent(PAGE_SELF);
        return;
      }
      if (!res.ok) throw new Error('load_failed');
      const data = await res.json();
      if (loadingEl) loadingEl.hidden = true;
      if (appEl) appEl.hidden = false;
      communityTermsAccepted = !!(data.communityTermsAccepted);
      renderUser(data);

      // O Diário exige apenas uma sessão autenticada. Não redirecionar perfis
      // antigos para o cadastro, pois isso criava um ciclo entre Cultivo e Perfil.
      if (IS_CULTIVO_PAGE) {
        await loadCommunityShares();
        await loadCultivoIntoProfile();
        showDashboardView();
        const hadNoGrowLogs = !(user.profile.growLogs && user.profile.growLogs.length);
        ensureGrowLogs(user.profile);
        if (hadNoGrowLogs && user.profile.growLogs && user.profile.growLogs.length) {
          await saveProfilePayload(readForm(), null);
        }
        if (!user.profile.phase) {
          const bootstrap = Object.assign({}, readForm(), { phase: 'planejamento' });
          const saved = await saveProfilePayload(bootstrap, null);
          if (saved) data = saved;
        }
        initCultivoHistory();
        initSectionNav();
        initCultivoAutosave();
        initPhotoDropZone();
        renderHub(data.profile);
        const params = new URLSearchParams(window.location.search);
        let initialRoute = parseCultivoRoute();
        const tab = params.get('tab');
        const growParam = params.get('grow');
        let preferredGrowId = growParam || '';
        if (!preferredGrowId) {
          try { preferredGrowId = sessionStorage.getItem(SELECTED_GROW_KEY) || ''; } catch (e) { /* ignore */ }
        }
        if ((tab === 'diario' || params.get('saved') === '1') && user.profile.growLogs && user.profile.growLogs.length) {
          const target = preferredGrowId
            ? user.profile.growLogs.find((item) => item.id === preferredGrowId)
            : null;
          const active = target || getActiveGrowLog(user.profile);
          if (active) initialRoute = { view: 'grow', growId: active.id };
        }
        if (params.get('saved') === '1') {
          flashLiveStatus('Resultado da calculadora guardado no diário.');
        }
        navigateCultivo(initialRoute, { replace: true, scroll: false });
        if (tab && tab !== 'diario') {
          switchTab(tab);
        }
        return;
      }

      if (isUserProfileComplete(data)) {
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('returnTo');
        if (returnTo && returnTo.startsWith('/')) {
          window.location.href = returnTo;
          return;
        }
        showAccountView();
      } else {
        showOnboardingView(false);
      }
    } catch (e) {
      if (loadingEl) {
        loadingEl.textContent = IS_CULTIVO_PAGE
          ? 'Não foi possível carregar as pesquisas. Recarregue a página.'
          : 'Não foi possível carregar o perfil. Recarregue a página.';
      }
    }
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const validationError = validateRegistrationForm();
      if (validationError) {
        setStatus(formStatus, validationError, true);
        return;
      }
      if (avatarUploadPending) {
        setStatus(formStatus, 'Aguarde o envio da foto terminar.', true);
        return;
      }
      setStatus(formStatus, 'A guardar…');
      const saveBtn = document.getElementById('perfil-save-btn');
      if (saveBtn) saveBtn.disabled = true;

      try {
        const formData = readForm();
        const wasComplete = isUserProfileComplete(user);
        const saved = await saveProfilePayload(formData, formStatus);
        if (!saved) return;

        if (!wasComplete && isUserProfileComplete(saved)) {
          const params = new URLSearchParams(window.location.search);
          const returnTo = params.get('returnTo');
          if (returnTo && returnTo.startsWith('/')) {
            window.location.href = returnTo;
            return;
          }
          setStatus(formStatus, 'Conta activa!');
          showAccountView();
          setStatus(formStatus, 'Perfil guardado — bem-vindo.');
        } else {
          showAccountView();
          setStatus(formStatus, 'Perfil actualizado.');
          if (cancelEditBtn && !cancelEditBtn.hidden) {
            setTimeout(() => setStatus(formStatus, ''), 2500);
          }
        }
      } catch (err) {
        setStatus(formStatus, 'Servidor indisponível.', true);
      } finally {
        if (saveBtn) saveBtn.disabled = false;
      }
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      fillForm(user && user.profile);
      showOnboardingView(true);
      const picker = document.querySelector('.perfil-avatar-picker');
      if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const avatarEditTrigger = document.getElementById('perfil-avatar-edit-btn');
  if (avatarEditTrigger) {
    avatarEditTrigger.addEventListener('click', () => {
      fillForm(user && user.profile);
      showOnboardingView(true);
      const picker = document.querySelector('.perfil-avatar-picker');
      if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (accountEditBtn) {
    accountEditBtn.addEventListener('click', () => {
      fillForm(user && user.profile);
      showOnboardingView(true);
      const picker = document.querySelector('.perfil-avatar-picker');
      if (picker) picker.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      if (IS_CULTIVO_PAGE) showDashboardView();
      else showAccountView();
      setStatus(formStatus, '');
    });
  }

  if (planoAddForm) {
    planoAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!planoInput) return;
      addPlanTask(planoInput.value);
      planoInput.value = '';
    });
  }

  if (cultivoCommunityConfirm) {
    cultivoCommunityConfirm.addEventListener('click', () => {
      void confirmCommunityShare();
    });
  }

  if (cultivoHubNewBtn) {
    cultivoHubNewBtn.addEventListener('click', () => navigateCultivo({ view: 'wizard' }));
  }
  if (cultivoHubEmptyBtn) {
    cultivoHubEmptyBtn.addEventListener('click', () => navigateCultivo({ view: 'wizard' }));
  }
  if (cultivoTasksBackBtn) {
    cultivoTasksBackBtn.addEventListener('click', () => closeGlobalTasksBoard());
  }

  if (cultivoWizardBack) {
    cultivoWizardBack.addEventListener('click', () => cultivoGoBack());
  }

  if (cultivoWizardCancel) {
    cultivoWizardCancel.addEventListener('click', () => cultivoGoBack());
  }

  initCultivoWizardPhasePicker();
  initCultivoEditPhasePicker();

  if (cultivoEditForm) {
    cultivoEditForm.addEventListener('submit', (e) => {
      void confirmEditGrow(e);
    });
  }

  if (cultivoEditDate) {
    enhanceDatePickerTouch(cultivoEditDate);
  }

  if (cultivoWizardForm) {
    cultivoWizardForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!user || !user.profile) return;
      const name = cultivoWizardName ? cultivoWizardName.value.trim() : '';
      const plantedDate = cultivoWizardDate ? cultivoWizardDate.value : todayDateInputValue();
      const plants = cultivoWizardPlants ? parseInt(cultivoWizardPlants.value, 10) : 1;
      if (!name) {
        setWizardStatus('Informe o nome da pesquisa.', true);
        if (cultivoWizardName) cultivoWizardName.focus();
        return;
      }
      if (!plantedDate) {
        setWizardStatus('Selecione uma data para iniciar a pesquisa.', true);
        if (cultivoWizardDate) cultivoWizardDate.focus();
        return;
      }
      setWizardStatus('A criar pesquisa…');
      const submitBtn = document.getElementById('cultivo-wizard-submit');
      if (submitBtn) submitBtn.disabled = true;
      const species = cultivoWizardSpecies ? cultivoWizardSpecies.value.trim() : '';
      const environment = cultivoWizardEnvironment ? cultivoWizardEnvironment.value : '';
      const substrate = cultivoWizardSubstrate ? cultivoWizardSubstrate.value : '';
      const log = await createGrowFromWizard(name, cultivoWizardPhase, plants, species, environment, substrate, plantedDate);
      if (submitBtn) submitBtn.disabled = false;
      if (!log) {
        setWizardStatus('Não foi possível guardar a pesquisa. Verifique a ligação e tente de novo.', true);
        return;
      }
      setWizardStatus('');
      flashLiveStatus('Pesquisa «' + log.name + '» criada e guardada.');
      navigateCultivo({ view: 'grow', growId: log.id }, { replace: true });
    });
  }

  [cultivoWizardDate, growEntryDate, reminderDateEl].forEach(enhanceDatePickerTouch);

  if (cultivoGrowBack) {
    cultivoGrowBack.textContent = '← Pesquisas';
    cultivoGrowBack.addEventListener('click', () => cultivoGoBack());
  }

  if (growDetailPhase) {
    growDetailPhase.addEventListener('change', async () => {
      if (!user || !user.profile || !selectedGrowLogId) return;
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (!log) return;
      log.phase = growDetailPhase.value;
      if (user.profile.activeGrowLogId === log.id) {
        syncPhaseFromActiveLog(user.profile);
        selectedWeek = getCurrentWeekNumber(user.profile.phaseStartedAt);
      }
      flashLiveStatus('Fase actualizada.');
      refreshUI();
      await persistGrowLogs(growDetailStatus);
    });
  }

  if (growEntryForm) {
    growEntryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideGrowPostSaveActions();
      if (!user || !user.profile || !selectedGrowLogId) return;
      if (entryMediaSaving || profileSaving) {
        setStatus(growDetailStatus, 'Aguarde o guardado anterior terminar…', true);
        return;
      }
      const metricErrors = validateEntryMetricsFromForm();
      if (metricErrors.length) {
        setStatus(growDetailStatus, metricErrors.join(' '), true);
        return;
      }
      const metrics = readEntryMetricsFromForm();
      let text = growEntryText ? growEntryText.value.trim() : '';
      if (!text) {
        text = buildDefaultEntryText(selectedEntryAction, metrics);
      }
      if (!text && !Object.keys(metrics).length && !pendingEntryPhotoFiles.length && !editingEntryId) {
        setStatus(growDetailStatus, 'Preencha observação, métricas ou mídia para guardar o registo.', true);
        return;
      }
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (!log) return;

      entryMediaSaving = true;
      if (cultivoAutosave && cultivoAutosave.pause) cultivoAutosave.pause();
      setStatus(growDetailStatus, pendingEntryPhotoFiles.length ? 'A enviar mídia…' : 'A guardar…');
      let photos = [];
      try {
        if (pendingEntryPhotoFiles.length) {
          photos = await uploadPendingEntryPhotos();
        }
      } catch (err) {
        setStatus(growDetailStatus, err.message || 'Erro ao enviar mídia.', true);
        flashLiveStatus(err.message || 'Erro ao enviar mídia.', true);
        entryMediaSaving = false;
        if (cultivoAutosave && cultivoAutosave.resume) cultivoAutosave.resume();
        return;
      }

      let createdNewEntry = false;
      try {
        if (editingEntryId) {
          const entry = (log.entries || []).find((item) => item.id === editingEntryId);
          if (!entry) {
            editingEntryId = null;
            setStatus(growDetailStatus, 'Registo não encontrado.', true);
            return;
          }
          entry.date = growEntryDate ? growEntryDate.value : entry.date;
          entry.actionType = selectedEntryAction || 'obs';
          entry.text = text;
          entry.metrics = metrics;
          if (photos.length) {
            entry.photos = (entry.photos || []).concat(photos);
          }
          editingEntryId = null;
          clearEntryForm();
          flashLiveStatus('Registo actualizado.');
        } else {
          const entry = createGrowEntry(text, {
            date: growEntryDate ? growEntryDate.value : todayDateInputValue(),
            actionType: selectedEntryAction,
            metrics: metrics,
            photos: photos
          });
          const result = appendEntryToGrowLog(log, entry);
          if (!result.ok) {
            setStatus(growDetailStatus, result.error, true);
            return;
          }
          clearEntryForm();
          flashLiveStatus('Registo guardado.');
          createdNewEntry = true;
        }

        // Mostrar já a foto no diário; depois gravar em silêncio e refrescar de novo.
        refreshUI({ tab: 'diario', skipStash: true, scrollTo: 'perfil-grow-entries' });
        const saved = await persistGrowLogs(growDetailStatus, {
          silent: true,
          tab: 'diario',
          skipStash: true,
          scrollTo: 'perfil-grow-entries'
        });
        if (!saved) {
          setStatus(growDetailStatus, 'A foto foi enviada, mas falhou gravar o diário. Tente guardar de novo.', true);
          flashLiveStatus('Falha ao gravar o diário. Tente outra vez.', true);
          refreshUI({ tab: 'diario', skipStash: true, scrollTo: 'perfil-grow-entries' });
          return;
        }
        setStatus(growDetailStatus, photos.length ? 'Registo e foto guardados.' : 'Registo guardado.');
        if (createdNewEntry) showGrowPostSaveActions();
      } finally {
        entryMediaSaving = false;
        if (cultivoAutosave && cultivoAutosave.resume) cultivoAutosave.resume();
      }
    });
  }

  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-close');
      if (modalId) closeCultivoModal(modalId);
    });
  });

  const cultivoSubmitConfirm = document.getElementById('cultivo-submit-confirm');
  if (cultivoSubmitConfirm) {
    cultivoSubmitConfirm.addEventListener('click', () => submitActiveGrowToLab());
  }

  if (cultivoEditConfirm && !cultivoEditForm) {
    cultivoEditConfirm.addEventListener('click', () => {
      void confirmEditGrow();
    });
  }

  if (growSubmitLabBtn) {
    growSubmitLabBtn.addEventListener('click', () => openSubmitModal());
  }

  if (growEntryPhotos) {
    growEntryPhotos.addEventListener('change', readEntryPhotoFilesFromInput);
  }

  if (growSelectMediaBtn && growEntryPhotos) {
    growSelectMediaBtn.addEventListener('click', () => {
      growEntryPhotos.click();
    });
  }

  if (growEntryCapturePhoto) {
    growEntryCapturePhoto.addEventListener('change', () => {
      if (!growEntryCapturePhoto.files) return;
      void appendEntryMediaFiles(Array.from(growEntryCapturePhoto.files));
      growEntryCapturePhoto.value = '';
    });
  }

  if (growEntryCaptureVideo) {
    growEntryCaptureVideo.addEventListener('change', () => {
      if (!growEntryCaptureVideo.files) return;
      void appendEntryMediaFiles(Array.from(growEntryCaptureVideo.files));
      growEntryCaptureVideo.value = '';
    });
  }

  if (growCapturePhotoBtn && growEntryCapturePhoto) {
    growCapturePhotoBtn.addEventListener('click', () => {
      growEntryCapturePhoto.click();
    });
  }

  if (growCaptureVideoBtn && growEntryCaptureVideo) {
    growCaptureVideoBtn.addEventListener('click', () => {
      growEntryCaptureVideo.click();
    });
  }

  if (growExportMdBtn) {
    growExportMdBtn.addEventListener('click', () => {
      if (!user || !user.profile || !selectedGrowLogId) return;
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (log) exportGrowMarkdown(log, user.profile);
    });
  }

  if (growExportCsvBtn) {
    growExportCsvBtn.addEventListener('click', () => {
      if (!user || !user.profile || !selectedGrowLogId) return;
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (log) exportGrowCsv(log);
      else exportAllGrowsCsv(user.profile);
    });
  }

  if (growRenameBtn) {
    growRenameBtn.addEventListener('click', () => renameActiveGrow());
  }

  if (growDuplicateBtn) {
    growDuplicateBtn.addEventListener('click', () => duplicateActiveGrow());
  }

  if (growCompareBtn) {
    growCompareBtn.addEventListener('click', () => openCompareModal());
  }

  if (growEnvironmentEl) {
    growEnvironmentEl.addEventListener('change', () => {
      if (!user || !user.profile || !selectedGrowLogId) return;
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (!log) return;
      readGrowSetupFields(log);
      renderGrowHeader(log, user.profile);
    });
  }

  if (growSubstrateEl) {
    growSubstrateEl.addEventListener('change', () => {
      if (!user || !user.profile || !selectedGrowLogId) return;
      const log = user.profile.growLogs.find((item) => item.id === selectedGrowLogId);
      if (!log) return;
      readGrowSetupFields(log);
      renderGrowHeader(log, user.profile);
    });
  }

  if (growDeleteBtn) {
    growDeleteBtn.addEventListener('click', () => deleteActiveGrow());
  }

  if (growPrintBtn) {
    growPrintBtn.addEventListener('click', printGrowDetail);
  }

  bindGrowActionsMenu();

  if (reminderAddForm) {
    reminderAddForm.addEventListener('submit', addPlanReminder);
  }

  if (reminderDateEl && !reminderDateEl.value) {
    reminderDateEl.value = todayDateInputValue();
  }

  if (guiaSaveBtn) {
    guiaSaveBtn.addEventListener('click', async () => {
      await saveProfilePayload(readForm(), guiaStatus);
    });
  }

  if (guiaTemplateBtn) {
    guiaTemplateBtn.addEventListener('click', () => {
      if (!customGuideEl || !user || !user.profile) return;
      const phase = getEffectivePhase(user.profile);
      const weeks = getPhaseWeeks(phase);
      const lines = weeks.map((w) =>
        'Semana ' + w.week + ' — ' + w.title + '\n' + w.focus + '\n• ' + (w.tasks || []).join('\n• ')
      );
      const template = 'Roteiro — ' + formatProfileValue('phase', phase) + '\n\n' + lines.join('\n\n');
      if (customGuideEl.value.trim() && !window.confirm('Substituir o guia geral pelo roteiro base da fase?')) {
        return;
      }
      customGuideEl.value = template;
      setStatus(guiaStatus, 'Roteiro base inserido — clique em Guardar guia geral.');
    });
  }

  if (weekNotesSaveBtn) {
    weekNotesSaveBtn.addEventListener('click', async () => {
      if (!user || !user.profile || !weekNotesEl) return;
      const noteText = weekNotesEl.value.trim();
      if (!noteText) {
        setStatus(guiaStatus, 'Escreva uma observação antes de guardar.', true);
        return;
      }

      const log = getSelectedGrowLog(user.profile) || ensureActiveGrowLog(user.profile, 'Minha pesquisa');
      const entry = buildWeekNoteEntry(noteText, user.profile);
      const result = appendEntryToGrowLog(log, entry);
      if (!result.ok) {
        setStatus(guiaStatus, result.error, true);
        return;
      }

      ensureGrowFields(log);
      const weekKey = String(getActiveWeek(user.profile));
      delete log.guideWeekNotes[weekKey];
      weekNotesEl.value = '';
      weekNotesEl.dataset.weekKey = weekKey;

      selectedGrowLogId = log.id;
      flashLiveStatus('Nota guardada em «' + log.name + '».');
      refreshUI({ tab: 'diario', scrollTo: 'perfil-grow-entries' });
      setStatus(guiaStatus, 'Guardado no diário.');
      await saveProfilePayload(readForm(), guiaStatus);
    });
  }

  if (phaseResetBtn) {
    phaseResetBtn.addEventListener('click', async () => {
      if (!user || !user.profile) return;
      if (!window.confirm('Reiniciar a contagem de semanas desta fase a partir de hoje?')) return;
      selectedWeek = 1;
      const now = new Date().toISOString();
      const log = getSelectedGrowLog(user.profile) || getActiveGrowLog(user.profile);
      if (log) log.plantedAt = now;
      syncPhaseFromActiveLog(user.profile);
      flashLiveStatus('Semanas reiniciadas a partir de hoje.');
      refreshUI({ tab: 'semana' });
      const payload = Object.assign({}, readForm(), { phaseStartedAt: now });
      await saveProfilePayload(payload, null);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch('/api/user/logout', { method: 'POST', credentials: 'include' });
      } catch (e) { /* ignore */ }
      window.location.href = '/entrar.html';
    });
  }

  await   initAvatarPicker();
  loadUser();
});
