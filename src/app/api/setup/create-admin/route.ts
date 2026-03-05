import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password, name, secret } = await request.json()

    // Egyszerű titkos kulcs ellenőrzés
    if (secret !== 'create-admin-secret-2024') {
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

