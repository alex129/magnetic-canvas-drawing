<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MagneticDrawer from './services/magnetic-drawer/MagneticDrawer';
import { fabric } from 'fabric';
import Input from './components/Input.vue';

const coreThickness = ref<number>(10);
let magneticDrawer: MagneticDrawer;

const drawMagnetic = () => {
  const canvas = new fabric.Canvas('draw');
  magneticDrawer = new MagneticDrawer(canvas);
  magneticDrawer.drawCore(coreThickness.value);
  magneticDrawer.drawGap();
};

onMounted(() => {
  drawMagnetic();
});
</script>

<template>
  <div class="container flex justify-center mt-10">
    <div class="grid space-y-5 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm">
      <h1 class="text-center text-blue-900 font-bold">CORE DRAWING</h1>
      <canvas ref="canvas" id="draw"></canvas>
      <div class="mt-5 flex flex-wrap">
        <Input type="number" label="Core Thicknes" v-model="coreThickness" @change="drawMagnetic" />
      </div>
    </div>
  </div>
</template>
