import { Router } from 'express';
import { ModuleController } from '../controllers/module.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new ModuleController();

router.use(authMiddleware);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
