import { Router } from 'express';
import path from 'path';
import { isAuthenticated } from '../middleware';
import { asyncWrapper } from '../helpers';
import notificationServices from '../services/notification.services';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('src/public/index.html'));
});

router.get(
  '/all',
  isAuthenticated,
  asyncWrapper(async (req, res) => {
    const Notifications = await notificationServices.getNotifications(
      req.user.id
    );
    return res.status(200).json({
      code: 200,
      message: `Nofications For ${req.user.username}`,
      Notifications,
    });
  })
);

export default router;
