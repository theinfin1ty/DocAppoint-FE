import { axiosInstance } from '$lib/utils/axios'

export const initiateLogin = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', payload)
    return response.data
  } catch (error) {
    return null
  }
}

export const login = async (payload) => {
  try {
    const response = await axiosInstance.put('/api/auth/login', payload)
    return response.data
  } catch (error) {
    return null
  }
}