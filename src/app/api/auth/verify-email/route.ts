import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token szükséges' },
        { status: 400 }
      )
    }

    // Keressük meg a tokent
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      } as any,
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Érvénytelen token' },
        { status: 400 }
      )
    }

    // Ellenőrizzük, hogy már nem lett-e megerősítve
    if (user.emailVerified) {
      return NextResponse.json({
        message: 'Az email cím már megerősítve van',
        alreadyVerified: true,
      })
    }

    // Megerősítjük az email címet
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      } as any,
    })

    // Küldjünk üdvözlő emailt
    await sendWelcomeEmail(user.email, user.name)

    return NextResponse.json({
      message: 'Email cím sikeresen megerősítve',
      success: true,
    })
  } catch (error) {
    console.error('Email megerősítési hiba:', error)
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}
