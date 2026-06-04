import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

export const checkPermission = (requiredOptionCode: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return next(new AppError('No estás autenticado.', 401));
      }

      const profileOption = await prisma.profileOption.findFirst({
        where: {
          profileId: user.profileId,
          option: {
            code: requiredOptionCode,
          },
        },
      });

      if (!profileOption) {
        return next(new AppError('No tienes permisos para realizar esta acción.', 403));
      }

      next();
    } catch (error) {
      next(new AppError('Error verificando permisos.', 500));
    }
  };
};
