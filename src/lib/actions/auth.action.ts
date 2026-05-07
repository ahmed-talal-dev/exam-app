'use server'

import { JSON_HEADER } from "../constants/constant.api";
import { LoginResponse, RegisterFields } from "../types/auth";

export async function registerAction(fields: RegisterFields) {
    const response = await fetch(`${process.env.API}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(fields),
        headers: {
            ...JSON_HEADER,
        },
    })

    const payload: APIResponse<LoginResponse> = await response.json();
    return payload
}