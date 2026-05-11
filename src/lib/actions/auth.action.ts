'use server'

import { JSON_HEADER } from "../constants/constant.api";
import { LoginResponse, RegisterFields } from "../types/auth";

export async function registerAction(fields: RegisterFields) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            username: fields.username,
            email: fields.email,
            password: fields.password,
            confirmPassword: fields.rePassword,
            firstName: fields.firstName,
            lastName: fields.lastName,
            phone: fields.phone,
        }),
        headers: {
            ...JSON_HEADER,
        },
    })

    const payload = await response.json();

    if (!response.ok) {
        throw new Error(payload.message || 'Registration failed')
    }

    return payload
}