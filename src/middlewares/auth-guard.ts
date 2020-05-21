import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

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
  if (!authHeader) throw new AppError('JWT Token missing', 401);

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
    throw new AppError('Invalid JWT Token', 401);
  }
}
