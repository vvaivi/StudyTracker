const nodemailer = require('nodemailer');
const logger = require('./logger');
const Joi = require('joi');

const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: process.env.EMAILPORT,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
			tls: { rejectUnauthorized: false },
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		logger.info('email sent successfully');
	} catch (error) {
		logger.error(`email not sent from ${process.env.USER} with password ${process.env.PASS}`, error);
	}
};

module.exports = { sendEmail };
