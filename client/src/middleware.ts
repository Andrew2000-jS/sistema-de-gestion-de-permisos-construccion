import { NextRequest, NextResponse } from "next/server";

type DataEmailType = {
  sesionCode: string;
  token: string;
};

const protectedRoutes = (path) => {
  const routes = ["/home"];
  return routes.includes(path);
};

const validRoutes = (path) => {
  const routes = ["/login", "/login/email", "/login/verify","/register"]
  return routes.includes(path)
}

const loginStrategy = (cookie) => {
  if (!cookie) {
    return null
  }

  const { token } = JSON.parse(cookie!.value.replace("j:", ""));

  return token;
};

export default function middleware(req: NextRequest) {
  let cookie = req.cookies.get("sesion-data");
  let url = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const token = loginStrategy(cookie);

  if (protectedRoutes(url) && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (validRoutes(url) && token) {
    return NextResponse.redirect(new URL('/home', req.url))
  }


  return NextResponse.next();
}
