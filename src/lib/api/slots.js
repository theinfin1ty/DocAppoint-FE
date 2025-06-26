import { axiosInstance } from '$lib/utils/axios';

export const getAvailableSlots = async (date, doctorId = null) => {
  try {
    const params = { date };
    if (doctorId) {
      params.doctorId = doctorId;
    }
    const response = await axiosInstance.get('/api/slots/available', {
      params
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getDoctorSlots = async () => {
  try {
    const response = await axiosInstance.get('/api/slots');
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateSlotSettings = async (settings) => {
  try {
    const response = await axiosInstance.put('/api/slots/settings', settings);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const blockSlot = async (date, slot) => {
  try {
    const response = await axiosInstance.post('/api/slots/block', { date, slot });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const unblockSlot = async (date, slot) => {
  try {
    const response = await axiosInstance.post('/api/slots/unblock', { date, slot });
    return response.data;
  } catch (error) {
    return null;
  }
};