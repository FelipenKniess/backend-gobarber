// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
// import User from '../infra/typeorm/entities/user';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
    email: string,
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
      @inject('UserRepository')
      private userRepository: IUsersRepository,
      @inject('MailProvider')
      private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha bem sucedido!');
  }
}

export default SendForgotPasswordEmailService;
