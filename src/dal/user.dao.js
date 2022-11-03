import { prisma } from '../helpers/singleExport.helper.js';
const { user } = prisma;

export default {
	create,
	findOne,
	findMany,
	update,
};

async function findOne(paramsObject) {
	const options = paramsObject;
	return await user.findFirst(options);
}

async function create(paramsObject) {
	return await user.create({
		data: { ...paramsObject }
	});
}


async function findMany(paramsObject) {
	const options = paramsObject;
	return await user.findMany(options);
}


async function update(data, options) {
	return await user.update(data, options);
}