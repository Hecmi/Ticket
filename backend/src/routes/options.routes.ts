import { Router } from 'express';
import { optionsController } from '../controllers/options.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_OPTIONS'), optionsController.getAll.bind(optionsController));
router.get('/:id', checkPermission('VIEW_OPTIONS'), optionsController.getById.bind(optionsController));
router.post('/', checkPermission('CREATE_OPTIONS'), optionsController.create.bind(optionsController));
router.put('/:id', checkPermission('EDIT_OPTIONS'), optionsController.update.bind(optionsController));
router.delete('/:id', checkPermission('DELETE_OPTIONS'), optionsController.delete.bind(optionsController));

export default router;
