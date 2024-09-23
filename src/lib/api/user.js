import { axiosInstance } from '$lib/utils/axios';

export const getUserProfile = async () => {
	try {
		const response = await axiosInstance.get('/api/users/profile');
		return response.data;
	} catch (error) {
		return null;
	}
};
