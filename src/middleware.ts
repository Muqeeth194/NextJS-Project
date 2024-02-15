import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    
    // get the path using the request
    const path = request.nextUrl.pathname

    // check if the path is a public path (login or signup) or a protected path (profile or /)
    const isPublicPath = path === '/login' || path === '/signup'

    // Get the token from the cookies
    const token = request.cookies.get("token")?.value || ""

    // route the user based on the public path and the token
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail'
  ],
}