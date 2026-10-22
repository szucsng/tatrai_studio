'use client'

import Link from 'next/link'

export function GalleryHeader() {
  return (
    <header>
      <div className="container header-container">
        <Link href="/" className="logo">
          Tátrai Levente
        </Link>
        <nav aria-label="Fő navigáció">
          <button className="mobile-menu-btn" type="button" aria-label="Menü megnyitása">
            <i className="fas fa-bars" />
          </button>
          <ul>
            <li>
              <Link href="/">Főoldal</Link>
            </li>
            <li>
              <Link href="/galeria" className="text-[#E0A458]" aria-current="page">
                Galéria
              </Link>
            </li>
            <li>
              <Link href="/#faq">Kapcsolat</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function GalleryFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" aria-label="Lábléc">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="footer-logo" href="/" aria-label="Tátrai Levente kezdőlap">
            Tátrai Levente<span>.</span>
          </Link>
        </div>

        <nav className="footer-links" aria-label="Gyors linkek">
          <h3>Gyors linkek</h3>
          <ul>
            <li>
              <Link href="/">Főoldal</Link>
            </li>
            <li>
              <Link href="/galeria">Galéria</Link>
            </li>
            <li>
              <Link href="/#next">Rólam</Link>
            </li>
            <li>
              <Link href="/#faq">Kapcsolat</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h3>Kapcsolat</h3>
          <div className="footer-cta">
            <Link className="btn btn-accent" href="/#faq">
              Kapcsolatfelvétel
            </Link>
            <Link className="btn btn-ghost" href="/galeria">
              Munkák
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} Tátrai Levente. Minden jog fenntartva.</p>
      </div>
    </footer>
  )
}
