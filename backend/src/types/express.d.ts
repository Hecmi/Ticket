// Este archivo extiende las interfaces globales de Express para soportar req.user
export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        profileId: string;
      };
    }
  }
}
