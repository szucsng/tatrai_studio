import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import { join, sep } from 'path'
import { existsSync } from 'fs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UPLOAD_ROOT = join(process.cwd(), 'public', 'uploads')

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  webm: 'video/webm',
  m4v: 'video/mp4',
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params
    const filePath = join(UPLOAD_ROOT, ...path)

    // Ne lehessen a public/uploads mappán kívülre mutató útvonalat kérni
    if (!filePath.startsWith(UPLOAD_ROOT + sep) || !existsSync(filePath)) {
      return new NextResponse('Fájl nem található', { status: 404 })
    }

    const fileStats = await stat(filePath)
    if (!fileStats.isFile()) {
      return new NextResponse('Fájl nem található', { status: 404 })
    }

    const fileSize = fileStats.size
    const extension = path[path.length - 1]?.split('.').pop()?.toLowerCase() || ''
    const contentType = MIME_TYPES[extension] || 'application/octet-stream'

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=31536000, immutable',
    }

    const range = request.headers.get('range')

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = Number.parseInt(parts[0], 10)
      const end = parts[1] ? Number.parseInt(parts[1], 10) : fileSize - 1

      if (
        Number.isNaN(start) ||
        Number.isNaN(end) ||
        start < 0 ||
        end >= fileSize ||
        start > end
      ) {
        return new NextResponse('Érvénytelen range', {
          status: 416,
          headers: { 'Content-Range': `bytes */${fileSize}` },
        })
      }

      const fileBuffer = await readFile(filePath)
      const chunk = fileBuffer.subarray(start, end + 1)

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          ...headers,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': chunk.length.toString(),
        },
      })
    }

    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        ...headers,
        'Content-Length': fileSize.toString(),
      },
    })
  } catch (error) {
    console.error('Hiba a feltöltött fájl kiszolgálása során:', error)
    return new NextResponse('Hiba történt', { status: 500 })
  }
}
