import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Ander',
      email: 'ander@example.com',
      password: '2561641',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Anderson',
      email: 'anderson@example.com',
      password: '2561641',
    });
    const loggeUser = await fakeUsersRepository.create({
      name: 'Anderson Barreto',
      email: 'andersonB@example.com',
      password: '2561641',
    });

    const providers = await listProviders.execute({
      user_id: loggeUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
