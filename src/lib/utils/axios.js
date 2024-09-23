import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: `${process.env.BASE_URL}`,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosInstance.interceptors.request.use(
	(request) => {
		const accessToken = localStorage.getItem('authToken');

		if (accessToken) {
			request.headers['Authorization'] = `Bearer ${accessToken}`;
		}

		return request
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error?.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
			try {
				const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
				// Make a request to your auth server to refresh the token.
				const response = await axios.post(`${process.env.BASE_URL}/api/auth/refresh`, {
					refreshToken
				});
				const { tokens } = response.data;
				// Store the new access and refresh tokens.
				localStorage.setItem('authToken', tokens?.accessToken);
				localStorage.setItem('refreshToken', tokens?.refreshToken);
				// Update the authorization header with the new access token.
				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens?.accessToken}`;
				return axiosInstance(originalRequest); // Retry the original request with the new access token.
			} catch (refreshError) {
				// Handle refresh token errors by clearing stored tokens and redirecting to the login page.
				console.error('Token refresh failed:', refreshError);
				// localStorage.removeItem('accessToken');
				// localStorage.removeItem('refreshToken');
				// window.location.href = '/login?page=login';
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error); // For all other errors, return the error as is.
	}
);
