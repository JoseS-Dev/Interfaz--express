import { axiosInstance } from '@/utilities/axios';

const getSelectedVideos = async () => {
    try {
        const response = await axiosInstance.get('/videos/selected');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};

export const videoService = {
    getSelectedVideos,
};
