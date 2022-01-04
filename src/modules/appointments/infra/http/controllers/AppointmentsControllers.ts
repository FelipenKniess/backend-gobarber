import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

export default class AppointmentsControllers {
  public async Create(request:Request, response:Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const newAppointment = await createAppointment.Execute({ date: parsedDate, provider_id });

    return response.json(newAppointment);
  }

  public async Index(request:Request, response:Response): Promise<Response> {
    const appointmentRepository = new AppointmentsRepository();
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
  }
}
