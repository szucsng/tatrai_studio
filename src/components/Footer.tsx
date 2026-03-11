import Link from 'next/link'
import Image from 'next/image'
import { EmailIcon, PhoneIcon, LocationIcon, ClockIcon, ComputerIcon } from './Icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/95 border-t border-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg mb-4">Stúdió:</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              A Tátrai Stúdió egy dinamikus és kreatív csapat, amely több mint 5 éve örökíti meg a legfontosabb pillanatokat. Alapítója és vezető fotósa, Tátrai Levente,
              valamint a CAMCrew videós csapata elkötelezettek amellett, hogy minden rendezvényt egyedi látásmóddal örökítsenek meg, legyen szó esküvőkről,
              céges eseményekről vagy családi ünnepekről.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Tátrai Stúdió tagjai:</h3>
            <ul className="space-y-2">
              <li>
                  <p>Tátrai Levente</p>
              </li>
              <li>
                  <p>Tamba Megyer</p>
              </li>
              <li>
                  <p>Tamás Bence</p>
              </li>
              <li>
                  <p>Mitrik Zalán</p>
              </li>
              <li>
                <p>Szűcs Noel Gergő</p>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Kapcsolat</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <EmailIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@tatraistudio.hu" className="hover:text-white transition-colors">
                  info@tatraistudio.hu
                </a>
              </li>
              <li className="flex items-start gap-2">
                <PhoneIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+36301234567" className="hover:text-white transition-colors">
                  +36 30 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <LocationIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Tátra környéke, Magyarország</span>
              </li>
              <li className="flex items-start gap-2">
                <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>H-P: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Közösségi média</h3>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} className="text-white" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Image src="/instagram.svg" alt="Instagram" width={24} height={24} className="text-white" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Image src="/youtube.svg" alt="YouTube" width={24} height={24} className="text-white" />
              </a>
            </div>
            <div className="space-y-2">
              <Link href="/adatvedelmi-nyilatkozat" className="text-sm hover:text-white transition-colors block">
                Adatvédelmi nyilatkozat
              </Link>
              <Link href="/altalanos-szerzodesi-feltetelek" className="text-sm hover:text-white transition-colors block">
                ÁSZF
              </Link>
              <Link href="/cookie-szabalyzat" className="text-sm hover:text-white transition-colors block">
                Cookie szabályzat
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Tátrai Stúdió. Minden jog fenntartva.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <ComputerIcon className="w-3 h-3" />
                <span>Készítette: Tátrai Stúdió</span>
              </div>
              <span>|</span>
              <span>Verzió: 2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
