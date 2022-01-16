import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '../Providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be allow loggin in a user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository, fakeHashProvider,
    );

    const user = await createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123',
    });

    const response = await authenticateUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be allow loggin with username or password incorrect', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository, fakeHashProvider,
    );

    await createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123',
    });

    expect(authenticateUserService.execute({
      email: 'felipe.nkniesss@gmail.com',
      password: '321',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository, fakeHashProvider,
    );

    expect(authenticateUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      password: '1234',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be loggin with username or passowrd incorrect', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository, fakeHashProvider,
    );

    await createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123456',
    });

    expect(authenticateUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);
  });
});
