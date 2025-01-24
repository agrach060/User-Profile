import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session }: { session: any; user: any }) {
            const user = await prisma.user.findUnique({
                where: { email: session.user?.email! },
            });

            if (user) {
                session.user.id = user.id;
                session.user.favoriteMovie = user.favoriteMovie;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ user }: { user: any }) {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email!,
                            name: user.name,
                            image: user.image,
                            favoriteMovie: null,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            }
        },
    },
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
