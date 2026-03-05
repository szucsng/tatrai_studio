import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token és jelszó szükséges' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'A jelszónak legalább 8 karakter hosszúnak kell lennie' },
        { status: 400 }
      )
    }

    // Keressük meg a tokent
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token még nem járt le
        },
      } as any,
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Érvénytelen vagy lejárt token' },
        { status: 400 }
      )
    }

    // Hash-eljük az új jelszót
    const hashedPassword = await bcrypt.hash(password, 10)

    // Frissítsük a jelszót és töröljük a reset tokent
    await prisma.account.updateMany({
      where: {
        userId: user.id,
        providerId: 'credential',
      },
      data: {
        password: hashedPassword,
      },
    })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: null,
        resetTokenExpiry: null,
      } as any,
    })

    return NextResponse.json({
      message: 'Jelszó sikeresen megváltoztatva',
    })
  } catch (error) {
    console.error('Jelszó visszaállítási hiba:', error)
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    )
  }
}
