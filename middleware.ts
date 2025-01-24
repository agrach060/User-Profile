import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.email) {
        // Redirect to login if no session token is found
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Use token to decide whether to redirect to /set-movie
    // if (!token.favoriteMovie) {
    //     return NextResponse.redirect(new URL("/set-movie", req.url));
    // }


    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
};
