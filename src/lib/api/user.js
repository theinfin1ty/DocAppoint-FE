import axios from 'axios';

const commonHeaders = {
  'Content-Type': 'application/json',
}

export const getUserProfile = async (window) => {
  commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
  const response = await axios.get(`${process.env.BASE_URL}/api/users/profile`, { headers: commonHeaders });
  return response.data;
}

export const registerUser = async (window, data) => {
  commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
  const response = await axios.post(`${process.env.BASE_URL}/api/users/register`, data, { headers: commonHeaders });
  return response.data;
}

export const initiateForgotPassword = async (window, data) => {
  try {
    commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
    const response = await axios.post(`${process.env.BASE_URL}/api/users/forgot`, data, { headers: commonHeaders });
    return response.data;
  } catch(e) {
    console.log(e);
  }
}
