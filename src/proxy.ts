import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ['/account', '/diplomas', '/exams'];
const authRoutes = ['/login', '/register', '/forgot-password'];

export default async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const { pathname } = request.nextUrl;

    const isPrivateRoute =
        privateRoutes.some(route => pathname.startsWith(route)) || pathname === '/';

    if (isPrivateRoute) {
        if (token) return NextResponse.next();
        const redirectUrl = new URL('/login', request.nextUrl.origin);
        redirectUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(redirectUrl);
    }

    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.nextUrl.origin));
        }
        return NextResponse.next();
    }

    if (pathname === '/reset-password') {
        if (request.nextUrl.searchParams.has('token') && !token) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/forgot-password', request.nextUrl.origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};