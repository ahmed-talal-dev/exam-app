/**
 * the response returned from the login endpoint
 */

import { loginSchema } from "../schemes/auth.schema";

export interface LoginResponse {
    token: string;
    user: {
        _id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        isVerified: boolean,
        createdAt: string,
        passwordResetCode: string;
        passwordResetExpire: string;
        resetCodeVerified: boolean;
        passwordChangedAt: string;
    }
}

export type LoginFields = z.infer<typeof loginSchema>;