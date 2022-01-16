import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../Providers/HashProvider/models/iHashProvider';

interface IRequest {
    name: string,
    email: string,
    password:string
}

@injectable()
class CreateUserService {
  constructor(
      @inject('UserRepository')
      private userRepository: IUsersRepository,

      @inject('HashProvider')
      private hashProvider : IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkEmailExist = await this.userRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
