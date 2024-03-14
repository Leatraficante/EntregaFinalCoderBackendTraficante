import nodemailer from 'nodemailer';
import config from '../config/configs.js'

const transporter = nodemailer.createTransport({
    service: config.emailService,
    port: config.mailerPort,
    auth: {
        user: config.userNodemailer, 
        pass: config.passwordNodemailer
    }
});

export const sendEmail = async (email) => {
    await transporter.sendMail({
        from: config.sendEmailFrom,
        to: email.to,
        subject: email.subject,
        html: email.html
    });
}