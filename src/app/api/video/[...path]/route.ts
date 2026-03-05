import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params
    const filePath = join(process.cwd(), 'public', 'uploads', ...path)

    // Ellenőrizzük, hogy a fájl létezik-e
    if (!existsSync(filePath)) {
      return new NextResponse('Fájl nem található', { status: 404 })
    }

    // Fájl statisztikák lekérése
    const fileStats = await stat(filePath)
    const fileSize = fileStats.size

    // Range header feldolgozása (fontos videókhoz)
    const range = request.headers.get('range')
    
    // MIME típus meghatározása
    const extension = path[path.length - 1].split('.').pop()?.toLowerCase()
    const mimeTypes: { [key: string]: string } = {
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'avi': 'video/x-msvideo',
      'mkv': 'video/x-matroska',
      'webm': 'video/webm',
      'm4v': 'video/mp4'
    }
    const contentType = mimeTypes[extension || ''] || 'application/octet-stream'

    if (range) {
      // Partial content - fontos a videó seekeléshez
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunkSize = (end - start) + 1

      const fileBuffer = await readFile(filePath)
      const chunk = fileBuffer.subarray(start, end + 1)

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } else {
      // Teljes fájl
      const fileBuffer = await readFile(filePath)

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
  } catch (error) {
    console.error('Hiba a videó kiszolgálása során:', error)
    return new NextResponse('Hiba történt', { status: 500 })
  }
}
