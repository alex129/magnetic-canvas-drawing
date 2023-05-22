<script setup lang="ts">
import { SelectOption } from './types';

interface Props {
  label: string;
  type: 'text' | 'number';
  options: SelectOption[];
}

defineProps<Props>();
const modelValue = defineModel();
</script>
<template>
  <div>
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="modelValue"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>
