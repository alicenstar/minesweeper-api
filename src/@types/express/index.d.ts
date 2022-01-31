import { IUser } from '@entities/User';
import { IClientData } from '@shared/JwtService';


declare module 'express' {
    export interface Request  {
        body: {
            user: IUser;
            name: string;
            email: string;
            password: string;
        };
    }
}


declare global {
    namespace Express {
        export interface Response {
            sessionUser: IClientData;
        }
    }
}
