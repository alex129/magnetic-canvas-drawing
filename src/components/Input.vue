<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  type: 'text' | 'number';
  modelValue: string | number;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue ?? 0;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
</script>
<template>
  <div>
    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <input
      :type="type"
      id="small-input"
      class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      v-model="value"
      min="0"
    />
  </div>
</template>
