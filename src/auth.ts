import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/constant.api";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials): Promise<any> => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                    headers: { ...JSON_HEADER },
                });

                const payload: LoginResponse = await response.json();

                if (!response.ok) {
                    throw new Error('Login failed')
                }

                return {
                    id: payload.payload.user.id,
                    accessToken: payload.payload.token,
                    user: {
                        id: payload.payload.user.id,
                        username: payload.payload.user.username,
                        firstName: payload.payload.user.firstName,
                        lastName: payload.payload.user.lastName,
                        email: payload.payload.user.email,
                        phone: payload.payload.user.phone,
                        role: payload.payload.user.role,
                        emailVerified: payload.payload.user.emailVerified,
                        phoneVerified: payload.payload.user.phoneVerified,
                        profilePhoto: payload.payload.user.profilePhoto,
                        createdAt: payload.payload.user.createdAt,
                        updatedAt: payload.payload.user.updatedAt,
                    }
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.accessToken = user.accessToken
                token.user = user.user
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user;
            session.token = token.accessToken;
            return session;
        }
    },
}