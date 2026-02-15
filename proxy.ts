import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = [
    "/auth/signin",
]

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isAuthPage = authPages.some(page => pathname.startsWith(page));

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (isAuthPage && session) {                         // email sign in verification
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],
}