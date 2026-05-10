/**
 * the response returned from the login endpoint
 */

import { z } from "zod";
import { loginSchema, registerSchema } from "../schemes/auth.schema";

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

export type RegisterFields = z.infer<ReturnType<typeof registerSchema>>;

export type ForgotPasswordFields =
    z.infer<typeof forgotPasswordEmailSchema> &
    z.infer<typeof forgotPasswordOtpSchema> &
    z.infer<typeof forgotPasswordNewPasswordSchema>