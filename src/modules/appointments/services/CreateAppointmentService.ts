import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string,
    date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async Execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
