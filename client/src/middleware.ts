import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = (path) => {
  const regex = /^\/permissions(\/.*)?$/ && /^\/owners(\/.*)?$/;
  return regex.test(path);
};
const authRoutes = (path) => ["/login", "/login/email", "/register", "login/verify", "/login/reset-password", "/login/forgot-password"].includes(path)

const formatCookie = (cookie) => { 
  if (!cookie) return null    
  return JSON.parse(cookie!.value.replace("j:", ""));
};

const validateCookieValue = (cookie, property) => {
  if (!cookie) return null
  if (!cookie.hasOwnProperty(property)) return null

  return cookie
}

export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get("session-data");
  let url = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  const data = formatCookie(cookie);  

  if (protectedRoutes(url) && !data) return NextResponse.redirect(new URL('/login', req.url))
  if (authRoutes(url) && validateCookieValue(data, 'token')) return NextResponse.redirect(new URL('/permissions', req.url))
  if (url === '/login/verify' && !validateCookieValue(data, 'sessionCode')) return NextResponse.redirect(new URL('/login', req.url))
  if (url === '/login/reset-password' && !validateCookieValue(data, 'access')) return NextResponse.redirect(new URL('/login', req.url))
  
  return NextResponse.next();
}
