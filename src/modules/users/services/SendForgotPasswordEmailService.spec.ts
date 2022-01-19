// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      email: 'teste@gmail.com',
      name: 'Felipe',
      password: '123',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'teste@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
