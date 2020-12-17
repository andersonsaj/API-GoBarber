import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import CreateUserService from '@modules/users/services/CreateUsersService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userResponse);
  },
);

export default usersRouter;
