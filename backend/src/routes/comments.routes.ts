import { Router } from 'express';
import { commentsController } from '../controllers/comments.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router({ mergeParams: true }); // Para acceder a :ticketId

router.use(authMiddleware);

// Las rutas asumen prefijo /tickets/:ticketId/comments
router.get('/', checkPermission('VIEW_TICKETS'), commentsController.getByTicketId.bind(commentsController));
router.post('/', checkPermission('VIEW_TICKETS'), commentsController.create.bind(commentsController));

export default router;
