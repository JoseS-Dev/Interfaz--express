import { axiosInstance } from '@/utilities/axios';

const getSelectedImages = async () => {
    try {
        const response = await axiosInstance.get('/Images/Selected/all');
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        throw error;
    }
};

export const imageService = {
    getSelectedImages,
};
