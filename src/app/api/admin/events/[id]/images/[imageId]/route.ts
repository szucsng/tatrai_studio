import { NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { existsSync } from 'fs'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session) {
      return NextResponse.json(
        { error: 'Nincs bejelentkezve' },
        { status: 401 }
      )
    }

    // Check if user is admin or organizer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || (user.role !== 'admin' && user.role !== 'organizer')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id: eventId, imageId } = await context.params

    // Kép adatainak lekérése
    const image = await prisma.image.findUnique({
      where: { id: imageId }
    })

    if (!image || image.eventId !== eventId) {
      return NextResponse.json(
        { error: 'Kép nem található' },
        { status: 404 }
      )
    }

    // Kép törlése az adatbázisból
    await prisma.image.delete({
      where: { id: imageId }
    })

    // Kép törlése a fájlrendszerből
    const filepath = join(process.cwd(), 'public', image.path)
    if (existsSync(filepath)) {
      await unlink(filepath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hiba a kép törlése során:', error)
    return NextResponse.json(
      { error: 'Hiba történt a kép törlése során' },
      { status: 500 }
    )
  }
}
