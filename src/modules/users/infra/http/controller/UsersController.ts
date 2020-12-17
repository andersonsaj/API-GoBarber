import CreateUserService from '@modules/users/services/CreateUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const userResponse = await createUser.execute({
      name,
      email,
      password,
    });

    //  delete user.password;
    const user = {
      id: userResponse.id,
      name: userResponse.name,
      email: userResponse.email,
      created_at: userResponse.created_at,
      updated_at: userResponse.updated_at,
    };
    return response.json(user);
  }
}
