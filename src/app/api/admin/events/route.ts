import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import sharp from 'sharp'

export const runtime = 'nodejs'

export async function GET(request: Request) {
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

    const events = await prisma.event.findMany({
      include: {
        images: {
          orderBy: {
            id: 'asc'
          }
        },
        organizers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Hiba az események lekérése során:', error)
    return NextResponse.json(
      { error: 'Hiba történt az események lekérése során' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const files = formData.getAll('images') as File[]
    const organizerIdsString = formData.get('organizerIds') as string
    const organizerIds = organizerIdsString ? JSON.parse(organizerIdsString) : []

    if (!name || files.length === 0) {
      return NextResponse.json(
        { error: 'Név és képek megadása kötelező' },
        { status: 400 }
      )
    }

    // Esemény létrehozása
    const event = await prisma.event.create({
      data: {
        name,
        description: description || null,
        date: date ? new Date(date) : new Date(),
      }
    })

    // Szervezők hozzáadása
    if (organizerIds.length > 0) {
      await prisma.eventOrganizer.createMany({
        data: organizerIds.map((userId: string) => ({
          eventId: event.id,
          userId
        }))
      })
    }

    // Képek és videók mentése
    const uploadDir = join(process.cwd(), 'public', 'uploads', event.id)
    await mkdir(uploadDir, { recursive: true })

    const imagePromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Fájlnév generálása: timestamp + eredeti fájlnév (biztonságos karakterek)
      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const filename = `${timestamp}-${safeName}`
      const filepath = join(uploadDir, filename)
      
      // Eredeti fájl mentése
      await writeFile(filepath, buffer)
      console.log(`✅ Fájl mentve: ${filename}`)

      const isVideo = /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(file.name)
      const baseFilename = filename.replace(/\.[^.]+$/, '')

      let thumbPathValue = `/uploads/${event.id}/${filename}`
      let mediumPathValue = `/uploads/${event.id}/${filename}`

      if (!isVideo) {
        // Thumbnail generálás (300x300 WebP, 80% quality)
        const thumbFilename = `${baseFilename}_thumb.webp`
        const thumbFilePath = join(uploadDir, thumbFilename)
        try {
          await sharp(buffer)
            .resize(300, 300, { fit: 'cover', position: 'center', withoutEnlargement: false })
            .webp({ quality: 80 })
            .toFile(thumbFilePath)
          if (existsSync(thumbFilePath)) {
            thumbPathValue = `/uploads/${event.id}/${thumbFilename}`
            console.log(`✅ Thumbnail: ${thumbFilename}`)
          }
        } catch (err: any) {
          console.error('❌ Thumbnail hiba:', err.message)
        }

        // Medium kép generálás (800x800 WebP, 85% quality)
        const mediumFilename = `${baseFilename}_medium.webp`
        const mediumFilePath = join(uploadDir, mediumFilename)
        try {
          await sharp(buffer)
            .resize(800, 800, { fit: 'cover', position: 'center', withoutEnlargement: false })
            .webp({ quality: 85 })
            .toFile(mediumFilePath)
          if (existsSync(mediumFilePath)) {
            mediumPathValue = `/uploads/${event.id}/${mediumFilename}`
            console.log(`✅ Medium: ${mediumFilename}`)
          }
        } catch (err: any) {
          console.error('❌ Medium hiba:', err.message)
        }
      }

      return prisma.image.create({
        data: {
          filename: file.name,
          path: `/uploads/${event.id}/${filename}`,
          thumbPath: thumbPathValue,
          mediumPath: mediumPathValue,
          eventId: event.id
        }
      })
    })

    await Promise.all(imagePromises)

    // Várjunk egy kicsit, hogy biztosan minden fájl mentésre kerüljön
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(event)
  } catch (error) {
    console.error('Hiba az esemény létrehozása során:', error)
    return NextResponse.json(
      { error: 'Hiba történt az esemény létrehozása során' },
      { status: 500 }
    )
  }
}
