import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const newAppointment = await createAppointment.Execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(newAppointment).toHaveProperty('id');
    expect(newAppointment.provider_id).toBe('123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date();
    await createAppointment.Execute({
      date: appointmentDate,
      provider_id: '123',
    });

    expect(createAppointment.Execute({
      date: appointmentDate,
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
