import { myFetch } from '@/utils/myFetch';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // const token = req.cookies.get('qwert_accessToken')?.value;

  const user = await myFetch(`/users/my-profile`, {
    method: 'GET',
  })
  // console.log("Middleware User :", user);

  const role = user?.data?.role;
  // console.log("Middleware User Role:", role);

  if (!user?.success || !user?.data) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname === '/' && role === "admin") {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (pathname === '/' && role === "creator") {
    return NextResponse.redirect(new URL('/creator/all-project', req.url));
  }


  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (pathname.startsWith('/creator') && role !== 'creator') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin:path*', '/creator:path*',],
};