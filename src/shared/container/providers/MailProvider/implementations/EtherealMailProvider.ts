import authEmail from '@config/authEmail';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport({
      host: authEmail.email.host,
      port: authEmail.email.port,
      secure: authEmail.email.secure,
      auth: authEmail.email.auth,
    });
    this.client = transporter;
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client
      .sendMail({
        from: {
          name: from?.name || 'Equipe GoBarber',
          address: from?.email || authEmail.email.auth.user,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      })
      .then(message => {
        console.log(message);
      })
      .catch(err => console.log(err));
  }
}
