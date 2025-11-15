import Link from "next/link"
import ActionCard from "@/components/ActionCard"
import CompletedActionCard from "@/components/CompletedActionCard"
import PartnerSlider from "@/components/PartnerSlider"
import { FaHeart, FaHandsHelping, FaUsers, FaChartLine } from "react-icons/fa"
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: "Pomozi.me - Humanitarna Organizacija | Crna Gora",
  description: "Neprofitna humanitarna organizacija posvećena pomaganju ljudi u potrebi širom Crne Gore. Svaka donacija donosi nadu i svjetlost u nečiji život.",
  keywords: "humanitarna organizacija, Crna Gora, donacije, pomoć, NVO Pomozi",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Pomozi.me - Humanitarna Organizacija",
    description: "Pomaganje ljudi u potrebi širom Crne Gore",
    url: "https://pomozi.me",
    siteName: "Pomozi.me",
    images: [{ url: "/og-image.jpg" }],
  },
}

// Fetch actions and partners from JSON database
async function getData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'actions-db.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(data)
    
    return {
      activeActions: json.actions.filter(a => !a.completed) || [],
      completedActions: json.actions.filter(a => a.completed) || [],
      partners: json.partners || []
    }
  } catch (error) {
    console.error('Error loading data:', error)
    return {
      activeActions: [],
      completedActions: [],
      partners: []
    }
  }
}

export default async function Home() {
  const { activeActions, completedActions, partners } = await getData()

  return (
    <>
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white py-20 min-h-[600px] flex items-center overflow-hidden"
        style={{ backgroundImage: "url('/homebckg.jpg')" }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #1f1f1fb5, #171717d1)"
          }}
        ></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FaHeart className="particle absolute top-20 left-10 text-red-400 text-3xl opacity-30" />
          <FaHeart className="particle absolute top-40 right-20 text-red-500 text-2xl opacity-20" style={{animationDelay: '2s'}} />
          <FaHeart className="particle absolute bottom-32 left-1/4 text-orange-400 text-4xl opacity-25" style={{animationDelay: '4s'}} />
          <FaHandsHelping className="particle absolute top-1/3 right-1/4 text-yellow-400 text-3xl opacity-20" style={{animationDelay: '6s'}} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Zajedno možemo promijeniti svijet.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
              Vaša donacija može spasiti život. Pridružite se našoj misiji pomoći onima kojima je najpotrebnije.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/doniraj" 
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <FaHeart className="animate-heartbeat" />
                Doniraj sada
              </Link>
              <Link 
                href="/aktivne-akcije" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all hover-scale"
              >
                Pogledaj akcije
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-pattern">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-gradient text-center hover-lift animate-fade-in-up">
              <div className="animate-float">
                <FaHeart className="text-6xl text-primary mx-auto mb-4" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-2">10,000+</div>
              <div className="text-gray-600 font-semibold">Pomognute osobe</div>
            </div>
            <div className="card-gradient text-center hover-lift animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="animate-float" style={{animationDelay: '1s'}}>
                <FaChartLine className="text-6xl text-secondary mx-auto mb-4" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-2">100+</div>
              <div className="text-gray-600 font-semibold">Realizovane akcija</div>
            </div>
            <div className="card-gradient text-center hover-lift animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="animate-float" style={{animationDelay: '2s'}}>
                <FaUsers className="text-6xl text-dark mx-auto mb-4" />
              </div>
              <div className="text-5xl font-bold gradient-text mb-2">2021</div>
              <div className="text-gray-600 font-semibold">Godina osnivanja</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trenutne akcije</h2>
            <p className="text-gray-600 text-lg">Pomozite onima kojima je to najpotrebnije.</p>
          </div>
          
          {activeActions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">Trenutno nema aktivnih akcija.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeActions.slice(0, 3).map((action) => (
                  <ActionCard key={action.id} action={action} isCompleted={false} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link 
                  href="/aktivne-akcije" 
                  className="btn-primary inline-block"
                >
                  Pogledaj sve aktivne akcije
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">Završene akcije</h2>
            <p className="text-gray-600 text-lg">Pogledajte šta smo postigli zajedno zahvaljujući Vašoj podršci.</p>
          </div>
          
          {completedActions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">Trenutno nema završenih akcija.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedActions.slice(0, 3).map((action) => (
                  <CompletedActionCard key={action.id} action={action} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link 
                  href="/uspjesne-akcije" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white inline-block px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Pogledaj sve uspješne akcije
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {partners.length > 0 && <PartnerSlider partners={partners} />}

      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-red-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-dots"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="inline-block p-6 bg-white rounded-full shadow-xl">
                <FaHeart className="text-6xl text-red-500 animate-heartbeat" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Spremni da napravite razliku?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Svaka donacija, bez obzira koliko mala, može imati veliki uticaj na život ljudi kojima je potrebna pomoć.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/doniraj" 
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                <FaHeart className="group-hover:animate-heartbeat" />
                Doniraj sada
              </Link>
              <Link 
                href="/kontakt" 
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:border-red-500 hover:text-red-500 transform hover:scale-105 transition-all"
              >
                Kontaktiraj nas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
