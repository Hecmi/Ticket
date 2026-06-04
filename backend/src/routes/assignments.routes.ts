import { Router } from 'express';
import { assignmentsController } from '../controllers/assignments.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkPermission } from '../middlewares/rbacMiddleware';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', checkPermission('VIEW_TICKETS'), assignmentsController.getAssignments.bind(assignmentsController));
router.post('/', checkPermission('EDIT_TICKETS'), assignmentsController.assignTicket.bind(assignmentsController));

export default router;
