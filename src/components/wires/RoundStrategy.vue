<script setup lang="ts">
import RoundWire from '@/domain/wires/RoundWire';
import Input from '../Input.vue';

interface Props {
  color: string;
  title: string;
}

defineProps<Props>();
const wire = defineModel<RoundWire>();
</script>
<template>
  <div class="grid place-content-center" v-if="wire">
    <h3 class="text-center mt-5" :class="`${color}`">{{ title }}</h3>

    <div class="mt-5 flex flex-wrap gap-5">
      <Input type="number" label="Number Turns" v-model="wire.number_turns" />
      <Input type="number" label="Number Layers" v-model="wire.number_layers" />
      <Input type="number" label="Number Parallels" v-model="wire.number_parallels" />
      <Input type="number" label="Width" v-model="wire.total_width" />
    </div>
  </div>
</template>
<style scoped>
.wiring-primary {
  color: #33e7ff;
}
.wiring-secondary {
  color: #ebac23;
}
</style>
