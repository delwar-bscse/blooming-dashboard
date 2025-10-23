import { myFetch } from '@/utils/myFetch';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const user = await myFetch(`/users/my-profile`, {
    method: 'GET',
  });

  const role = user?.data?.role;

  if (!user?.success || !user?.data) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect root
  if (pathname === '/' && (role === "admin" || role === "sub_admin")) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (pathname === '/' && role === "creator") {
    return NextResponse.redirect(new URL('/creator/all-project', req.url));
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') && role !== "admin" && role !== "sub_admin") {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect creator routes
  if (pathname.startsWith('/creator') && role !== "creator") {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin:path*', '/creator:path*'],
};
