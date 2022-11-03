import nodemailer from 'nodemailer';
import google from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

import messages from './messages.helper.js';

export default {
	sendTestMail,
	SendOTPEmail
};

const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLEINT_SECRET: process.env.CLEINT_SECRET,
	REDIRECT_URI: process.env.REDIRECT_URI,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN,
	APP_EMAIL: process.env.APP_EMAIL,
	APP_NAME: process.env.APP_NAME
};
const oAuth2Client = new google.Auth.OAuth2Client(
	config.CLIENT_ID,
	config.CLEINT_SECRET,
	config.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });
async function sendMail(to, subject, text, html) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: 'gmail',
			secure: true,
			auth: {
				type: 'OAuth2',
				user: config.APP_EMAIL,
				clientId: config.APP_EMAIL,
				clientSecret: config.CLEINT_SECRET,
				refreshToken: config.REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});



		const mailOptions = {
			from: '<' + config.APP_EMAIL + '>',
			to,
			subject,
			text,
			html,
		};


		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
}

async function SendOTPEmail(email, otp) {

	const subject = messages.mailSubject;
	const text = messages.mailText(otp);
	const html = messages.mailHTML(otp);

	const info = await sendMail(email, subject, text, html);
	if (!info.accepted) {
		return { error: 'error' };
	}
	console.log(`messageId: ${info.messageId}, message: Email sent to: ${email}`);
	return true;
}

async function sendTestMail(to) {
	if (!to) return false;
	const info = await sendMail(
		to,
		"Mail Subject",
		"Mail Text",
		"<h1>Mail HTML</h1>"
	);


	if (info.error)
		return false;
	return true;
}
