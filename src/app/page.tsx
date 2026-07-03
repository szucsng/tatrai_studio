"use client"

import React, { useEffect } from "react";

export default function Home(): React.ReactElement {
  const year = new Date().getFullYear();

  useEffect(() => {
    // External script in layout handles interactive features (before/after, menus, etc.)
  }, []);

  return (
    <>
      <div className="grain" />

      <header>
        <div className="container header-container">
          <a href="#" className="logo">Tátrai Levente</a>
          <nav>
            <button className="mobile-menu-btn">
              <i className="fas fa-bars" />
            </button>
            <ul>
              <li><a href="/galeria">Munkáim</a></li>
              <li><a href="#next">Rólam</a></li>
              <li><a href="#faq">Kapcsolat</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <video className="hero-video" muted loop autoPlay playsInline>
          <source src="/header_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Photographer &amp; Filmmaker</span>
          </h1>
        </div>
      </section>

      <section className="section-2" id="next">
        <div className="divider">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C240,120 480,0 720,48 C960,96 1200,40 1440,80 L1440,120 L0,120 Z" />
          </svg>
        </div>

        <div className="container intro-dark-grid">
          <div className="intro-dark-copy">
            <h2>Short form videók és kisfilmek, amiktől erősebb lesz a márkád</h2>
            <p className="intro-lead">
              Olyan videós tartalmakat készítek, amik megállítják a görgetést, átadják a hangulatot,
              és segítenek, hogy a nézőből érdeklődő legyen. Fotózom is, ha ettől lesz komplett a projekt.
            </p>
            <div className="intro-actions">
              <a className="btn btn-ghost" href="#proof">Sztorik &amp; esettanulmányok</a>
            </div>
          </div>

          <div className="intro-dark-cards">
            <div className="bear" aria-hidden>
              <div className="bear-head" />
              <div className="bear-ear bear-ear-l" />
              <div className="bear-ear bear-ear-r" />
              <div className="bear-snout" />
              <div className="bear-eye bear-eye-l" />
              <div className="bear-eye bear-eye-r" />
              <div className="bear-paw" />
            </div>

            <article className="icard">
              <h3>Megállítja a görgetést</h3>
              <p>Short form vágás, ritmus, feliratok. Nem csak „szép", hanem érthető és célratörő.</p>
            </article>

            <article className="icard">
              <h3>Bizalmat épít gyorsan</h3>
              <p>Hangulat, kulissza, emberi jelenlét. Ettől lesz könnyebb rád írni.</p>
            </article>

            <article className="icard">
              <h3>Egységes megjelenés</h3>
              <p>Web, Insta, TikTok: egy irány, egy minőség. Kevesebb káosz, több profizmus.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="brand-marquee" aria-label="Kikkel dolgoztam már együtt">
        <div className="marquee" role="presentation">
          <div className="marquee-track">
            <span className="brand-pill has-logo" aria-label="Miskolc Leves"><img src="/l_alevesburger.jpg" alt="" /></span>
            <span className="brand-pill has-logo" aria-label="BFT"><img src="/l_bft.png" alt="" /></span>
            <span className="brand-pill has-logo" aria-label="Csengely"><img src="/l_csengelykertip.png" alt="" /></span>
            <span className="brand-pill has-logo" aria-label="Mikorhol"><img src="/l_mikorhol_fekete.jpg" alt="" /></span>
            <span className="brand-pill has-logo" aria-label="Kandologo"><img src="/l_kandologo.png" alt="" /></span>
          </div>
        </div>
      </section>

      <section className="proof" id="proof" aria-label="Minőségkülönbség: fotó utómunka és videóvágás">
        <div className="container">
          <div className="proof-head">
            <h2>Nézd meg, hogy dolgozok</h2>
          </div>

          <div className="proof-panels">
            <div className="ppanel is-active" data-ppanel="photo" role="tabpanel">
              <div className="proof-grid">
                <div className="ba">
                  <div className="ba-frame" data-ba>
                    <img className="ba-img" src="/aboutkep2.jpg" alt="Fotó előtte" />
                    <div className="ba-after" data-ba-after>
                      <img className="ba-img" src="/aboutkep2.jpg" alt="Fotó utána" />
                    </div>
                    <div className="ba-handle" data-ba-handle aria-hidden />
                    <input className="ba-range" data-ba-range type="range" min={0} max={100} defaultValue={55} aria-label="Előtte–Utána csúszka" />
                  </div>
                  <p className="ba-note">Húzd a csúszkát, és nézd meg milyen lett előtte és utánna.</p>
                </div>

                <div className="proof-note">
                  <h3>Miben lesz jobb a tartalmad?</h3>
                  <ul>
                    <li><strong>Fény és színek:</strong> tiszta, kontrasztos, prémium hatás, ami megállítja a görgetést</li>
                    <li><strong>Kompozíció:</strong> a néző szeme oda megy, ahova te szeretnéd, kevesebb zavaró rész</li>
                    <li><strong>Utómunka:</strong> egységes stílus és színvilág, amitől felismerhető lesz a márkád</li>
                    <li><strong>Részletek:</strong> finom retus, élesítés és helyes vágás, hogy „profinak" hasson</li>
                  </ul>
                  <br />
                  <a className="btn btn-ghost" href="#mini-portfolio">Nézd meg a referenciákat</a>
                  <br /><br />
                  <div className="scroll-scribble" aria-hidden>
                    <span className="scroll-scribble__text">Lapozz tovább</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" id="stats" aria-label="Eredmények">
        <div className="container">
          <div className="stats-head">
            <h2>Eredmények, amik mögött munka van</h2>
            <p>Nem ígérek varázslatot. Csak következetes minőséget.</p>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div className="num" data-count="50+">0</div>
              <div className="label">elégedett ügyfél</div>
            </div>
            <div className="stat">
              <div className="num" data-count="110+">0</div>
              <div className="label">legyártott videó</div>
            </div>
            <div className="stat">
              <div className="num" data-count="6">0</div>
              <div className="label">aktív együttműködés</div>
            </div>
          </div>
        </div>
      </section>

      <aside className="container services-quote services-quote--row" aria-label="Kapcsolat">
        <p className="services-quote__mono">
          Ha a tartalmad most &ldquo;oké&rdquo;, de nem hoz megkeresést, az nem a kamerán múlik.
          Rendet rakunk: ritmus, fény, felirat, egység. Olyan anyagot kapsz, amit jó érzés kirakni
          és amitől könnyebb lesz rád írni.
        </p>
        <div className="services-quote__right">
          <a className="btn btn-primary services-quote__cta" href="#faq">Felveszem a kapcsolatot</a>
        </div>
      </aside>

      <section className="mini-portfolio" id="mini-portfolio" aria-label="Kiemelt munkák">
        <div className="container">
          <div className="mp-head">
            <span className="kicker">Kiemelt munkák</span>
            <h2>2 perc alatt látni fogod a különbséget</h2>
            <p className="lead">Pár erős anyag, nulla mellébeszélés. Ha ez tetszik, működni fog nálad is.</p>
          </div>
          <div className="mp-grid">
            <a className="mp-card mp-card--video" href="#mini-portfolio" aria-label="Kisfilm / videó megtekintése">
              <video className="hero-video" muted loop autoPlay playsInline>
                <source src="/header_video.mp4" type="video/mp4" />
              </video>
              <div className="mp-overlay" aria-hidden>
                <div className="mp-play" aria-hidden />
                <div className="mp-caption">
                  <div className="mp-title">Kisfilm / videó</div>
                  <div className="mp-sub">Brand hangulat + történet</div>
                </div>
              </div>
            </a>
            <a className="mp-card" href="#mini-portfolio" aria-label="Fotó munka megtekintése">
              <img src="/indexkep2.jpg" alt="Kiemelt fotó munka" />
              <div className="mp-overlay" aria-hidden>
                <div className="mp-caption">
                  <div className="mp-title">Fotó</div>
                  <div className="mp-sub">Egységes utómunka + vibe</div>
                </div>
              </div>
            </a>
            <a className="mp-card" href="#mini-portfolio" aria-label="Short-form munka megtekintése">
              <video className="hero-video" muted loop autoPlay playsInline>
                <source src="/shortformvideo.mp4" type="video/mp4" />
              </video>
              <div className="mp-overlay" aria-hidden>
                <div className="mp-caption">
                  <div className="mp-title">Short-form</div>
                  <div className="mp-sub">Hook + tempó + felirat</div>
                </div>
              </div>
            </a>
          </div>
          <div className="mp-bottom">
            <div className="mp-cta">
              <a className="btn btn-primary" href="#mini-portfolio">Mutasd a teljes portfóliót</a>
              <a className="btn btn-ghost" href="#faq">Felveszem a kapcsolatot</a>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-mini" id="faq" aria-label="Gyakori kérdések">
        <div className="container">
          <div className="faq-mini__head">
            <span className="kicker">FAQ</span>
            <h2>Gyors kérdések. Rövid válaszok.</h2>
            <p className="lead">Ha mégis marad kérdés, írj és megyünk tovább.</p>
          </div>
          <div className="faq-mini__list">
            <details className="faq-mini__item">
              <summary>Mennyi idő alatt készül el?</summary>
              <div className="faq-mini__body">
                Általában 3–7 nap az anyag mennyiségétől függően. Sürgős esetben előre egyeztetjük a határidőt.
              </div>
            </details>
            <details className="faq-mini__item">
              <summary>Mi kell tőlem induláshoz?</summary>
              <div className="faq-mini__body">
                2 mondat a célról, 2–3 példa ami tetszik, és a nyersanyagok (vagy egyeztetünk forgatást).
              </div>
            </details>
            <details className="faq-mini__item">
              <summary>Hány kör módosítás van benne?</summary>
              <div className="faq-mini__body">
                Alapból 1–2 kör. Tiszta visszajelzéssel gyorsan jó irányba áll.
              </div>
            </details>
            <details className="faq-mini__item">
              <summary>Kapok feliratot és több verziót is?</summary>
              <div className="faq-mini__body">
                Igen. Short-formnál a felirat alap, és kérésre készül több verzió platformokra.
              </div>
            </details>
            <details className="faq-mini__item">
              <summary>Lehet havi együttműködés?</summary>
              <div className="faq-mini__body">
                Igen. Havi csomagban gyorsabb a workflow és egységesebb a stílus.
              </div>
            </details>
          </div>
          <div className="faq-mini__bottom">
            <div className="faq-mini__note">Kérdésed maradt? Írd le 2 mondatban.</div>
            <a className="btn btn-primary" href="#faq">Kérdezek</a>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="footer" aria-label="Lábléc">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="footer-logo" href="#" aria-label="Tátrai Levente kezdőlap">Tátrai Levente<span>.</span></a>
          </div>
          <nav className="footer-links" aria-label="Gyors linkek">
            <h3>Gyors linkek</h3>
            <ul>
              <li><a href="#proof">Miért Levente?</a></li>
              <li><a href="#stats">Eredmények</a></li>
              <li><a href="#proof">Esettanulmány</a></li>
              <li><a href="#mini-portfolio">Munkák</a></li>
              <li><a href="#next">Szolgáltatások</a></li>
            </ul>
          </nav>

          <div className="footer-contact">
            <h3>Kapcsolat</h3>
            <div className="footer-cta">
              <a className="btn btn-accent" href="#faq">Kapcsolatfelvétel</a>
              <a className="btn btn-ghost" href="#mini-portfolio">Munkák</a>
            </div>
            <div className="footer-social" aria-label="Közösségi oldalak">
              <a href="#" aria-label="Instagram" className="social-btn"><i className="fab fa-instagram" /></a>
              <a href="#" aria-label="TikTok" className="social-btn"><i className="fab fa-tiktok" /></a>
              <a href="#" aria-label="YouTube" className="social-btn"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {year} Tátrai Levente. Minden jog fenntartva.</p>
          <div className="footer-legal">
            <a href="#">Adatkezelési tájékoztató</a>
            <span className="sep">•</span>
            <a href="#">Impresszum</a>
          </div>
        </div>
      </footer>
    </>
  );
}
