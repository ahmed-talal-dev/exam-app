import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

// Password regex: min 6 chars, at least 1 uppercase, 1 lowercase, 1 special character
const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Email is invalid'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian mobile number'),
    password: passwordSchema,
    rePassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});

// Step schemas
export const stepEmailSchema = z.object({
    email: z.string().email('Email is invalid'),
})

export const stepUserInfoSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    phone: z.string()
        .min(1, 'Phone is required')
        .regex(/^\+?[0-9]+$/, 'Phone must contain numbers only'),
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
    resetToken: z.string().min(1),
});

export const forgotPasswordNewPasswordSchema = z.object({
    password: passwordSchema,
    rePassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});