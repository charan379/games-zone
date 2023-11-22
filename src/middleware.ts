import { withAuth } from "next-auth/middleware";


export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function (request) {
        // console.log("token: ", request.nextauth.token);

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