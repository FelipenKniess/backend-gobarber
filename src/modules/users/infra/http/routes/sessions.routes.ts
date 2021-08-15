import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

interface UserAuthenticate {
    user: {
        name: string,
        email: string,
        password?: string,
    },
    token: string
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token }:UserAuthenticate = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  response.json({ user, token });
});

export default sessionsRouter;
