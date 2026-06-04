import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_USERS'), usersController.getAll.bind(usersController));
router.get('/:id', checkPermission('VIEW_USERS'), usersController.getById.bind(usersController));
router.post('/', checkPermission('CREATE_USERS'), usersController.create.bind(usersController));
router.put('/:id', checkPermission('EDIT_USERS'), usersController.update.bind(usersController));
router.delete('/:id', checkPermission('DELETE_USERS'), usersController.delete.bind(usersController));

export default router;
