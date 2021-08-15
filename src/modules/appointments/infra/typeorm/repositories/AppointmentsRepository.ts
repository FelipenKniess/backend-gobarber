import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormConfig: Repository<Appointment>

    constructor() {
      this.ormConfig = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = await this.ormConfig.findOne({
        where: { date },
      });

      return findAppointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO):Promise<Appointment> {
      const appointment = this.ormConfig.create({ provider_id, date });

      await this.ormConfig.save(appointment);

      return appointment;
    }

    public async find():Promise<Appointment[]> {
      const appointments = await this.ormConfig.find();

      return appointments;
    }
}

export default AppointmentsRepository;
