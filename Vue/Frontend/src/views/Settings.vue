<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

// Assuming similar services and composables exist in the Vue project
// The paths might need adjustment based on the actual project structure.
import { useAuthStore } from '@/store/AuthStore';
import { userProfileService } from '@/services/userProfileService';
import MapSelector from '@/components/MapSelector.vue'; // Assuming a MapSelector component exists

// Interfaces (can be moved to a types file)
interface UserProfile {
  id_user: number;
  name_user: string;
  maiden_name_user: string;
  email_user: string;
  username: string;
  role_user: string | null;
  age_user: number | null;
  phone_user: string | null;
  birth_date_user: string | null;
  gender_user: string | null;
  image_user: string | null;
  blood_group_user: string | null;
  height_user: number | null;
  weight_user: number | null;
  eye_color_user: string | null;
  hair_user: string | null;
  ip_user: string | null;
  mac_address_user: string | null;
  university_user: string | null;
  ein_user: string | null;
  ssn_user: string | null;
  user_agent_user: string | null;
  street_address: string | null;
  city_address: string | null;
  state_address: string | null;
  state_code_address: string | null;
  postal_code_address: string | null;
  latitude_address: number | null;
  longitude_address: number | null;
  country_address: string | null;
  card_expire_user: string | null;
  card_number_user: string | null;
  card_type_user: string | null;
  currency_user: string | null;
  iban_user: string | null;
  department_company_user: string | null;
  company_name_user: string | null;
  company_title_user: string | null;
  company_street_user: string | null;
  company_city_user: string | null;
  company_state_user: string | null;
  company_state_code_user: string | null;
  company_postal_code_user: string | null;
  company_latitude_user: number | null;
  company_longitude_user: number | null;
  company_country_user: string | null;
  coin_user: string | null;
  wallet_address_user: string | null;
  network_user: string | null;
}

interface LocationData {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
}

interface FormErrors {
  [key: string]: string;
}

// Helper function for date formatting
const formatCardExpirationForBackend = (dateString: string | null): string | null => {
    if (!dateString) return null;

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (isoDateRegex.test(dateString)) {
        const parsed = new Date(dateString);
        if (!isNaN(parsed.getTime())) {
            return dateString; 
        }
    }

    const mmYyMatch = dateString.match(/^(0[1-9]|1[0-2])\/(\d{2,4})$/);
    if (mmYyMatch) {
        let [_, month, yearStr] = mmYyMatch;
        let year = parseInt(yearStr);

        if (yearStr.length === 2) {
            const currentFullYear = new Date().getFullYear();
            year += (year > (currentFullYear % 100) + 10) ? 1900 : 2000;
        }
        return `${year}-${month}-01`;
    }

    return null;
};

// Component Logic
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const logout = authStore.clearAuth;

const currentStep = ref(1);
const isLoading = ref(true);
const isSaving = ref(false);
const hasUnsavedChanges = ref(false);
const errors = reactive<FormErrors>({});

const initialFormData: UserProfile = {
    id_user: 0, name_user: '', maiden_name_user: '', email_user: '', username: '', role_user: '',
    age_user: null, phone_user: null, birth_date_user: null, gender_user: null, image_user: null,
    blood_group_user: null, height_user: null, weight_user: null, eye_color_user: null, hair_user: null,
    ip_user: null, mac_address_user: null, university_user: null, ein_user: null, ssn_user: null,
    user_agent_user: null, street_address: null, city_address: null, state_address: null,
    state_code_address: null, postal_code_address: null, latitude_address: null, longitude_address: null,
    country_address: null, card_expire_user: null, card_number_user: null, card_type_user: null,
    currency_user: null, iban_user: null, department_company_user: null, company_name_user: null,
    company_title_user: null, company_street_user: null, company_city_user: null, company_state_user: null,
    company_state_code_user: null, company_postal_code_user: null, company_latitude_user: null,
    company_longitude_user: null, company_country_user: null, coin_user: null, wallet_address_user: null,
    network_user: null,
};

const formData = reactive<UserProfile>({ ...initialFormData });
const originalData = ref<UserProfile | null>(null);

onMounted(async () => {
  if (user.value?.id_user) {
    isLoading.value = true;
    try {
      const profile = await userProfileService.getUserProfile(user.value.id_user);
      if (profile) {
        Object.assign(formData, profile);
        originalData.value = JSON.parse(JSON.stringify(profile));
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
      Swal.fire('Error', 'No se pudo cargar el perfil del usuario.', 'error');
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
});

const handleInputChange = (field: keyof UserProfile, value: any) => {
  (formData[field] as any) = value;
  hasUnsavedChanges.value = true;
  if (errors[field]) {
    delete errors[field];
  }
};

const handleLocationSelect = (location: LocationData) => {
  formData.street_address = location.address;
  formData.city_address = location.city;
  formData.state_address = location.state;
  formData.country_address = location.country;
  formData.postal_code_address = location.postalCode;
  formData.latitude_address = location.lat;
  formData.longitude_address = location.lng;
  hasUnsavedChanges.value = true;
};

const handleCompanyLocationSelect = (location: LocationData) => {
  formData.company_street_user = location.address;
  formData.company_city_user = location.city;
  formData.company_state_user = location.state;
  formData.company_country_user = location.country;
  formData.company_postal_code_user = location.postalCode;
  formData.company_latitude_user = location.lat;
  formData.company_longitude_user = location.lng;
  hasUnsavedChanges.value = true;
};

const requiredFieldsByStep: { [key: number]: (keyof UserProfile)[] } = {
    1: ['name_user', 'email_user', 'phone_user'],
    2: ['street_address', 'city_address', 'state_address', 'postal_code_address', 'country_address', 'state_code_address'],
    3: ['company_name_user', 'company_title_user', 'department_company_user', 'company_state_code_user'],
    4: ['card_number_user', 'card_expire_user', 'iban_user', 'currency_user'],
    5: ['blood_group_user', 'height_user', 'weight_user', 'eye_color_user', 'hair_user', 'ip_user', 'mac_address_user', 'user_agent_user', 'role_user', 'coin_user', 'wallet_address_user', 'network_user']
};

const validateCurrentStep = (): boolean => {
    Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors]);
    const newErrors: FormErrors = {};
    const fieldsToValidate = requiredFieldsByStep[currentStep.value] || [];

    fieldsToValidate.forEach(field => {
        const value = formData[field];
        // Simplified validation logic, can be expanded as in React component
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            newErrors[field] = 'Este campo es requerido';
        }
    });

    Object.assign(errors, newErrors);
    if (Object.keys(newErrors).length > 0) {
        const firstErrorField = Object.keys(newErrors)[0];
        Swal.fire({
            title: "Error de validación",
            text: `El campo "${firstErrorField}" es inválido: ${newErrors[firstErrorField]}`,
            icon: "error",
            confirmButtonColor: "#3085d6",
        });
        return false;
    }
    return true;
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSaveOrNext = async () => {
    if (!validateCurrentStep()) return;

    const dataToSend = { ...formData };

    if (dataToSend.card_expire_user) {
        dataToSend.card_expire_user = formatCardExpirationForBackend(dataToSend.card_expire_user);
        if (!dataToSend.card_expire_user) {
            Swal.fire('Error', 'Error interno al formatear la fecha de expiración.', 'error');
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

    if (currentStep.value < 5) {
        currentStep.value++;
    } else {
        isSaving.value = true;
        try {
            dataToSend.age_user = dataToSend.age_user ? Number(dataToSend.age_user) : null;
            dataToSend.height_user = dataToSend.height_user ? Number(dataToSend.height_user) : null;
            dataToSend.weight_user = dataToSend.weight_user ? Number(dataToSend.weight_user) : null;
            
            const result = await userProfileService.updateUserProfile(user.value!.id_user, dataToSend);
            if (result.success) {
                originalData.value = JSON.parse(JSON.stringify(formData));
                hasUnsavedChanges.value = false;
                await Swal.fire("¡Éxito!", result.message, "success");
                router.push("/");
            } else {
                Swal.fire("Error", result.message, "error");
            }
        } catch (error) {
            Swal.fire("Error", "Error al guardar los cambios", "error");
        } finally {
            isSaving.value = false;
        }
    }
};

const stepComponents = [
  'Step1Form',
  'Step2Form',
  'Step3Form',
  'Step4Form',
  'Step5Form'
];

const currentStepComponent = computed(() => {
  // This would be better with dynamic components, but for a direct translation:
  return `renderStep${currentStep.value}`;
});

</script>

<template>
  <div class="min-h-screen bg-primary text-quinary">
    <!-- Assuming a Navbar component exists -->
    <!-- <Navbar /> -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="w-32 h-32 border-b-2 rounded-full animate-spin border-secondary"></div>
    </div>
    <div v-else class="max-w-4xl px-4 py-8 mx-auto font-primary">
      <div class="p-6 rounded-lg shadow-lg bg-quaternary">
        <h2 class="mb-2 text-2xl font-bold text-title">Configuración de Perfil</h2>
        <p class="mb-8 text-paragraph">Completa y gestiona tu información.</p>

        <!-- Stepper -->
        <div class="flex items-center justify-between mb-8">
          <div v-for="step in 5" :key="step" class="flex items-center">
            <div class="flex items-center" :class="{ 'text-secondary': currentStep >= step, 'text-quinary/50': currentStep < step }">
              <div class="flex items-center justify-center w-8 h-8 border-2 rounded-full" :class="{ 'border-secondary': currentStep >= step, 'border-quinary/50': currentStep < step }">
                {{ step }}
              </div>
              <span class="ml-2 text-sm font-medium">{{ ['Personal', 'Dirección', 'Laboral', 'Bancaria', 'Adicional'][step - 1] }}</span>
            </div>
            <div v-if="step < 5" class="flex-auto mx-4 border-t-2" :class="{ 'border-secondary': currentStep > step, 'border-quinary/50': currentStep <= step }"></div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="mb-8">
          <!-- Step 1 -->
          <div v-if="currentStep === 1" class="space-y-6">
             <h3 class="mb-4 text-lg font-semibold text-quinary text-subtitle">Información Personal</h3>
             <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- name_user -->
                <div>
                    <label for="name_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Nombre</label>
                    <input type="text" id="name_user" v-model="formData.name_user" @input="handleInputChange('name_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.name_user, 'border-quinary/25': !errors.name_user }]">
                    <p v-if="errors.name_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.name_user }}</p>
                </div>
                <!-- maiden_name_user -->
                <div>
                    <label for="maiden_name_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Apellido de Soltera</label>
                    <input type="text" id="maiden_name_user" v-model="formData.maiden_name_user" @input="handleInputChange('maiden_name_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
                <!-- age_user -->
                <div>
                    <label for="age_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Edad</label>
                    <input type="number" id="age_user" v-model="formData.age_user" @input="handleInputChange('age_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.age_user, 'border-quinary/25': !errors.age_user }]">
                    <p v-if="errors.age_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.age_user }}</p>
                </div>
                <!-- gender_user -->
                <div>
                    <label for="gender_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Género</label>
                    <select id="gender_user" v-model="formData.gender_user" @change="handleInputChange('gender_user', ($event.target as HTMLSelectElement).value)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                        <option value="">Seleccionar...</option>
                        <option value="female">Femenino</option>
                        <option value="male">Masculino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
                <!-- birth_date_user -->
                <div>
                    <label for="birth_date_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Fecha de Nacimiento</label>
                    <input type="date" id="birth_date_user" v-model="formData.birth_date_user" @input="handleInputChange('birth_date_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
                <!-- email_user -->
                <div>
                    <label for="email_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Email</label>
                    <input type="email" id="email_user" v-model="formData.email_user" @input="handleInputChange('email_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.email_user, 'border-quinary/25': !errors.email_user }]">
                    <p v-if="errors.email_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.email_user }}</p>
                </div>
                <!-- phone_user -->
                <div>
                    <label for="phone_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Teléfono</label>
                    <input type="tel" id="phone_user" v-model="formData.phone_user" @input="handleInputChange('phone_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.phone_user, 'border-quinary/25': !errors.phone_user }]">
                    <p v-if="errors.phone_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.phone_user }}</p>
                </div>
                <!-- username -->
                <div>
                    <label for="username" class="block text-sm font-medium text-quinary/75 text-paragraph">Nombre de Usuario</label>
                    <input type="text" id="username" v-model="formData.username" @input="handleInputChange('username', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
             </div>
          </div>
          <!-- Step 2 -->
          <div v-if="currentStep === 2" class="space-y-6">
             <h3 class="mb-4 text-lg font-semibold text-quinary text-subtitle">Dirección y Ubicación</h3>
             <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-quinary text-paragraph">Selecciona tu ubicación en el mapa</label>
                <MapSelector @location-select="handleLocationSelect" :initial-lat="formData.latitude_address || 51.505" :initial-lng="formData.longitude_address || -0.09" height="300px" />
             </div>
             <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- street_address -->
                <div>
                    <label for="street_address" class="block text-sm font-medium text-quinary/75 text-paragraph">Dirección</label>
                    <input type="text" id="street_address" v-model="formData.street_address" @input="handleInputChange('street_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.street_address, 'border-quinary/25': !errors.street_address }]">
                    <p v-if="errors.street_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.street_address }}</p>
                </div>
                <!-- city_address -->
                <div>
                    <label for="city_address" class="block text-sm font-medium text-quinary/75 text-paragraph">Ciudad</label>
                    <input type="text" id="city_address" v-model="formData.city_address" @input="handleInputChange('city_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.city_address, 'border-quinary/25': !errors.city_address }]">
                    <p v-if="errors.city_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.city_address }}</p>
                </div>
                <!-- state_address -->
                <div>
                    <label for="state_address" class="block text-sm font-medium text-quinary/75 text-paragraph">Estado</label>
                    <input type="text" id="state_address" v-model="formData.state_address" @input="handleInputChange('state_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.state_address, 'border-quinary/25': !errors.state_address }]">
                    <p v-if="errors.state_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.state_address }}</p>
                </div>
                <!-- state_code_address -->
                <div>
                    <label for="state_code_address" class="block text-sm font-medium text-quinary/75 text-paragraph">Código de Estado</label>
                    <input type="text" id="state_code_address" v-model="formData.state_code_address" @input="handleInputChange('state_code_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.state_code_address, 'border-quinary/25': !errors.state_code_address }]">
                    <p v-if="errors.state_code_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.state_code_address }}</p>
                </div>
                <!-- postal_code_address -->
                <div>
                    <label for="postal_code_address" class="block text-sm font-medium text-quinary/75 text-paragraph">Código Postal</label>
                    <input type="text" id="postal_code_address" v-model="formData.postal_code_address" @input="handleInputChange('postal_code_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.postal_code_address, 'border-quinary/25': !errors.postal_code_address }]">
                    <p v-if="errors.postal_code_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.postal_code_address }}</p>
                </div>
                <!-- country_address -->
                <div>
                    <label for="country_address" class="block text-sm font-medium text-quinary/75 text-paragraph">País</label>
                    <input type="text" id="country_address" v-model="formData.country_address" @input="handleInputChange('country_address', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.country_address, 'border-quinary/25': !errors.country_address }]">
                    <p v-if="errors.country_address" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.country_address }}</p>
                </div>
             </div>
          </div>
          <!-- Step 3 -->
          <div v-if="currentStep === 3" class="space-y-6">
             <h3 class="mb-4 text-lg font-semibold text-quinary text-subtitle">Información Laboral</h3>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- company_name_user -->
                <div>
                    <label for="company_name_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Nombre de la Empresa</label>
                    <input type="text" id="company_name_user" v-model="formData.company_name_user" @input="handleInputChange('company_name_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.company_name_user, 'border-quinary/25': !errors.company_name_user }]">
                    <p v-if="errors.company_name_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.company_name_user }}</p>
                </div>
                <!-- company_title_user -->
                <div>
                    <label for="company_title_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Título</label>
                    <input type="text" id="company_title_user" v-model="formData.company_title_user" @input="handleInputChange('company_title_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.company_title_user, 'border-quinary/25': !errors.company_title_user }]">
                    <p v-if="errors.company_title_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.company_title_user }}</p>
                </div>
                <!-- department_company_user -->
                <div>
                    <label for="department_company_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Departamento</label>
                    <input type="text" id="department_company_user" v-model="formData.department_company_user" @input="handleInputChange('department_company_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.department_company_user, 'border-quinary/25': !errors.department_company_user }]">
                    <p v-if="errors.department_company_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.department_company_user }}</p>
                </div>
                <!-- university_user -->
                <div>
                    <label for="university_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Universidad</label>
                    <input type="text" id="university_user" v-model="formData.university_user" @input="handleInputChange('university_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
                <!-- ein_user -->
                <div>
                    <label for="ein_user" class="block text-sm font-medium text-quinary/75 text-paragraph">EIN</label>
                    <input type="text" id="ein_user" v-model="formData.ein_user" @input="handleInputChange('ein_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
                <!-- ssn_user -->
                <div>
                    <label for="ssn_user" class="block text-sm font-medium text-quinary/75 text-paragraph">SSN</label>
                    <input type="text" id="ssn_user" v-model="formData.ssn_user" @input="handleInputChange('ssn_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
              </div>
              <div class="pt-6 border-t">
                <h4 class="mb-4 font-medium text-md text-quinary text-subtitle">Dirección de la Empresa</h4>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-quinary text-paragraph">Selecciona la ubicación de la empresa en el mapa</label>
                    <MapSelector @location-select="handleCompanyLocationSelect" :initial-lat="formData.company_latitude_user || 51.505" :initial-lng="formData.company_longitude_user || -0.09" height="300px" />
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <!-- company_street_user -->
                    <div>
                        <label for="company_street_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Dirección</label>
                        <input type="text" id="company_street_user" v-model="formData.company_street_user" @input="handleInputChange('company_street_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                    </div>
                    <!-- company_city_user -->
                    <div>
                        <label for="company_city_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Ciudad</label>
                        <input type="text" id="company_city_user" v-model="formData.company_city_user" @input="handleInputChange('company_city_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                    </div>
                    <!-- company_state_user -->
                    <div>
                        <label for="company_state_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Estado</label>
                        <input type="text" id="company_state_user" v-model="formData.company_state_user" @input="handleInputChange('company_state_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                    </div>
                    <!-- company_state_code_user -->
                    <div>
                        <label for="company_state_code_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Código de Estado</label>
                        <input type="text" id="company_state_code_user" v-model="formData.company_state_code_user" @input="handleInputChange('company_state_code_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.company_state_code_user, 'border-quinary/25': !errors.company_state_code_user }]">
                         <p v-if="errors.company_state_code_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.company_state_code_user }}</p>
                    </div>
                    <!-- company_postal_code_user -->
                    <div>
                        <label for="company_postal_code_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Código Postal</label>
                        <input type="text" id="company_postal_code_user" v-model="formData.company_postal_code_user" @input="handleInputChange('company_postal_code_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                    </div>
                    <!-- company_country_user -->
                    <div>
                        <label for="company_country_user" class="block text-sm font-medium text-quinary/75 text-paragraph">País</label>
                        <input type="text" id="company_country_user" v-model="formData.company_country_user" @input="handleInputChange('company_country_user', ($event.target as HTMLInputElement).value)" class="w-full px-3 py-2 border rounded-md font-primary focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                    </div>
                </div>
              </div>
          </div>
          <!-- Step 4 -->
          <div v-if="currentStep === 4" class="space-y-6">
             <h3 class="mb-4 text-lg font-semibold text-quinary text-subtitle">Información Bancaria</h3>
             <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- card_number_user -->
                <div>
                    <label for="card_number_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Número de Tarjeta</label>
                    <input type="text" id="card_number_user" v-model="formData.card_number_user" @input="handleInputChange('card_number_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.card_number_user, 'border-quinary/25': !errors.card_number_user }]">
                    <p v-if="errors.card_number_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.card_number_user }}</p>
                </div>
                <!-- card_expire_user -->
                <div>
                    <label for="card_expire_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Fecha de Expiración (MM/AAAA)</label>
                    <input type="text" id="card_expire_user" v-model="formData.card_expire_user" @input="handleInputChange('card_expire_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.card_expire_user, 'border-quinary/25': !errors.card_expire_user }]">
                    <p v-if="errors.card_expire_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.card_expire_user }}</p>
                </div>
                <!-- card_type_user -->
                <div>
                    <label for="card_type_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Tipo de Tarjeta</label>
                    <select id="card_type_user" v-model="formData.card_type_user" @change="handleInputChange('card_type_user', ($event.target as HTMLSelectElement).value)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                        <option value="">Seleccionar...</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="American Express">American Express</option>
                        <option value="Discover">Discover</option>
                    </select>
                </div>
                <!-- currency_user -->
                <div>
                    <label for="currency_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Moneda</label>
                    <select id="currency_user" v-model="formData.currency_user" @change="handleInputChange('currency_user', ($event.target as HTMLSelectElement).value)" :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.currency_user, 'border-quinary/25': !errors.currency_user }]">
                        <option value="">Seleccionar...</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="CNY">CNY</option>
                    </select>
                    <p v-if="errors.currency_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.currency_user }}</p>
                </div>
                <!-- iban_user -->
                <div>
                    <label for="iban_user" class="block text-sm font-medium text-quinary/75 text-paragraph">IBAN</label>
                    <input type="text" id="iban_user" v-model="formData.iban_user" @input="handleInputChange('iban_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.iban_user, 'border-quinary/25': !errors.iban_user }]">
                    <p v-if="errors.iban_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.iban_user }}</p>
                </div>
             </div>
          </div>
          <!-- Step 5 -->
          <div v-if="currentStep === 5" class="space-y-6">
             <h3 class="mb-4 text-lg font-semibold text-quinary text-subtitle">Información Adicional</h3>
             <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- height_user -->
                <div>
                    <label for="height_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Altura (cm)</label>
                    <input type="number" id="height_user" v-model="formData.height_user" @input="handleInputChange('height_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.height_user, 'border-quinary/25': !errors.height_user }]">
                    <p v-if="errors.height_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.height_user }}</p>
                </div>
                <!-- weight_user -->
                <div>
                    <label for="weight_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Peso (kg)</label>
                    <input type="number" id="weight_user" v-model="formData.weight_user" @input="handleInputChange('weight_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.weight_user, 'border-quinary/25': !errors.weight_user }]">
                    <p v-if="errors.weight_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.weight_user }}</p>
                </div>
                <!-- blood_group_user -->
                <div>
                    <label for="blood_group_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Grupo Sanguíneo</label>
                    <select id="blood_group_user" v-model="formData.blood_group_user" @change="handleInputChange('blood_group_user', ($event.target as HTMLSelectElement).value)" :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.blood_group_user, 'border-quinary/25': !errors.blood_group_user }]">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <p v-if="errors.blood_group_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.blood_group_user }}</p>
                </div>
                <!-- eye_color_user -->
                <div>
                    <label for="eye_color_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Color de Ojos</label>
                    <input type="text" id="eye_color_user" v-model="formData.eye_color_user" @input="handleInputChange('eye_color_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.eye_color_user, 'border-quinary/25': !errors.eye_color_user }]">
                    <p v-if="errors.eye_color_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.eye_color_user }}</p>
                </div>
                <!-- hair_user -->
                <div>
                    <label for="hair_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Color de Cabello</label>
                    <input type="text" id="hair_user" v-model="formData.hair_user" @input="handleInputChange('hair_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.hair_user, 'border-quinary/25': !errors.hair_user }]">
                    <p v-if="errors.hair_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.hair_user }}</p>
                </div>
                <!-- ip_user -->
                <div>
                    <label for="ip_user" class="block text-sm font-medium text-quinary/75 text-paragraph">IP</label>
                    <input type="text" id="ip_user" v-model="formData.ip_user" @input="handleInputChange('ip_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.ip_user, 'border-quinary/25': !errors.ip_user }]">
                    <p v-if="errors.ip_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.ip_user }}</p>
                </div>
                <!-- mac_address_user -->
                <div>
                    <label for="mac_address_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Dirección MAC</label>
                    <input type="text" id="mac_address_user" v-model="formData.mac_address_user" @input="handleInputChange('mac_address_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.mac_address_user, 'border-quinary/25': !errors.mac_address_user }]">
                    <p v-if="errors.mac_address_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.mac_address_user }}</p>
                </div>
                <!-- user_agent_user -->
                <div>
                    <label for="user_agent_user" class="block text-sm font-medium text-quinary/75 text-paragraph">User Agent</label>
                    <input type="text" id="user_agent_user" v-model="formData.user_agent_user" @input="handleInputChange('user_agent_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.user_agent_user, 'border-quinary/25': !errors.user_agent_user }]">
                    <p v-if="errors.user_agent_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.user_agent_user }}</p>
                </div>
                <!-- role_user -->
                <div>
                    <label for="role_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Rol</label>
                    <select id="role_user" v-model="formData.role_user" @change="handleInputChange('role_user', ($event.target as HTMLSelectElement).value)" disabled :class="['w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.role_user, 'border-quinary/25': !errors.role_user }]">
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                        <option value="moderator">Moderador</option>
                    </select>
                    <p v-if="errors.role_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.role_user }}</p>
                </div>
                <!-- image_user -->
                <div>
                    <label for="image_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Imagen de Perfil</label>
                    <input type="file" id="image_user" @change="handleInputChange('image_user', ($event.target as HTMLInputElement).files)" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50 border-quinary/25">
                </div>
             </div>
             <div class="pt-6 border-t border-quinary">
                <h4 class="mb-4 font-medium text-md text-quinary text-subtitle">Información de Criptomonedas</h4>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <!-- coin_user -->
                    <div>
                        <label for="coin_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Moneda</label>
                        <input type="text" id="coin_user" v-model="formData.coin_user" @input="handleInputChange('coin_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.coin_user, 'border-quinary/25': !errors.coin_user }]">
                        <p v-if="errors.coin_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.coin_user }}</p>
                    </div>
                    <!-- network_user -->
                    <div>
                        <label for="network_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Red</label>
                        <input type="text" id="network_user" v-model="formData.network_user" @input="handleInputChange('network_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.network_user, 'border-quinary/25': !errors.network_user }]">
                        <p v-if="errors.network_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.network_user }}</p>
                    </div>
                    <!-- wallet_address_user -->
                    <div>
                        <label for="wallet_address_user" class="block text-sm font-medium text-quinary/75 text-paragraph">Wallet</label>
                        <input type="text" id="wallet_address_user" v-model="formData.wallet_address_user" @input="handleInputChange('wallet_address_user', ($event.target as HTMLInputElement).value)" :class="['font-primary w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-paragraph text-quinary bg-primary/50', { 'border-tertiary': errors.wallet_address_user, 'border-quinary/25': !errors.wallet_address_user }]">
                        <p v-if="errors.wallet_address_user" class="mt-1 text-sm text-tertiary text-paragraph">{{ errors.wallet_address_user }}</p>
                    </div>
                </div>
             </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between">
          <button @click="prevStep" :disabled="currentStep === 1" class="px-6 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400">
            Anterior
          </button>
          <button @click="handleSaveOrNext" :disabled="isSaving" class="px-6 py-2 text-white rounded-md bg-secondary hover:bg-secondary/90 disabled:bg-secondary/50">
            <span v-if="isSaving">Guardando...</span>
            <span v-else>{{ currentStep < 5 ? 'Siguiente' : 'Guardar Cambios' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Using Tailwind CSS, so limited custom styles are needed. */
/* You can add component-specific styles here if necessary. */
.text-title {
  color: var(--color-text-title);
}
.text-subtitle {
  color: var(--color-text-subtitle);
}
.text-paragraph {
  color: var(--color-text-paragraph);
}
.bg-primary {
  background-color: var(--color-bg-primary);
}
.bg-secondary {
    background-color: var(--color-bg-secondary);
}
.bg-quaternary {
    background-color: var(--color-bg-quaternary);
}
.text-quinary {
    color: var(--color-text-quinary);
}
.border-secondary {
    border-color: var(--color-border-secondary);
}
</style>
