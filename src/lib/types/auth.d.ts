import { z } from "zod";
import {
    loginSchema,
    registerSchema,

} from "../schemes/auth.schema";

export interface LoginResponse {
    status: boolean;
    code: number;
    payload: {
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
            profilePhoto: string | null,
            createdAt: string,
            updatedAt: string,
        }
    }
}
export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;

export type ForgotPasswordFields = {
    email: string
    resetToken: string
}