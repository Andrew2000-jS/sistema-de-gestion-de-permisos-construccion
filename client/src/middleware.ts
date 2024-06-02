import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = (path) => /^\/(permissions|owners)(\/.*)?$/.test(path);
const authRoutes = (path) => /^\/(login)(\/.*)?$/.test(path);
const formatCookie = (cookie) => !cookie ? null : JSON.parse(cookie!.value.replace("j:", ""));
const validateCookieValue = (cookie, property) => (!cookie || !cookie.hasOwnProperty(property)) ? null : cookie

export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get("session-data");
  let url = req.nextUrl.pathname;

  // Allow internal Next.js requests
  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  const data = formatCookie(cookie);  

  // Redirect to login if accessing protected routes without proper session data
  if (protectedRoutes(url) && !data) return NextResponse.redirect(new URL('/login', req.url))

  // Redirect to permissions if already authenticated and trying to access auth routes
  if (authRoutes(url) && validateCookieValue(data, 'token')) return NextResponse.redirect(new URL('/permissions', req.url))

  // Redirect to login if trying to verify without a sessionCode
  if (url === '/login/verify' && !validateCookieValue(data, 'sessionCode')) return NextResponse.redirect(new URL('/login', req.url))
  
    // Redirect to login if trying to reset password without access
  if (url === '/login/reset-password' && !validateCookieValue(data, 'access')) return NextResponse.redirect(new URL('/login', req.url))
  
  return NextResponse.next();
}
