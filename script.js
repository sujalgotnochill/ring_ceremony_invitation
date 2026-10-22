/* ==============================================================
   ROYAL INDIAN RING CEREMONY & ENGAGEMENT INVITATION
   Dynamic Logic, Canvas Animations & Audio Controls
   ============================================================== */

/*
  -------------------------------------------------------------
  CONFIG OBJECT: EDIT THE RING CEREMONY DETAILS HERE
  Date/time format: YYYY-MM-DDTHH:MM:SS (24-hour local time).
  -------------------------------------------------------------
*/
const CONFIG = {
  eventType: "Ring Ceremony & Engagement",
  eventTypeHindi: "शुभ सगाई समारोह",
  bride: "Akansha",
  groom: "Nilesh",
  brideParents: "Smt. Maya & Late Shri Rajesh Vishwakarma ji",
  groomParents: "Smt. Khushlata & Shri Mansukhlal Vishwakarma ji",
  ceremonyDateTime: "2026-11-11T12:00:00",
  displayDate: "Wednesday, 11 November 2026",
  displayTime: "12:00 PM Onwards",
  shubhMuhurat: "12:15 PM (शुभ मुहूर्त)",
  blessing: "॥ श्री गणेशाय नमः ॥",
  venueName: "Hotel Raj Palace",
  venueAddress: "Krishi Upaj Mandi Road, Paharua, Katni, Madhya Pradesh 483501 (near Sai Mandir)",
  mapSearch: "Hotel Raj Palace, Katni",
  familyLine: "Vishwakarma Family",
  rsvpInfo: "R.S.V.P: +91 6265386842 / +91 9425465045",
  events: [
    {
      symbol: "🪔",
      title: "Oli and Variksha Ceremony",
      hindi: "शुभ ओली एवं वरीक्षा रस्म ",
      date: "Wednesday, 11 November 2026",
      time: "12:00 PM",
      venue: "Hotel Raj Palace"
    },
    {
      symbol: "💍",
      title: "Ring Ceremony",
      hindi: "शुभ सगाई समारोह",
      date: "Wednesday, 11 November 2026",
      time: "01:00 PM",
      venue: "Hotel Raj Palace"
    },
    {
      symbol: "🌺",
      title: "Lunch",
      hindi: "भोजन",
      date: "Wednesday, 11 November 2026",
      time: "02:00 PM",
      venue: "Hotel Raj Palace"
    }
  ]
};

// Default initial blessings
const DEFAULT_BLESSINGS = [
  {
    name: "Shri Sharad & Laxmi Vishwakarma",
    city: "Katni",
    message: "May your journey together be adorned with endless affection, laughter, and lifelong understanding! Sada khush raho!"
  },
  {
    name: "Sujal Vishwakarma",
    city: "Katni",
    message: "Heartiest congratulations to Akansha & Nilesh on your auspicious ring ceremony. Two wonderful families unite today!"
  },
  {
    name: "Rudra Vishwakarma",
    city: "Katni",
    message: "What a stunning couple! May God shower his choicest blessings upon you both as you exchange these sacred rings. 💍✨"
  }
];

/* Helper functions */
const byId = (id) => document.getElementById(id);
const setText = (id, value) => {
  const el = byId(id);
  if (el) el.textContent = value;
};

// Toast notification helper
function showToast(message) {
  const toast = byId("toastNotification");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* ==============================================================
   LOAD CONFIGURATION FROM SEPARATE JSON FILE (config.json)
   ============================================================== */
async function loadConfig() {
  try {
    const res = await fetch("./config.json");
    if (res.ok) {
      const data = await res.json();
      Object.assign(CONFIG, data);
      if (Array.isArray(data.defaultBlessings) && data.defaultBlessings.length > 0) {
        DEFAULT_BLESSINGS.length = 0;
        DEFAULT_BLESSINGS.push(...data.defaultBlessings);
      }
    }
  } catch (err) {
    // Graceful fallback when previewing via file:// protocol without a web server
    console.warn("Notice: Loaded via local file:// protocol. Running with bundled defaults unless hosted on a web server or VS Code Live Server.", err);
  }
}

/* ==============================================================
   RENDER CONFIG INTO DOM
   ============================================================== */
function renderConfig() {
  document.title = `${CONFIG.bride} & ${CONFIG.groom} | ${CONFIG.eventType}`;

  // Cover Page
  setText("coverBlessing", CONFIG.blessing);
  setText("coverEventTypeHindi", CONFIG.eventTypeHindi);
  setText("coverBride", CONFIG.bride);
  setText("coverGroom", CONFIG.groom);
  setText("coverDate", CONFIG.displayDate);
  setText("coverShloka", CONFIG.coverShloka);

  // Gateway & Spotlight
  setText("shreeGaneshInvocation", CONFIG.blessing);
  setText("sacredShloka", CONFIG.sacredShloka);
  setText("invokingTextEn", CONFIG.invokingTextEnglish);
  setText("invokingTextHi", CONFIG.invokingTextHindi);
  setText("grandHeading", CONFIG.eventTypeHindi);

  const bInit = (CONFIG.bride ? CONFIG.bride.charAt(0) : "A").toUpperCase();
  const gInit = (CONFIG.groom ? CONFIG.groom.charAt(0) : "N").toUpperCase();
  setText("crestMonogram", `${bInit} 💍 ${gInit}`);
  setText("brideInitial", bInit);
  setText("groomInitial", gInit);
  setText("heroBride", CONFIG.bride);
  setText("heroGroom", CONFIG.groom);
  setText("brideParents", CONFIG.brideParents);
  setText("groomParents", CONFIG.groomParents);

  setText("heroDate", CONFIG.displayDate);
  setText("heroTime", CONFIG.displayTime);
  setText("heroMuhurat", CONFIG.shubhMuhurat);

  // Sacred Ring Ceremony Section
  setText("brideRingTag", CONFIG.bride);
  setText("groomRingTag", CONFIG.groom);
  setText("quoteHindi", CONFIG.ringsQuoteHindi);
  setText("quoteEn", CONFIG.ringsQuoteEnglish);

  // Venue & Closing Section
  setText("venueName", CONFIG.venueName);
  setText("venueAddress", CONFIG.venueAddress.replace(/\\n/g, "\n"));
  setText("familyLine", CONFIG.familyLine);
  setText("rsvpText", CONFIG.rsvpInfo);
  setText("closingHindiSub", CONFIG.closingSubHindi);
  setText("closingCopy", CONFIG.closingCopy);

  // Map Link
  const mapLink = byId("mapLink");
  if (mapLink) {
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapSearch)}`;
  }

  // Google Calendar Link
  setupCalendarLinks();

  // Setup WhatsApp share button
  setupWhatsAppShare();

  // Render Itinerary Cards
  const grid = byId("eventGrid");
  if (grid) {
    grid.replaceChildren();
    CONFIG.events.forEach((evt) => {
      const card = document.createElement("article");
      card.className = "event-card tilt-card";
      card.setAttribute("data-tilt", "");

      const headerRow = document.createElement("div");
      headerRow.className = "event-header-row";

      const badge = document.createElement("div");
      badge.className = "event-symbol-badge";
      badge.textContent = evt.symbol;

      const titleGroup = document.createElement("div");
      titleGroup.className = "event-title-group";

      const title = document.createElement("h3");
      title.textContent = evt.title;

      const hindi = document.createElement("p");
      hindi.className = "event-title-hindi hindi";
      hindi.textContent = evt.hindi;

      titleGroup.append(title, hindi);
      headerRow.append(badge, titleGroup);

      const list = document.createElement("ul");
      list.className = "event-details-list";

      [
        ["DATE", evt.date],
        ["TIME", evt.time],
        ["VENUE", evt.venue]
      ].forEach(([label, value]) => {
        const li = document.createElement("li");
        li.className = "event-detail-item";

        const lbl = document.createElement("span");
        lbl.className = "detail-label";
        lbl.textContent = label;

        const val = document.createElement("span");
        val.className = "detail-val";
        val.textContent = value;

        li.append(lbl, val);
        list.append(li);
      });

      const sweep = document.createElement("div");
      sweep.className = "card-shimmer-sweep";
      sweep.setAttribute("aria-hidden", "true");

      card.append(headerRow, list, sweep);
      grid.append(card);
    });
  }

  // Render Blessings Wall
  renderBlessingsWall();
}

/* ==============================================================
   CALENDAR & WHATSAPP INTEGRATION
   ============================================================== */
function setupCalendarLinks() {
  const calBtn = byId("addToCalendarBtn");
  if (!calBtn) return;

  const startDate = new Date(CONFIG.ceremonyDateTime);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

  const formatGCalDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const venueTitle = CONFIG.venueName ? CONFIG.venueName.trim() : "Hotel Raj Palace";
  const cleanAddress = (CONFIG.venueAddress || "").trim().replace(/\n/g, ", ");
  const fullLocation = cleanAddress ? `${venueTitle}, ${cleanAddress}` : venueTitle;

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Ring Ceremony of ${CONFIG.bride} & ${CONFIG.groom}`
  )}&dates=${formatGCalDate(startDate)}/${formatGCalDate(endDate)}&details=${encodeURIComponent(
    `We cordially invite you to celebrate the Ring Ceremony & Engagement of ${CONFIG.bride} and ${CONFIG.groom}.\n\nVenue: ${venueTitle}\nAddress: ${cleanAddress}\nShubh Muhurat: ${CONFIG.shubhMuhurat}\n\nWith love, ${CONFIG.familyLine}.`
  )}&location=${encodeURIComponent(fullLocation)}`;

  calBtn.href = gCalUrl;

  // ICS File download handler (Apple Calendar, Outlook, iOS)
  const icsBtn = byId("downloadIcsBtn");
  if (icsBtn) {
    icsBtn.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Royal Wedding//Ring Ceremony Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        `X-WR-CALNAME:Ring Ceremony - ${CONFIG.bride} & ${CONFIG.groom}`,
        "BEGIN:VEVENT",
        `SUMMARY:Ring Ceremony: ${CONFIG.bride} & ${CONFIG.groom} (Hotel Raj Palace)`,
        `DESCRIPTION:Sacred Ring Ceremony & Engagement of ${CONFIG.bride} & ${CONFIG.groom}.\\n\\nVenue: ${venueTitle}\\nAddress: ${cleanAddress}.\\nShubh Muhurat: ${CONFIG.shubhMuhurat}.\\n\\nWith blessings from ${CONFIG.familyLine}.`,
        `LOCATION:${fullLocation}`,
        `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-TITLE="${venueTitle}":geo:23.8343,80.3990`,
        `DTSTART:${formatGCalDate(startDate)}`,
        `DTEND:${formatGCalDate(endDate)}`,
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `Ring_Ceremony_${CONFIG.bride}_${CONFIG.groom}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("📅 Calendar invitation saved for Hotel Raj Palace!");
    });
  }
}

function setupWhatsAppShare() {
  const shareBtn = byId("whatsappShareBtn");
  if (!shareBtn) return;

  const currentUrl = window.location.href;
  const message = `💍 *You're Cordially Invited!* 💍\n\nWith the blessings of our families, we invite you to celebrate the *Royal Ring Ceremony & Engagement* of:\n\n✨ *${CONFIG.bride} & ${CONFIG.groom}* ✨\n\n📅 *Date:* ${CONFIG.displayDate}\n⏰ *Time:* ${CONFIG.displayTime} (${CONFIG.shubhMuhurat})\n📍 *Venue:* ${CONFIG.venueName}, ${CONFIG.venueAddress.replace(/\n/g, ", ")}\n\nView the interactive royal invitation here:\n${currentUrl}\n\n- ${CONFIG.familyLine}`;

  shareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

/* ==============================================================
   COUNTDOWN TIMER WITH TICK GLOW
   ============================================================== */
function updateCountdown() {
  const target = new Date(CONFIG.ceremonyDateTime).getTime();
  const now = Date.now();
  let remaining = Math.max(0, target - now);

  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  const setWithTick = (id, val) => {
    const el = byId(id);
    if (!el) return;
    const strVal = String(val).padStart(2, "0");
    if (el.textContent !== strVal) {
      el.textContent = strVal;
      el.classList.remove("pulse");
      void el.offsetWidth;
      el.classList.add("pulse");
    }
  };

  setWithTick("days", days);
  setWithTick("hours", hours);
  setWithTick("minutes", minutes);
  setWithTick("seconds", seconds);
}

/* ==============================================================
   INTERACTIVE SACRED RING CEREMONY
   ============================================================== */
let ringsInterlocked = false;

function spawnRingsBlessingBurst() {
  const container = byId("ringsFloatingBurst");
  if (!container) return;

  const symbols = ["💖", "✨", "💍", "🌸", "ॐ", "✦", "⚜", "🕊️"];
  for (let i = 0; i < 16; i++) {
    const mote = document.createElement("span");
    mote.className = "floating-blessing-mote";
    mote.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    mote.style.left = `${15 + Math.random() * 70}%`;
    mote.style.fontSize = `${18 + Math.random() * 14}px`;
    mote.style.animationDelay = `${Math.random() * 0.45}s`;
    mote.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
    container.appendChild(mote);

    setTimeout(() => {
      mote.remove();
    }, 3200);
  }
}

function setupRingInteraction() {
  const exchangeBtn = byId("exchangeRingsBtn");
  const stage = byId("ringsStage");
  const statusMsg = byId("ringStatusMsg");

  if (!exchangeBtn || !stage) return;

  const triggerRingUnion = () => {
    ringsInterlocked = !ringsInterlocked;
    if (ringsInterlocked) {
      stage.classList.add("interlocked");
      if (statusMsg) {
        statusMsg.textContent = "✨ The sacred rings are united! Two souls bound in eternal devotion. ✨";
      }
      playChime();
      showerPetals(65);
      spawnRingsBlessingBurst();
      showToast("💍 Sacred rings exchanged! Best wishes showered on the couple.");
      if (navigator.vibrate) {
        navigator.vibrate([70, 40, 100, 40, 140]);
      }
    } else {
      stage.classList.remove("interlocked");
      if (statusMsg) {
        statusMsg.textContent = "Tap the button to exchange the royal rings!";
      }
    }
  };

  exchangeBtn.addEventListener("click", triggerRingUnion);
  stage.addEventListener("click", triggerRingUnion);
}

/* ==============================================================
   BLESSINGS GUESTBOOK & LOCALSTORAGE
   ============================================================== */
const STORAGE_KEY = "ring_invitation_blessings";

function getBlessings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Storage error:", e);
  }
  return DEFAULT_BLESSINGS;
}

function saveBlessings(blessings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blessings));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

function renderBlessingsWall() {
  const wall = byId("blessingsWall");
  if (!wall) return;
  wall.replaceChildren();

  const blessings = getBlessings();
  blessings.forEach((item) => {
    const card = document.createElement("div");
    card.className = "blessing-card";

    const senderRow = document.createElement("div");
    senderRow.className = "blessing-sender";

    const name = document.createElement("span");
    name.className = "sender-name";
    name.textContent = item.name;

    const city = document.createElement("span");
    city.className = "sender-city";
    city.textContent = item.city || "Well-wisher";

    senderRow.append(name, city);

    const msg = document.createElement("p");
    msg.className = "blessing-text";
    msg.textContent = `"${item.message}"`;

    card.append(senderRow, msg);
    wall.append(card);
  });
}

function setupBlessingForm() {
  const form = byId("blessingForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = byId("guestName");
    const relationInput = byId("guestRelation");
    const messageInput = byId("guestMessage");

    const newBlessing = {
      name: nameInput.value.trim(),
      city: relationInput.value.trim() || "Well-wisher",
      message: messageInput.value.trim()
    };

    if (!newBlessing.name || !newBlessing.message) return;

    const blessings = getBlessings();
    blessings.unshift(newBlessing);
    saveBlessings(blessings);

    renderBlessingsWall();
    form.reset();

    showerPetals(50);
    playChime();
    showToast("🌸 Thank you! Your warm blessings have been bestowed upon the couple.");
  });
}

/* ==============================================================
   COPY VENUE ADDRESS HELPER
   ============================================================== */
function setupCopyAddress() {
  const btn = byId("copyAddressBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const textToCopy = `${CONFIG.venueName}\n${CONFIG.venueAddress}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("✓ Venue address copied to clipboard!");
    } catch (err) {
      showToast("Address: " + CONFIG.venueName);
    }
  });
}

/* ==============================================================
   AUDIO CONTROLLER & WEB AUDIO SYNTHESIZER FALLBACK
   ============================================================== */
let audioCtx = null;
let isSyntheticPlaying = false;
let synthInterval = null;

function playChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 celebratory arpeggio
    notes.forEach((freq, i) => {
      // Fundamental pure tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.9);

      // Sweet temple chime bell overtone
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = "triangle";
      oscHarmonic.frequency.setValueAtTime(freq * 2.01, ctx.currentTime + i * 0.08);

      gainHarmonic.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
      gainHarmonic.gain.linearRampToValueAtTime(0.04, ctx.currentTime + i * 0.08 + 0.015);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.5);

      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(ctx.destination);
      oscHarmonic.start(ctx.currentTime + i * 0.08);
      oscHarmonic.stop(ctx.currentTime + i * 0.08 + 0.55);
    });
  } catch (e) {
    // Audio context silent ignore
  }
}

// Royal Ambient Tanpura / Sitar drone fallback
function startSyntheticMusic() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isSyntheticPlaying = true;
    const rootFreq = 146.83; // D3 traditional Indian Raag tonic

    const playDroneNote = () => {
      if (!isSyntheticPlaying) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";

      // Raag Yaman notes: Sa, Pa, Shuddha Ni, Ga
      const scale = [rootFreq, rootFreq * 1.5, rootFreq * 1.875, rootFreq * 1.25];
      const note = scale[Math.floor(Math.random() * scale.length)];

      osc.frequency.setValueAtTime(note, audioCtx.currentTime);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 4.6);
    };

    playDroneNote();
    synthInterval = setInterval(playDroneNote, 2200);
  } catch (e) {
    console.warn("Synth unavailable");
  }
}

function stopSyntheticMusic() {
  isSyntheticPlaying = false;
  if (synthInterval) clearInterval(synthInterval);
}

function setupAudio() {
  const music = byId("weddingMusic");
  const musicToggle = byId("musicToggle");
  const musicLabel = byId("musicLabel");

  if (!music || !musicToggle) return;

  const setAudioState = (isPlaying) => {
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    if (musicLabel) {
      musicLabel.textContent = isPlaying ? "Playing Shehnai" : "Play Music";
    }
  };

  const startPlayback = async () => {
    try {
      await music.play();
      setAudioState(true);
    } catch (error) {
      // If MP3 fails or is not playable, fallback to sweet Indian instrumental synthesizer
      startSyntheticMusic();
      setAudioState(true);
    }
  };

  const pausePlayback = () => {
    music.pause();
    stopSyntheticMusic();
    setAudioState(false);
  };

  musicToggle.addEventListener("click", () => {
    if (music.paused && !isSyntheticPlaying) {
      startPlayback();
    } else {
      pausePlayback();
    }
  });

  music.addEventListener("ended", () => {
    setAudioState(false);
  });

  return { startPlayback };
}

/* ==============================================================
   ENVELOPE OPENING ANIMATION (3D UNBOXING EXPERIENCE)
   ============================================================== */
function setupEnvelopeOpening(audioControl) {
  const openBtn = byId("openInvite");
  const waxSeal = byId("waxSealBtn");
  const sealWrapper = byId("waxSealWrapper");
  const scene = byId("envelopeScene");
  const cover = byId("cover");
  const invitation = byId("invitation");

  let isOpening = false;

  const openEnvelope = () => {
    if (isOpening) return;
    isOpening = true;

    // Trigger visual seal break and 3D flap opening
    if (sealWrapper) sealWrapper.classList.add("broken");
    if (scene) scene.classList.add("open-flap");

    // Celebratory burst of fragrant petals & golden stardust
    showerPetals(80);
    playChime();

    // Start background music automatically on user gesture
    if (audioControl && audioControl.startPlayback) {
      audioControl.startPlayback();
    }

    if (navigator.vibrate) {
      navigator.vibrate([60, 40, 110]);
    }

    // After 3D flap unfolds and ribbon slides, glide out the cover
    setTimeout(() => {
      cover.classList.add("dismiss");
    }, 450);

    setTimeout(() => {
      cover.hidden = true;
      invitation.hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" });

      // Trigger scroll reveal on visible top sections
      checkScrollReveal();

      // Reveal the floating scroll button inviting the guest to scroll
      const scrollPrompt = byId("floatingScrollPrompt");
      if (scrollPrompt) {
        scrollPrompt.hidden = false;
        setTimeout(() => {
          scrollPrompt.classList.add("visible");
        }, 50);
      }
    }, 1050);
  };

  if (openBtn) openBtn.addEventListener("click", openEnvelope);
  if (waxSeal) waxSeal.addEventListener("click", openEnvelope);

  // Little scroll handler that centers "॥ श्री गणेशाय नमः ॥"
  const scrollToGaneshCenter = () => {
    const ganeshEl = byId("shreeGaneshInvocation");
    if (ganeshEl) {
      const rect = ganeshEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.45) {
        const nextEl = byId("coupleSpotlight") || byId("grandHeading");
        if (nextEl) {
          nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
      }
      ganeshEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollBy({ top: 180, behavior: "smooth" });
    }
  };

  // Floating scroll prompt button
  const floatingScrollBtn = byId("floatingScrollBtn");
  if (floatingScrollBtn) {
    floatingScrollBtn.addEventListener("click", scrollToGaneshCenter);
  }

  // Scroll to explore button in gateway header
  const scrollExploreBtn = byId("scrollExploreBtn");
  if (scrollExploreBtn) {
    scrollExploreBtn.addEventListener("click", scrollToGaneshCenter);
  }

  // Hide floating scroll prompt when scrolled down past the top section
  window.addEventListener("scroll", () => {
    const scrollPrompt = byId("floatingScrollPrompt");
    if (!scrollPrompt || scrollPrompt.hidden) return;

    const hideThreshold = window.innerWidth < 600 ? 220 : 380;
    if (window.pageYOffset > hideThreshold) {
      scrollPrompt.classList.add("fade-out");
    } else {
      scrollPrompt.classList.remove("fade-out");
    }
  }, { passive: true });

  // Back to top button
  const btt = byId("backToTop");
  if (btt) {
    btt.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Floating Pushpa Varsha (Flower Shower) Button
  const flowerBtn = byId("flowerShowerBtn");
  if (flowerBtn) {
    flowerBtn.addEventListener("click", () => {
      showerPetals(55);
      playChime();
      showToast("🌸 पुष्प वर्षा! Blessings showered!");
    });
  }
}

/* ==============================================================
   INTERACTIVE 3D PERSPECTIVE TILT (COUPLE CARDS & JHAROKHAS)
   ============================================================== */
function setupTiltCards() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ==============================================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ============================================================== */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-section, .reveal-item");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // If this is the rings ceremony section, trigger an inviting glow pulse on mobile
          if (entry.target.id === "ringSection" || entry.target.classList.contains("rings-ceremony-section")) {
            const ringsBox = entry.target.querySelector(".interactive-rings-box");
            if (ringsBox) ringsBox.classList.add("invite-pulse");
          }
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
  window.addEventListener("scroll", checkScrollReveal, { passive: true });
}

function checkScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-section, .reveal-item");
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      el.classList.add("revealed");
    }
  });
}

/* ==============================================================
   ROYAL TOP GOLDEN SCROLL PROGRESS THREAD
   ============================================================== */
function setupScrollProgressBar() {
  const bar = byId("scrollProgressBar");
  if (!bar) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      bar.style.width = "0%";
      return;
    }
    const progress = Math.min(100, Math.max(0, (window.pageYOffset / totalHeight) * 100));
    bar.style.width = `${progress.toFixed(1)}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ==============================================================
   INTERACTIVE AUSPICIOUS DIYA FLAME FLARE
   ============================================================== */
function setupDiyaInteractions() {
  const diyas = document.querySelectorAll(".auspicious-diya");
  diyas.forEach((diya) => {
    const flare = () => {
      diya.style.transform = "scale(1.3) translateY(-6px)";
      playChime();
      showerPetals(15);
      if (navigator.vibrate) {
        navigator.vibrate([30, 20, 50]);
      }
      showToast("🪔 शुभ दीप दर्शन! Auspicious light blessed.");
      setTimeout(() => {
        diya.style.transform = "";
      }, 500);
    };
    diya.addEventListener("click", flare);
  });
}

/* ==============================================================
   GOLDEN STARDUST: DESKTOP MOUSE TRAIL & MOBILE TOUCHBURST SPARKLES
   ============================================================== */
let cursorCanvas, cursorCtx;
let cursorSparks = [];

function spawnTouchSparkles(x, y, count = 5) {
  if (!cursorCanvas) return;
  const colors = ["#ffd978", "#fff6d4", "#ffc048", "#ffffff"];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const speed = 1.0 + Math.random() * 2.8;
    cursorSparks.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      size: 2.8 + Math.random() * 3.6,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed - 0.6,
      life: 1,
      decay: 0.035 + Math.random() * 0.025,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  if (cursorSparks.length > 70) {
    cursorSparks.splice(0, cursorSparks.length - 70);
  }
}

function initSparkleCanvas() {
  cursorCanvas = byId("sparkleCanvas");
  if (!cursorCanvas) return;
  cursorCtx = cursorCanvas.getContext("2d");

  const resize = () => {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  // Desktop Mouse Stardust Trail
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      for (let i = 0; i < 2; i++) {
        cursorSparks.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: 2.2 + Math.random() * 3,
          speedX: (Math.random() - 0.5) * 1.0,
          speedY: (Math.random() - 0.5) * 1.0 - 0.3,
          life: 1,
          decay: 0.03 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? "#ffd978" : "#fff6d4"
        });
      }
      if (cursorSparks.length > 55) cursorSparks.shift();
    }, { passive: true });
  }

  // Mobile Touch Sparkles Burst (Brings touchscreens to life!)
  window.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches.length > 0) {
      const t = e.touches[0];
      spawnTouchSparkles(t.clientX, t.clientY, 5);
    }
  }, { passive: true });

  window.addEventListener("click", (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      spawnTouchSparkles(e.clientX, e.clientY, 6);
    }
  }, { passive: true });

  const renderSparks = () => {
    cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    for (let i = cursorSparks.length - 1; i >= 0; i--) {
      const s = cursorSparks[i];
      s.x += s.speedX;
      s.y += s.speedY;
      s.life -= s.decay;

      if (s.life <= 0) {
        cursorSparks.splice(i, 1);
        continue;
      }

      cursorCtx.save();
      cursorCtx.globalAlpha = s.life;
      cursorCtx.fillStyle = s.color;
      cursorCtx.shadowColor = s.color;
      cursorCtx.shadowBlur = 6;
      cursorCtx.beginPath();
      const r = s.size * s.life;
      cursorCtx.moveTo(s.x, s.y - r);
      cursorCtx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
      cursorCtx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
      cursorCtx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
      cursorCtx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
      cursorCtx.fill();
      cursorCtx.restore();
    }
    requestAnimationFrame(renderSparks);
  };
  renderSparks();
}

/* ==============================================================
   HTML5 CANVAS: TUMBLING ROSE PETALS, JASMINE & GOLDEN STARDUST
   ============================================================== */
let canvas, ctx;
let particles = [];
let animId = null;

class PetalParticle {
  constructor(canvasWidth, canvasHeight, isBurst = false) {
    this.reset(canvasWidth, canvasHeight, isBurst);
  }

  reset(width, height, isBurst = false) {
    this.x = Math.random() * width;
    this.y = isBurst ? Math.random() * (height * 0.4) : -20 - Math.random() * 50;
    this.size = 12 + Math.random() * 16;
    this.speedY = 1.1 + Math.random() * 2.0;
    this.speedX = Math.sin(Math.random() * Math.PI) * 1.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;
    this.flutter = Math.random() * Math.PI;
    this.flutterSpeed = 0.03 + Math.random() * 0.03;

    // Petal types: crimson rose, soft pink rose, marigold yellow, fragrant jasmine, gold star
    const types = ["crimson", "crimson", "rose", "marigold", "jasmine", "goldSpark"];
    this.type = types[Math.floor(Math.random() * types.length)];
    this.opacity = 0.65 + Math.random() * 0.35;
  }

  update(width, height) {
    this.y += this.speedY;
    this.x += Math.sin(this.flutter) * 1.2 + this.speedX * 0.3;
    this.flutter += this.flutterSpeed;
    this.rotation += this.rotSpeed;

    if (this.y > height + 30) {
      this.reset(width, height, false);
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    // 3D tumble projection effect
    const scaleX = Math.cos(this.flutter);
    context.scale(scaleX, 1);
    context.globalAlpha = this.opacity;

    if (this.type === "goldSpark") {
      // Golden star ember
      context.fillStyle = "#f5cf6d";
      context.shadowColor = "#f5cf6d";
      context.shadowBlur = 10;
      context.beginPath();
      context.arc(0, 0, this.size * 0.22, 0, Math.PI * 2);
      context.fill();
    } else if (this.type === "jasmine") {
      // Delicate white Jasmine / Mogra blossom
      context.fillStyle = "#ffffff";
      context.shadowColor = "#fff7d6";
      context.shadowBlur = 4;
      for (let i = 0; i < 4; i++) {
        context.rotate(Math.PI / 2);
        context.beginPath();
        context.ellipse(0, this.size * 0.28, this.size * 0.16, this.size * 0.32, 0, 0, Math.PI * 2);
        context.fill();
      }
      context.fillStyle = "#ffd978";
      context.beginPath();
      context.arc(0, 0, this.size * 0.1, 0, Math.PI * 2);
      context.fill();
    } else {
      // Natural flower petal curve
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(this.size * 0.6, -this.size * 0.4, this.size * 0.8, this.size * 0.8, 0, this.size);
      context.bezierCurveTo(-this.size * 0.8, this.size * 0.8, -this.size * 0.6, -this.size * 0.4, 0, 0);

      if (this.type === "crimson") {
        context.fillStyle = "#8a0e20";
        context.shadowColor = "#3d050d";
        context.shadowBlur = 4;
      } else if (this.type === "rose") {
        context.fillStyle = "#c22b44";
        context.shadowColor = "#660b1b";
        context.shadowBlur = 3;
      } else {
        // Marigold (Genda)
        context.fillStyle = "#f29e16";
        context.shadowColor = "#f5cf6d";
        context.shadowBlur = 6;
      }
      context.fill();
    }

    context.restore();
  }
}

function initPetalCanvas() {
  canvas = byId("petalCanvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const count = window.innerWidth < 600 ? 16 : 42;
  particles = [];
  for (let i = 0; i < count; i++) {
    const p = new PetalParticle(canvas.width, canvas.height);
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(canvas.width, canvas.height);
      particles[i].draw(ctx);
    }
    animId = requestAnimationFrame(loop);
  };

  loop();
}

function showerPetals(count = 50) {
  if (!canvas) return;
  const isMobile = window.innerWidth < 600;
  const actualCount = isMobile ? Math.min(count, 30) : count;
  const maxAllowed = isMobile ? 65 : 130;

  for (let i = 0; i < actualCount; i++) {
    const p = new PetalParticle(canvas.width, canvas.height, true);
    particles.push(p);
  }
  if (particles.length > maxAllowed) {
    particles.splice(0, particles.length - maxAllowed);
  }
}

/* ==============================================================
   INITIALIZATION ON DOM LOAD
   ============================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
  renderConfig();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const audioControl = setupAudio();
  setupEnvelopeOpening(audioControl);
  setupRingInteraction();
  setupBlessingForm();
  setupCopyAddress();
  setupTiltCards();
  setupScrollReveal();
  setupScrollProgressBar();
  setupDiyaInteractions();
  initPetalCanvas();
  initSparkleCanvas();
});
