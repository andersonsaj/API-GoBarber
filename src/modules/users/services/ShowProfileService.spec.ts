import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    const updated = await showProfile.execute({
      user_id: user.id,
    });

    expect(updated.name).toBe('Ander');
    expect(updated.email).toBe('ander@example.com');
  });
});
it('should not be able show the profile from non-existing user', async () => {
  await expect(
    showProfile.execute({
      user_id: 'non-existing-user-id',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
