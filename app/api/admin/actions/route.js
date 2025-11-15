import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const DATA_FILE = path.join(process.cwd(), 'data', 'actions-db.json')

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify({ actions: [], partners: [] }))
  }
}

// Read data
async function readData() {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

// Write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// GET - Fetch actions
export async function GET(request) {
  const data = await readData()
  return NextResponse.json({ actions: data.actions || [] })
}

// POST - Create action
export async function POST(request) {
  const body = await request.json()
  const data = await readData()
  
  const newAction = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString()
  }
  
  data.actions = data.actions || []
  data.actions.push(newAction)
  await writeData(data)
  
  return NextResponse.json({ success: true, action: newAction })
}

// PUT - Update action
export async function PUT(request) {
  const body = await request.json()
  const data = await readData()
  
  const index = data.actions.findIndex(a => a.id === body.id)
  if (index !== -1) {
    data.actions[index] = { ...data.actions[index], ...body }
    await writeData(data)
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
}

// DELETE - Remove action
export async function DELETE(request) {
  const body = await request.json()
  const data = await readData()
  
  data.actions = data.actions.filter(a => a.id !== body.id)
  await writeData(data)
  
  return NextResponse.json({ success: true })
}
