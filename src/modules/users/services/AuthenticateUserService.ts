import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AuthConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    email: string,
    password:string
}

interface IResponse {
    user: User,
    token: string
}

class AuthenticateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('username or password is incorrect');
    }

    const validatePassword = await compare(password, user.password);

    if (!validatePassword) {
      throw new AppError('username or password is incorrect');
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
