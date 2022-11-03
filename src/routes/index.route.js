// import { prisma } from '@prisma/client';
import express from 'express';
import createHttpError from 'http-errors';
const router = express.Router();

import mailhelpers from '../helpers/mail.helper.js';
import userService from '../dal/user.dao.js';
// const { sendTestMail, sendResetPasswordMail } = mailHelpers;

router.get('/', (req, res) => { return res.status(200).json({ status: 200, message: "Hello" }); });
router.post('/send-otp', async (req, res) => {
	const { email } = req.body;
	if (!email) return false;

	const max = 999888;
	const min = 111222;
	const otp = Math.random() * (max - min) + min;

	try {
		await userService.update({
			data: {
				otp,
				isValidOtp: true,
			},
			where: {
				email
			}
		});
	} catch (error) {
		throw createHttpError.InternalServerError('Internal Server Error');
	}

	const isEmailSent = await mailhelpers.SendOTPEmail(email, otp);
	if (isEmailSent.error) throw createError.ServiceUnavailable('Unable to reset password, contact site owner');
	return res.send({ message: 'An email is sent to reset your password' });
});
router.post('/signup', async (req, res) => {
	const { email } = req.body;
	if (!email) return false;

	const max = 999888;
	const min = 111222;
	const otp = Math.random() * (max - min) + min;

	try {
		await userService.update({
			data: {
				otp,
				isValidOtp: true,
			},
			where: {
				email
			}
		});
	} catch (error) {
		throw createHttpError.InternalServerError('Internal Server Error');
	}

	const isEmailSent = await mailhelpers.SendOTPEmail(email, otp);
	if (isEmailSent.error) throw createError.ServiceUnavailable('Unable to reset password, contact site owner');
	return res.send({ message: 'An email is sent to reset your password' });
});

router.post('/test-email', async (req, res) => {
	const { to } = req.body;
	const isMailsent = await mailhelpers.sendTestMail(to);

	res.send({ isMailsent });
});



export default router;