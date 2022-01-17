import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to add a new user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository, fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'felipe.nkniess@gmail.com',
      password: '213',
      name: 'Felipe',
    });

    await updateUserAvatarService.execute({
      avatarFileName: 'teste.png',
      user_id: user.id,
    });

    expect(user.avatar).toBe('teste.png');
  });
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository, fakeStorageProvider,
    );

    await fakeUserRepository.create({
      email: 'felipe.nkniess@gmail.com',
      password: '213',
      name: 'Felipe',
    });

    expect(updateUserAvatarService.execute({
      avatarFileName: 'teste.png',
      user_id: '123123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository, fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'felipe.nkniess@gmail.com',
      password: '213',
      name: 'Felipe',
    });

    await updateUserAvatarService.execute({
      avatarFileName: 'avatar_antigo.png',
      user_id: user.id,
    });

    await updateUserAvatarService.execute({
      avatarFileName: 'avatar_novo.png',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar_antigo.png');
    expect(user.avatar).toBe('avatar_novo.png');
  });
});
