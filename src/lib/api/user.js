import axios from 'axios';

const commonHeaders = {
  'Content-Type': 'application/json',
}

export const getUserProfile = async (window) => {
  commonHeaders.Authorization = `Bearer ${window.localStorage.getItem('authToken')}`;
  const response = await axios.get(`${process.env.BASE_URL}/api/users/profile`, { headers: commonHeaders });
  return response.data;
}
