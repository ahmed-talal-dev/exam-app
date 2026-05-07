import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/constant.api";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: {
                        ...JSON_HEADER,
                    },
                });

                const payload: APIResponse<LoginResponse> = await response.json();
                if ('code' in payload) {
                    throw new Error(payload.message)
                }
                return {
                    id: payload.user._id,
                    accessToken: payload.token,
                    user: {
                        _id: payload.user._id,
                        username: payload.user.username,
                        firstName: payload.user.firstName,
                        lastName: payload.user.lastName,
                        email: payload.user.email,
                        phone: payload.user.phone,
                        role: payload.user.role,
                        isVerified: payload.user.isVerified,
                        createdAt: payload.user.createdAt,
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
            return session;
        }
    },
}

