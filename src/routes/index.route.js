// import { prisma } from '@prisma/client';
import express, { response } from 'express';
import createHttpError from 'http-errors';
const router = express.Router();

import mailhelpers from '../helpers/mail.helper.js';
import userService from '../dal/user.dao.js';
// const { sendTestMail, sendResetPasswordMail } = mailHelpers;

router.get('/', (req, res) => { return res.status(200).json({ status: 200, message: "Hello" }); });
router.post('/verify-otp', async (req, res) => {
	const { otp, email } = req.body;
	if (!otp || !email) return res.status(400).send({ error: true, message: 'Some feilds are required' });
	console.log({ otp, email });
	try {
		const user = await userService.findOne({
			where: {
				email
			}
		});

		console.log('here');
		if (!user.isValidOtp) return res.status(400).send({ message: "Invalid OTP" });
		if (Number(user.otp) === Number(otp)) {
			await userService.update({
				data: {
					otp: '0',
					isValidOtp: false,
				},
				where: {
					email
				}
			});

			console.log(Number(user.otp) === Number(otp), "OTP matched", { uotp: user.otp, otp });

			return res.status(200).send({ success: true, message: 'OTP Matched' });
		} else {
			console.log({ uotp: user.otp, otp }, 'h', user, otp, email);
			return res.status(400).send({ error: true, message: 'OTP not Matched' });
		}

	} catch (error) {
		console.log({ error });
		return res.status(400).send({ message: "Failed" });
	}

});
router.post('/signup', async (req, res) => {
	const { email, name, phone } = req.body;
	if (!email || !name || !phone) return res.status(400).send({ error: true, message: 'Some feilds are required' });

	const max = 987654;
	const min = 123456;
	const otp = `${Math.floor(Math.random() * (max - min) + min)}`;

	// try {
	// 	await userService.update({
	// 		data: {
	// 			otp,
	// 			isValidOtp: true,
	// 		},
	// 		where: {
	// 			email
	// 		}
	// 	});
	// } catch (error) {
	// 	throw createHttpError.InternalServerError('Internal Server Error');
	// }


	try {
		await userService.create({
			name,
			email,
			phone,
			otp,
			isValidOtp: true,
		});

	} catch (error) {
		console.log({ error });
		return res.status(400).send({ error: true, message: 'Email already in use' });
	}


	try {
		const isEmailSent = await mailhelpers.SendOTPEmail(email, otp);
		if (isEmailSent.error) return res.status(500).send({ error: true, message: 'Unable to reset password, contact site owner' });
		return res.status(200).send({ success: true, message: 'An email is sent to reset your password' });
	} catch (error) {
		console.log({ error });
		return res.status(400).send({ error: true, message: 'Failed to send Email' });
	}





});

router.post('/test-email', async (req, res) => {
	const { to } = req.body;
	const isMailsent = await mailhelpers.sendTestMail(to);

	res.send({ isMailsent });
});



export default router;