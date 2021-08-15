import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string,
    avatarFileName: string
}

class UpdateUserAvatarService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const UserFind = await this.userRepository.findById(user_id);

    if (!UserFind) {
      throw new AppError('Only authenticated users can change avatar');
    }

    if (UserFind.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, UserFind.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    UserFind.avatar = avatarFileName;

    await this.userRepository.save(UserFind);

    return UserFind;
  }
}

export default UpdateUserAvatarService;
