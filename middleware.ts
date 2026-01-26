import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  
  const { pathname } = request.nextUrl;

  console.log("Middleware checking path:", pathname, "Token exists:", !!token);
  // FIX 1: Ensure all paths have leading slashes
  // Also included '/' to protect the root page
  const protectedRoutes = ['/dashboard', '/onboarding', '/school', '/teacher', '/student', '/'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // 3. If no token and trying to access protected routes, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. If logged in and trying to access login page, redirect to dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 5. FIX 2: Added '/' and '/stations' explicitly to the matcher
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*', 
    '/onboarding/:path*', 
    '/onboarding', 
    '/school/:path*',
    '/teacher/:path*',
    '/teacher', // Matches the exact /stations route
    '/student/:path*',
    '/login'
  ],
};