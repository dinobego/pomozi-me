import ActionCard from '@/components/ActionCard'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Uspješne akcije - Pomozi.me',
  description: 'Pogledajte sve uspješno realizovane humanitarne akcije',
}

async function getCompletedActions() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'actions-db.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(data)
    return json.actions.filter(a => a.completed) || []
  } catch (error) {
    console.error('Error loading completed actions:', error)
    return []
  }
}

export default async function CompletedActionsPage() {
  const completedActions = await getCompletedActions()

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Uspješne akcije</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Zahvaljujući vašoj podršci, uspjeli smo ostvariti mnoge ciljeve i pomoći onima kojima je to najpotrebnije.
          </p>
        </div>
        
        {completedActions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">Trenutno nema uspješnih akcija.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedActions.map((action) => (
              <ActionCard key={action.id} action={action} isCompleted={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
