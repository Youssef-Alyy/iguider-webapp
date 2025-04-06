import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
import { UserUtils } from './utils/userUtils'


export function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl.clone()
  const cookie = request.cookies.get('access_token')

  if (url.pathname === '/login' && cookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (url.pathname === '/dashboard') {
    if (!cookie) return NextResponse.redirect(new URL('/', request.url))
    const isAdmin = UserUtils.isAdmin(cookie.value)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (url.pathname === '/profile' || url.pathname === '/reports') {
    if (!cookie) return NextResponse.redirect(new URL('/',request.url))
  }

  return NextResponse.next()
}