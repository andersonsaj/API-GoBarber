export default {
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
  },
};
