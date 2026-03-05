import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email cím szükséges' },
        { status: 400 }
      )
    }

    // Keressük meg a felhasználót
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Felhasználó nem található' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Az email cím már megerősítve van' },
        { status: 400 }
      )
    }

    // Generáljunk új tokent
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Mentsük el a tokent
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
      } as any,
    })

    // Küldjük el az emailt
    const result = await sendVerificationEmail(email, verificationToken)

    if (!result.success) {
      console.error('Email küldési hiba:', result.error)
      return NextResponse.json(
        { error: 'Hiba történt az email küldése során' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Megerősítő email elküldve',
    })
  } catch (error) {
    console.error('Email újraküldési hiba:', error)
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}
