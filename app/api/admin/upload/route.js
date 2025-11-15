import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file' }, { status: 400 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const uploadDir = path.join(process.cwd(), 'public', 'images')
    
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true })
    
    // Save file
    const filepath = path.join(uploadDir, filename)
    await fs.writeFile(filepath, buffer)
    
    // Return public URL
    const url = `/images/${filename}`
    
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
