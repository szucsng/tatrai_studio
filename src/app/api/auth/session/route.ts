import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json({ 
      user: session.user,
      session: {
        expires: session.session.expiresAt
      }
    })
  } catch (error) {
    console.error('Session hiba:', error)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}
