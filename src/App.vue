<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MagneticDrawer from './services/magnetic-drawer/MagneticDrawer';
import { fabric } from 'fabric';
import Input from './components/Input.vue';
import Core from './domain/Core';

const core = ref<Core>(new Core());
let magneticDrawer: MagneticDrawer;
let canvas: fabric.Canvas;

const drawMagnetic = () => {
  console.log(core.value);
  magneticDrawer = new MagneticDrawer(canvas);
  magneticDrawer.drawCore(core.value);
  magneticDrawer.drawGap();
};

onMounted(() => {
  canvas = new fabric.Canvas('draw');
  drawMagnetic();
});
</script>

<template>
  <div class="container flex justify-center mt-10">
    <div class="grid space-y-5 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm">
      <h1 class="text-center text-blue-900 font-bold">CORE DRAWING</h1>
      <canvas id="draw"></canvas>
      <div class="mt-5 flex flex-wrap">
        <Input type="number" label="Core Thicknes" v-model="core.thickness" @change="drawMagnetic" />
      </div>
    </div>
  </div>
</template>
