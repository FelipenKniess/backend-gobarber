import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

interface User {
    name: string,
    email: string,
    password?: string
}

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = container.resolve(CreateUserService);

  const newUser: User = await createUser.execute({
    name,
    email,
    password,
  });

  delete newUser.password;

  response.json(newUser);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const UpdateAvatar = container.resolve(UpdateUserAvatarService);

  const user: User = await UpdateAvatar.execute({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
