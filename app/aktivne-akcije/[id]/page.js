import Link from 'next/link'
import ImageSlider from '@/components/ImageSlider'
import ProgressBar from '@/components/ProgressBar'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'

// Fetch action by ID
async function getAction(id) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'actions-db.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(data)
    return json.actions.find(a => a.id === id && !a.completed)
  } catch (error) {
    console.error('Error loading action:', error)
    return null
  }
}

export default async function ActionDetailPage({ params }) {
  const resolvedParams = await params
  const action = await getAction(resolvedParams.id)
  
  if (!action) notFound()

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link href="/aktivne-akcije" className="inline-flex items-center text-primary hover:underline mb-8">
          ← Nazad na akcije
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div><ImageSlider images={action.gallery} /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{action.title}</h1>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{action.fullDescription}</p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Status prikupljanja</h3>
                <ProgressBar collected={action.collected} goal={action.goal} isCompleted={false} />
                <p className="mt-4 text-gray-600">
                  Preostalo još: <span className="font-semibold text-primary">{action.goal - action.collected}€</span>
                </p>
              </div>
              <Link 
                href="/doniraj" 
                className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/80 transition-all shadow-lg block text-center"
              >
                Pomozi sada
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
