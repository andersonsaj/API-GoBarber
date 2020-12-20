import authEmail from '@config/authEmail';
import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: authEmail.email.host,
      port: authEmail.email.port,
      secure: authEmail.email.secure,
      auth: authEmail.email.auth,
    });
    this.client = transporter;
  }

  public async sendMail(to: string, body: string): Promise<void> {
    await this.client
      .sendMail({
        from: authEmail.email.auth.user,
        to,
        subject: 'Recuperação de senha',
        text: body,
      })
      .then(message => {
        console.log(message);
      })
      .catch(err => console.log(err));
  }
}
