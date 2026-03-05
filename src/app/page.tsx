'use client'

import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "@/components/ThemeToggle"
import ColorBends from "@/components/ColorBends"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <ColorBends
          className=""
          style={{}}
          rotation={0}
          speed={0.20}
          colors={["#ff0000","#00ff00","#0000ff"]}
          transparent={false}
          autoRotate={0.00}
          scale={1.00}
          frequency={1.80}
          warpStrength={1.00}
          mouseInfluence={1.00}
          parallax={0.50}
          noise={0.10}
        />
      </div>
      
      {/* Navbar */}
      <nav className="bg-[#FFFBF0]/80 dark:bg-[#2D3436]/80 backdrop-blur-xl shadow-sm border-b border-[#FFE5B4]/50 dark:border-[#E67E22]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#E67E22] to-[#F39C12] dark:from-[#F39C12] dark:to-[#E67E22] bg-clip-text text-transparent">
                Tátrai Stúdió
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/galeria" 
                className="text-[#2D3436] dark:text-[#FFF8E7] hover:text-[#E67E22] dark:hover:text-[#F39C12] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#E67E22]/10 dark:hover:bg-[#E67E22]/20 border border-transparent hover:border-[#E67E22]/30"
              >
                Galéria
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 p-8 md:p-12 mb-8 relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F39C12]/30 to-[#E67E22]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FFE5B4]/40 to-[#F39C12]/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-[#2D3436] via-[#E67E22] to-[#F39C12] dark:from-[#FFF8E7] dark:via-[#F39C12] dark:to-[#E67E22] bg-clip-text text-transparent">
                Miskolci SZC Kandó Kálmán Informatika Technikum
              </span> 
            </h2>
            
            <div className="space-y-6 text-[#636E72] dark:text-[#BDC3C7] text-lg leading-relaxed">
              <p>
                Üdvözlünk a <span className="font-semibold text-[#2D3436] dark:text-[#FFF8E7]">Kandó Kálmán Informatika Technikum</span> fotógalériájában! 🏞️✨
                Ezen az oldalon megtalálod iskolánk különböző rendezvényein, 
                programjain és eseményein készült képeket és videókat.
              </p>
              
              <p>
                Minden fotó és videó egy különleges pillanatot őriz iskolánk életéből: 
                legyen szó tanulmányi versenyekről, sportrendezvényekről, 
                közösségi programokról vagy éppen ünnepségekről. Célunk, hogy 
                megörökítsük ezeket az emlékezetes pillanatokat és megosszuk a 
                diákokkal, szülőkkel és tanárokkal.
              </p>
              
              <p>
                A <Link href="/galeria" className="font-semibold text-[#E67E22] dark:text-[#F39C12] hover:text-[#F39C12] dark:hover:text-[#FFA726] transition-colors underline decoration-2 decoration-[#E67E22]/40 hover:decoration-[#F39C12]/60">
                  Galéria
                </Link> oldalon böngészhetsz a különböző eseményeket és 
                megtekintheted a nagy felbontású képeket és videókat eredeti minőségben. Kattints bármelyik 
                képre a nagyításhoz és a részletek megtekintéséhez.
              </p>
              
              <div className="mt-8 pt-4">
                <Link 
                  href="/galeria"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] hover:from-[#F39C12] hover:to-[#FFA726] dark:from-[#E67E22] dark:to-[#F39C12] dark:hover:from-[#F39C12] dark:hover:to-[#FFA726] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-[#E67E22]/30 hover:scale-105 border-l-4 border-[#F39C12]"
                >
                  Képek és videók megtekintése
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
            <div className="text-3xl mb-3">🏔️</div>
            <h3 className="text-lg font-bold text-[#2D3436] dark:text-[#FFF8E7] mb-2">Nagy felbontás</h3>
            <p className="text-[#636E72] dark:text-[#BDC3C7] text-sm">Minden kép és videó teljes minőségben, részletgazdagon megtekinthető és letölthető.</p>
          </div>
          <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="text-lg font-bold text-[#2D3436] dark:text-[#FFF8E7] mb-2">Videó támogatás</h3>
            <p className="text-[#636E72] dark:text-[#BDC3C7] text-sm">Nem csak képek, hanem videók is eredeti minőségben lejátszhatók és letölthetők.</p>
          </div>
          <div className="bg-[#FFFBF0]/70 dark:bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#FFE5B4]/50 dark:border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
            <div className="text-3xl mb-3">🗂️</div>
            <h3 className="text-lg font-bold text-[#2D3436] dark:text-[#FFF8E7] mb-2">Letöltés</h3>
            <p className="text-[#636E72] dark:text-[#BDC3C7] text-sm">Töltsd le a képeket és videókat eredeti minőségben egyetlen kattintással.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
