import { uuid } from 'uuidv4';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(
        (appointment) => isEqual(appointment.date, date),
      );

      return findAppointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO):Promise<Appointment> {
      const appointment = new Appointment();
      Object.assign(appointment, { id: uuid(), date, provider_id });

      this.appointments.push(appointment);
      return appointment;
    }
}

export default AppointmentsRepository;
