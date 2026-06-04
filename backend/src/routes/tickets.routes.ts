import { Router } from 'express';
import { ticketsController } from '../controllers/tickets.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';
import commentsRoutes from './comments.routes';
import assignmentsRoutes from './assignments.routes';

const router = Router();

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_TICKETS'), ticketsController.getAll.bind(ticketsController));
router.get('/:id', checkPermission('VIEW_TICKETS'), ticketsController.getById.bind(ticketsController));
router.post('/', checkPermission('CREATE_TICKETS'), ticketsController.create.bind(ticketsController));
router.put('/:id/status', checkPermission('EDIT_TICKETS'), ticketsController.updateStatus.bind(ticketsController));
router.put('/:id/priority', checkPermission('EDIT_TICKETS'), ticketsController.updatePriority.bind(ticketsController));
router.use('/:ticketId/comments', commentsRoutes);
router.use('/:ticketId/assign', assignmentsRoutes);

export default router;
