import { axiosInstance } from '@/utilities/axios';

export const userProfileService = {
  getUserProfile: async (userId) => {
    try {
      const response = await axiosInstance.get(`/Users/${userId}`);
      if (response.data.user && response.data.user.length > 0) {
        const u = response.data.user[0];
        const toNull = (v) => (v === undefined ? null : v);
        return {
          id_user: u.id_user || 0,
          name_user: u.name_user || '',
          maiden_name_user: u.maiden_name_user || '',
          email_user: u.email_user || '',
          username: u.username || '',
          role_user: u.role_user || '',
          age_user: toNull(u.age_user),
          phone_user: toNull(u.phone_user),
          gender_user: toNull(u.gender_user),
          birth_date_user: toNull(u.birth_date_user),
          image_user: toNull(u.image_user),
          blood_group_user: toNull(u.blood_group_user),
          height_user: toNull(u.height_user),
          weight_user: toNull(u.weight_user),
          eye_color_user: toNull(u.eye_color_user),
          hair_user: toNull(u.hair_user),
          ip_user: toNull(u.ip_user),
          mac_address_user: toNull(u.mac_address_user),
          university_user: toNull(u.university_user),
          ein_user: toNull(u.ein_user),
          ssn_user: toNull(u.ssn_user),
          user_agent_user: toNull(u.user_agent_user),
          street_address: toNull(u.street_address),
          city_address: toNull(u.city_address),
          state_address: toNull(u.state_address),
          state_code_address: toNull(u.state_code_address),
          postal_code_address: toNull(u.postal_code_address),
          latitude_address: toNull(u.latitude_address),
          longitude_address: toNull(u.longitude_address),
          country_address: toNull(u.country_address),
          card_expire_user: toNull(u.card_expire_user),
          card_number_user: toNull(u.card_number_user),
          card_type_user: toNull(u.card_type_user),
          currency_user: toNull(u.currency_user),
          iban_user: toNull(u.iban_user),
          department_company_user: toNull(u.department_company_user),
          company_name_user: toNull(u.company_name_user),
          company_title_user: toNull(u.company_title_user),
          company_street_user: toNull(u.company_street_user),
          company_city_user: toNull(u.company_city_user),
          company_state_user: toNull(u.company_state_user),
          company_state_code_user: toNull(u.company_state_code_user),
          company_postal_code_user: toNull(u.company_postal_code_user),
          company_latitude_user: toNull(u.company_latitude_user),
          company_longitude_user: toNull(u.company_longitude_user),
          company_country_user: toNull(u.company_country_user),
          coin_user: toNull(u.coin_user),
          wallet_address_user: toNull(u.wallet_address_user),
          network_user: toNull(u.network_user),
        };
      }
      return null;
    } catch (error) {
      console.error('Error al obtener perfil del usuario:', error);
      return null;
    }
  },

  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await axiosInstance.patch(`/Users/${userId}`, profileData);
      return {
        success: true,
        message: response.data.message || 'Perfil actualizado exitosamente',
      };
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al actualizar el perfil',
      };
    }
  },

  verifyUser: async () => {
    try {
      const response = await axiosInstance.post('/Users/verify');
      return response.status === 200;
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      return false;
    }
  },
};
