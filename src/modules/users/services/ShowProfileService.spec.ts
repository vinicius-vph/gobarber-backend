import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
     });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jonh Doe');
    expect(profile.email).toBe('jonhdoe@example.com');
  });
  it('should not be able to show the user profile from non-existing user', async () => {

    expect(
      showProfileService.execute({
      user_id: 'non-existing-user-id',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

});