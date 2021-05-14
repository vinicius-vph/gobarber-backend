import AppError from '@shared/errors/AppError';
import FakeAppointmentsrepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsrepository;
let createappointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsrepository();
    createappointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createappointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '12345',
      provider_id: '12123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);
    await createappointment.execute({
      date: appointmentDate,
      user_id: '12345',
      provider_id: '12123',
    });

    await expect(createappointment.execute({
      date: appointmentDate,
      user_id: '12345',
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createappointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '12345',
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createappointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '12123',
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(createappointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '12345',
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);

    await expect(createappointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '12345',
      provider_id: '12123',
    })).rejects.toBeInstanceOf(AppError);
  });

});