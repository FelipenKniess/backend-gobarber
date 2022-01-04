import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const UpdateAvatar = container.resolve(UpdateUserAvatarService);

    const user: ICreateUserDTO = await UpdateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
