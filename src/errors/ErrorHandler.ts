/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any> {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
}
