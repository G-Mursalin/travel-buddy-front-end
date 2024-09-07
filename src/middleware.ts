import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { TJwtPayload } from './types';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];
const roleBasedPrivateRoutes = {
  user: [
    /^\/dashboard$/,
    'post-trip',
    'edit-trip',
    'posts',
    'trips',
    'trip-requested-history',
    /^\/dashboard\/trip-request\/[a-zA-Z0-9]+$/,
    'change-password',
    'my-profile',
  ],
  admin: [
    /^\/dashboard\/admin/,
    '/dashboard/change-password',
    '/dashboard/my-profile',
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  let decodedData = null;
  decodedData = jwtDecode(accessToken) as TJwtPayload;
  const role = decodedData?.role;

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:page*'],
};
