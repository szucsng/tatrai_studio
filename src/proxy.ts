import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isForgotPassword = request.nextUrl.pathname === '/admin/forgot-password'
  const isResetPassword = request.nextUrl.pathname.startsWith('/admin/reset-password')
  const isVerifyEmail = request.nextUrl.pathname.startsWith('/admin/verify-email')
  
  // Public admin pages that don't require authentication
  const isPublicAdminPage = isLoginPage || isForgotPassword || isResetPassword || isVerifyEmail
  
  // Check if user has session cookie
  const sessionCookie = request.cookies.get('better-auth.session_token')
  const isLoggedIn = !!sessionCookie

  if (isAdminRoute && !isPublicAdminPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}