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
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                    headers: { ...JSON_HEADER },
                });

                const payload: APIResponse<LoginResponse> = await response.json();
                if ('code' in payload) {
                    throw new Error(payload.message)
                }
                return {
                    id: payload.user.id,
                    accessToken: payload.token,
                    user: {
                        id: payload.user.id,
                        username: payload.user.username,
                        firstName: payload.user.firstName,
                        lastName: payload.user.lastName,
                        email: payload.user.email,
                        phone: payload.user.phone,
                        role: payload.user.role,
                        emailVerified: payload.user.emailVerified,
                        phoneVerified: payload.user.phoneVerified,
                        profilePhoto: payload.user.profilePhoto,
                        createdAt: payload.user.createdAt,
                        updatedAt: payload.user.updatedAt,
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

