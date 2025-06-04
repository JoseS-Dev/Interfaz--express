<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
const primaryColor = ref('');
const secondaryColor = ref('');
const ternaryColor = ref('');
const cuarternaryColor = ref('');
const neutralColor = ref('');
const invalidData = ref(false);

const props = defineProps({
    onRefreshListColors: {
        type: Function,
        required: true
    },
    onRefreshColorsPreview: {
        type: Function,
        required: true
    }
});

const onSaveColors = async (event) => {
    event.preventDefault();
    if (!primaryColor.value || !secondaryColor.value || !ternaryColor.value || !cuarternaryColor.value || !neutralColor.value) {
        invalidData.value = true;
        return;
    }
    const colors = {
        primary_color: primaryColor.value.slice(1),
        secondary_color: secondaryColor.value.slice(1),
        ternary_color: ternaryColor.value.slice(1),
        cuarternary_color: cuarternaryColor.value.slice(1),
        neutral_color: neutralColor.value.slice(1),
        is_selected: false
    };
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(colors)
        });
        if (response.ok) {
            props.onRefreshListColors();
            primaryColor.value = '';
            secondaryColor.value = '';
            ternaryColor.value = '';
            cuarternaryColor.value = '';
            neutralColor.value = '';
            const colors = {
                primary_color: '',
                secondary_color: '',
                ternary_color: '',
                cuarternary_color: '',
                neutral_color: ''
            };
            props.onRefreshColorsPreview(colors);
        }
    } catch (error) {
        console.error('Error al guardar los colores:', error);
    }
};

const onInputColor = (event) => {
    const input = event.target;
    invalidData.value = false;
    const colors = {
        primary_color: primaryColor.value.slice(1),
        secondary_color: secondaryColor.value.slice(1),
        ternary_color: ternaryColor.value.slice(1),
        cuarternary_color: cuarternaryColor.value.slice(1),
        neutral_color: neutralColor.value.slice(1)
    };
    props.onRefreshColorsPreview(colors);

};

const onEditColors = async (event) => {
    event.preventDefault();
    if (!primaryColor.value || !secondaryColor.value || !ternaryColor.value || !cuarternaryColor.value || !neutralColor.value) {
        invalidData.value = true;
        return;
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors`);
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        const listColors = await response.json();
        const selectedColor = listColors.find((color) => color.is_selected === 1);
        const otherResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/${selectedColor.id_colors}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primary_color: primaryColor.value.slice(1),
                secondary_color: secondaryColor.value.slice(1),
                ternary_color: ternaryColor.value.slice(1),
                cuarternary_color: cuarternaryColor.value.slice(1),
                neutral_color: neutralColor.value.slice(1),
                is_selected: true
            })
        });
        if (!otherResponse.ok) throw new Error(`Error de API: ${otherResponse.status}`);
        props.onRefreshListColors();
        primaryColor.value = '';
        secondaryColor.value = '';
        ternaryColor.value = '';
        cuarternaryColor.value = '';
        neutralColor.value = '';
        const colors = {
            primary_color: '',
            secondary_color: '',
            ternary_color: '',
            cuarternary_color: '',
            neutral_color: ''
        };
        props.onRefreshColorsPreview(colors);
    } catch (error) {
        console.error('Error al editar los colores:', error);
    }
}
</script>

<template>
    <form class="w-full h-152 flex flex-col items-center gap-5 px-2 py-3">
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" for="primary_color">Color
                Primario</label>
            <input class="w-full h-full" v-model="primaryColor" @input="onInputColor" type="color"
                placeholder="Ingrese el color primario de la platilla" name="primary_color" id="primary_color"
                required />
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" for="secondary_color">Color
                Secundario</label>
            <input class="w-full h-full" v-model="secondaryColor" @input="onInputColor" type="color"
                name="secondary_color" id="secondary_color" required />
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700">Color Terciario</label>
            <input class="w-full h-full" v-model="ternaryColor" @input="onInputColor" type="color" name="ternary_color"
                id="ternary_color" required />
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700">Color cuaternario</label>
            <input class="w-full h-full" v-model="cuarternaryColor" @input="onInputColor" type="color"
                name="cuarternary_color" id="cuarternary_color" required />
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700">Color neutral</label>
            <input class="w-full h-full" v-model="neutralColor" @input="onInputColor" type="color" name="neutral_color"
                id="neutral_color" required />
        </div>
        <span v-if="invalidData" class="text-red-600">Complete todos los campos.</span>
        <div class="w-full flex justify-between">
            <button type="submit"
                class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3"
                @click="onSaveColors">
                Crear
            </button>
            <button type="submit"
                class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3"
                @click="onEditColors">
                Editar
            </button>
        </div>
    </form>
</template>