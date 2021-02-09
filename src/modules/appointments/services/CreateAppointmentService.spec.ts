import AppError from '@shared/errors/AppError';
import FakeAppointmentsrepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsrepository();
    const createappointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createappointment.execute({
      date: new Date(),
      provider_id: '12123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsrepository();
    const createappointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createappointment.execute({
      date: appointmentDate,
      provider_id: '12123',
    });

    expect(createappointment.execute({
      date: appointmentDate,
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);

  });

});