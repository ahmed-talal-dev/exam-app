import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
});

// Password regex: min 6 chars, at least 1 uppercase, 1 lowercase, 1 special character
const passwordSchema = z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Email is invalid'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 digits')
        .regex(/^[0-9]+$/, 'Phone must contain numbers only'),
    password: passwordSchema,
    rePassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});

// Step schemas
export const stepEmailSchema = z.object({
    email: z.string().email('Email is invalid'),
});

export const stepUserInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 digits')
        .regex(/^[0-9]+$/, 'Phone must contain numbers only'),
});

export const stepPasswordSchema = z.object({
    password: passwordSchema,
    rePassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});

// Forgot password schemas
export const forgotPasswordEmailSchema = z.object({
    email: z.string().email('Email is invalid'),
});

export const forgotPasswordOtpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const forgotPasswordNewPasswordSchema = z.object({
    password: passwordSchema,
    rePassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});