import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
     });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh Jonh',
      email: 'jonh@jonh.com',
    });

    expect(updatedUser.name).toBe('Jonh Jonh');
    expect(updatedUser.email).toBe('jonh@jonh.com');
  });

  it('should not be able to change email for a already registered', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jonh Wick',
      email: 'jonhwick@example.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
     });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh Jonh',
      email: 'jonh@jonh.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the user password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh Jonh',
      email: 'jonh@jonh.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the user password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh Jonh',
      email: 'jonh@jonh.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});