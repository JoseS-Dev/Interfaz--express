import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  console.log('AuthStore epale aqui');
  const user = ref(JSON.parse(localStorage.getItem('user') || null));
  const token = ref(localStorage.getItem('token') || null);
  const listFonts = ref({});
  const loadListFonts = async () => {
    const objFonts = {};
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography/`);
    if (!response.ok) throw new Error(`Error de API: ${response.status}`);
    const dataFonts = (await response.json()).data;

    for (let i = 0; i < dataFonts.length; i++) {
      const font = dataFonts[i];
      const fontName1 = `Custom-${font.name_tipography_main.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9\-]/g, "-")}-${Date.now()}`;
      const fontName2 = `Custom-${font.name_tipography_secondary.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9\-]/g, "-")}-${Date.now()}`;
      
      const url1 = `url('${import.meta.env.VITE_BACKEND_URL}/font/${font.name_tipography_main}')`;
      const url2 = `url('${import.meta.env.VITE_BACKEND_URL}/font/${font.name_tipography_secondary}')`;
      const fontFace1 = new FontFace(fontName1, url1, {
        style: 'normal',
        weight: '100 900',
        display: 'swap',
      });
      const fontFace2 = new FontFace(fontName2, url2, {
        style: 'normal',
        weight: '100 900',
        display: 'swap',
      });
      fontFace1.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
      })
      .catch((error) => {
        console.error('Error al cargar la fuente:', error);
      })

      fontFace2.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
      })
      .catch((error) => {
        console.error('Error al cargar la fuente:', error);
      })
      const fonts = {
        'primaryFont': fontName1,
        'secondaryFont': fontName2,
      }

      objFonts[dataFonts[i].id_tipography] = fonts;
    }
    listFonts.value = objFonts;
    
  };
  
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
  
  return { user, token, isAuthenticated, setAuthData, clearAuth, listFonts, loadListFonts };
});