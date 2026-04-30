/**
 * the response returned from the login endpoint
 */

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