import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@entities/User';
import { cookieProps } from '@shared/constants';
import { JwtService } from '@shared/JwtService';



const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;


// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Admin) {
            res.sessionUser = clientData;
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err: any) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};
