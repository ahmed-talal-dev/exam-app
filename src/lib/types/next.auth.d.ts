import { User } from "next-auth"


/**
* The shape of the user object returned in the OAuth providers' `profile` callback,
* or the second parameter of the `session` callback, when using a database.
*/
declare module "next-auth" {
    interface User {
        accessToken: string;
        user: {
            _id: string,
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
    /**
        /**
         * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
         */
    interface Session {
        token: string;
        user: {
            _id: string,
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
}



declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string,
        user: {
            _id: string,
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
}