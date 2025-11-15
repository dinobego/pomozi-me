import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const DATA_FILE = path.join(process.cwd(), 'data', 'actions-db.json')

async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// GET - Fetch partners
export async function GET(request) {
  const data = await readData()
  return NextResponse.json({ partners: data.partners || [] })
}

// POST - Create partner
export async function POST(request) {
  const body = await request.json()
  const data = await readData()
  
  const newPartner = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString()
  }
  
  data.partners = data.partners || []
  data.partners.push(newPartner)
  await writeData(data)
  
  return NextResponse.json({ success: true, partner: newPartner })
}

// DELETE - Remove partner
export async function DELETE(request) {
  const body = await request.json()
  const data = await readData()
  
  data.partners = data.partners.filter(p => p.id !== body.id)
  await writeData(data)
  
  return NextResponse.json({ success: true })
}
