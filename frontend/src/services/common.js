import axios from 'axios';
import storageService from './storage';

const getHeaders = () => {
	const user = storageService.loadUser();
	return user ? { authorization: `Bearer ${user.token}` } : {};
};

const getAll = async (baseUrl) => {
	const headers = getHeaders();

	const request = await axios.get(baseUrl, { headers });
	return request.data;
};

const createNew = async (baseUrl, object = {}) => {
	const headers = getHeaders();

	const request = await axios.post(baseUrl, object, { headers });
	return request.data;
};

const update = async (baseUrl, id, object) => {
	const headers = getHeaders();

	const request = await axios.put(`${baseUrl}/${id}`, object, { headers });
	return request.data;
};

const remove = async (baseUrl, id) => {
	const headers = getHeaders();

	await axios.delete(`${baseUrl}/${id}`, { headers });
};

export default { getAll, createNew, update, remove };
