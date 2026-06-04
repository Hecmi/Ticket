import { Router } from 'express';
import { modulesController } from '../controllers/modules.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_MODULES'), modulesController.getAll.bind(modulesController));
router.get('/:id', checkPermission('VIEW_MODULES'), modulesController.getById.bind(modulesController));
router.post('/', checkPermission('CREATE_MODULES'), modulesController.create.bind(modulesController));
router.put('/:id', checkPermission('EDIT_MODULES'), modulesController.update.bind(modulesController));
router.delete('/:id', checkPermission('DELETE_MODULES'), modulesController.delete.bind(modulesController));

export default router;
