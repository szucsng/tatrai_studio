'use client'

import Link from "next/link"
import Image from "next/image"
import ColorBends from "@/components/ColorBends"
import { 
  CameraIcon, 
  AwardIcon, 
  UsersIcon, 
  UploadIcon, 
  GalleryIcon 
} from "@/components/Icons"

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
      <nav className="bg-[#2D3436]/80 backdrop-blur-xl shadow-sm border-b border-[#E67E22]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={50} 
                height={50} 
                priority
                className="object-contain"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F39C12] to-[#E67E22] bg-clip-text text-transparent">
                Tátrai Stúdió
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/galeria" 
                className="text-[#FFF8E7] hover:text-[#F39C12] px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[#E67E22]/20 border border-transparent hover:border-[#E67E22]/30"
              >
                Galéria
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E67E22]/30 p-8 md:p-12 mb-12 relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F39C12]/30 to-[#E67E22]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FFE5B4]/40 to-[#F39C12]/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-[#F39C12] via-[#FFA726] to-[#E67E22] bg-clip-text text-transparent">
                Tátrai Stúdió
              </span> 
            </h2>
            
            <p className="text-2xl text-[#BDC3C7] font-medium mb-8 max-w-3xl mx-auto">
              Professzionális fotó és videó megoldások minden alkalomra
            </p>
          </div>
        </div>

        {/* Rólunk Section */}
        <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-xl border border-[#E67E22]/30 p-8 md:p-12 mb-12">
          <h3 className="text-4xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-[#FFF8E7] to-[#F39C12] bg-clip-text text-transparent">
              Rólunk
            </span>
          </h3>
          
          <div className="space-y-6 text-[#BDC3C7] text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              A <span className="font-semibold text-[#F39C12]">Tátrai Stúdió</span> egy 
              lelkes fotós-videós csapat, amely szenvedéllyel és szakértelemmel 
              örökíti meg az élet legfontosabb pillanatait. Célunk, hogy minden 
              művi emléket teremtsünk.
            </p>
            
            <p>
              Több éves tapasztalattal a hátunk mögött specializálódtunk iskolai 
              és közösségi események, rendezvények, ünnepségek és sportesemények 
              professzionális fotózására és videózására. Legyen szó tanévnyitóról, 
              ballagásról, versenyek vagy közösségi programok megörökítéséről - 
              mi mindig ott vagyunk, hogy a legjobb pillanatokat elkapjuk.
            </p>
            
            <p>
              Modern eszközeinkkel és kreatív szemléletünkkel minden projektet 
              egyedivé és emlékezetessé teszünk. A <span className="font-semibold text-[#FFF8E7]">minőség</span>, 
              az <span className="font-semibold text-[#FFF8E7]">ügyfélközpontúság</span> és 
              a <span className="font-semibold text-[#FFF8E7]">precizitás</span> a
              munkánk alapköve.
            </p>
          </div>
        </div>

        {/* Team Preview Section */}
        <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-2xl shadow-xl border border-[#E67E22]/30 p-8 md:p-12 mb-12">
          <h3 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#FFF8E7] to-[#F39C12] bg-clip-text text-transparent">
              Csapatunk
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Team member placeholder cards */}
            <div className="bg-gradient-to-br from-[#E67E22]/20 to-[#F39C12]/10 rounded-xl p-6 border-2 border-[#E67E22]/30 hover:border-[#E67E22]/60 transition-all hover:scale-105">
              <div className="aspect-square rounded-xl mb-4 overflow-hidden relative">
                <Image
                  src="/team/fotosok.jpg"
                  alt="Főfotósok"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h4 className="text-2xl font-bold text-[#FFF8E7] mb-2 text-center">
                Tátrai Levente
              </h4>
              <p className="text-[#BDC3C7] text-center">
                Tátrai Levente, a stúdió alapítója és vezető fotósa, aki több mint 5 éve örökíti meg a legfontosabb pillanatokat.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#E67E22]/20 to-[#F39C12]/10 rounded-xl p-6 border-2 border-[#E67E22]/30 hover:border-[#E67E22]/60 transition-all hover:scale-105">
              <div className="aspect-square rounded-xl mb-4 overflow-hidden relative">
                <Image
                  src="/team/videosok.jpg"
                  alt="Videósok"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h4 className="text-2xl font-bold text-[#FFF8E7] mb-2 text-center">
                CAMCrew
              </h4>
              <p className="text-[#BDC3C7] text-center">
                A CAMCrew egy dinamikus videós csapat, amely a legmodernebb technológiával dolgozik, hogy minden eseményt élethűen örökítsen meg.
              </p>
            </div>
          </div>
        </div>
        
        {/* Services/Features Cards */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#FFF8E7] to-[#F39C12] bg-clip-text text-transparent">
              Szolgáltatásaink
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <CameraIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Iskolai Események</h4>
              <p className="text-[#BDC3C7]">
                Ballagások, tanévnyitók, ünnepségek professzionális fotózása és videózása
              </p>
            </div>
            
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <AwardIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Sportesemények</h4>
              <p className="text-[#BDC3C7]">
                Versenyek és sportrendezvények dinamikus és színvonalas lefedése
              </p>
            </div>
            
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <UsersIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Közösségi Programok</h4>
              <p className="text-[#BDC3C7]">
                Táborok, kirándulások és közösségi események megörökítése
              </p>
            </div>
            
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <GalleryIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Professzionális Minőség</h4>
              <p className="text-[#BDC3C7]">
                Nagy felbontású képek és 4K videók eredeti minőségben
              </p>
            </div>
            
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <UploadIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Gyors Átadás</h4>
              <p className="text-[#BDC3C7]">
                Online galéria rendszer azonnali megtekintéshez és letöltéshez
              </p>
            </div>
            
            <div className="bg-[#2D3436]/70 backdrop-blur-xl rounded-xl p-6 shadow-md border border-[#E67E22]/30 hover:shadow-lg hover:shadow-[#E67E22]/20 transition-all hover:scale-105 hover:border-[#E67E22]/60">
              <div className="mb-4">
                <CameraIcon className="w-10 h-10 text-[#F39C12]" />
              </div>
              <h4 className="text-xl font-bold text-[#FFF8E7] mb-3">Biztonságos Tárolás</h4>
              <p className="text-[#BDC3C7]">
                Minden fájl biztonságosan tárolva, megosztható linkekkel
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#F39C12] to-[#E67E22] rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">
            Készen állsz a következő projektedre?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Lépj kapcsolatba velünk és örökítsük meg együtt a legfontosabb pillanatokat!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/galeria"
              className="inline-flex items-center gap-2 bg-white text-[#E67E22] hover:bg-[#FFF8E7] font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Galéria megtekintése
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
