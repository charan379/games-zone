import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request) {
        // console.log("token: ", request.nextauth.token);
        if (request.nextUrl.pathname.startsWith("/admin") && !(request.nextauth.token?.roles?.includes("ROLE_ADMIN")))
            return NextResponse.redirect(
                new URL(`/login?message=You Are Not Authorized!&callbackUrl=${encodeURIComponent(request.nextUrl.href)}`, request?.url)
            );
    },

    {
        callbacks: {
            authorized: ({ token, req }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|login|_next/static|_next/image|favicon.ico).*)',
    ],
}