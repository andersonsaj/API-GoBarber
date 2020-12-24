import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPassordController from '../controller/ForgotPasswordController';
import ResetPassordController from '../controller/ResetPasswordController';

const passwordRouter = Router();
const forgotPassordController = new ForgotPassordController();
const resetPassordController = new ResetPassordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPassordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassordController.create,
);

export default passwordRouter;
