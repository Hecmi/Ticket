import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No estás autenticado.', 401));
    }

    const decoded = verifyToken(token);
    req.user = decoded; // Augmented in types/express

    next();
  } catch (err) {
    next(new AppError('Token inválido o expirado.', 401));
  }
};
