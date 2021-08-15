import Appointment from '../infra/typeorm/entities/appointment';
import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO';

interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>,
    findByDate(date: Date): Promise<Appointment | undefined>,
}

export default IAppointmentsRepository;
