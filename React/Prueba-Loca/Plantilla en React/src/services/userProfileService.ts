import { axiosInstance } from "../context/axiosInstances";
import { UserProfile } from '../types/user';

export const userProfileService = {
  // Obtener perfil completo del usuario
  getUserProfile: async (userId: number): Promise<UserProfile | null> => {
    try {
      const response = await axiosInstance.get(`/Users/${userId}`);
      if (response.data.user && response.data.user.length > 0) {
        const userData = response.data.user[0];
        
        // Convertir valores undefined a null para consistencia
        const profile: UserProfile = {
          id_user: userData.id_user || 0,
          name_user: userData.name_user || '',
          maiden_name_user: userData.maiden_name_user || '',
          email_user: userData.email_user || '',
          password_user: userData.password_user || '',
          username: userData.username || '',
          role_user: userData.role_user || '',
          age_user: userData.age_user || null,
          phone_user: userData.phone_user || null,
          birth_date_user: userData.birth_date_user || null,
          image_user: userData.image_user || null,
          blood_group_user: userData.blood_group_user || null,
          height_user: userData.height_user || null,
          weight_user: userData.weight_user || null,
          eye_color_user: userData.eye_color_user || null,
          hair_user: userData.hair_user || null,
          ip_user: userData.ip_user || null,
          mac_address_user: userData.mac_address_user || null,
          university_user: userData.university_user || null,
          ein_user: userData.ein_user || null,
          ssn_user: userData.ssn_user || null,
          user_agent_user: userData.user_agent_user || null,
          street_address: userData.street_address || null,
          city_address: userData.city_address || null,
          state_address: userData.state_address || null,
          state_code_address: userData.state_code_address || null,
          postal_code_address: userData.postal_code_address || null,
          latitude_address: userData.latitude_address || null,
          longitude_address: userData.longitude_address || null,
          country_address: userData.country_address || null,
          card_expire_user: userData.card_expire_user || null,
          card_number_user: userData.card_number_user || null,
          card_type_user: userData.card_type_user || null,
          currency_user: userData.currency_user || null,
          iban_user: userData.iban_user || null,
          department_company_user: userData.department_company_user || null,
          company_name_user: userData.company_name_user || null,
          company_title_user: userData.company_title_user || null,
          company_street_user: userData.company_street_user || null,
          company_city_user: userData.company_city_user || null,
          company_state_user: userData.company_state_user || null,
          company_state_code_user: userData.company_state_code_user || null,
          company_postal_code_user: userData.company_postal_code_user || null,
          company_latitude_user: userData.company_latitude_user || null,
          company_longitude_user: userData.company_longitude_user || null,
          company_country_user: userData.company_country_user || null,
          coin_user: userData.coin_user || null,
          wallet_address_user: userData.wallet_address_user || null,
          network_user: userData.network_user || null
        };
        
        return profile;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener perfil del usuario:', error);
      return null;
    }
  },

  // Actualizar perfil del usuario
  updateUserProfile: async (userId: number, profileData: Partial<UserProfile>): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axiosInstance.patch(`/Users/${userId}`, profileData);
      return {
        success: true,
        message: response.data.message || 'Perfil actualizado exitosamente'
      };
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Error al actualizar el perfil'
      };
    }
  },

  // Verificar si el usuario está autenticado
  verifyUser: async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/Users/verify');
      return response.status === 200;
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      return false;
    }
  }
}; 