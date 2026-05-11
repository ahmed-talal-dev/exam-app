import { z } from "zod";
import {
    loginSchema,
    registerSchema,
    forgotPasswordEmailSchema,
    forgotPasswordOtpSchema,
    forgotPasswordNewPasswordSchema,
} from "../schemes/auth.schema";

export interface LoginResponse {
    token: string;
    user: {
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        role: string,
        emailVerified: boolean,
        phoneVerified: boolean,
        profilePhoto: string,
        createdAt: string,
        updatedAt: string,
    }
}


export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;
export type ForgotPasswordFields =
    z.infer<typeof forgotPasswordEmailSchema> &
    z.infer<typeof forgotPasswordOtpSchema> &
    z.infer<typeof forgotPasswordNewPasswordSchema>