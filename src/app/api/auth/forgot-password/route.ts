import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
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

    // Biztonsági okokból mindig ugyanazt a választ adjuk
    // még akkor is, ha a felhasználó nem létezik
    if (!user) {
      return NextResponse.json({
        message: 'Ha az email cím regisztrálva van, küldtünk egy jelszó visszaállítási linket.',
      })
    }

    // Generáljunk egy egyedi tokent
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 óra múlva jár le

    // Mentsük el a tokent az adatbázisba
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      } as any,
    })

    // Küldjük el az emailt
    const result = await sendPasswordResetEmail(email, resetToken)

    if (!result.success) {
      console.error('Email küldési hiba:', result.error)
      return NextResponse.json(
        { error: 'Hiba történt az email küldése során' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Ha az email cím regisztrálva van, küldtünk egy jelszó visszaállítási linket.',
    })
  } catch (error) {
    console.error('Jelszó visszaállítási hiba:', error)
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}
