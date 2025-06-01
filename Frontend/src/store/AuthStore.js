import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || null));
  const token = ref(localStorage.getItem('token') || null);
  
  const isAuthenticated = computed(() => !!token.value);
  
  const setAuthData = (authData) =>{
    user.value = authData.user;
    token.value = authData.token;
    
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);
  }
  
  const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  
  return { user, token, isAuthenticated, setAuthData, clearAuth };
});