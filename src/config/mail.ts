interface IMailConfig {
  driver: 'test' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'test',

  defaults: {
    from: {
      email: 'anderson@example.com',
      name: 'Anderson',
    },
  },
} as IMailConfig;
