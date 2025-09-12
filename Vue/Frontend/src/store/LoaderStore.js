import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const LOCAL_STORAGE_KEY = 'loaderIsHidden';

export const useLoaderStore = defineStore('loader', () => {
  const isHidden = ref(false);

  // init from localStorage
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored !== null) isHidden.value = JSON.parse(stored);
  } catch (e) {
    // noop
  }

  const showLoader = () => {
    isHidden.value = false;
    console.log('showLoader called, setting isHidden to ', isHidden.value);
    try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isHidden.value)); } catch {}
  };
  const hideLoader = () => {
    isHidden.value = true;
    console.log('hideLoader called, setting isHidden to ', isHidden.value);
    try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isHidden.value)); } catch {}
  };

  const isVisible = computed(() => !isHidden.value);

  return { isHidden, isVisible, showLoader, hideLoader };
});
