import dotenv from 'dotenv';
dotenv.config();
const config = {
	APP_NAME: process.env.APP_NAME,
};

const messages = {
	mailSubject: `Reset your ${config.APP_NAME} password`,
	mailText: (OTP) => `Your OTP for your ${config.APP_NAME} App is: ${OTP}`,
	mailHTML: (OTP) => `<b>OTP for your ${config.APP_NAME} is: </b><br /><br /><h1>OTP: ${OTP}</h1>`,
	mobileOTPText: (OTP) => `Your ${config.APP_NAME} code is ${OTP}. Never share this code with anyone. ${config.APP_NAME} will never call you to ask for this code.`,

	orderMailSubject: `Order Confirmation for ${config.APP_NAME}`,
	orderMailText: (reqObj) => `Followings are your order details at ${config.APP_NAME}:
		name: ${reqObj.name},
		phone: ${reqObj.phone},
		email: ${reqObj.email},
		days of Treatment: ${reqObj.daysTreatment},
		surgical Interventions: '${reqObj.surgicalInterventions},
		type Of Injury: ${reqObj.typeOfInjury},
		psychological Sequelae: ${reqObj.psychologicalSequelae},
		aesthetic Sequels: ${reqObj.aestheticSequels},
		permanent Work Incapacity: ${reqObj.permanentWorkIncapacity},
		Order Total: € ${reqObj.totalPrice},
	`,
	orderMailHTML: (reqObj) => `<b>Followings are your order details at ${config.APP_NAME}:<br /></b><b>name</b>: ${reqObj.name}<br /><b>phone:</b> ${reqObj.phone}<br /><b>email:</b> ${reqObj.email}<br /><b>days of Treatment:</b> ${reqObj.daysTreatment}<br /><b>surgical Interventions:</b> '${reqObj.surgicalInterventions}<br /><b>type Of Injury:</b> ${reqObj.typeOfInjury}<br /><b>psychological Sequelae:</b> ${reqObj.psychologicalSequelae}<br /><b>aesthetic Sequels:</b> ${reqObj.aestheticSequels}<br /><b>permanent Work Incapacity:</b> ${reqObj.permanentWorkIncapacity}<br /><b>Order Total:</b> € ${reqObj.totalPrice}<br />`,

	_orderMailSubject: `New Order at ${config.APP_NAME}`,
	_orderMailText: (reqObj) => `New order Placed at ${config.APP_NAME}:
		name: ${reqObj.name},
		phone: ${reqObj.phone},
		email: ${reqObj.email},
		days of Treatment: ${reqObj.daysTreatment},
		surgical Interventions: '${reqObj.surgicalInterventions},
		type Of Injury: ${reqObj.typeOfInjury},
		psychological Sequelae: ${reqObj.psychologicalSequelae},
		aesthetic Sequels: ${reqObj.aestheticSequels},
		permanent Work Incapacity: ${reqObj.permanentWorkIncapacity},
		Order Total: € ${reqObj.totalPrice},

		Remaining SMS: ${reqObj.quotaRemaining}
	`,
	_orderMailHTML: (reqObj) => `<b>Followings are your order details at ${config.APP_NAME}:<br /></b><b>name</b>: ${reqObj.name}<br /><b>phone:</b> ${reqObj.phone}<br /><b>email:</b> ${reqObj.email}<br /><b>days of Treatment:</b> ${reqObj.daysTreatment}<br /><b>surgical Interventions:</b> '${reqObj.surgicalInterventions}<br /><b>type Of Injury:</b> ${reqObj.typeOfInjury}<br /><b>psychological Sequelae:</b> ${reqObj.psychologicalSequelae}<br /><b>aesthetic Sequels:</b> ${reqObj.aestheticSequels}<br /><b>permanent Work Incapacity:</b> ${reqObj.permanentWorkIncapacity}<br /><b>Order Total:</b> € ${reqObj.totalPrice}<br /><br /><h3>Remaining SMS: ${reqObj.quotaRemaining}</h3>`,


};

export default messages;