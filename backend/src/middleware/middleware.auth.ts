import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    email: string;
    isAdmin: boolean;
}

export interface AuthRequest extends Request {
    auth?: {
        id: string;
        email: string;
        isAdmin: boolean;
    };
};

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing or invalid" });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.auth = {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin
        };
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Token missing or invalid" });
    };
};

export default authMiddleware;
