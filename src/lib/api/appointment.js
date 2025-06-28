import axios from 'axios';
import { user as userStore } from  '$lib/utils/store';

const commonHeaders = {
	'Content-Type': 'application/json'
};

const baseURL = process.env.BASE_URL;

export const createAppointment = async (window, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.post(`${baseURL}/api/appointments`, data, {
		headers: commonHeaders
	});
	return response.data;
};

export const getAllAppointments = async (window, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.get(`${baseURL}/api/appointments`, {
		headers: commonHeaders,
		params: { ...data }
	});
  return response.data;
};

export const getAppointment = async (window, id) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.get(`${baseURL}/api/appointments/${id}`, {
		headers: commonHeaders,
	});
  return response.data;
};

export const updateAppointment = async (window, id, data) => {
	commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
	const response = await axios.patch(`${baseURL}/api/appointments/${id}`, data, {
		headers: commonHeaders
	});
	return response.data;
}
