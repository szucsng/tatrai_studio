import { NextResponse } from 'next/server'
import { writeFile, mkdir, unlink, rm } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { existsSync } from 'fs'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params
    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const files = formData.getAll('images') as File[]
    const organizerIdsString = formData.get('organizerIds') as string
    const organizerIds = organizerIdsString ? JSON.parse(organizerIdsString) : []

    if (!name) {
      return NextResponse.json(
        { error: 'Név megadása kötelező' },
        { status: 400 }
      )
    }

    // Esemény frissítése
    const event = await prisma.event.update({
      where: { id },
      data: {
        name,
        description: description || null,
        date: date ? new Date(date) : new Date(),
      }
    })

    // Szervezők frissítése
    // Először töröljük a meglévő szervezőket
    await prisma.eventOrganizer.deleteMany({
      where: { eventId: id }
    })
    
    // Majd hozzáadjuk az új szervezőket
    if (organizerIds.length > 0) {
      await prisma.eventOrganizer.createMany({
        data: organizerIds.map((userId: string) => ({
          eventId: id,
          userId
        }))
      })
    }

    // Ha vannak új képek/videók, feltöltjük őket
    if (files.length > 0) {
      const uploadDir = join(process.cwd(), 'public', 'uploads', event.id)
      await mkdir(uploadDir, { recursive: true })

      const imagePromises = files.map(async (file, index) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Fájlnév generálása időbélyeggel és egyedi indexszel
        const timestamp = Date.now()
        const uniqueId = `${timestamp}-${index}`
        const originalExt = file.name.substring(file.name.lastIndexOf('.'))
        const filename = `${uniqueId}${originalExt}`
        const filepath = join(uploadDir, filename)
        await writeFile(filepath, buffer)

        return prisma.image.create({
          data: {
            filename: file.name,
            path: `/uploads/${event.id}/${filename}`,
            eventId: event.id
          }
        })
      })

      await Promise.all(imagePromises)
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Hiba az esemény frissítése során:', error)
    return NextResponse.json(
      { error: 'Hiba történt az esemény frissítése során' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
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

    const { id } = await context.params

    // Képek törlése az adatbázisból
    await prisma.image.deleteMany({
      where: { eventId: id }
    })

    // Esemény törlése
    await prisma.event.delete({
      where: { id }
    })

    // Képek törlése a fájlrendszerből
    const uploadDir = join(process.cwd(), 'public', 'uploads', id)
    if (existsSync(uploadDir)) {
      await rm(uploadDir, { recursive: true, force: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hiba az esemény törlése során:', error)
    return NextResponse.json(
      { error: 'Hiba történt az esemény törlése során' },
      { status: 500 }
    )
  }
}
