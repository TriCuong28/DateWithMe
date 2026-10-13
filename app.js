/**
 * Romantic & Interactive Logic for "Will You Go Out With Me?"
 * Handles: Dodging "Think again", Sound Synthesis (Web Audio), Confetti, Date Planner, Ticket Generation
 */

(function () {
  'use strict';

  // --- 1. Audio Synthesizer (Zero-dependency Web Audio API) ---
  class CuteAudio {
    constructor() {
      this.ctx = null;
      this.isPlayingMusic = false;
      this.musicTimer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playBoing() {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Bouncy spring oscillator
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.18);

        gain.gain.setValueAtTime(0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.start(now);
        osc.stop(now + 0.24);

        // Sparkle harmonic
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(520, now);
        osc2.frequency.exponentialRampToValueAtTime(1350, now + 0.09);

        gain2.gain.setValueAtTime(0.2, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc2.start(now);
        osc2.stop(now + 0.22);
      } catch (e) {}
    }

    playSuccessChime() {
      try {
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);

          const now = this.ctx.currentTime + idx * 0.1;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

          osc.start(now);
          osc.stop(now + 0.65);
        });
      } catch (e) {}
    }

    playStampSound() {
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.16);
      } catch (e) {}
    }

    playCutePop() {
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        osc.type = 'sine';
        // Cute bubble water pop
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(1180, now + 0.08);

        gain.gain.setValueAtTime(0.26, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.start(now);
        osc.stop(now + 0.13);
      } catch (e) {}
    }

    playCuteChirp() {
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(720, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.09);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {}
    }

    toggleMusic(onToggleCallback) {
      this.init();
      this.isPlayingMusic = !this.isPlayingMusic;

      if (this.isPlayingMusic) {
        this.startCuteMelodyLoop();
      } else {
        if (this.musicTimer) clearInterval(this.musicTimer);
      }
      if (onToggleCallback) onToggleCallback(this.isPlayingMusic);
    }

    startCuteMelodyLoop() {
      // Gentle romantic music box tune: Canon in D inspired motif
      const melody = [
        587.33, 659.25, 739.99, 880.00,
        739.99, 659.25, 587.33, 493.88,
        523.25, 587.33, 659.25, 783.99,
        659.25, 587.33, 523.25, 440.00
      ];
      let step = 0;

      const playNote = () => {
        if (!this.isPlayingMusic) return;
        try {
          const freq = melody[step % melody.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.5);

          step++;
        } catch (e) {}
      };

      playNote();
      this.musicTimer = setInterval(playNote, 420);
    }
  }

  const audio = new CuteAudio();

  // --- 2. Ambient Floating Particles Background ---
  function initAmbientParticles() {
    const bgContainer = document.getElementById('ambientBg');
    if (!bgContainer) return;

    const emojis = ['💖', '💕', '🌸', '✨', '🍓', '🎀', '🌷', '🧁', '🧸', '🍡', '💗'];
    const count = 22;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'ambient-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = `${Math.random() * 100}vw`;
      p.style.fontSize = `${1.1 + Math.random() * 1.3}rem`;
      p.style.animationDuration = `${7 + Math.random() * 8}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      bgContainer.appendChild(p);
    }
  }

  // --- 3. URL Query Parameter Support (Personalization) ---
  const urlParams = new URLSearchParams(window.location.search);
  const crushNameParam = urlParams.get('her') || urlParams.get('name') || urlParams.get('em');
  const senderNameParam = urlParams.get('him') || urlParams.get('anh');

  const crushNameEl = document.getElementById('crushName');
  if (crushNameEl) {
    crushNameEl.textContent = crushNameParam || 'you';
  }

  const ticketCrushEl = document.getElementById('ticketCrush');
  if (ticketCrushEl) {
    ticketCrushEl.textContent = crushNameParam ? `${crushNameParam} xinh đẹp 💕` : 'Em bé đáng yêu 💕';
  }

  const ticketSenderEl = document.getElementById('ticketSender');
  if (ticketSenderEl) {
    ticketSenderEl.textContent = senderNameParam ? `${senderNameParam} đẹp trai 🦸‍♂️` : 'Anh 🦸‍♂️';
  }

  const reminderSenderName = document.getElementById('reminderSenderName');
  if (reminderSenderName) {
    reminderSenderName.textContent = senderNameParam ? `anh ${senderNameParam}` : 'anh';
  }

  // --- 4. The Dodge Button ("Think Again!") Mechanics ---
  const dodgeBtn = document.getElementById('dodgeBtn');
  const dodgeBtnText = document.getElementById('dodgeBtnText');
  const yesBtn = document.getElementById('yesBtn');

  let dodgeCount = 0;
  let isDodgeFixed = false;

  // Early audio unlock listener on ANY interaction
  function unlockAudioContext() {
    audio.init();
  }
  ['click', 'pointerdown', 'mousedown', 'touchstart', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, unlockAudioContext, { passive: true });
    document.addEventListener(evt, unlockAudioContext, { passive: true });
  });

  const dodgePhrases = [
    "Think again! 😜",
    "Think again! 🏃‍♂️💨",
    "Think again! ✨",
    "Think again! 🤭",
    "Think again! 💖",
    "Think again! 🌸",
    "Think again! 🧸"
  ];

  function runAwayDodge(e) {
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }

    dodgeCount++;
    audio.playBoing();

    // Haptic vibration on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // On FIRST dodge: capture current position so it transitions seamlessly without any jump
    if (!isDodgeFixed) {
      const startRect = dodgeBtn.getBoundingClientRect();
      dodgeBtn.style.left = `${startRect.left}px`;
      dodgeBtn.style.top = `${startRect.top}px`;
      dodgeBtn.classList.add('is-dodging');
      if (dodgeBtn.parentElement !== document.body) {
        document.body.appendChild(dodgeBtn);
      }
      isDodgeFixed = true;
    }

    // Calculate screen bounds safely inside visible viewport
    const btnW = dodgeBtn.offsetWidth || 155;
    const btnH = dodgeBtn.offsetHeight || 52;
    const padding = 25;

    const minX = padding;
    const maxX = Math.max(minX, window.innerWidth - btnW - padding);
    const minY = 80; // Keep safely below top music toggle button
    const maxY = Math.max(minY, window.innerHeight - btnH - padding);

    // Current cursor/touch position if available
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    if (e) {
      if (e.clientX !== undefined) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }

    // Pick a new random target location far away from the pointer
    let newX, newY;
    let attempts = 0;
    do {
      newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      attempts++;
    } while (
      attempts < 25 &&
      Math.hypot(newX - mouseX, newY - mouseY) < 180
    );

    // Playful spring tilt while gliding
    const tilt = (dodgeCount % 2 === 0) ? -6 : 6;
    dodgeBtn.style.transform = `scale(0.94) rotate(${tilt}deg)`;

    // Seamless glide to target coordinates
    requestAnimationFrame(() => {
      dodgeBtn.style.left = `${newX}px`;
      dodgeBtn.style.top = `${newY}px`;

      setTimeout(() => {
        dodgeBtn.style.transform = 'scale(1) rotate(0deg)';
      }, 360);
    });

    // Keep text as "Think again!" with playful emoji
    const phraseIdx = (dodgeCount - 1) % dodgePhrases.length;
    if (dodgeBtnText) {
      dodgeBtnText.textContent = dodgePhrases[phraseIdx];
    }

    // NOTE: YES button remains completely STILL and fixed in place as requested!
  }

  if (dodgeBtn) {
    // Desktop hover, pointer & click
    dodgeBtn.addEventListener('mouseenter', runAwayDodge);
    dodgeBtn.addEventListener('mouseover', runAwayDodge);
    dodgeBtn.addEventListener('pointerenter', runAwayDodge);
    dodgeBtn.addEventListener('pointerdown', runAwayDodge);
    dodgeBtn.addEventListener('mousedown', runAwayDodge);
    dodgeBtn.addEventListener('click', runAwayDodge);

    // Mobile touch
    dodgeBtn.addEventListener('touchstart', runAwayDodge, { passive: false });
  }

  // --- 5. YES Button Celebration & Transition to Stage 2 ---
  const proposalSection = document.getElementById('proposalSection');
  const plannerSection = document.getElementById('plannerSection');

  function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff3377', '#ff6699', '#ff99bb', '#ffccd9', '#ffffff', '#ffd1dc']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#ff3377', '#ff5c8d', '#ff80a5', '#ffb6c1']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#ff3377', '#ff5c8d', '#ff80a5', '#ffb6c1']
        });
      }, 250);
    }
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      audio.playSuccessChime();
      triggerConfettiBurst();

      // Hide elusive dodge button completely
      if (dodgeBtn) {
        dodgeBtn.style.display = 'none';
      }

      // Smooth transition to Date Planner
      proposalSection.classList.remove('active');
      proposalSection.classList.add('hidden');

      setTimeout(() => {
        plannerSection.classList.remove('hidden');
        plannerSection.classList.add('active');
        plannerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });
  }

  // --- 6. Music Toggle Button ---
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      audio.toggleMusic((isPlaying) => {
        if (isPlaying) {
          musicToggleBtn.classList.add('playing');
          musicIcon.textContent = '🎶';
          showToast('Đang phát giai điệu lãng mạn 🎵');
        } else {
          musicToggleBtn.classList.remove('playing');
          musicIcon.textContent = '🎵';
          showToast('Đã tắt giai điệu 🤫');
        }
      });
    });
  }

  // --- 7. Stage 2: Date Planner Controls ---
  // Option Cards (Checkboxes)
  const optionCards = document.querySelectorAll('.option-card');
  const customPlaceBox = document.getElementById('customPlaceBox');
  const customPlaceCheck = document.getElementById('customPlaceCheck');

  optionCards.forEach((card) => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    // Listen to native change event so it toggles cleanly without cancelling out!
    checkbox.addEventListener('change', () => {
      audio.playCutePop();
      card.classList.toggle('selected', checkbox.checked);

      if (customPlaceCheck && customPlaceBox) {
        if (customPlaceCheck.checked) {
          customPlaceBox.classList.remove('hidden');
          document.getElementById('customPlaceInput')?.focus();
        } else {
          customPlaceBox.classList.add('hidden');
        }
      }
    });
  });

  // Treats Chips
  const chipItems = document.querySelectorAll('.chip-item');
  chipItems.forEach((chip) => {
    chip.addEventListener('click', function () {
      audio.playCuteChirp();
      this.classList.toggle('active');
    });
  });

  // --- REAL-TIME DATE SYSTEM ---
  const pad = (n) => String(n).padStart(2, '0');
  const toDdMmYyyy = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const toYyyyMmDd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const now = new Date();
  const todayStr = toDdMmYyyy(now);
  const todayInputVal = toYyyyMmDd(now);
  const todayName = dayNames[now.getDay()];

  // Tomorrow
  const tmr = new Date(now);
  tmr.setDate(now.getDate() + 1);
  const tmrStr = toDdMmYyyy(tmr);

  // This coming Saturday
  const dayOfWeek = now.getDay();
  let daysToSat = 6 - dayOfWeek;
  if (daysToSat <= 0) daysToSat += 7;
  const thisSat = new Date(now);
  thisSat.setDate(now.getDate() + daysToSat);
  const satStr = toDdMmYyyy(thisSat);

  // This coming Sunday
  let daysToSun = 7 - dayOfWeek;
  if (daysToSun <= 0) daysToSun += 7;
  const thisSun = new Date(now);
  thisSun.setDate(now.getDate() + daysToSun);
  const sunStr = toDdMmYyyy(thisSun);

  // Update Live Realtime indicator
  const todayRealtimeText = document.getElementById('todayRealtimeText');
  if (todayRealtimeText) {
    todayRealtimeText.textContent = `${todayName}, ${todayStr}`;
  }

  // Time & Date state
  let selectedDateStr = `Tối Thứ Bảy (${satStr})`;
  let selectedHourStr = '19:00';
  let selectedTime = `${selectedDateStr} lúc ${selectedHourStr}`;

  const presetBtns = document.querySelectorAll('.preset-btn');
  const customDatePicker = document.getElementById('customDatePicker');
  const customTimePicker = document.getElementById('customTimePicker');
  const formattedDateText = document.getElementById('formattedDateText');

  // Prevent selecting dates in the past
  if (customDatePicker) {
    customDatePicker.min = todayInputVal;
  }

  function updateLiveDateTime() {
    selectedTime = `${selectedDateStr} lúc ${selectedHourStr}`;
    if (formattedDateText) {
      formattedDateText.textContent = selectedTime;
    }
  }

  // Set explicit dynamic text on presets
  const presetSat = document.getElementById('presetSat');
  const presetSun = document.getElementById('presetSun');
  const presetTmr = document.getElementById('presetTmr');
  const presetToday = document.getElementById('presetToday');
  const presetSomeday = document.getElementById('presetSomeday');

  if (presetSat) {
    presetSat.textContent = `🌙 Tối Thứ Bảy (${satStr})`;
    presetSat.setAttribute('data-time', `Tối Thứ Bảy (${satStr})`);
  }
  if (presetSun) {
    presetSun.textContent = `☀️ Chủ Nhật (${sunStr})`;
    presetSun.setAttribute('data-time', `Chủ Nhật (${sunStr})`);
  }
  if (presetTmr) {
    presetTmr.textContent = `✨ Tối mai (${tmrStr})`;
    presetTmr.setAttribute('data-time', `Tối mai (${tmrStr})`);
  }
  if (presetToday) {
    presetToday.textContent = `💖 Tối nay luôn (${todayStr})`;
    presetToday.setAttribute('data-time', `Tối nay (${todayStr})`);
  }
  if (presetSomeday) {
    presetSomeday.textContent = `💌 Hôm nào em rảnh`;
    presetSomeday.setAttribute('data-time', `Hôm nào em rảnh (báo sau)`);
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      audio.playCutePop();
      presetBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      selectedDateStr = this.getAttribute('data-time') || this.textContent.trim();
      if (customDatePicker) customDatePicker.value = '';
      updateLiveDateTime();
    });
  });

  // Listen to BOTH change and input on custom date picker
  if (customDatePicker) {
    const onDateChange = function () {
      if (this.value) {
        audio.playCutePop();
        presetBtns.forEach((b) => b.classList.remove('active'));
        const [year, month, day] = this.value.split('-');
        const dateObj = new Date(year, month - 1, day);
        const dayName = dayNames[dateObj.getDay()];
        selectedDateStr = `${dayName}, ${day}/${month}/${year}`;
        updateLiveDateTime();
      }
    };
    customDatePicker.addEventListener('change', onDateChange);
    customDatePicker.addEventListener('input', onDateChange);
  }

  // Listen to custom time picker
  if (customTimePicker) {
    const onTimeChange = function () {
      if (this.value) {
        selectedHourStr = this.value;
        updateLiveDateTime();
      }
    };
    customTimePicker.addEventListener('change', onTimeChange);
    customTimePicker.addEventListener('input', onTimeChange);
  }

  // Initial live preview
  updateLiveDateTime();

  // Radio buttons for pickup options
  document.querySelectorAll('input[name="pickup"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      audio.playCutePop();
    });
  });

  // --- 8. Generate Date Ticket Pass ---
  const generateTicketBtn = document.getElementById('generateTicketBtn');
  const ticketSection = document.getElementById('ticketSection');

  if (generateTicketBtn) {
    generateTicketBtn.addEventListener('click', () => {
      // Collect selected places
      const selectedPlaces = [];
      document.querySelectorAll('.option-card input:checked').forEach((chk) => {
        if (chk.id === 'customPlaceCheck') {
          const customVal = document.getElementById('customPlaceInput')?.value.trim();
          selectedPlaces.push(customVal ? `✨ ${customVal}` : '✨ Địa điểm bí mật');
        } else {
          selectedPlaces.push(chk.value);
        }
      });
      const finalPlaces = selectedPlaces.length > 0 ? selectedPlaces.join(' & ') : 'Quán cà phê chill ngắm phố ☕';

      // Collect selected treats
      const selectedTreats = [];
      document.querySelectorAll('.chip-item.active').forEach((ch) => {
        selectedTreats.push(ch.getAttribute('data-treat'));
      });
      const finalTreats = selectedTreats.length > 0 ? selectedTreats.join(', ') : 'Trà sữa full topping 🧋';

      // Collect pickup & note
      const pickupOption = document.querySelector('input[name="pickup"]:checked')?.value || 'Anh qua đón em';
      const customNote = document.getElementById('customNote')?.value.trim();

      // Populate Ticket fields
      document.getElementById('ticketPlace').textContent = finalPlaces;
      document.getElementById('ticketTreat').textContent = finalTreats;
      document.getElementById('ticketTime').textContent = selectedTime;
      document.getElementById('ticketPickup').textContent = pickupOption;

      // Real-time Ticket Issuance Timestamp
      const issueDate = new Date();
      const issueStr = `${toDdMmYyyy(issueDate)} - ${pad(issueDate.getHours())}:${pad(issueDate.getMinutes())}:${pad(issueDate.getSeconds())}`;
      const ticketIssueTimeEl = document.getElementById('ticketIssueTime');
      if (ticketIssueTimeEl) {
        ticketIssueTimeEl.textContent = issueStr;
      }

      const ticketNoteRow = document.getElementById('ticketNoteRow');
      const ticketNote = document.getElementById('ticketNote');
      if (customNote) {
        ticketNote.textContent = `"${customNote}"`;
        ticketNoteRow.style.display = 'flex';
      } else {
        ticketNoteRow.style.display = 'none';
      }

      // Generate cute ticket ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const ticketCode = `#LOVE-${randomCode}-YES`;
      document.getElementById('ticketId').textContent = ticketCode;

      const crushVal = document.getElementById('ticketCrush')?.textContent || 'Em bé đáng yêu 💕';
      const senderVal = document.getElementById('ticketSender')?.textContent || 'Anh 🦸‍♂️';

      // Transition to Ticket Screen immediately so nothing can ever block it
      plannerSection.classList.remove('active');
      plannerSection.classList.add('hidden');

      ticketSection.classList.remove('hidden');
      ticketSection.classList.add('active');
      ticketSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Generate clean centered QR code containing complete Date Pass Ticket
      try {
        generateAndRenderQrCode(ticketCode, crushVal, senderVal, finalPlaces, selectedTime, finalTreats, pickupOption);
      } catch (err) {
        console.error('QR generation error:', err);
      }

      // Trigger Celebration & Stamp Animation
      triggerConfettiBurst();
      const stamp = document.querySelector('.stamp-approved');
      if (stamp) {
        stamp.classList.remove('stamped');
        setTimeout(() => {
          stamp.classList.add('stamped');
          audio.playStampSound();
        }, 450);
      }
    });
  }

  // --- 8b. Robust Clean Centered QR Code Generator ---
  function generateAndRenderQrCode(ticketCode, crushVal, senderVal, places, time, treats, pickup) {
    const qrContainer = document.getElementById('ticketQrcode');
    if (!qrContainer) return;
    qrContainer.innerHTML = '';

    const cleanId = ticketCode.replace('#', '');

    // Save ticket data to localStorage so short URLs can retrieve full details
    try {
      const ticketInfo = {
        id: ticketCode,
        crush: crushVal,
        sender: senderVal,
        places: places,
        time: time,
        treats: treats,
        pickup: pickup
      };
      localStorage.setItem('latestDateTicket', JSON.stringify(ticketInfo));
      localStorage.setItem('ticket_' + cleanId, JSON.stringify(ticketInfo));
    } catch (e) {}

    // Clean, short direct web ticket URL (works on Vercel, GitHub Pages, or local development)
    let baseUrl = window.location.origin;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const portStr = window.location.port ? `:${window.location.port}` : '';
      baseUrl = `http://192.168.1.91${portStr}`;
    }
    const currentPath = window.location.pathname || '/';
    const cleanPath = currentPath.endsWith('/')
      ? currentPath
      : currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    const webTicketUrl = `${baseUrl}${cleanPath}?pass=${encodeURIComponent(cleanId)}`;

    // Concise romantic Date Pass Ticket text (compact for large chunky QR blocks & 0.05s instant scan!)
    const cleanPlace = places.length > 42 ? places.substring(0, 39) + '...' : places;

    const qrContent = `🎟️ TẤM VÉ HẸN HÒ: ${ticketCode} 💖\n` +
      `💕 Dành cho: ${crushVal}\n` +
      `⏰ Thời gian: ${time}\n` +
      `📍 Địa điểm: ${cleanPlace}\n` +
      `✨ APPROVED WITH 100% LOVE! 💖\n` +
      `👉 Mở vé trực tiếp: ${webTicketUrl}`;

    try {
      if (typeof QRCode !== 'undefined') {
        // Offscreen container to prevent qrcodejs from polluting ticketQrcode
        const tempDiv = document.createElement('div');
        new QRCode(tempDiv, {
          text: qrContent,
          width: 120,
          height: 120,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L
        });

        const canvas = tempDiv.querySelector('canvas');
        const img = document.createElement('img');
        img.alt = 'Mã QR vé hẹn hò';
        img.src = canvas ? canvas.toDataURL('image/png') : (tempDiv.querySelector('img')?.src || '');
        img.className = 'qr-clean-img';
        img.style.width = '120px';
        img.style.height = '120px';
        img.style.display = 'block';
        img.style.margin = 'auto';
        img.style.borderRadius = '8px';

        qrContainer.appendChild(img);
      } else {
        throw new Error('QRCode CDN offline');
      }
    } catch (err) {
      const qrImg = document.createElement('img');
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=L&data=${encodeURIComponent(qrContent)}`;
      qrImg.alt = 'Mã QR vé hẹn hò';
      qrImg.className = 'qr-clean-img';
      qrImg.style.width = '120px';
      qrImg.style.height = '120px';
      qrImg.style.display = 'block';
      qrImg.style.margin = 'auto';
      qrImg.style.borderRadius = '8px';
      qrContainer.appendChild(qrImg);
    }
  }

  // --- 8c. Direct Ticket View from URL (When scanned by QR code) ---
  function checkDirectTicketFromUrl() {
    if (urlParams.get('pass') || urlParams.get('view') === 'ticket') {
      const passId = urlParams.get('id') || urlParams.get('pass') || 'LOVE-YES';
      const cleanId = passId.replace('#', '');

      let savedData = null;
      try {
        const raw = localStorage.getItem('ticket_' + cleanId) || localStorage.getItem('latestDateTicket');
        if (raw) savedData = JSON.parse(raw);
      } catch (e) {}

      const toName = urlParams.get('to') || urlParams.get('her') || savedData?.crush || 'Em bé đáng yêu 💕';
      const fromName = urlParams.get('from') || urlParams.get('him') || savedData?.sender || 'Anh 🦸‍♂️';
      const placeVal = urlParams.get('place') || savedData?.places || 'Quán cà phê chill ngắm phố ☕';
      const treatVal = urlParams.get('treat') || savedData?.treats || 'Trà sữa full topping 🧋';
      const timeVal = urlParams.get('time') || savedData?.time || 'Tối Thứ Bảy lúc 19:00';
      const pickupVal = urlParams.get('pickup') || savedData?.pickup || 'Anh qua đón em 🛵';
      const noteVal = urlParams.get('note') || savedData?.note || '';

      const fullTicketId = passId.startsWith('#') ? passId : `#${passId}`;
      document.getElementById('ticketId').textContent = fullTicketId;
      document.getElementById('ticketCrush').textContent = toName;
      document.getElementById('ticketSender').textContent = fromName;
      document.getElementById('ticketPlace').textContent = placeVal;
      document.getElementById('ticketTreat').textContent = treatVal;
      document.getElementById('ticketTime').textContent = timeVal;
      document.getElementById('ticketPickup').textContent = pickupVal;

      const ticketIssueTimeEl = document.getElementById('ticketIssueTime');
      if (ticketIssueTimeEl) {
        const d = new Date();
        ticketIssueTimeEl.textContent = `${toDdMmYyyy(d)} - ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      }

      const ticketNoteRow = document.getElementById('ticketNoteRow');
      const ticketNote = document.getElementById('ticketNote');
      if (noteVal) {
        ticketNote.textContent = `"${noteVal}"`;
        ticketNoteRow.style.display = 'flex';
      } else {
        ticketNoteRow.style.display = 'none';
      }

      // Hide proposal section and show ticket section directly!
      proposalSection.classList.remove('active');
      proposalSection.classList.add('hidden');
      ticketSection.classList.remove('hidden');
      ticketSection.classList.add('active');

      // Generate the clean QR code
      generateAndRenderQrCode(fullTicketId, toName, fromName, placeVal, timeVal, treatVal, pickupVal);

      // Trigger celebration
      setTimeout(() => {
        triggerConfettiBurst();
        const stamp = document.querySelector('.stamp-approved');
        if (stamp) {
          stamp.classList.add('stamped');
          audio.playStampSound();
        }
      }, 400);
    }
  }

  // --- 9. Download Ticket as Image Button ---
  const downloadTicketBtn = document.getElementById('downloadTicketBtn');
  if (downloadTicketBtn) {
    downloadTicketBtn.addEventListener('click', () => {
      const ticketEl = document.getElementById('dateTicket');
      if (!ticketEl) return;

      audio.playCutePop();
      showToast('Đang tạo ảnh tấm vé xinh xắn... 📸');

      if (window.html2canvas) {
        html2canvas(ticketEl, {
          scale: 3,
          useCORS: true,
          backgroundColor: '#ffffff',
          borderRadius: 26,
          logging: false
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'Tam-Ve-Hen-Ho-Cute.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          audio.playSuccessChime();
          showToast('Đã lưu vé về máy rồi nè! 💖 Nhớ gửi ảnh cho anh nhé! 🥰');
        }).catch((err) => {
          console.error(err);
          showToast('Ảnh đang tải, bạn có thể chụp màn hình nhé! 💖');
        });
      } else {
        showToast('Ảnh đang tải, bạn có thể chụp màn hình nhé! 💖');
      }
    });
  }

  // Replay Confetti Button
  const replayConfettiBtn = document.getElementById('replayConfettiBtn');
  if (replayConfettiBtn) {
    replayConfettiBtn.addEventListener('click', () => {
      audio.playSuccessChime();
      triggerConfettiBurst();
    });
  }

  // Toast Notification
  function showToast(msg) {
    const toast = document.getElementById('sweetToast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Initialize background elements and check direct ticket link
  initAmbientParticles();
  checkDirectTicketFromUrl();
})();
