import { Request, Response } from 'express';
import { ModuleService } from '../services/module.service';

export class ModuleController {
  private service = new ModuleService();

  create = async (req: Request, res: Response): Promise<void> => {
    try { res.status(201).json(await this.service.create(req.body)); } 
    catch (error: any) { res.status(400).json({ error: error.message }); }
  };
  getAll = async (req: Request, res: Response): Promise<void> => {
    try { res.status(200).json(await this.service.getAll()); } 
    catch (error: any) { res.status(500).json({ error: error.message }); }
  };
  getById = async (req: Request, res: Response): Promise<void> => {
    try { res.status(200).json(await this.service.getById(req.params.id)); } 
    catch (error: any) { res.status(404).json({ error: error.message }); }
  };
  update = async (req: Request, res: Response): Promise<void> => {
    try { res.status(200).json(await this.service.update(req.params.id, req.body)); } 
    catch (error: any) { res.status(400).json({ error: error.message }); }
  };
  delete = async (req: Request, res: Response): Promise<void> => {
    try { await this.service.delete(req.params.id); res.status(204).send(); } 
    catch (error: any) { res.status(400).json({ error: error.message }); }
  };
}
