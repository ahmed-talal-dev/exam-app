import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Your username is required'),
    password: z.string().min(1, 'Your password is required').nonempty('Your password is required'),
});

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Email is invalid').optional(),
    phone: z.string()
        .min(10, 'Phone is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(6, 'Confirm password is required'),

})

