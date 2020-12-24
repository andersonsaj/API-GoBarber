import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import SESMailProvider from './implementations/SESMailProvider';
import TestMailProvider from './implementations/TestMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  test: container.resolve(TestMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
