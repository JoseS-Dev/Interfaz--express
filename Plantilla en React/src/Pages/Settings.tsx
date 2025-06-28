import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigationGuard } from '../hooks/useNavigationGuard';
import { userProfileService } from '../services/userProfileService';
import { UserProfile, LocationData } from '../types/user';
import MapSelector from '../components/MapSelector';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

interface EditableFields {
  [key: string]: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isFormLocked, setIsFormLocked] = useState(true);
  const [editableFields, setEditableFields] = useState<EditableFields>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [originalData, setOriginalData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    id_user: 0,
    name_user: '',
    maiden_name_user: '',
    email_user: '',
    password_user: '',
    username: '',
    role_user: '',
    age_user: null,
    phone_user: null,
    birth_date_user: null,
    image_user: null,
    blood_group_user: null,
    height_user: null,
    weight_user: null,
    eye_color_user: null,
    hair_user: null,
    ip_user: null,
    mac_address_user: null,
    university_user: null,
    ein_user: null,
    ssn_user: null,
    user_agent_user: null,
    street_address: null,
    city_address: null,
    state_address: null,
    state_code_address: null,
    postal_code_address: null,
    latitude_address: null,
    longitude_address: null,
    country_address: null,
    card_expire_user: null,
    card_number_user: null,
    card_type_user: null,
    currency_user: null,
    iban_user: null,
    department_company_user: null,
    company_name_user: null,
    company_title_user: null,
    company_street_user: null,
    company_city_user: null,
    company_state_user: null,
    company_state_code_user: null,
    company_postal_code_user: null,
    company_latitude_user: null,
    company_longitude_user: null,
    company_country_user: null,
    coin_user: null,
    wallet_address_user: null,
    network_user: null
  });

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user?.id_user) {
        setIsLoading(true);
        const profile = await userProfileService.getUserProfile(user.id_user);
        if (profile) {
          setFormData(profile);
          setOriginalData(profile);
        }
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  // Función para descartar cambios
  const handleDiscardChanges = useCallback(() => {
    if (originalData) {
      setFormData(originalData);
      setEditableFields({});
      setErrors({});
      setHasUnsavedChanges(false);
      setIsFormLocked(true);
    }
  }, [originalData]);

  // Hook de navegación
  const { navigateWithConfirmation } = useNavigationGuard({
    hasUnsavedChanges,
    isFormLocked,
    onDiscardChanges: handleDiscardChanges
  });

  // Manejar cambios en los campos
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
    
    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Manejar selección de ubicación del mapa
  const handleLocationSelect = (location: LocationData) => {
    setFormData(prev => ({
      ...prev,
      street_address: location.address,
      city_address: location.city,
      state_address: location.state,
      country_address: location.country,
      postal_code_address: location.postalCode,
      latitude_address: location.lat,
      longitude_address: location.lng
    }));
    setHasUnsavedChanges(true);
  };

  // Manejar selección de ubicación de la empresa
  const handleCompanyLocationSelect = (location: LocationData) => {
    setFormData(prev => ({
      ...prev,
      company_street_user: location.address,
      company_city_user: location.city,
      company_state_user: location.state,
      company_country_user: location.country,
      company_postal_code_user: location.postalCode,
      company_latitude_user: location.lat,
      company_longitude_user: location.lng
    }));
    setHasUnsavedChanges(true);
  };

  // Toggle para editar campo
  const toggleFieldEdit = (field: string) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Validar paso actual
  const validateCurrentStep = (): boolean => {
    // Si todos los campos están bloqueados, permitir avanzar
    const hasEditableFields = Object.values(editableFields).some(isEditable => isEditable);
    if (!hasEditableFields) {
      return true;
    }

    const newErrors: FormErrors = {};

    switch (currentStep) {
      case 1:
        if (editableFields.name_user && !formData.name_user?.trim()) newErrors.name_user = 'El nombre es requerido';
        if (editableFields.email_user && !formData.email_user?.trim()) newErrors.email_user = 'El email es requerido';
        else if (editableFields.email_user && !/\S+@\S+\.\S+/.test(formData.email_user)) newErrors.email_user = 'Email inválido';
        if (editableFields.phone_user && !formData.phone_user?.trim()) newErrors.phone_user = 'El teléfono es requerido';
        break;
      case 2:
        if (editableFields.street_address && !formData.street_address?.trim()) newErrors.street_address = 'La dirección es requerida';
        if (editableFields.city_address && !formData.city_address?.trim()) newErrors.city_address = 'La ciudad es requerida';
        if (editableFields.state_address && !formData.state_address?.trim()) newErrors.state_address = 'El estado es requerido';
        if (editableFields.postal_code_address && !formData.postal_code_address?.trim()) newErrors.postal_code_address = 'El código postal es requerido';
        break;
      case 3:
        if (editableFields.company_name_user && !formData.company_name_user?.trim()) newErrors.company_name_user = 'El nombre de la empresa es requerido';
        if (editableFields.company_title_user && !formData.company_title_user?.trim()) newErrors.company_title_user = 'El título es requerido';
        if (editableFields.department_company_user && !formData.department_company_user?.trim()) newErrors.department_company_user = 'El departamento es requerido';
        break;
      case 4:
        if (editableFields.card_number_user && !formData.card_number_user?.trim()) newErrors.card_number_user = 'El número de tarjeta es requerido';
        if (editableFields.card_expire_user && !formData.card_expire_user?.trim()) newErrors.card_expire_user = 'La fecha de expiración es requerida';
        if (editableFields.iban_user && !formData.iban_user?.trim()) newErrors.iban_user = 'El IBAN es requerido';
        break;
      case 5:
        // Para el paso 5, no hay campos requeridos específicos
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Verificar si hay campos editables en el paso actual
  const hasEditableFieldsInCurrentStep = (): boolean => {
    const stepFields = {
      1: ['name_user', 'maiden_name_user', 'age_user', 'gender', 'birth_date_user', 'email_user', 'phone_user', 'username', 'password_user'],
      2: ['street_address', 'city_address', 'state_address', 'state_code_address', 'postal_code_address', 'country_address'],
      3: ['department_company_user', 'company_name_user', 'company_title_user', 'company_street_user', 'company_city_user', 'company_state_user', 'company_state_code_user', 'company_postal_code_user', 'company_country_user'],
      4: ['card_number_user', 'card_expire_user', 'card_type_user', 'currency_user', 'iban_user'],
      5: ['height_user', 'weight_user', 'blood_group_user', 'eye_color_user', 'hair_user', 'ip_user', 'mac_address_user', 'user_agent_user', 'role_user', 'coin_user', 'network_user', 'wallet_address_user']
    };

    const currentStepFields = stepFields[currentStep as keyof typeof stepFields] || [];
    return currentStepFields.some(field => editableFields[field]);
  };

  // Navegar al siguiente paso
  const nextStep = () => {
    // Solo permitir avanzar si todos los campos están bloqueados
    if (!hasEditableFieldsInCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      Swal.fire({
        title: 'Campos sin guardar',
        text: 'Debes guardar los cambios antes de continuar al siguiente paso',
        icon: 'warning',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  // Navegar al paso anterior
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Guardar cambios
  const handleSave = async () => {
    // Solo validar campos que están desbloqueados
    const newErrors: FormErrors = {};

    // Validar solo los campos desbloqueados del paso actual
    const stepFields = {
      1: ['name_user', 'email_user', 'phone_user', 'maiden_name_user', 'age_user', 'gender', 'birth_date_user', 'username', 'password_user'],
      2: ['street_address', 'city_address', 'state_address', 'state_code_address', 'postal_code_address', 'country_address'],
      3: ['department_company_user', 'company_name_user', 'company_title_user', 'company_street_user', 'company_city_user', 'company_state_user', 'company_state_code_user', 'company_postal_code_user', 'company_country_user'],
      4: ['card_number_user', 'card_expire_user', 'card_type_user', 'currency_user', 'iban_user'],
      5: ['height_user', 'weight_user', 'blood_group_user', 'eye_color_user', 'hair_user', 'ip_user', 'mac_address_user', 'user_agent_user', 'role_user', 'coin_user', 'network_user', 'wallet_address_user']
    };

    const currentStepFields = stepFields[currentStep as keyof typeof stepFields] || [];
    
    currentStepFields.forEach(field => {
      if (editableFields[field]) {
        const value = formData[field as keyof UserProfile];
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field] = `El campo es requerido`;
        } else if (field === 'email_user' && !/\S+@\S+\.\S+/.test(value as string)) {
          newErrors[field] = 'Email inválido';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        title: 'Error de validación',
        text: 'Por favor, completa correctamente el campo desbloqueado antes de guardar',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    setIsSaving(true);
    try {
      const result = await userProfileService.updateUserProfile(user!.id_user, formData);
      
      if (result.success) {
        setOriginalData(formData);
        setHasUnsavedChanges(false);
        setIsFormLocked(true);
        setEditableFields({});
        
        Swal.fire({
          title: '¡Éxito!',
          text: result.message,
          icon: 'success',
          confirmButtonColor: '#3085d6'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message,
          icon: 'error',
          confirmButtonColor: '#3085d6'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al guardar los cambios',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Manejar logout con confirmación
  const handleLogout = () => {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: 'Si cierras sesión, perderás acceso a tu perfil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  // Renderizar campo con icono de edición
  const renderEditableField = (
    field: string,
    label: string,
    type: string = 'text',
    required: boolean = false,
    options?: { value: string; label: string }[]
  ) => {
    const isEditable = editableFields[field];
    const hasError = errors[field];
    const value = formData[field as keyof UserProfile] || '';

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-quinary/75 text-paragraph">
            {label} {required && '*'}
          </label>
          <button
            type="button"
            onClick={() => toggleFieldEdit(field)}
            className="text-secondary cursor-pointer"
          >
            <i className={`text-paragraph fas fa-${isEditable ? 'save' : 'edit'}`}></i>
          </button>
        </div>
        
        {type === 'select' ? (
          <select
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            disabled={!isEditable}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? 'border-tertiary' : 'border-quinary/25'
            } ${!isEditable ? 'bg-quinary/5' : 'bg-primary/50'}`}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            disabled={!isEditable}
            className={`font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? 'border-tertiary' : 'border-quinary/25'
            } ${!isEditable ? 'bg-quinary/5' : 'bg-primary/50'}`}
          />
        )}
        
        {hasError && <p className="text-tertiary text-sm mt-1 text-paragraph">{hasError}</p>}
      </div>
    );
  };

  // Renderizar paso 1: Información Personal
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">Información Personal</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('name_user', 'Nombre', 'text', true)}
        {renderEditableField('maiden_name_user', 'Apellido de Soltera')}
        {renderEditableField('age_user', 'Edad', 'number')}
        {renderEditableField('gender', 'Género', 'select', false, [
          { value: 'female', label: 'Femenino' },
          { value: 'male', label: 'Masculino' },
          { value: 'other', label: 'Otro' }
        ])}
        {renderEditableField('birth_date_user', 'Fecha de Nacimiento', 'date')}
        {renderEditableField('email_user', 'Email', 'email', true)}
        {renderEditableField('phone_user', 'Teléfono', 'tel', true)}
        {renderEditableField('username', 'Nombre de Usuario')}
        {renderEditableField('password_user', 'Contraseña', 'password')}
      </div>
    </div>
  );

  // Renderizar paso 2: Dirección
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">Dirección y Ubicación</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">
          Selecciona tu ubicación en el mapa
        </label>
        <MapSelector
          onLocationSelect={handleLocationSelect}
          initialLat={formData.latitude_address || 51.505}
          initialLng={formData.longitude_address || -0.09}
          height="300px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('street_address', 'Dirección', 'text', true)}
        {renderEditableField('city_address', 'Ciudad', 'text', true)}
        {renderEditableField('state_address', 'Estado', 'text', true)}
        {renderEditableField('state_code_address', 'Código de Estado')}
        {renderEditableField('postal_code_address', 'Código Postal', 'text', true)}
        {renderEditableField('country_address', 'País', 'text', true)}
      </div>
    </div>
  );

  // Renderizar paso 3: Información Laboral
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">Información Laboral</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('company_name_user', 'Nombre de la Empresa', 'text', true)}
        {renderEditableField('company_title_user', 'Título', 'text', true)}
        {renderEditableField('department_company_user', 'Departamento', 'text', true)}
        {renderEditableField('university_user', 'Universidad')}
        {renderEditableField('ein_user', 'EIN')}
        {renderEditableField('ssn_user', 'SSN')}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-quinary mb-4 text-subtitle">Dirección de la Empresa</h4>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">
            Selecciona la ubicación de la empresa en el mapa
          </label>
          <MapSelector
            onLocationSelect={handleCompanyLocationSelect}
            initialLat={formData.company_latitude_user || 51.505}
            initialLng={formData.company_longitude_user || -0.09}
            height="300px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderEditableField('company_street_user', 'Dirección')}
          {renderEditableField('company_city_user', 'Ciudad')}
          {renderEditableField('company_state_user', 'Estado')}
          {renderEditableField('company_state_code_user', 'Código de Estado')}
          {renderEditableField('company_postal_code_user', 'Código Postal')}
          {renderEditableField('company_country_user', 'País')}
        </div>
      </div>
    </div>
  );

  // Renderizar paso 4: Información Bancaria
  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">Información Bancaria</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('card_number_user', 'Número de Tarjeta', 'text', true)}
        {renderEditableField('card_expire_user', 'Fecha de Expiración', 'text', true)}
        {renderEditableField('card_type_user', 'Tipo de Tarjeta')}
        {renderEditableField('currency_user', 'Moneda')}
        {renderEditableField('iban_user', 'IBAN', 'text', true)}
      </div>
    </div>
  );

  // Renderizar paso 5: Información Adicional
  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">Información Adicional</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('height_user', 'Altura (cm)', 'number')}
        {renderEditableField('weight_user', 'Peso (kg)', 'number')}
        {renderEditableField('blood_group_user', 'Grupo Sanguíneo', 'select', false, [
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' }
        ])}
        {renderEditableField('eye_color_user', 'Color de Ojos')}
        {renderEditableField('hair_user', 'Color de Cabello')}
        {renderEditableField('ip_user', 'IP')}
        {renderEditableField('mac_address_user', 'Dirección MAC')}
        {renderEditableField('user_agent_user', 'User Agent')}
        {renderEditableField('role_user', 'Rol', 'select', false, [
          { value: 'user', label: 'Usuario' },
          { value: 'admin', label: 'Administrador' },
          { value: 'moderator', label: 'Moderador' }
        ])}
      </div>

      <div className="border-t border-quinary pt-6">
        <h4 className="text-md font-medium text-quinary mb-4 text-subtitle">Información de Criptomonedas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderEditableField('coin_user', 'Moneda')}
          {renderEditableField('network_user', 'Red')}
          {renderEditableField('wallet_address_user', 'Wallet')}
        </div>
      </div>
    </div>
  );

  // Renderizar paso actual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 font-primary">
        <div className="bg-quaternary rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-quinary mb-2 text-title">Configuración de Perfil</h1>
            <p className="text-quinary text-paragraph">Gestiona tu información personal paso a paso</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-quinary text-paragraph">Paso {currentStep} de 5</span>
              <span className="text-sm text-quinary text-paragraph">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-quinary/25 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-paragraph ${
                  step <= currentStep 
                    ? 'bg-secondary text-quaternary' 
                    : 'bg-quinary/10 text-quinary'
                }`}>
                  {step}
                </div>
                <span className="text-xs mt-1 text-quinary text-paragraph">
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Dirección'}
                  {step === 3 && 'Laboral'}
                  {step === 4 && 'Bancaria'}
                  {step === 5 && 'Adicional'}
                </span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium text-paragraph ${
                currentStep === 1
                  ? 'bg-quinary/20 text-quinary/50 cursor-not-allowed'
                  : 'bg-quinary/75 text-quaternary hover:bg-quinary/85 cursor-pointer'
              }`}
            >
              Anterior
            </button>

            {/* Botón dinámico: Siguiente o Guardar */}
            {currentStep < 5 ? (
              hasEditableFieldsInCurrentStep() ? (
                // Si hay campos editables, mostrar botón "Guardar"
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-6 py-2 rounded-md font-medium font-paragraph ${
                    isSaving
                      ? 'bg-quinary/20 text-quinary cursor-not-allowed'
                      : 'bg-tertiary/80 text-quaternary hover:bg-tertiary cursor-pointer'
                  }`}
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              ) : (
                // Si todos los campos están bloqueados, mostrar botón "Siguiente"
                <button
                  onClick={nextStep}
                  className="px-6 py-2 text-paragraph bg-secondary text-quaternary rounded-md font-medium hover:bg-secondary/80 cursor-pointer"
                >
                  Siguiente
                </button>
              )
            ) : (
              // En el último paso, siempre mostrar "Guardar Configuración"
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-md font-medium text-paragraph ${
                  isSaving
                      ? 'bg-quinary/20 text-quinary cursor-not-allowed'
                      : 'bg-tertiary/80 text-quaternary hover:bg-tertiary cursor-pointer'
                }`}
              >
                {isSaving ? 'Guardando...' : 'Guardar Configuración'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 