import { Router } from 'express';
import { OptionController } from '../controllers/option.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new OptionController();

router.use(authMiddleware);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
