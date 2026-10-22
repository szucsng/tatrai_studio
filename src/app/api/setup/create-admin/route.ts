import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name, secret } = await request.json()

    // A titkos kulcs csak szerveroldalon, a .env-ből érkezik
    const expectedSecret = process.env.ADMIN_SETUP_SECRET
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Érvénytelen titkos kulcs' },
        { status: 401 }
      )
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email és jelszó megadása kötelező' },
        { status: 400 }
      )
    }

    // Better-auth signUp használata
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || email
      }
    })

    // A /setup oldal mindig admin felhasználót hoz létre
    const userId = (result as { user?: { id?: string } })?.user?.id
    if (!userId) {
      throw new Error('A felhasználó létrejött, de az azonosítója nem érhető el')
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: 'admin' }
    })

    return NextResponse.json({
      message: 'Admin felhasználó sikeresen létrehozva',
      user: result
    })
  } catch (error: any) {
    console.error('Hiba az admin felhasználó létrehozása során:', error)
    return NextResponse.json(
      { error: error?.message || 'Hiba történt az admin felhasználó létrehozása során' },
      { status: 500 }
    )
  }
}

