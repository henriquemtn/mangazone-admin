import {  NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const signInUrl = new URL('/signin', request.url)

  if (!token) {
    return NextResponse.redirect(signInUrl)
  }
}

export const config = {
    matcher: ['/mangas/:path*', '/dashboard/:path*', '/artistas/:path*', '/voiceActors/:path*', '/settings'],
};