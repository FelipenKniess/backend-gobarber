import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import uploadConfig from '@config/upload';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
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
  const userRepository = new UserRepository();
  const createUser = new CreateUserService(userRepository);

  const newUser: User = await createUser.execute({
    name,
    email,
    password,
  });

  delete newUser.password;

  response.json(newUser);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const userRepository = new UserRepository();
  const UpdateAvatar = new UpdateUserAvatarService(userRepository);

  const user: User = await UpdateAvatar.execute({
    user_id: request.user.id,
    avatarFileName: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
