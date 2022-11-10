// import { prisma } from '@prisma/client';
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
const router = express.Router();
dotenv.config();

import mailhelpers from '../helpers/mail.helper.js';
import userService from '../dal/user.dao.js';
import messagesConfig from '../helpers/messages.helper.js';
// const { sendTestMail, sendResetPasswordMail } = mailHelpers;

const TEXTBELT_API = process.env.TEXTBELT_API;
const APP_NAME = process.env.APP_NAME;

router.get('/hello', (req, res) => { return res.status(200).json({ status: 200, message: "Hello" }); });
router.post('/verify-otp', async (req, res) => {
	let { otp, id } = req.body;
	if (!otp || !id) return res.status(400).send({ error: true, message: 'Some feilds are required' });
	console.log({ otp, id });
	id = Number(id);
	otp = Number(otp);
	try {
		const user = await userService.findOne({
			where: {
				id
			}
		});

		console.log({ user });

		console.log('otpisvalid', user.isValidOTP, !user.isValidOTP);

		if (!user.isValidOTP) return res.status(400).send({ message: "Invalid OTP" });
		if (Number(user.otp) === Number(otp)) {
			await userService.update({
				data: {
					otp: 0,
					isValidOTP: false,
					isOTPSent: false,
					isFormComplete: true,
				},
				where: {
					id
				}
			});

			console.log(Number(user.otp) === Number(otp), "OTP matched", { uotp: user.otp, otp });

			// send email to user for order confirmation

			try {
				const isEmailSent = await mailhelpers.sendOrderMailtoClient(user);
				const isEmailSentToAdmin = await mailhelpers.sendOrderMailtoAdmin(user);
				if (isEmailSent.error) return res.status(500).send({ error: true, message: 'Order Confirmed, but failed to send email' });
				return res.status(200).send({ success: true, message: 'An email is sent to your id' });
			} catch (error) {
				console.log({ error });
				return res.status(400).send({ error: true, message: 'Order Confirmed, but failed to send email' });
			}

		} else {
			return res.status(404).send({ error: true, message: 'OTP not Matched' });
		}

	} catch (error) {
		console.log({ error });
		return res.status(400).send({ message: "Request Failed" });
	}

});
router.post('/signup', async (req, res) => {
	const reqObject = req.body;

	const max = 987654;
	const min = 123456;
	const otp = Math.floor(Math.random() * (max - min) + min);

	reqObject.otp = otp;
	reqObject.isOTPSent = true;
	reqObject.isValidOTP = true;

	// first send otp to mobile
	const otpObject = {
		phone: reqObject.phone,
		userid: reqObject.email,
		key: TEXTBELT_API,
		message: messagesConfig.mobileOTPText(otp)
	};
	const isOTPSent = await axios.post('https://textbelt.com/text', otpObject);
	if (isOTPSent.data.success === false) {
		// not sent
		console.log("Failed to send OTP", { data: error.data });
		return res.status(400).send({ error: true, message: 'Unable to send OTP, OR mobile number is invalid' });
	}


	try {
		const user = await userService.create({
			...reqObject,
			quotaRemaining: isOTPSent.data.quotaRemaining
		});
		return res.status(200).send({ success: true, status: 200, message: `OTP is sent to Mobile Phone`, user });
	} catch (error) {
		console.log({ error });
		return res.status(500).send({ error: true, message: 'OPT sent, but unable to create user' });
	}



});
router.get('/total-users', async (req, res) => {
	try {
		const users = await userService.findMany({
			where: {
				isValidOTP: false
			}
		});
		return res.status(200).send({ success: true, data: users });
	} catch (error) {
		console.log('Error in /total-users', { error });
		return res.status(404).send({ error: true, message: 'There is some error in gettign all users' });
	}
});
router.post('/test-email', async (req, res) => {
	const { to } = req.body;
	const isMailsent = await mailhelpers.sendTestMail(to);

	res.send({ isMailsent });
});



export default router;