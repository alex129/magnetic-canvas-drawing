<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MagneticDrawer from './services/magnetic-drawer/MagneticDrawer';
import { fabric } from 'fabric';
import Input from './components/Input.vue';
import Core from './domain/Core';
import CoilFormer from './domain/CoilFormer';
import Gap from './domain/Gap';
import Wiring from './domain/Wiring';
import WiringOptions from './enum/Wirings';

interface State {
  core: Core;
  coilFormer: CoilFormer;
  gaps: Gap[];
  gapLength: number;
  numberGaps: number;
  wirings: Wiring[];
  wiringArragement: number[];
}

const state = ref<State>({
  core: new Core(),
  coilFormer: new CoilFormer(),
  gaps: [],
  wirings: [new Wiring(), new Wiring()],
  gapLength: 10,
  numberGaps: 1,
  wiringArragement: [],
});
let magneticDrawer: MagneticDrawer;
let canvas: fabric.Canvas;

const drawMagnetic = () => {
  magneticDrawer = new MagneticDrawer(canvas, state.value.core, state.value.coilFormer, state.value.gaps, state.value.wirings, state.value.wiringArragement);
  // magneticDrawer.drawCore();
  // magneticDrawer.drawGap();
  // magneticDrawer.drawBobbin();
  // magneticDrawer.drawWiring();
  magneticDrawer.drawToroid();
};

const refreshNumberGaps = () => {
  state.value.gaps = [];
  for (let index = 0; index < state.value.numberGaps; index++) {
    state.value.gaps.push({
      gap_length: state.value.gapLength,
      fringing_factor: 0,
    });
  }

  drawMagnetic();
};

const setUpWiringArragement = () => {
  state.value.wiringArragement = state.value.wirings.map((_wire, wireIndex) => wireIndex);
};

onMounted(() => {
  canvas = new fabric.Canvas('draw');
  setUpWiringArragement();
  refreshNumberGaps();
  drawMagnetic();
});
</script>

<template>
  <div class="container flex justify-center mt-10">
    <div class="grid space-y-5 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm">
      <div class="grid place-content-center gap-10">
        <h1 class="text-center text-blue-900 font-bold">CORE DRAWING</h1>

        <div class="grid place-content-center text-sm">
          <span class="text-center font-bold">WIRING ARRAGEMENT</span>

          <div class="grid place" v-for="index in state.wiringArragement" :key="index">
            <span class="text-center mt-5" :class="`${WiringOptions[index].color_code}`">{{ index + 1 }} {{ WiringOptions[index].title }}</span>
          </div>
        </div>

        <canvas id="draw"></canvas>
      </div>
      <div class="grid place-content-center">
        <h3 class="text-center font-bold">CORE</h3>

        <div class="mt-5 flex flex-wrap gap-5">
          <Input type="number" label="Thickness" v-model="state.core.thickness" @change="drawMagnetic" />
          <Input type="number" label="Width" v-model="state.core.width" @change="drawMagnetic" />
          <Input type="number" label="Height" v-model="state.core.height" @change="drawMagnetic" />
        </div>
      </div>

      <div class="grid place-content-center">
        <h3 class="text-center font-bold">GAP</h3>

        <div class="mt-5 flex flex-wrap gap-5">
          <Input type="number" label="Number Gaps" v-model="state.numberGaps" @change="refreshNumberGaps" />
          <Input type="number" label="Gap Length" v-model="state.gapLength" @change="refreshNumberGaps" />
        </div>
      </div>

      <div class="grid place-content-center">
        <h3 class="text-center font-bold">COIL FORMER</h3>

        <div class="mt-5 flex flex-wrap gap-5">
          <Input type="number" label="Wall Thickness" v-model="state.coilFormer.wall_thickness" @change="drawMagnetic" />
          <Input type="number" label="Floor Thickness" v-model="state.coilFormer.floor_thickness" @change="drawMagnetic" />
          <Input type="number" label="Distance to Core Floor" v-model="state.coilFormer.distance_to_core_floor" @change="drawMagnetic" />
          <Input type="number" label="Distance to Core Wall" v-model="state.coilFormer.distance_to_core_wall" @change="drawMagnetic" />
        </div>
      </div>

      <div class="grid place-content-center">
        <h3 class="text-center font-bold">WIRING</h3>

        <div class="grid place-content-center" v-for="(wiring, index) in state.wirings" :key="index">
          <h3 class="text-center mt-5" :class="`${WiringOptions[index].color_code}`">{{ WiringOptions[index].title }}</h3>

          <div class="mt-5 flex flex-wrap gap-5">
            <Input type="number" label="Number Turns" v-model="wiring.number_turns" @change="drawMagnetic" />
            <Input type="number" label="Number Layers" v-model="wiring.number_layers" @change="drawMagnetic" />
            <Input type="number" label="Number Parallels" v-model="wiring.number_parallels" @change="drawMagnetic" />
            <Input type="number" label="Width" v-model="wiring.total_width" @change="drawMagnetic" />
            <Input type="number" label="Height" v-model="wiring.total_height" @change="drawMagnetic" />
          </div>
        </div>
      </div>
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
