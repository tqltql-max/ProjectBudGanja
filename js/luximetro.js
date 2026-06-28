// ==================== State ====================
    let stream = null;
    let animFrameId = null;
    let isRunning = false;
    let calibrationFactor = 1.0;
    let currentLux = 0;
    let currentPPFD = 0;
    let rawBrightness = 0;
    let luxSmoothed = 0;
    let ppfdSmoothed = 0;
    let lastDisplayUpdate = 0;
    let history = [];
    let liveHistory = [];
    let usingSensor = false;
    let lightSensor = null;
    let readingLocked = false;
    let lockedPPFD = 0;
    let lockedLux = 0;
     // Alert state
    let monitoringActive = false;
    let ppfdMin = 300;
    let ppfdMax = 600;
    let alertLevel = 'inactive'; // 'inactive', 'ok', 'warning', 'critical'
    let lastAlertTime = 0;
    let lastAlertLevel = 'ok';
    const ALERT_COOLDOWN = 10000; // 10s between repeated alerts
    const WARNING_MARGIN = 0.15;  // 15% margin before min/max triggers warning
    let audioCtx = null;
    let notifPermission = 'default';
     // ==================== DOM refs ====================
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const ppfdDisplay = document.getElementById('ppfd-display');
    const luxDisplay = document.getElementById('lux-display');
    const statusBadge = document.getElementById('status-badge');
    const btnStart = document.getElementById('btn-start');
    const btnCalibrate = document.getElementById('btn-calibrate');
    const btnSave = document.getElementById('btn-save');
    const calInfo = document.getElementById('cal-info');
    const sensorType = document.getElementById('sensor-type');
    const cameraWrapper = document.getElementById('camera-wrapper');
    const readingPanel = document.querySelector('.reading-panel');
    const alertStatusEl = document.getElementById('alert-status');
    const alertStatusText = document.getElementById('alert-status-text');
    const rangeFill = document.getElementById('range-fill');
    const rangeCursor = document.getElementById('range-cursor');
    const chartCanvas = document.getElementById('history-chart');
    const chartCtx = chartCanvas.getContext('2d');
    const chartStatus = document.getElementById('chart-status');
    const dliEstimate = document.getElementById('dli-estimate');
    const DISPLAY_UPDATE_INTERVAL = 250;
    const SMOOTHING_FACTOR = 0.18;
     // ==================== Audio Context (lazy init) ====================
    function getAudioCtx() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }
     function playAlertSound(type) {
        try {
            const ctx = getAudioCtx();
            if (ctx.state === 'suspended') ctx.resume();
             if (type === 'critical') {
                // Double beep - urgent
                [0, 0.25].forEach(delay => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.frequency.value = 880;
                    osc.type = 'square';
                    gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
                    osc.start(ctx.currentTime + delay);
                    osc.stop(ctx.currentTime + delay + 0.15);
                });
            } else {
                // Single soft beep - warning
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 523;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            }
        } catch (e) { /* audio not available */ }
    }
     // ==================== Vibration ====================
    function vibrateAlert(type) {
        if (!navigator.vibrate) return;
        if (type === 'critical') {
            navigator.vibrate([150, 100, 150, 100, 300]);
        } else {
            navigator.vibrate([100, 80, 100]);
        }
    }
     // ==================== Browser Notifications ====================
    async function requestNotifPermission() {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'granted') {
            notifPermission = 'granted';
            return;
        }
        if (Notification.permission !== 'denied') {
            notifPermission = await Notification.requestPermission();
        }
    }
     function sendBrowserNotif(title, body) {
        if (notifPermission !== 'granted') return;
        try {
            new Notification(title, {
                body: body,
                icon: '/imagens/icon-192.png',
                tag: 'ppfd-alert',
                renotify: true
            });
        } catch (e) { /* SW notification fallback not needed for this use case */ }
    }
     // ==================== Visual Alerts ====================
    function flashCamera() {
        cameraWrapper.classList.remove('alert-flash');
        void cameraWrapper.offsetWidth; // force reflow
        cameraWrapper.classList.add('alert-flash');
    }
     function updateVisualBorders(level) {
        cameraWrapper.classList.remove('alert-warn-border', 'alert-crit-border');
        readingPanel.classList.remove('alert-warn', 'alert-crit');
         if (level === 'warning') {
            cameraWrapper.classList.add('alert-warn-border');
            readingPanel.classList.add('alert-warn');
        } else if (level === 'critical') {
            cameraWrapper.classList.add('alert-crit-border');
            readingPanel.classList.add('alert-crit');
        }
    }
     // ==================== Range Bar ====================
    const RANGE_SCALE_MAX = 1500;
     function updateRangeBar() {
        const minPct = (ppfdMin / RANGE_SCALE_MAX) * 100;
        const maxPct = (ppfdMax / RANGE_SCALE_MAX) * 100;
        rangeFill.style.left = minPct + '%';
        rangeFill.style.width = (maxPct - minPct) + '%';
         document.getElementById('range-label-min').textContent = ppfdMin;
        document.getElementById('range-label-max').textContent = ppfdMax;
    }
     function updateRangeCursor(ppfd) {
        const pct = Math.min(Math.max((ppfd / RANGE_SCALE_MAX) * 100, 0), 100);
        rangeCursor.style.left = pct + '%';
         rangeCursor.classList.remove('warning', 'critical');
        if (alertLevel === 'warning') rangeCursor.classList.add('warning');
        else if (alertLevel === 'critical') rangeCursor.classList.add('critical');
    }
     function pushLiveHistory(ppfd) {
        liveHistory.push(ppfd);
        if (liveHistory.length > 60) liveHistory.shift();
        drawHistoryChart();
    }
     function drawHistoryChart() {
        const width = chartCanvas.width;
        const height = chartCanvas.height;
        chartCtx.clearRect(0, 0, width, height);
         chartCtx.fillStyle = 'rgba(0,0,0,0.12)';
        chartCtx.fillRect(0, 0, width, height);
         if (liveHistory.length < 2) {
            chartCtx.fillStyle = '#666';
            chartCtx.font = '24px sans-serif';
            chartCtx.textAlign = 'center';
            chartCtx.fillText('Aguardando leituras...', width / 2, height / 2);
            chartStatus.textContent = 'Aguardando leitura';
            return;
        }
         const max = Math.max(1000, ...liveHistory);
        const min = Math.min(...liveHistory);
        const range = Math.max(max - min, 1);
         chartCtx.strokeStyle = '#27ae60';
        chartCtx.lineWidth = 4;
        chartCtx.beginPath();
        liveHistory.forEach((value, index) => {
            const x = (index / (liveHistory.length - 1)) * width;
            const y = height - ((value - min) / range) * (height - 20) - 10;
            if (index === 0) chartCtx.moveTo(x, y);
            else chartCtx.lineTo(x, y);
        });
        chartCtx.stroke();
         chartCtx.fillStyle = 'rgba(39, 174, 96, 0.15)';
        chartCtx.lineTo(width, height);
        chartCtx.lineTo(0, height);
        chartCtx.closePath();
        chartCtx.fill();
         chartStatus.textContent = 'Atual: ' + currentPPFD + ' μmol/m²/s';
    }
     // ==================== Phase Presets ====================
    const PHASE_RANGES = {
        clone: { min: 100, max: 200 },
        veg:   { min: 300, max: 600 },
        flora: { min: 600, max: 1000 }
    };
     function applyPhasePreset() {
        const preset = document.getElementById('phase-preset').value;
        if (preset === 'custom') return;
         const range = PHASE_RANGES[preset];
        ppfdMin = range.min;
        ppfdMax = range.max;
        document.getElementById('ppfd-min').value = ppfdMin;
        document.getElementById('ppfd-max').value = ppfdMax;
        updateRangeBar();
    }
     function onRangeChange() {
        const newMin = parseInt(document.getElementById('ppfd-min').value) || 0;
        const newMax = parseInt(document.getElementById('ppfd-max').value) || 0;
        ppfdMin = Math.max(0, newMin);
        ppfdMax = Math.max(ppfdMin + 10, newMax);
        document.getElementById('ppfd-max').value = ppfdMax;
        document.getElementById('phase-preset').value = 'custom';
        updateRangeBar();
    }
     function toggleLockReading() {
        readingLocked = document.getElementById('lock-reading').checked;
        const toggleLabel = readingLocked ? 'Leitura travada' : 'Leitura destravada';
        chartStatus.textContent = toggleLabel;
         if (readingLocked) {
            lockedPPFD = currentPPFD;
            lockedLux = currentLux;
            setAlertStatus('inactive', 'Leitura travada');
        } else {
            setAlertStatus(alertLevel === 'inactive' ? 'inactive' : alertLevel, 'Monitoramento ' + (monitoringActive ? 'ativo' : 'desativado'));
        }
    }
     // ==================== Alert Check ====================
    function checkAlerts(ppfd) {
        if (!monitoringActive || !isRunning) {
            setAlertStatus('inactive', 'Monitoramento desativado');
            updateVisualBorders('ok');
            return;
        }
         updateRangeCursor(ppfd);
         const range = ppfdMax - ppfdMin;
        const warnMargin = range * WARNING_MARGIN;
        const now = Date.now();
         let newLevel = 'ok';
        let statusText = '';
        let alertDirection = '';
         if (ppfd < ppfdMin) {
            const deficit = ppfdMin - ppfd;
            if (deficit > warnMargin) {
                newLevel = 'critical';
                statusText = 'PPFD muito baixo! ' + ppfd + ' < ' + ppfdMin;
                alertDirection = 'baixo';
            } else {
                newLevel = 'warning';
                statusText = 'PPFD abaixo do mínimo (' + ppfd + '/' + ppfdMin + ')';
                alertDirection = 'baixo';
            }
        } else if (ppfd > ppfdMax) {
            const excess = ppfd - ppfdMax;
            if (excess > warnMargin) {
                newLevel = 'critical';
                statusText = 'PPFD muito alto! ' + ppfd + ' > ' + ppfdMax;
                alertDirection = 'alto';
            } else {
                newLevel = 'warning';
                statusText = 'PPFD acima do máximo (' + ppfd + '/' + ppfdMax + ')';
                alertDirection = 'alto';
            }
        } else {
            newLevel = 'ok';
            statusText = 'PPFD na faixa ideal (' + ppfdMin + '—' + ppfdMax + ')';
        }
         setAlertStatus(newLevel, statusText);
        updateVisualBorders(newLevel);
         // Fire notifications only on level change or after cooldown
        const levelChanged = newLevel !== lastAlertLevel;
        const cooldownPassed = (now - lastAlertTime) > ALERT_COOLDOWN;
         if ((newLevel === 'warning' || newLevel === 'critical') && (levelChanged || cooldownPassed)) {
            lastAlertTime = now;
            fireAlert(newLevel, ppfd, alertDirection);
        }
         // Reset visual borders when back to OK
        if (newLevel === 'ok' && lastAlertLevel !== 'ok') {
            updateVisualBorders('ok');
        }
         lastAlertLevel = newLevel;
        alertLevel = newLevel;
    }
     function fireAlert(level, ppfd, direction) {
        const soundEnabled = document.getElementById('alert-sound').checked;
        const vibrateEnabled = document.getElementById('alert-vibrate').checked;
        const notifEnabled = document.getElementById('alert-notif').checked;
        const visualEnabled = document.getElementById('alert-visual').checked;
         if (soundEnabled) playAlertSound(level);
        if (vibrateEnabled) vibrateAlert(level);
        if (visualEnabled) flashCamera();
         if (notifEnabled) {
            const title = level === 'critical' ? 'PPFD Fora da Faixa!' : 'PPFD Aviso';
            const body = direction === 'alto'
                ? 'PPFD muito alto: ' + ppfd + ' \u03BCmol/m\u00B2/s (max: ' + ppfdMax + ')'
                : 'PPFD muito baixo: ' + ppfd + ' \u03BCmol/m\u00B2/s (min: ' + ppfdMin + ')';
            sendBrowserNotif(title, body);
        }
    }
     function setAlertStatus(level, text) {
        alertStatusEl.className = 'alert-status ' + level;
        alertStatusText.textContent = text;
    }
     // ==================== Monitoring Toggle ====================
    function toggleMonitoring() {
        monitoringActive = document.getElementById('monitor-toggle').checked;
        const panel = document.getElementById('monitor-panel');
         if (monitoringActive) {
            panel.classList.add('alert-active');
            setAlertStatus('ok', 'Monitoramento ativo — aguardando leitura...');
            lastAlertLevel = 'ok';
            lastAlertTime = 0;
        } else {
            panel.classList.remove('alert-active');
            setAlertStatus('inactive', 'Monitoramento desativado');
            updateVisualBorders('ok');
            rangeCursor.classList.remove('warning', 'critical');
            alertLevel = 'inactive';
        }
    }
     function onNotifToggle() {
        if (document.getElementById('alert-notif').checked) {
            requestNotifPermission();
        }
    }
     // ==================== Light Sensor ====================
    function tryLightSensor() {
        if ('AmbientLightSensor' in window) {
            try {
                lightSensor = new AmbientLightSensor();
                lightSensor.addEventListener('reading', () => {
                    usingSensor = true;
                    sensorType.textContent = 'Sensor de Luz';
                    sensorType.className = 'sensor-badge sensor-light';
                    currentLux = lightSensor.illuminance;
                    updateDisplayFromLux(currentLux);
                });
                lightSensor.addEventListener('error', () => {
                    usingSensor = false;
                });
                lightSensor.start();
            } catch (e) {
                usingSensor = false;
            }
        }
    }
     tryLightSensor();
     // Camera toggle
    async function toggleCamera() {
        if (isRunning) {
            stopCamera();
        } else {
            await startCamera();
        }
    }
     async function startCamera() {
        try {
            const facingMode = document.getElementById('camera-facing').value;
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: facingMode,
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });
             video.srcObject = stream;
            video.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'none';
            video.style.display = 'block';
            document.getElementById('camera-off').style.display = 'none';
             await video.play();
             canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
             isRunning = true;
            btnStart.textContent = 'Parar Câmera';
            btnCalibrate.disabled = false;
            btnSave.disabled = false;
             processFrame();
        } catch (err) {
            document.getElementById('camera-off').style.display = 'flex';
            document.getElementById('camera-off').querySelector('p').textContent =
                'Erro ao acessar câmera. Verifique as permissões.';
            console.error('Erro câmera:', err);
        }
    }
     function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
        }
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        isRunning = false;
        video.style.display = 'none';
        document.getElementById('camera-off').style.display = 'flex';
        document.getElementById('camera-off').querySelector('p').textContent = 
            'Câmera desligada';
        btnStart.textContent = 'Iniciar Câmera';
        btnCalibrate.disabled = true;
        btnSave.disabled = true;
    }
     document.getElementById('camera-facing').addEventListener('change', () => {
        if (isRunning) {
            stopCamera();
            startCamera();
        }
    });
     // Frame processing
    function processFrame() {
        if (!isRunning) return;
         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
         // Center-weighted metering (sample central 50%)
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const sampleW = Math.floor(canvas.width * 0.5);
        const sampleH = Math.floor(canvas.height * 0.5);
        const sx = Math.floor(cx - sampleW / 2);
        const sy = Math.floor(cy - sampleH / 2);
         const imageData = ctx.getImageData(sx, sy, sampleW, sampleH);
        const pixels = imageData.data;
         let totalLuminance = 0;
        let pixelCount = 0;
         // Calculate perceived luminance (BT.709)
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i] / 255;
            const g = pixels[i + 1] / 255;
            const b = pixels[i + 2] / 255;
             // Linearize sRGB
            const rLin = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
            const gLin = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
            const bLin = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
             totalLuminance += 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
            pixelCount++;
        }
         rawBrightness = totalLuminance / Math.max(pixelCount, 1);
         if (!usingSensor) {
            const baseLux = 500; // middle gray â‰ˆ 500 lux assumption
            const measuredLux = rawBrightness < 0.001 ? 0 : baseLux * Math.pow(rawBrightness / 0.18, 2.5);
            const calibratedLux = Math.max(0, measuredLux * calibrationFactor);
            const smoothingEnabled = document.getElementById('smooth-mode').checked;
            luxSmoothed = smoothingEnabled ? (luxSmoothed ? (luxSmoothed * (1 - SMOOTHING_FACTOR) + calibratedLux * SMOOTHING_FACTOR) : calibratedLux) : calibratedLux;
            currentLux = Math.round(luxSmoothed);
            const now = performance.now();
            if (now - lastDisplayUpdate >= DISPLAY_UPDATE_INTERVAL) {
                lastDisplayUpdate = now;
                updateDisplayFromLux(currentLux);
            }
        }
         animFrameId = requestAnimationFrame(processFrame);
    }
     function updateDisplayFromLux(lux) {
        const conversionFactor = parseFloat(document.getElementById('light-source').value);
        const measuredPPFD = Math.max(0, lux * conversionFactor);
        const smoothingEnabled = document.getElementById('smooth-mode').checked;
        ppfdSmoothed = smoothingEnabled ? (ppfdSmoothed ? (ppfdSmoothed * 0.82 + measuredPPFD * 0.18) : measuredPPFD) : measuredPPFD;
        currentPPFD = readingLocked ? lockedPPFD : Math.round(ppfdSmoothed);
        currentLux = readingLocked ? lockedLux : lux;
         ppfdDisplay.textContent = currentPPFD;
        luxDisplay.textContent = lux.toLocaleString('pt-BR') + ' lux';

        if (dliEstimate) {
            if (currentPPFD > 0) {
                const dli18 = (currentPPFD * 18 * 3600) / 1000000;
                dliEstimate.innerHTML = 'DLI estimado (18 h): <strong>' + dli18.toFixed(1) + '</strong> mol/m²/dia · <a href="/calculadoras/cultivo-lab.html?mode=dli">Calcular DLI</a>';
            } else {
                dliEstimate.textContent = 'DLI estimado (18 h): — mol/m²/dia';
            }
        }
         // Status classification
        let status, color, bg;
        if (currentPPFD < 100) {
            status = 'Muito baixo'; color = '#3498db'; bg = 'rgba(52,152,219,0.15)';
        } else if (currentPPFD < 200) {
            status = 'Clones / Mudas'; color = '#27ae60'; bg = 'rgba(39,174,96,0.15)';
        } else if (currentPPFD < 400) {
            status = 'Vegetativo inicial'; color = '#27ae60'; bg = 'rgba(39,174,96,0.15)';
        } else if (currentPPFD < 600) {
            status = 'Vegetativo'; color = '#2ecc71'; bg = 'rgba(46,204,113,0.15)';
        } else if (currentPPFD < 800) {
            status = 'Floração'; color = '#f39c12'; bg = 'rgba(243,156,18,0.15)';
        } else if (currentPPFD < 1200) {
            status = 'Floração intensa'; color = '#e67e22'; bg = 'rgba(230,126,34,0.15)';
        } else {
            status = 'Muito alto - Cuidado!'; color = '#e74c3c'; bg = 'rgba(231,76,60,0.15)';
        }
         statusBadge.textContent = status;
        statusBadge.style.background = bg;
        statusBadge.style.color = color;
         // Check monitoring alerts
        checkAlerts(currentPPFD);
        pushLiveHistory(currentPPFD);
    }
     // Calibration
    function openCalibration() {
        document.getElementById('cal-modal').classList.remove('hidden');
    }

    function closeCalibration() {
        document.getElementById('cal-modal').classList.add('hidden');
    }
     function applyCalibration() {
        const val = parseFloat(document.getElementById('cal-value').value);
        const unit = document.getElementById('cal-unit').value;
         if (isNaN(val) || val <= 0) {
            alert('Insira um valor válido.');
            return;
        }
         let targetLux;
        if (unit === 'ppfd') {
            const conversionFactor = parseFloat(document.getElementById('light-source').value);
            targetLux = val / conversionFactor;
        } else {
            targetLux = val;
        }
         const baseLux = 500;
        const uncalibratedLux = rawBrightness < 0.001 ? 1 : baseLux * Math.pow(rawBrightness / 0.18, 2.5);
         if (uncalibratedLux > 0) {
            calibrationFactor = targetLux / uncalibratedLux;
            luxSmoothed = targetLux;
            ppfdSmoothed = targetLux * parseFloat(document.getElementById('light-source').value);
            calInfo.textContent = 'Calibrado (fator: ' + calibrationFactor.toFixed(2) + 'x)';
            calInfo.style.color = '#27ae60';
        }
         closeCalibration();
    }
     function resetCalibration() {
        calibrationFactor = 1.0;
        luxSmoothed = 0;
        ppfdSmoothed = 0;
        calInfo.textContent = 'Sem calibração — valores aproximados';
        calInfo.style.color = '#888';
        closeCalibration();
    }
     // History
    function saveReading() {
        if (currentPPFD <= 0 && currentLux <= 0) return;
         const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0') + ':' +
                       now.getSeconds().toString().padStart(2, '0');
        const source = document.getElementById('light-source').selectedOptions[0].text;
         history.unshift({
            ppfd: currentPPFD,
            lux: currentLux,
            time: timeStr,
            source: source
        });
         if (history.length > 20) history.pop();
        renderHistory();
        attachDiarySaveBar();
    }

    function attachDiarySaveBar() {
        if (!window.BudGanjaDiaryBridge || !readingPanel) return;
        if (currentPPFD <= 0 && currentLux <= 0) return;
        var source = document.getElementById('light-source');
        var sourceLabel = source && source.selectedOptions[0] ? source.selectedOptions[0].text : '';
        window.BudGanjaDiaryBridge.attachSaveBar(readingPanel, {
            calculator: 'luximetro',
            text: 'Luxímetro: ' + Math.round(currentPPFD) + ' μmol/m²/s · ' +
                Math.round(currentLux).toLocaleString('pt-BR') + ' lux' +
                (sourceLabel ? ' (' + sourceLabel + ')' : ''),
            metrics: { ppfd: Math.round(currentPPFD), lux: Math.round(currentLux) }
        });
    }

     function renderHistory() {
        const panel = document.getElementById('history-panel');
        const list = document.getElementById('history-list');
         if (history.length === 0) {
            panel.classList.add('hidden');
            return;
        }

        panel.classList.remove('hidden');
        list.innerHTML = history.map(h => `
            <li>
                <span class="h-ppfd">${h.ppfd} μmol/m²/s</span>
                <span class="h-lux">${h.lux.toLocaleString('pt-BR')} lux</span>
                <span class="h-time">${h.time} — ${h.source}</span>
            </li>
        `).join('');
    }
     function clearHistory() {
        history = [];
        renderHistory();
    }
     document.getElementById('smooth-mode').addEventListener('change', () => {
        if (!document.getElementById('smooth-mode').checked) {
            luxSmoothed = currentLux;
            ppfdSmoothed = currentPPFD;
        }
    });
     // Update PPFD when light source changes
    document.getElementById('light-source').addEventListener('change', () => {
        if (currentLux > 0) {
            updateDisplayFromLux(currentLux);
        }
    });
     // Show camera-off message initially
    video.style.display = 'none';
    const cameraOff = document.getElementById('camera-off');
    if (cameraOff) {
        cameraOff.classList.remove('hidden');
        cameraOff.style.display = 'flex';
    }
     // Initialize range bar
    updateRangeBar();
    drawHistoryChart();
    if (readingPanel && window.BudGanjaDiaryBridge) {
        var origUpdate = updateDisplayFromLux;
        updateDisplayFromLux = function(lux) {
            origUpdate(lux);
            if (readingLocked || (currentPPFD > 0 || currentLux > 0)) attachDiarySaveBar();
        };
    }
