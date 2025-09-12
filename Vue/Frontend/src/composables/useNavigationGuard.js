import { onBeforeUnmount } from 'vue';
import Swal from 'sweetalert2';

// Vue composable equivalent of React's useNavigationGuard
// Usage:
// const { navigateWithConfirmation, enableBeforeUnload, disableBeforeUnload } = useNavigationGuard({
//   hasUnsavedChanges: computed(() => stateHasChanges.value),
//   isFormLocked: computed(() => isLocked.value),
//   onDiscardChanges: () => resetChanges()
// });
export function useNavigationGuard({ hasUnsavedChanges, isFormLocked, onDiscardChanges }) {
  const beforeUnloadHandler = (e) => {
    if (hasUnsavedChanges.value && !isFormLocked.value) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const enableBeforeUnload = () => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
  };

  const disableBeforeUnload = () => {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
  };

  onBeforeUnmount(() => {
    disableBeforeUnload();
  });

  const navigateWithConfirmation = async (to, router) => {
    if (hasUnsavedChanges.value && !isFormLocked.value) {
      const result = await Swal.fire({
        title: '¿Deseas abandonar la página?',
        text: 'Tienes cambios sin guardar. Si abandonas la página, tus cambios no serán efectivos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        onDiscardChanges && onDiscardChanges();
        router.push(to);
      }
    } else {
      router.push(to);
    }
  };

  return { navigateWithConfirmation, enableBeforeUnload, disableBeforeUnload };
}
