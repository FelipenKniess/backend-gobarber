import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string,
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
      @inject('UserRepository')
      private userRepository: IUsersRepository,
      @inject('StorageProvider')
      private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const UserFind = await this.userRepository.findById(user_id);

    if (!UserFind) {
      throw new AppError('Only authenticated users can change avatar');
    }

    if (UserFind.avatar) {
      await this.storageProvider.deleteFile(UserFind.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    UserFind.avatar = fileName;

    await this.userRepository.save(UserFind);

    return UserFind;
  }
}

export default UpdateUserAvatarService;
