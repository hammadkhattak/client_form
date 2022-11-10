import nodemailer from 'nodemailer';
import google from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

import messages from './messages.helper.js';


const appConfig = {
	ADMIN_EMAIL: process.env.ADMIN_EMAIL
};

export default {
	sendTestMail,
	SendOTPEmail,
	sendOrderMailtoClient,
	sendOrderMailtoAdmin

};

const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLEINT_SECRET: process.env.CLEINT_SECRET,
	REDIRECT_URI: process.env.REDIRECT_URI,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN,
	APP_EMAIL: process.env.APP_EMAIL,
	APP_NAME: process.env.APP_NAME,
	APP_PASSWORD: process.env.APP_PASSWORD,
};
async function sendMail(to, subject, text, html) {
	try {
		const transport = nodemailer.createTransport({
			service: 'gmail',
			secure: false,
			port: 465,
			host: 'smtp.gmail.com',
			auth: {
				user: config.APP_EMAIL,
				pass: config.APP_PASSWORD
			},
		});
		const mailOptions = {
			from: config.APP_EMAIL,
			to,
			subject,
			text,
			html,
		};
		const res = await transport.sendMail(mailOptions);
		return res;
	} catch (error) {
		return error;
	}
}

async function SendOTPEmail(email, otp) {

	const subject = messages.mailSubject;
	const text = messages.mailText(otp);
	const html = messages.mailHTML(otp);

	const info = await sendMail(email, subject, text, html);
	// console.log({ info });
	if (!info.accepted) {
		return { error: 'error' };
	}
	console.log(`messageId: ${info.messageId}, message: Email sent to: ${email}`);
	return true;
}

async function sendOrderMailtoClient(reqObject) {
	const subject = messages.orderMailSubject;
	const text = messages.orderMailText(reqObject);
	const html = messages.orderMailHTML(reqObject);

	const info = await sendMail(reqObject.email, subject, text, html);
	console.log({ info });
	if (!info.accepted) {
		return { error: 'error' };
	}
	console.log(`messageId: ${info.messageId}, message: Email sent to: ${reqObject.email}`);
	return true;
}

async function sendOrderMailtoAdmin(reqObject) {
	const subject = messages._orderMailSubject;
	const text = messages._orderMailText(reqObject);
	const html = messages._orderMailHTML(reqObject);

	const info = await sendMail(appConfig.ADMIN_EMAIL, subject, text, html);
	// console.log({ info });
	if (!info.accepted) {
		return { error: 'error' };
	}
	console.log(`Admin messageId: ${info.messageId}, message: Email sent to: ${appConfig.ADMIN_EMAIL}`);
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
