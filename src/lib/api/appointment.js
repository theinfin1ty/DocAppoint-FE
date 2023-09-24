import axios from 'axios';

const commonHeaders = {
	'Content-Type': 'application/json'
};

export const createAppointment = async (window, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.post(`${process.env.BASE_URL}/api/appointments`, data, {
		headers: commonHeaders
	});
	return response.data;
};

export const getAllAppointments = async (window, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.get(`${process.env.BASE_URL}/api/appointments`, {
		headers: commonHeaders,
		params: { ...data }
	});
  return response.data;
};

export const getAppointment = async (window, id) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.get(`${process.env.BASE_URL}/api/appointments/${id}`, {
		headers: commonHeaders,
	});
  return response.data;
};

export const updateAppointment = async (window, id, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.patch(`${process.env.BASE_URL}/api/appointments/${id}`, data, {
		headers: commonHeaders
	});
	return response.data;
}
