import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersControllers from '../controllers/UsersController';
import UpdateAvatarUserController from '../controllers/UpdateAvatarUserController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersControllers();
const updateAvatarUserController = new UpdateAvatarUserController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), updateAvatarUserController.update);

export default usersRouter;
