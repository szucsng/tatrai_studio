'use client'

import Link from 'next/link'

type ActivePage = 'fooldal' | 'galeria' | 'kapcsolat'

export function SiteHeader({ active }: { active?: ActivePage }) {
  const activeClass = (page: ActivePage) => (page === active ? 'text-[#E0A458]' : undefined)

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
              <Link href="/" className={activeClass('fooldal')} aria-current={active === 'fooldal' ? 'page' : undefined}>
                Főoldal
              </Link>
            </li>
            <li>
              <Link href="/galeria" className={activeClass('galeria')} aria-current={active === 'galeria' ? 'page' : undefined}>
                Galéria
              </Link>
            </li>
            <li>
              <Link href="/#faq" className={activeClass('kapcsolat')} aria-current={active === 'kapcsolat' ? 'page' : undefined}>
                Kapcsolat
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function GalleryHeader() {
  return <SiteHeader active="galeria" />
}

export function SiteFooter() {
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
        <div className="footer-legal">
          <a href="#">Adatkezelési tájékoztató</a>
          <span className="sep">•</span>
          <a href="#">Impresszum</a>
        </div>
      </div>
    </footer>
  )
}

export function GalleryFooter() {
  return <SiteFooter />
}
