import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Anderson',
      email: 'anderson@gmail.com',
      password: '5859494',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Anderson',
      email: 'anderson@gmail.com',
      password: '5859494',
    });

    expect(
      createUser.execute({
        name: 'Anderson',
        email: 'anderson@gmail.com',
        password: '5859494',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
