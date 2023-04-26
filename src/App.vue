
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fabric } from "fabric";

const coreThickness = ref(10);
const draw = () => {
  // Crear un nuevo canvas
  var canvas = new fabric.Canvas("draw");

  // Definir el tamaño del canvas
  canvas.setDimensions({
    width: 200,
    height: 300,
  });

  const cores = [];
  for (let rect = 0; rect < 3; rect++) {
    let width = rect % 2 === 0 ? canvas.width : coreThickness.value;
    let height = rect % 2 === 0 ? coreThickness.value : canvas.height;

    let core = new fabric.Rect({
      width: width,
      height: height,
      fill: "gray",
      selectable: false,
      stroke: "gray",
      left: 0,
      top: rect === 2 ? canvas.height - height : 0,
    });

    cores.push(core);
  }

  var core = new fabric.Group(cores, {
    left: 1,
    top: 0,
    hasControls: false,
  });

  // Crear el gap de separación
  let gap = new fabric.Rect({
    width: coreThickness.value,
    height: 10,
    fill: "white",
    stroke: "white",
    selectable: false,
  });

  gap.set({
    left: 1,
    top: canvas.height / 2,
  });

  const numberWiring = canvas.height / 20;
  const wiring1 = [];
  for (let i = 0; i < numberWiring; i++) {
    const circle = new fabric.Circle({
      radius: 10,
      fill: "red",
      top: 20 * i,
    });
    wiring1.push(circle);
  }

  var wirings1 = new fabric.Group(wiring1, {
    left: 50,
    top: 10,
    hasControls: false,
  });

  // Agregar todos los objetos al canvas
  canvas.add(core, gap, wirings1);

  // Renderizar el canvas
  canvas.renderAll();
};

onMounted(() => {
  draw();
});
</script>

<template>
  <div>
    <h1>Core drawing</h1>
    <canvas ref="canvas" id="draw"></canvas>
    <div class="mt-5 flex flex-wrap">
      <input type="text" v-model="coreThickness" />
    </div>
  </div>
</template>
