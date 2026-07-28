import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  console.log("Middleware checking path:", pathname, "Token exists:", !!token);

  const protectedRoutes = [
    '/dashboard',
    '/onboarding',
    '/school',
    '/teacher',
    '/student',
    // '/'
  ];

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // ✅ 1. Force logout when visiting login
  if (pathname === '/login') {
    const response = NextResponse.next();

    response.cookies.set('access_token', '', {
      path: '/',
      expires: new Date(0),
    });

    return response;
  }

  // ✅ 2. Protect routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/school/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/login',
  ],
};