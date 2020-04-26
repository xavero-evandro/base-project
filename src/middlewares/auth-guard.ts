import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  permission: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function authGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('JWT Token missing');

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jtw.secret);

    const { permission, sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
      permission,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
