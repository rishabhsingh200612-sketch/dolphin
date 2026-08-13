// ========================================
// ❤️ EDIT ONLY THIS SECTION
// ========================================
// This is the ONLY place you need to touch. Paste your links, filenames,
// number and message below. Everything else on the site updates automatically.

const proposalData = {

  // Her name — shown in the opening line "Heyyy ___ ❤️"
  girlfriendName: "Meri Jaan",

  // Paste Instagram REEL links here (as many as you want, or leave empty [])
  // Example: "https://www.instagram.com/reel/XXXXXXXXXXX/"
  instagramReels: [
    // "PASTE_INSTAGRAM_REEL_LINK_1",
    // "PASTE_INSTAGRAM_REEL_LINK_2",
    // "PASTE_INSTAGRAM_REEL_LINK_3"
  ],

  // Paste Instagram PHOTO/POST links here
  // Example: "https://www.instagram.com/p/XXXXXXXXXXX/"
  instagramPosts: [
    // "PASTE_INSTAGRAM_POST_LINK_1",
    // "PASTE_INSTAGRAM_POST_LINK_2",
    // "PASTE_INSTAGRAM_POST_LINK_3",
    // "PASTE_INSTAGRAM_POST_LINK_4",
    // "PASTE_INSTAGRAM_POST_LINK_5"
  ],

  // Local photo filenames — put the actual image files inside the /assets folder
  // and list their filenames here (used in the Photo Memory Wall + Our Little World)
  photos: [
    // "photo1.jpg",
    // "photo2.jpg",
    // "photo3.jpg",
    // "photo4.jpg",
    // "photo5.jpg",
    // "photo6.jpg"
  ],

  // Background music filename — put the mp3 inside the /assets folder
  music: "love-song.mp3",

  // WhatsApp number WITH country code, no + or spaces (e.g. 91XXXXXXXXXX)
  whatsappNumber: "919711459192",

  // Pre-filled WhatsApp message (emojis are fine, it gets URL-encoded automatically)
  whatsappMessage: "Heyyy ❤️🥹 Maine pura proposal dekha... and YESSSS! 💍❤️"
};

// ========================================
// 🚫 DO NOT EDIT BELOW THIS LINE
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ============================================================
     NAME INJECTION
  ============================================================ */
  $$('#nameSlot1').forEach(el => el.textContent = proposalData.girlfriendName);

  /* ============================================================
     AMBIENT BACKGROUND GENERATION (stars, bokeh, floating hearts)
  ============================================================ */
  function buildAmbientLayer(container, count, factory) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) frag.appendChild(factory(i));
    container.appendChild(frag);
  }

  buildAmbientLayer($('#starsLayer'), 40, () => {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = (Math.random() * 3) + 's';
    s.style.animationDuration = (2 + Math.random() * 3) + 's';
    return s;
  });

  buildAmbientLayer($('#bokehLayer'), 14, () => {
    const b = document.createElement('span');
    const size = 20 + Math.random() * 60;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDuration = (14 + Math.random() * 14) + 's';
    b.style.animationDelay = (Math.random() * 14) + 's';
    return b;
  });

  const heartEmojis = ['❤️', '💗', '💕', '💖', '🩷'];
  buildAmbientLayer($('#floatingHeartsLayer'), 16, () => {
    const h = document.createElement('span');
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
    h.style.animationDuration = (10 + Math.random() * 12) + 's';
    h.style.animationDelay = (Math.random() * 14) + 's';
    return h;
  });

  /* ============================================================
     CUSTOM CURSOR HEART (desktop only)
  ============================================================ */
  if (!isTouch) {
    const cursorHeart = $('#cursorHeart');
    window.addEventListener('mousemove', e => {
      cursorHeart.style.left = e.clientX + 'px';
      cursorHeart.style.top = e.clientY + 'px';
    });
  }

  /* ============================================================
     SCROLL PROGRESS BAR
  ============================================================ */
  const scrollFill = $('#scrollFill');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollFill.style.width = pct + '%';
  }, { passive: true });

  /* ============================================================
     TYPEWRITER EFFECT
  ============================================================ */
  function typeText(el, text, speed = 45) {
    return new Promise(resolve => {
      let i = 0;
      el.textContent = '';
      const interval = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  async function runIntroTyping() {
    await typeText($('#typeLine1'), 'Tere liye kuch special banaya hai... 🥺💗', 40);
    await new Promise(r => setTimeout(r, 300));
    await typeText($('#typeLine2'), 'Bas ek baar dil se dekhna... 👀❤️', 40);
  }
  runIntroTyping();

  /* ============================================================
     SCROLL REVEAL (IntersectionObserver)
  ============================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  function observeReveals(root = document) {
    $$('[data-reveal]', root).forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     INSTAGRAM EMBEDS (official embed.js) + AUTO FALLBACK
  ============================================================ */
  let instagramScriptLoaded = false;
  function loadInstagramEmbedScript() {
    return new Promise((resolve) => {
      if (window.instgrm) { instagramScriptLoaded = true; return resolve(); }
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = () => { instagramScriptLoaded = true; resolve(); };
      s.onerror = () => resolve(); // resolve anyway -> fallback path handles it
      document.body.appendChild(s);
      // safety timeout in case embed.js hangs
      setTimeout(resolve, 3500);
    });
  }

  function createFallback(url) {
    const tpl = $('#fallbackCardTemplate').content.cloneNode(true);
    const btn = tpl.querySelector('.fallback-btn');
    btn.href = url;
    return tpl;
  }

  function createInstagramBlockquote(url) {
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', url);
    bq.setAttribute('data-instgrm-version', '14');
    bq.style.margin = '0 auto';
    return bq;
  }

  // Attempts a real Instagram embed; swaps to fallback if it fails to render.
  async function mountInstagramEmbed(container, url) {
    const wrap = document.createElement('div');
    wrap.className = 'embed-wrap';
    container.appendChild(wrap);

    if (!url) {
      wrap.replaceWith(createFallback('#'));
      return;
    }

    await loadInstagramEmbedScript();

    if (window.instgrm && instagramScriptLoaded) {
      const bq = createInstagramBlockquote(url);
      wrap.appendChild(bq);
      try {
        window.instgrm.Embeds.process();
      } catch (e) { /* fall through to check below */ }

      // Give Instagram a moment to convert the blockquote into an iframe.
      setTimeout(() => {
        const rendered = wrap.querySelector('iframe');
        if (!rendered) {
          wrap.replaceWith(createFallback(url));
        }
      }, 2600);
    } else {
      wrap.replaceWith(createFallback(url));
    }
  }

  /* ---- Section 2: Instagram Posts ---- */
  const postCaptions = [
    'Kitni pyaari lag rahi ho yaar 🥹❤️',
    'Ye wali smile >>> 😭💖',
    'Meri favourite girl ❤️✨',
    'Okay... itni cute hona legal hai kya? 😂❤️',
    'Is smile ka toh main fan hoon 🥰',
    'Yeh photo dekh ke din ban gaya 💗'
  ];

  const postsGrid = $('#instaPostsGrid');
  if (proposalData.instagramPosts.length === 0) {
    postsGrid.innerHTML = `<p class="lead-text">Photos aane wale hain yahan... 👀❤️</p>`;
  } else {
    proposalData.instagramPosts.forEach((url, i) => {
      const card = document.createElement('div');
      card.className = 'post-card';
      const caption = document.createElement('p');
      caption.className = 'post-caption';
      caption.textContent = postCaptions[i % postCaptions.length];
      card.appendChild(caption);
      postsGrid.appendChild(card);
      mountInstagramEmbed(card, url);
      revealObserver.observe(card);
    });
  }

  /* ---- Section 3: Instagram Reels ---- */
  const reelsRow = $('#instaReelsRow');
  if (proposalData.instagramReels.length === 0) {
    reelsRow.innerHTML = `<p class="lead-text">Reels aane wale hain yahan... 🎥❤️</p>`;
  } else {
    proposalData.instagramReels.forEach(url => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      reelsRow.appendChild(card);
      mountInstagramEmbed(card, url);
      revealObserver.observe(card);
    });
  }

  /* ============================================================
     PHOTO MEMORY WALL (Section 5) + OUR LITTLE WORLD (Section 9)
  ============================================================ */
  const photoWall = $('#photoWall');
  const worldGrid = $('#worldGrid');
  const wallCaptions = ['🥹❤️', '💗', 'my favourite ✨', '😭💕', '❤️', '🥹'];

  if (proposalData.photos.length === 0) {
    photoWall.innerHTML = `<p class="lead-text">Photos yahan add karo assets folder mein 📸</p>`;
    worldGrid.innerHTML = '';
  } else {
    proposalData.photos.forEach((file, i) => {
      // polaroid wall item
      const p = document.createElement('div');
      p.className = 'polaroid';
      p.style.setProperty('--r', (Math.random() * 8 - 4) + 'deg');
      const img = document.createElement('img');
      img.src = `assets/${file}`;
      img.alt = 'A memory together';
      img.loading = 'lazy';
      const cap = document.createElement('p');
      cap.className = 'cap';
      cap.textContent = wallCaptions[i % wallCaptions.length];
      p.appendChild(img);
      p.appendChild(cap);
      photoWall.appendChild(p);
      revealObserver.observe(p);

      // world item (reuse a subset)
      if (i < 6) {
        const w = document.createElement('div');
        w.className = 'world-item';
        const wimg = document.createElement('img');
        wimg.src = `assets/${file}`;
        wimg.alt = 'Our little world';
        wimg.loading = 'lazy';
        w.appendChild(wimg);
        worldGrid.appendChild(w);
        revealObserver.observe(w);
      }
    });
  }

  /* ============================================================
     WHATSAPP LINK GENERATION
  ============================================================ */
  const whatsappBtn = $('#whatsappBtn');
  const whatsappURL = `https://wa.me/${proposalData.whatsappNumber}?text=${encodeURIComponent(proposalData.whatsappMessage)}`;
  whatsappBtn.href = whatsappURL;
  whatsappBtn.addEventListener('click', () => {
    burstHearts(whatsappBtn, 10);
  });

  /* ============================================================
     MUSIC SYSTEM
  ============================================================ */
  const bgMusic = $('#bgMusic');
  bgMusic.src = `assets/${proposalData.music}`;
  const musicBtn = $('#musicBtn');
  const musicWidget = $('#musicWidget');
  let musicStarted = false;
  let musicPlaying = false;

  function tryStartMusic() {
    if (musicStarted) return;
    musicStarted = true;
    bgMusic.volume = 0.6;
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicWidget.classList.add('playing');
    }).catch(() => { /* autoplay blocked — she can tap the button */ });
  }

  musicBtn.addEventListener('click', () => {
    if (!musicStarted) { tryStartMusic(); return; }
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      musicWidget.classList.remove('playing');
    } else {
      bgMusic.play().catch(() => {});
      musicPlaying = true;
      musicWidget.classList.add('playing');
    }
  });

  /* ============================================================
     HEART BURST / SPARKLE UTILITY
  ============================================================ */
  function burstHearts(originEl, count = 14) {
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const isSparkle = Math.random() > 0.6;
      el.textContent = isSparkle ? '✨' : ['❤️','💖','💕','💗'][Math.floor(Math.random()*4)];
      el.style.position = 'fixed';
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.fontSize = (14 + Math.random() * 18) + 'px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = 3000;
      el.style.transition = 'transform 1s cubic-bezier(.2,.8,.2,1), opacity 1s ease';
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 120;
        el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 40}px) scale(0.4) rotate(${Math.random()*180}deg)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 1050);
    }
  }

  /* ============================================================
     OPEN MY HEART BUTTON — reveal the rest of the story
  ============================================================ */
  const openHeartBtn = $('#openHeartBtn');
  const introScreen = $('#introScreen');
  const storyWrapper = $('#storyWrapper');

  openHeartBtn.addEventListener('click', () => {
    tryStartMusic();
    burstHearts(openHeartBtn, 22);

    if (window.gsap) {
      gsap.to(introScreen, {
        opacity: 0, scale: 1.08, duration: 0.9, ease: 'power2.inOut',
        onComplete: revealStory
      });
    } else {
      introScreen.style.transition = 'opacity .7s ease';
      introScreen.style.opacity = '0';
      setTimeout(revealStory, 700);
    }
  });

  function revealStory() {
    introScreen.style.display = 'none';
    storyWrapper.classList.add('visible');
    observeReveals(storyWrapper);
    storyWrapper.scrollIntoView({ behavior: 'smooth' });
  }

  /* ============================================================
     "LET ME THINK" POPUP
  ============================================================ */
  const thinkBtn = $('#thinkBtn');
  const thinkPopup = $('#thinkPopup');
  const popupOkBtn = $('#popupOkBtn');

  thinkBtn.addEventListener('click', () => {
    thinkPopup.classList.add('active');
  });
  popupOkBtn.addEventListener('click', () => {
    thinkPopup.classList.remove('active');
  });

  /* ============================================================
     YES BUTTON — CELEBRATION
  ============================================================ */
  const yesBtn = $('#yesBtn');
  const celebrationScreen = $('#celebrationScreen');
  const continueBtn = $('#continueBtn');
  const canvas = $('#celebrationCanvas');
  const ctx = canvas.getContext('2d');
  let celebrationRunning = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  function launchCelebration() {
    resizeCanvas();
    celebrationScreen.classList.add('active');
    observeReveals(celebrationScreen);
    document.body.style.overflow = 'hidden';
    celebrationRunning = true;

    const particles = [];
    const colors = ['#ff5c8a', '#f4c77b', '#ffffff', '#c9184a', '#ffe6b8'];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14 - 4,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        shape: Math.random() > 0.5 ? 'heart' : 'circle',
        gravity: 0.12 + Math.random() * 0.08
      });
    }

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(0, 0, -5, 0, -5, 3);
      ctx.bezierCurveTo(-5, 6, 0, 8, 0, 10);
      ctx.bezierCurveTo(0, 8, 5, 6, 5, 3);
      ctx.bezierCurveTo(5, 0, 0, 0, 0, 3);
      ctx.fill();
      ctx.restore();
    }

    let frame = 0;
    function animate() {
      if (!celebrationRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= 0.006;
        ctx.globalAlpha = Math.max(p.life, 0);
        if (p.shape === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // periodically add fresh bursts for a "fireworks" feel
      if (frame % 55 === 0 && frame < 300) {
        const bx = Math.random() * canvas.width;
        const by = canvas.height * (0.2 + Math.random() * 0.3);
        for (let i = 0; i < 40; i++) {
          const angle = (Math.PI * 2 * i) / 40;
          particles.push({
            x: bx, y: by,
            vx: Math.cos(angle) * (3 + Math.random() * 3),
            vy: Math.sin(angle) * (3 + Math.random() * 3),
            size: 3 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            shape: Math.random() > 0.6 ? 'heart' : 'circle',
            gravity: 0.1
          });
        }
      }

      // trim dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      if (frame < 620) {
        requestAnimationFrame(animate);
      }
    }
    animate();
  }

  yesBtn.addEventListener('click', () => {
    burstHearts(yesBtn, 20);
    setTimeout(launchCelebration, 300);
  });

  continueBtn.addEventListener('click', () => {
    celebrationRunning = false;
    celebrationScreen.classList.remove('active');
    document.body.style.overflow = '';
    $('#section8').scrollIntoView({ behavior: 'smooth' });
  });

  /* ============================================================
     END SCREEN TYPEWRITER
  ============================================================ */
  const endScreenObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeText($('#endTypeLine'), 'Ab jao... aur mujhe WhatsApp pe message karo 😭😂❤️', 40);
        endScreenObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  endScreenObserver.observe($('#endScreen'));

  /* ============================================================
     INITIAL REVEAL OBSERVE (intro screen elements)
  ============================================================ */
  observeReveals(introScreen);
});
