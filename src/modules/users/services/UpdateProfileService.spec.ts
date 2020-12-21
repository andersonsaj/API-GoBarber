import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    const updated = await updateProfile.execute({
      user_id: user.id,
      name: 'Anderson',
      email: 'anderson@examle',
    });

    expect(updated.name).toBe('Anderson');
    expect(updated.email).toBe('anderson@examle');
  });
  it('should not be able to update the profile email to another already existing', async () => {
    await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    const user = await fakeUsersRepository.create({
      name: 'Anderson',
      email: 'anderson@example.com',
      password: '25616645',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Anderson Barreto',
        email: 'ander@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    const updated = await updateProfile.execute({
      user_id: user.id,
      name: 'Anderson',
      email: 'anderson@examle',
      old_password: '2561641',
      password: '123123',
    });

    expect(updated.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Anderson',
        email: 'anderson@examle',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Anderson',
        email: 'anderson@examle',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
