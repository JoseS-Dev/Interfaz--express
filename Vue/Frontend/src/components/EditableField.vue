<template>
  <div>
    <label class="block text-sm font-medium text-quinary/75 text-paragraph">{{ label }} {{ required ? '*' : '' }}</label>
    <select v-if="type === 'select'" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled" class="w-full px-3 py-2 border rounded-md bg-primary/50 text-quinary" :class="error ? 'border-tertiary' : 'border-quinary/25'">
      <option value="">Seleccionar...</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    <input v-else-if="type === 'file'" type="file" @change="$emit('update:modelValue', $event.target.files[0])" class="w-full px-3 py-2 border rounded-md bg-primary/50 text-quinary" :class="error ? 'border-tertiary' : 'border-quinary/25'" />
    <input v-else :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="w-full px-3 py-2 border rounded-md bg-primary/50 text-quinary" :class="error ? 'border-tertiary' : 'border-quinary/25'" />
    <p v-if="error" class="text-tertiary text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'label', 'type', 'required', 'options', 'disabled', 'error']);
defineEmits(['update:modelValue']);
</script>
