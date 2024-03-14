import dotenv from 'dotenv';

dotenv.config();

const configs = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    privateKeyJwt: process.env.PRIVATE_KEY_JWT,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: process.env.PERSISTENCE,
    userNodemailer: process.env.USER_NODEMAILER,
    passwordNodemailer: process.env.PASSWORD_NODEMAILER,
    mailerPort: process.env.MAILER_PORT,
    sendEmailFrom: process.env.SEND_EMAIL_FROM,
    emailService: process.env.EMAIL_SERVICE,
    stripeSecret: process.env.STRIPE_SECRET,
};

export default configs;
