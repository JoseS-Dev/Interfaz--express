import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigationGuard } from '../hooks/useNavigationGuard';
import { userProfileService } from '../services/userProfileService';
import { UserProfile, LocationData } from '../types/user';
import MapSelector from '../components/MapSelector';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import { data, useNavigate } from 'react-router-dom';

interface FormErrors {
  [key: string]: string;
}

const formatCardExpirationForBackend = (dateString: string | null): string | null => {
    if (!dateString) return null;

    // Primero, intenta validar si ya está en formato YYYY-MM-DD (o similar que Date() constructor acepta)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isoDateRegex.test(dateString)) {
        // Si ya parece ser AAAA-MM-DD, lo retornamos directamente.
        const parsed = new Date(dateString);
        if (!isNaN(parsed.getTime())) {
            return dateString; 
        }
    }

    // Si no es un AAAA-MM-DD, intenta parsear como MM/AA o MM/AAAA
    const mmYyMatch = dateString.match(/^(0[1-9]|1[0-2])\/(\d{2,4})$/);
    if (mmYyMatch) {
        let [_, month, yearStr] = mmYyMatch;
        let year = parseInt(yearStr);

        if (yearStr.length === 2) {
            // Lógica para inferir el siglo (ej. '25' -> 2025, '98' -> 1998)
            const currentFullYear = new Date().getFullYear();
            // Si el año de dos dígitos es hasta 10 años en el futuro del 'XX' actual, se asume 20XX
            // Si no, se asume 19XX. Esto es una heurística común.
            year += (year > (currentFullYear % 100) + 10) ? 1900 : 2000;
        }
        return `${year}-${month}-01`; // Convertir a YYYY-MM-01
    }

    // Si no coincide con ninguno de los formatos esperados, retorna null
    return null;
};

const Settings: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [originalData, setOriginalData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    id_user: 0,
    name_user: '',
    maiden_name_user: '',
    email_user: '',
    username: '',
    role_user: '',
    age_user: null,
    phone_user: null,
    birth_date_user: null,
    gender_user: null,
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
    network_user: null,
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

  // Manejar cambios en los campos
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);

    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Manejar selección de ubicación del mapa
  const handleLocationSelect = (location: LocationData) => {
    setFormData((prev) => ({
      ...prev,
      street_address: location.address,
      city_address: location.city,
      state_address: location.state,
      country_address: location.country,
      postal_code_address: location.postalCode,
      latitude_address: location.lat,
      longitude_address: location.lng,
    }));
    setHasUnsavedChanges(true);
  };

  // Manejar selección de ubicación de la empresa
  const handleCompanyLocationSelect = (location: LocationData) => {
    setFormData((prev) => ({
      ...prev,
      company_street_user: location.address,
      company_city_user: location.city,
      company_state_user: location.state,
      company_country_user: location.country,
      company_postal_code_user: location.postalCode,
      company_latitude_user: location.lat,
      company_longitude_user: location.lng,
    }));
    setHasUnsavedChanges(true);
    console.log("Ubicación de la empresa seleccionada:", location);
  };

  // Validar paso actual
  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields = requiredFieldsByStep[currentStep] || [];
    
    requiredFields.forEach(field => {
        const value = formData[field as keyof UserProfile];
        switch (field) {
            case 'name_user':
                if (!value || typeof value !== 'string' || value.trim().length < 2) {
                    newErrors[field] = 'El nombre debe tener al menos 2 caracteres';
                } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value.trim())) {
                    newErrors[field] = 'El nombre solo puede contener letras y espacios';
                }
                break;
            case 'email_user':
                if (!value || typeof value !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
                    newErrors[field] = 'Email inválido';
                }
                break;
            case 'phone_user':
                if (!value || typeof value !== 'string' || !/^\d{7,15}$/.test(value)) {
                    newErrors[field] = 'El teléfono debe ser numérico y tener entre 7 y 15 dígitos';
                }
                break;
            case 'age_user':
                if (value !== null && (isNaN(Number(value)) || Number(value) <= 0)) {
                    newErrors[field] = 'La edad debe ser un número positivo';
                }
                break;
            case 'street_address':
            case 'city_address':
            case 'state_address':
            case 'country_address':
                if (!value || typeof value !== 'string' || value.trim().length < 2) {
                    newErrors[field] = 'Este campo debe tener al menos 2 caracteres';
                }
                break;
            case 'postal_code_address':
                if (!value || typeof value !== 'string' || value.trim().length < 3) {
                    newErrors[field] = 'El código postal debe tener al menos 3 caracteres';
                }
                break;
            case 'state_code_address':
                if (!value || typeof value !== 'string' || !/^[A-Z]{2}$/.test(value)) {
                    newErrors[field] = 'El código de estado debe ser de 2 letras mayúsculas (ej. NY)';
                }
                break;

            case 'company_name_user':
            case 'company_title_user':
            case 'department_company_user':
                if (!value || typeof value !== 'string' || value.trim().length < 2) {
                    newErrors[field] = 'Este campo debe tener al menos 2 caracteres';
                }
                break;
            case 'company_state_code_user':
                if (!value || typeof value !== 'string' || !/^[A-Z]{2}$/.test(value)) {
                    newErrors[field] = 'El código de estado de la empresa debe ser de 2 letras mayúsculas (ej. CA)';
                }
                break;

            case 'card_number_user':
                if (!value || typeof value !== 'string' || !/^\d{12,19}$/.test(value)) {
                    newErrors[field] = 'El número de tarjeta debe ser numérico y tener entre 12 y 19 dígitos';
                }
                break;
            case 'card_expire_user':
                if (!value || typeof value !== 'string' || !/^(0[1-9]|1[0-2])\/\d{2,4}$/.test(value)) {
                    newErrors[field] = 'La fecha de expiración debe tener formato MM/AAAA';
                } else {
                    const [month, yearStr] = value.split('/');
                    const currentYear = new Date().getFullYear() % 100; 
                    const currentMonth = new Date().getMonth() + 1; 

                    let year = parseInt(yearStr);
                    if (yearStr.length === 2) {
                        year += (currentYear > year) ? 2000 : 1900; 
                    }

                    if (year < new Date().getFullYear() || (year === new Date().getFullYear() && parseInt(month) < currentMonth)) {
                        newErrors[field] = 'La tarjeta ha expirado';
                    }
                }
                break;
            case 'iban_user':
                if (!value || typeof value !== 'string' || !/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(value)) {
                    newErrors[field] = 'El IBAN es inválido (ej. ESxx xxxx xxxx xxxx xxxx)';
                }
                break;
            case 'currency_user':
                const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
                if (!value || typeof value !== 'string' || !validCurrencies.includes(value)) {
                    newErrors[field] = 'Moneda inválida. Selecciona una de las opciones: USD, EUR, GBP, JPY, CNY.';
                }
                break;
            case 'wallet_address_user':
                if (!value || typeof value !== 'string' || !/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(value)) {
                    newErrors[field] = 'La dirección de la billetera es inválida (ej. 1BoatSLRHtKNngkdXEeobR76b53LETtpyT)';
                }
                break;
                

            default:
                if (requiredFields.includes(field) && (!value || (typeof value === 'string' && !value.trim()))) {
                    newErrors[field] = 'Este campo es requerido';
                }
        }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      let fieldLabel = "";
      switch (firstErrorField) {
        case 'name_user': fieldLabel = 'Nombre'; break;
        case 'email_user': fieldLabel = 'Email'; break;
        case 'phone_user': fieldLabel = 'Teléfono'; break;
        case 'age_user': fieldLabel = 'Edad'; break;
        case 'street_address': fieldLabel = 'Dirección'; break;
        case 'city_address': fieldLabel = 'Ciudad'; break;
        case 'state_address': fieldLabel = 'Estado'; break;
        case 'postal_code_address': fieldLabel = 'Código Postal'; break;
        case 'country_address': fieldLabel = 'País'; break;
        case 'company_name_user': fieldLabel = 'Nombre de la Empresa'; break;
        case 'company_title_user': fieldLabel = 'Título'; break;
        case 'department_company_user': fieldLabel = 'Departamento'; break;
        case 'card_number_user': fieldLabel = 'Número de Tarjeta'; break;
        case 'card_expire_user': fieldLabel = 'Fecha de Expiración'; break;
        case 'iban_user': fieldLabel = 'IBAN'; break;
        case 'state_code_address': fieldLabel = 'Código de Estado'; break;
        case 'company_state_code_user': fieldLabel = 'Código de Estado de la Empresa'; break;
        case 'currency_user': fieldLabel = 'Moneda'; break;
        case 'wallet_address_user': fieldLabel = 'Dirección de Billetera'; break;
        default: fieldLabel = firstErrorField;
      }
      Swal.fire({
        title: "Error de validación",
        text: `El campo "${fieldLabel}" es inválido: ${newErrors[firstErrorField]}`,
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return false;
    }
    return true;
  };

  // Definir los campos requeridos por paso
  const requiredFieldsByStep: { [key: number]: string[] } = {
    1: ['name_user', 'email_user', 'phone_user'], // Maiden name and username not added as required based on original form's behavior, but Zod requires them.
    2: ['street_address', 'city_address', 'state_address', 'postal_code_address', 'country_address', 'state_code_address'], // Added state_code_address as required
    3: ['company_name_user', 'company_title_user', 'department_company_user', 'company_state_code_user'], // Added company_state_code_user as required. Note: Zod schema requires all company address fields too.
    4: ['card_number_user', 'card_expire_user', 'iban_user', 'currency_user'], // Added currency_user as required. Note: Zod also requires card_type_user which has no input.
    5: ['blood_group_user', 'height_user', 'weight_user', 'eye_color_user', 'hair_user', 'ip_user', 'mac_address_user', 'user_agent_user', 'role_user', 'coin_user', 'wallet_address_user', 'network_user'] // Added all fields from Step 5 that Zod marks as required.
  };

  // Navegar al paso anterior
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Guardar cambios
  const handleSaveOrNext = async () => {
    console.log("dentro de funcion guardar: ", validateCurrentStep())
    // Validar primero
    if (!validateCurrentStep()) return; // Si hay error, el SweetAlert de error ya se muestra y no avanza
    
  const dataToSend = { ...formData }; 
  console.log({formData})

    // Format card_expire_user for backend
    if (dataToSend.card_expire_user) {
      console.log(dataToSend.card_expire_user);
        dataToSend.card_expire_user = formatCardExpirationForBackend(dataToSend.card_expire_user);
        if (!dataToSend.card_expire_user) {
            Swal.fire({
                title: 'Error',
                text: 'Error interno al formatear la fecha de expiración.',
                icon: 'error',
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    }

    await Swal.fire({
      title: "Datos válidos",
      text: "Todos los campos han sido validados correctamente.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSaving(true);
      try {
        dataToSend.age_user = dataToSend.age_user ? Number(dataToSend.age_user) : null;
        dataToSend.height_user = dataToSend.height_user ? Number(dataToSend.height_user) : null;
        dataToSend.weight_user = dataToSend.weight_user ? Number(dataToSend.weight_user) : null;
        console.log({dataToSend})
        const result = await userProfileService.updateUserProfile(user!.id_user, dataToSend);
        if (result.success) {
          setOriginalData(formData);
          setHasUnsavedChanges(false);
          await Swal.fire({
            title: "¡Éxito!",
            text: result.message,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          navigate("/"); // Redirigir al perfil o a otra página si es necesario
        } else {
          Swal.fire({
            title: "Error",
            text: result.message,
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error al guardar los cambios",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Renderizar campo con icono de edición
  const renderEditableField = (
    field: string,
    label: string,
    type: string = "text",
    required: boolean = false,
    options?: { value: string; label: string }[],
    disabled: boolean = false
  ) => {
    const hasError = errors[field];
    const value = formData[field as keyof UserProfile] || "";
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-quinary/75 text-paragraph">
            {label} {required && "*"}
          </label>
        </div>
        {type === "select" ? (
          <select
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? "border-tertiary" : "border-quinary/25"
            } bg-primary/50`}
          >
            {!options?.some(option => option.value === '') && !required && <option value="">Seleccionar...</option>}
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleInputChange(field, reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? "border-tertiary" : "border-quinary/25"
            } bg-primary/50`}
          />
        ) : type === "date" ? (
          <input
            type="date"
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? "border-tertiary" : "border-quinary/25"
            } bg-primary/50`}
          />
        ) : (
          <input
            type={type}
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary ${
              hasError ? "border-tertiary" : "border-quinary/25"
            } bg-primary/50`}
          />
        )}
        {hasError && (
          <p className="text-tertiary text-sm mt-1 text-paragraph">
            {hasError}
          </p>
        )}
      </div>
    );
  };

  // Renderizar paso 1: Información Personal
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">
        Información Personal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('name_user', 'Nombre', 'text', true)}
        {renderEditableField('maiden_name_user', 'Apellido de Soltera', 'text', false)}
        {renderEditableField('age_user', 'Edad', 'number', false)} 
        {renderEditableField('gender_user', 'Género', 'select', false, [
          { value: '', label: 'Seleccionar...' },
          { value: 'female', label: 'Femenino' },
          { value: 'male', label: 'Masculino' },
          { value: 'other', label: 'Otro' }
        ])}
        {renderEditableField('birth_date_user', 'Fecha de Nacimiento', 'date', false)} 
        {renderEditableField('email_user', 'Email', 'email', true)}
        {renderEditableField('phone_user', 'Teléfono', 'tel', true)}
        {renderEditableField('username', 'Nombre de Usuario', 'text', false)}
      </div>
    </div>
  );

  // Renderizar paso 2: Dirección
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">
        Dirección y Ubicación
      </h3>

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
        {renderEditableField('state_code_address', 'Código de Estado', 'text', true)}
        {renderEditableField('postal_code_address', 'Código Postal', 'text', true)}
        {renderEditableField('country_address', 'País', 'text', true)}
      </div>
    </div>
  );

  // Renderizar paso 3: Información Laboral
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">
        Información Laboral
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('company_name_user', 'Nombre de la Empresa', 'text', true)}
        {renderEditableField('company_title_user', 'Título', 'text', true)}
        {renderEditableField('department_company_user', 'Departamento', 'text', true)}
        {renderEditableField('university_user', 'Universidad', 'text', false)}
        {renderEditableField('ein_user', 'EIN', 'text', false)}
        {renderEditableField('ssn_user', 'SSN', 'text', false)}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-md font-medium text-quinary mb-4 text-subtitle">
          Dirección de la Empresa
        </h4>

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
          {renderEditableField('company_street_user', 'Dirección', 'text', false)}
          {renderEditableField('company_city_user', 'Ciudad', 'text', false)}
          {renderEditableField('company_state_user', 'Estado', 'text', false)}
          {renderEditableField('company_state_code_user', 'Código de Estado', 'text', true)}
          {renderEditableField('company_postal_code_user', 'Código Postal', 'text', false)}
          {renderEditableField('company_country_user', 'País', 'text', false)}
        </div>
      </div>
    </div>
  );

  // Renderizar paso 4: Información Bancaria
  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">
        Información Bancaria
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('card_number_user', 'Número de Tarjeta', 'text', true)}
        {renderEditableField('card_expire_user', 'Fecha de Expiración (MM/AAAA)', 'text', true)}
        {renderEditableField('card_type_user', 'Tipo de Tarjeta', 'select', true, [
          { value: '', label: 'Seleccionar...' },
          { value: 'Visa', label: 'Visa' },
          { value: 'MasterCard', label: 'MasterCard' },
          { value: 'American Express', label: 'American Express' },
          { value: 'Discover', label: 'Discover' },
        ])}
        {renderEditableField('currency_user', 'Moneda', 'select', true, [ 
          { value: '', label: 'Seleccionar...' },
          { value: 'USD', label: 'USD' },
          { value: 'EUR', label: 'EUR' },
          { value: 'GBP', label: 'GBP' },
          { value: 'JPY', label: 'JPY' },
          { value: 'CNY', label: 'CNY' }
        ])}
        {renderEditableField('iban_user', 'IBAN', 'text', true)} 
      </div>
    </div>
  );

  // Renderizar paso 5: Información Adicional
  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-quinary mb-4 text-subtitle">
        Información Adicional
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderEditableField('height_user', 'Altura (cm)', 'number', false)}
        {renderEditableField('weight_user', 'Peso (kg)', 'number', false)}
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
        {renderEditableField('eye_color_user', 'Color de Ojos', 'text', false)}
        {renderEditableField('hair_user', 'Color de Cabello', 'text', false)}
        {renderEditableField('ip_user', 'IP', 'text', false)}
        {renderEditableField('mac_address_user', 'Dirección MAC', 'text', false)}
        {renderEditableField('user_agent_user', 'User Agent', 'text', false)}
        {renderEditableField('role_user', 'Rol', 'select', false, [
          { value: 'user', label: 'Usuario' },
          { value: 'admin', label: 'Administrador' },
          { value: 'moderator', label: 'Moderador' }
        ], true)}
        {renderEditableField('image_user', 'Imagen de Perfil', 'file', false)} 
      </div>

      <div className="border-t border-quinary pt-6">
        <h4 className="text-md font-medium text-quinary mb-4 text-subtitle">
          Información de Criptomonedas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderEditableField('coin_user', 'Moneda', 'text', false)}
          {renderEditableField('network_user', 'Red', 'text', false)}
          {renderEditableField('wallet_address_user', 'Wallet', 'text', true)}
        </div>
      </div>
    </div>
  );

  // Renderizar paso actual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
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
            <h1 className="text-3xl font-bold text-quinary mb-2 text-title">
              Configuración de Perfil
            </h1>
            <p className="text-quinary text-paragraph">
              Gestiona tu información personal paso a paso
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-quinary text-paragraph">
                Paso {currentStep} de 5
              </span>
              <span className="text-sm text-quinary text-paragraph">
                {Math.round((currentStep / 5) * 100)}%
              </span>
            </div>
            <div className="w-full bg-quinary/25 rounded-full h-2">
              <div
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between mb-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-paragraph ${
                    step <= currentStep
                      ? "bg-secondary text-quaternary"
                      : "bg-quinary/10 text-quinary"
                  }`}
                >
                  {step}
                </div>
                <span className="text-xs mt-1 text-quinary text-paragraph">
                  {step === 1 && "Personal"}
                  {step === 2 && "Dirección"}
                  {step === 3 && "Laboral"}
                  {step === 4 && "Bancaria"}
                  {step === 5 && "Adicional"}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            {renderCurrentStep()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium text-paragraph ${
                currentStep === 1
                  ? "bg-quinary/20 text-quinary/50 cursor-not-allowed"
                  : "bg-quinary/75 text-quaternary hover:bg-quinary/85 cursor-pointer"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={handleSaveOrNext}
              disabled={isSaving}
              className={`px-6 py-2 rounded-md font-medium font-paragraph ${
                isSaving
                  ? "bg-quinary/20 text-quinary cursor-not-allowed"
                  : "bg-tertiary/80 text-quaternary hover:bg-tertiary cursor-pointer"
              }`}
            >
              {currentStep < 5
                ? isSaving
                  ? "Guardando..."
                  : "Guardar"
                : isSaving
                ? "Guardando..."
                : "Guardar Configuración"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
