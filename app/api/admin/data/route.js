import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const DATA_FILE = path.join(process.cwd(), 'data', 'actions-db.json')

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { actions: [], partners: [] }
  }
}

export async function GET(request) {
  const data = await readData()
  return NextResponse.json({
    actions: data.actions || [],
    partners: data.partners || []
  })
}
