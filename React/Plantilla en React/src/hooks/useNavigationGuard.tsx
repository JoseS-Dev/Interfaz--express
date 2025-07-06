import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

interface UseNavigationGuardProps {
  hasUnsavedChanges: boolean;
  isFormLocked: boolean;
  onDiscardChanges: () => void;
}

export const useNavigationGuard = ({
  hasUnsavedChanges,
  isFormLocked,
  onDiscardChanges
}: UseNavigationGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isFormLocked) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, isFormLocked]);

  const navigateWithConfirmation = (to: string) => {
    if (hasUnsavedChanges && !isFormLocked) {
      Swal.fire({
        title: '¿Deseas abandonar la página?',
        text: 'Tienes cambios sin guardar. Si abandonas la página, tus cambios no serán efectivos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          onDiscardChanges();
          navigate(to);
        }
      });
    } else {
      navigate(to);
    }
  };

  return { navigateWithConfirmation };
}; 