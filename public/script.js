/* =========================================================
   TORIVA - MAIN JS (rendezett)
   - Chip filter (kiemelt munkák)
   - Before/After slider
   - Mobile menu
   - Header scroll effect
   - Animate-on-scroll (IntersectionObserver)
   - Motion hover video play (ha van)
   - Hero belépő anim (ha van)
   - Stats count-up (IntersectionObserver)
   ========================================================= */

(function () {
  "use strict";

  // ----------------------------
  // Helpers
  // ----------------------------
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----------------------------
  // 1) Chip filter (kiemelt munkák)
  // ----------------------------
  function initWorkFilters() {
    const chips = qsa(".chip[data-filter]");
    const cards = qsa(".work-card[data-cat]");
    if (chips.length === 0 || cards.length === 0) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });

        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");

        const f = chip.dataset.filter;
        cards.forEach((card) => {
          const cat = card.dataset.cat;
          const show = f === "all" || cat === f;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  // ----------------------------
  // 2) Before/After slider
  // ----------------------------
  function initBeforeAfter() {
    const frames = qsa("[data-ba]");
    if (frames.length === 0) return;

    frames.forEach((frame) => {
      const range = qs("[data-ba-range]", frame);
      const after = qs("[data-ba-after]", frame);
      const handle = qs("[data-ba-handle]", frame);
      if (!range || !after || !handle) return;

      const apply = (v) => {
        after.style.width = v + "%";
        handle.style.left = v + "%";
      };

      apply(range.value || 50);
      range.addEventListener("input", (e) => apply(e.target.value));
    });
  }

  // ----------------------------
  // 3) Mobile menu toggle
  // ----------------------------
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector("nav ul");
    const header = document.querySelector("header");

    if (!mobileMenuBtn || !navMenu) return;

    // backdrop (ha nincs, létrehozzuk)
    let backdrop = document.querySelector(".nav-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
    }

    const openMenu = () => {
      navMenu.classList.add("active");
      document.body.classList.add("nav-open");
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      mobileMenuBtn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      navMenu.classList.remove("active");
      document.body.classList.remove("nav-open");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.contains("active") ? closeMenu() : openMenu();
    });

    backdrop.addEventListener("click", closeMenu);

    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Header scroll effect (marad)
    if (header) {
      window.addEventListener(
        "scroll",
        () => header.classList.toggle("scrolled", window.scrollY > 100),
        { passive: true }
      );
    }
  }

  // ----------------------------
  // 4) Animate-on-scroll
  //   - a régi scrollos megoldás helyett IO (sokkal simább)
  // ----------------------------
  function initAnimateOnScroll() {
    const elements = qsa(".animate-on-scroll");
    if (elements.length === 0) return;

    // Fallback, ha nincs IO
    if (!("IntersectionObserver" in window)) {
      const onScroll = () => {
        elements.forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight - 150) el.classList.add("animated");
        });
      };
      window.addEventListener("load", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animated");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => io.observe(el));
  }

  // ----------------------------
  // 5) Video play on hover (ha van .motion-item video)
  // ----------------------------
  function initHoverVideos() {
    const videos = qsa(".motion-item video");
    if (videos.length === 0) return;

    videos.forEach((video) => {
      video.addEventListener("mouseenter", () => video.play().catch(() => {}));
      video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  // ----------------------------
  // 6) Hero belépő animáció (ha vannak ilyen elemek)
  //   - Parallax scrollt KIKAPCSOLJUK: rángat + üti az animot
  // ----------------------------
  function initHeroIntro() {
    if (prefersReducedMotion) return;

    const heroTitle = qs(".hero-title");
    const heroSubtitle = qs(".hero-subtitle");
    const heroBtn = qs(".hero-content .btn");

    // Ha ezek nincsenek, nincs mit animálni
    if (!heroTitle && !heroSubtitle && !heroBtn) return;

    if (heroTitle) {
      setTimeout(() => {
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
      }, 500);
    }

    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.style.opacity = "1";
        heroSubtitle.style.transform = "translateY(0)";
      }, 1000);
    }

    if (heroBtn) {
      setTimeout(() => {
        heroBtn.style.opacity = "1";
        heroBtn.style.transform = "translateY(0)";
      }, 1500);
    }
  }

  // ----------------------------
  // 7) Stats count-up (IntersectionObserver)
  // ----------------------------
  function initStatsCountUp() {
    const els = qsa(".num[data-count]");
    if (els.length === 0) return;
    if (!("IntersectionObserver" in window)) return;

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      if (Number.isNaN(target)) return;

      const start = 0;
      const dur = 900;
      const t0 = performance.now();

      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(start + (target - start) * eased);
        el.textContent = String(val);
        if (p < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    els.forEach((el) => io.observe(el));
  }
  function initProofTabs(){
  const tabs = document.querySelectorAll('.ptab[data-ptab]');
  const panels = document.querySelectorAll('.ppanel[data-ppanel]');
  if(tabs.length === 0 || panels.length === 0) return;

  const setActive = (key) => {
    tabs.forEach(t => {
      const active = t.dataset.ptab === key;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach(p => {
      const active = p.dataset.ppanel === key;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
  };

  tabs.forEach(t=>{
    t.addEventListener('click', ()=> setActive(t.dataset.ptab));
  });

  // default
  setActive(tabs[0].dataset.ptab);
}
 // év automatikus frissítése (ha nem akarsz JS-t, írd be kézzel)
  (function(){ 
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  })();

  (function () {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    els.forEach(el => io.observe(el));
  })();


  // ----------------------------
  // Init everything on DOM ready
  // ----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initWorkFilters();
    initBeforeAfter();
    initMobileMenu();
    initAnimateOnScroll();
    initHoverVideos();
    initHeroIntro();
    initStatsCountUp();
    initProofTabs();
  });
})();
