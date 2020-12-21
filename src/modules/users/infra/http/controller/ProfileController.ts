import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const userShow = await showProfile.execute({ user_id });

    const user = {
      id: userShow.id,
      name: userShow.name,
      email: userShow.email,
      avatar: userShow.avatar,
      created_at: userShow.created_at,
      updated_at: userShow.updated_at,
    };

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);
    const updated = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    const user = {
      id: updated.id,
      name,
      email,
      avatar: updated.avatar,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };

    return response.json(user);
  }
}
