# Royal Red & Golden Ring Ceremony Invitation (शाही सगाई आमंत्रण)

An ultra-luxurious, mobile-first Indian **Ring Ceremony & Engagement Invitation** featuring rich Rajputana/Mughal red velvet & metallic 24K gold aesthetics, fluid animations, falling rose petal physics, interactive ring exchange centerpiece, royal countdown timer, and guestbook blessings wall.

Built with pure Vanilla HTML5, CSS3, and JavaScript — zero frameworks, lightning fast, and ready to host for free on GitHub Pages or Netlify.

---

## ✨ Features & Highlights

1. **Royal Rajputana Velvet Red & Golden Theme**:
   - Deep crimson/maroon silk background with subtle Indian brocade patterns and ambient radial glow.
   - 24K metallic gold gradients, ornate filigree corners, and gold-foiled card frames.
   - Handcrafted auspicious Lord Ganesha motif with radiant pulsating halo and sacred shlokas.

2. **3D Royal Envelope & Golden Wax Seal Entrance**:
   - Realistic folded envelope with gold lace and traditional toran garland.
   - 3D embossed Golden Wax Seal stamped with interlocking rings `💍` and sacred blessings.
   - Smooth unsealing animation with burst of flower petals and stardust when clicked!

3. **Interactive Sacred Ring Ceremony (मुद्रिका अर्पण)**:
   - Solitaire diamond ring with brilliant sparkling light flares alongside the royal carved gold band.
   - **Interactive "Touch to Exchange Rings"**: The rings slide together, interlock, and unleash celebratory golden sparks, flower petals, and romantic chimes!

4. **Floating HTML5 Petal & Sparkle Canvas Engine**:
   - Realistic 3D tumbling red rose petals and marigold flowers drifting smoothly across the screen at 60 FPS.
   - Interactive **"पुष्प वर्षा (Shower Blessings)"** floating action button to rain petals anytime.

5. **Auspicious Muhurat Countdown Timer (शुभ मुहूर्त)**:
   - Golden-framed real-time clock counting down to the sacred Mahurat.
   - One-click **"Add to Google Calendar"** & **"Save to Apple/Outlook Calendar (.ics)"**.

6. **Three Sacred Ceremonies (मांगलिक कार्यक्रम)**:
   - 🌺 **Oli Ceremony** (शुभ ओली रस्म / मांगलिक शगुन)
   - 🪔 **Variksha Ceremony** (वरीक्षा रस्म / तिलक एवं रोली-अक्षत)
   - 💍 **Sagai & Ring Exchange** (शुभ सगाई एवं मुद्रिका अर्पण)

7. **Auto-Scroll & Guided Navigation**:
   - Tapping "Open Royal Invitation" triggers a smooth cinematic auto-scroll glide directly into the grand heading and couple spotlight so guests never get stuck on an empty screen.
   - Includes animated scroll explore buttons and bottom scroll guidance.

8. **Interactive Guestbook & Wall of Blessings**:
   - Relatives and friends can type their name and heartfelt wishes.
   - Saved locally and displayed in a real-time celebratory blessings wall.

9. **Royal Audio Player & Fallback**:
   - Floating music button with animated equalizer frequency bars.
   - Plays `assets/music.mp3` or seamlessly transitions to a built-in soothing Indian Raag ambient harmonic synthesizer using the Web Audio API if no audio file is provided.

---

## 🛠️ How to Personalize the Invitation (Safe & Code-Free)

All customizable details are stored separately in **`config.json`**. You can edit names, dates, parents, events, and venues **without touching or interfering with the core HTML, CSS, or JavaScript code!**

Open **`config.json`** in any text editor and edit the fields:

```json
{
  "eventType": "Ring Ceremony & Engagement",
  "eventTypeHindi": "शुभ सगाई एवं मुद्रिका अर्पण",
  "bride": "Akansha",
  "groom": "Nilesh",
  "brideParents": "Smt. Maya & Late Shri Rajesh Vishwakarma",
  "groomParents": "Smt. Kushlata & Shri Mansukhlal Vishwakarma",
  "ceremonyDateTime": "2026-11-11T12:00:00",
  "displayDate": "Wednesday, 11 November 2026",
  "displayTime": "12:00 PM Onwards",
  "shubhMuhurat": "12:15 PM (शुभ मुहूर्त)",
  "venueName": "The Grand Royal Palace & Resort",
  "venueAddress": "Palace Road, Near Rajwada Garden\nUdaipur, Rajasthan - 313001",
  "mapSearch": "The Grand Royal Palace Udaipur Rajasthan",
  "familyLine": "Vishwakarma Family",
  "rsvpInfo": "R.S.V.P: +91 98765 43210 / +91 91234 56789",
  "events": [
    {
      "symbol": "🌺",
      "title": "Oli Ceremony",
      "hindi": "शुभ ओली रस्म (मांगलिक शगुन)",
      "date": "Wednesday, 11 November 2026",
      "time": "12:00 PM",
      "venue": "Family Residence / Darbar Hall"
    },
    {
      "symbol": "🪔",
      "title": "Variksha Ceremony",
      "hindi": "वरीक्षा रस्म (तिलक एवं रोली-अक्षत)",
      "date": "Wednesday, 11 November 2026",
      "time": "01:30 PM",
      "venue": "The Royal Palace Banquet Lawn"
    },
    {
      "symbol": "💍",
      "title": "Sagai & Ring Exchange",
      "hindi": "शुभ सगाई एवं मुद्रिका अर्पण",
      "date": "Wednesday, 11 November 2026",
      "time": "03:00 PM (शुभ मुहूर्त)",
      "venue": "Central Royal Mandap & Feast Courtyard"
    }
  ]
}
```

---

## 🎵 Background Music

Place any licensed wedding/shehnai/sitar track in `assets/music.mp3`. If you don't have an MP3, the invitation includes an automatic traditional ambient harmonic drone generator powered by the browser's Web Audio API!

---

## 🌐 How to Preview & Publish

### Preview Locally
Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox, or use the VS Code **Live Server** extension.

### Publish on GitHub Pages (Free)
1. Push this folder to a GitHub repository.
2. In your repo, go to **Settings → Pages**.
3. Select the `main` branch and `/ (root)` folder and hit **Save**.
4. Your invitation will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.
