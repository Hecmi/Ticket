import { Router } from 'express';
import authRoutes from './auth.routes';
import profilesRoutes from './profiles.routes';
import modulesRoutes from './modules.routes';
import optionsRoutes from './options.routes';
import usersRoutes from './users.routes';
import ticketsRoutes from './tickets.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profiles', profilesRoutes);
router.use('/modules', modulesRoutes);
router.use('/options', optionsRoutes);
router.use('/users', usersRoutes);
router.use('/tickets', ticketsRoutes);

export default router;
