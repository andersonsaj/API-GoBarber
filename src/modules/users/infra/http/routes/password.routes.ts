import { Router } from 'express';
import ForgotPassordController from '../controller/ForgotPasswordController';
import ResetPassordController from '../controller/ResetPasswordController';

const passwordRouter = Router();
const forgotPassordController = new ForgotPassordController();
const resetPassordController = new ResetPassordController();

passwordRouter.post('/forgot', forgotPassordController.create);
passwordRouter.post('/reset', resetPassordController.create);

export default passwordRouter;
