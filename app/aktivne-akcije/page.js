import ActionCard from '@/components/ActionCard'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Aktivne akcije - Pomozi.me',
  description: 'Pogledajte sve trenutno aktivne humanitarne akcije',
}

async function getActiveActions() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'actions-db.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(data)
    return json.actions.filter(a => !a.completed) || []
  } catch (error) {
    console.error('Error loading actions:', error)
    return []
  }
}

export default async function ActiveActionsPage() {
  const activeActions = await getActiveActions()

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aktivne akcije</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pronađite akciju koja vam je bliska i pomozite onima kojima je to najpotrebnije.
          </p>
        </div>
        
        {activeActions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">Trenutno nema aktivnih akcija.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeActions.map((action) => (
              <ActionCard key={action.id} action={action} isCompleted={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
