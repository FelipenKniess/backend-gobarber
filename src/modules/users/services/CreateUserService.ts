import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    name: string,
    email: string,
    password:string
}

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkEmailExist = await this.userRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
