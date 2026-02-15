import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = ["/auth/signin"]
const protectedPages = ["/dashboard"]

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isAuthPage = authPages.some(page => pathname.startsWith(page));
    const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (isAuthPage && session) {                         // email sign in verification
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (session?.email !== "azer.kazimov@yahoo.com") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (session?.email && isAuthPage){
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!session?.email && isProtectedPage){
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    if (session?.email !== "azer.kazimov@yahoo.com" && isProtectedPage){
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],
}