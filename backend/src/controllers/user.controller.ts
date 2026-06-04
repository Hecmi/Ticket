import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, profileId, isActive } = req.body;
      if (!email || !password || !profileId) {
        res.status(400).json({ error: 'Missing required fields: email, password, profileId' });
        return;
      }

      const user = await this.userService.createUser({
        email,
        passwordHash: password, // The service will hash this
        profileId,
        isActive: isActive !== undefined ? isActive : true,
      });

      const { passwordHash: _, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      // Remover passwordHash de todas las respuestas
      const safeUsers = users.map(user => {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
      });
      res.status(200).json(safeUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      
      const { passwordHash: _, ...safeUser } = user;
      res.status(200).json(safeUser);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email, password, profileId, isActive } = req.body;

      const user = await this.userService.updateUser(id, {
        email,
        password,
        profileId,
        isActive,
      });

      const { passwordHash: _, ...safeUser } = user;
      res.status(200).json(safeUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).send(); // No Content
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
