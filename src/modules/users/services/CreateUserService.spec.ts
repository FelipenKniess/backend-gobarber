import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '../Providers/HashProvider/implementations/BCryptHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const newUser = await createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123',
    });

    expect(newUser).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123',
    });

    expect(createUserService.execute({
      email: 'felipe.nkniess@gmail.com',
      name: 'Felipe',
      password: '123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
