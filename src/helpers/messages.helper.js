import dotenv from 'dotenv';
dotenv.config();
const config = {
	APP_NAME: process.env.APP_NAME,
};

const messages = {
	mailSubject: `Reset your ${config.APP_NAME} password`,
	mailText: (OTP) => `Your OTP for your ${config.APP_NAME} App is: ${OTP}`,
	mailHTML: (OTP) => `<b>OTP for your ${config.APP_NAME} is: </b><br /><br /><h1>OTP: ${OTP}</h1>`,
};

export default messages;