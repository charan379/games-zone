import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth"


export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                userName: { label: "Username", type: "text", placeholder: "userName" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/generate-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials)
                })

                if (!res.ok) {
                    throw new Error(JSON.stringify(await res.json()))
                }
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
        // ...add more providers here
    ],

    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.userId = user?.userId
                token.userName = user?.userName,
                    token.roles = user?.roles,
                    token.status = user?.status,
                    token.accessToken = user?.accessToken,
                    token.loginDate = new Date();
            }
            return token;
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.auth = {
                token: token.accessToken
            };

            session.user = {
                userId: token?.userId,
                userName: token?.userName,
                email: token?.email,
                roles: token?.roles,
                status: token?.status,
                loginDate: token?.loginDate
            }

            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    pages: {
        signIn: "/login",
    },
};