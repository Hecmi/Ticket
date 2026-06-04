import { Router } from 'express';
import { profilesController } from '../controllers/profiles.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router();

// Ruta pública para el registro
router.get('/public', profilesController.getPublic.bind(profilesController));

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_PROFILES'), profilesController.getAll.bind(profilesController));
router.get('/:id', checkPermission('VIEW_PROFILES'), profilesController.getById.bind(profilesController));
router.post('/', checkPermission('CREATE_PROFILES'), profilesController.create.bind(profilesController));
router.put('/:id', checkPermission('EDIT_PROFILES'), profilesController.update.bind(profilesController));
router.delete('/:id', checkPermission('DELETE_PROFILES'), profilesController.delete.bind(profilesController));

export default router;
