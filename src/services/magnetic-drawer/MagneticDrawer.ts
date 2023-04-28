import { fabric } from 'fabric';
import Core from '../../domain/Core';
import CoilFormer from '../../domain/CoilFormer';

export default class MagneticDrawer {
  cores: fabric.Rect[];
  bobbins: fabric.Rect[];
  gaps: fabric.Rect[];
  wirings: fabric.Group[];
  canvas: fabric.Canvas;
  core: Core;
  bobbin: CoilFormer;

  constructor(canvas: fabric.Canvas, core: Core, bobbin: CoilFormer) {
    this.canvas = canvas;
    this.core = core;
    this.bobbin = bobbin;
    this.cores = [];
    this.bobbins = [];
    this.gaps = [];
    this.wirings = [];

    this.canvas.setDimensions({
      width: 200,
      height: 300,
    });

    this.clearCanvas();
  }

  canvasHeight() {
    return this.canvas.height ?? 0;
  }

  coreWidth() {
    return this.cores[1].width ?? 0;
  }

  drawCore() {
    this.canvas.setDimensions({
      width: this.core.width,
      height: this.core.height,
    });

    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.width : this.core.getThickness();
      let height = rect % 2 === 0 ? this.core.getThickness() : this.canvasHeight();
      let positionY = rect === 2 ? this.canvasHeight() - height : 0;

      let coreRect = new fabric.Rect({
        width: width,
        height: height,
        fill: 'gray',
        stroke: 'gray',
        selectable: false,
        left: 0,
        top: positionY,
      });

      this.cores.push(coreRect);
    }

    const coreGroup = new fabric.Group(this.cores, {
      left: 1,
      top: 0,
      hasControls: false,
      strokeWidth: 0,
      selectable: false,
    });

    this.addToCanvas(coreGroup);
  }

  drawGap() {
    let gap = new fabric.Rect({
      width: this.core.thickness + 2,
      height: 10,
      fill: 'white',
      stroke: 'white',
      strokeWidth: 1,
      selectable: false,
    });

    gap.set({
      left: 0,
      top: this.canvasHeight() / 2,
    });

    this.addToCanvas(gap);
  }

  drawBobbin() {
    const availableWidth = this.core.width - this.bobbin.distance_to_core_floor;
    const availableHeight = this.core.height - this.core.thickness * 2 - this.bobbin.distance_to_core_wall * 2 - this.bobbin.wall_thickness;

    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? availableWidth : this.bobbin.floor_thickness;
      let height = rect % 2 === 0 ? this.bobbin.wall_thickness : availableHeight;

      let positionX = 0;
      let positionY = rect === 2 ? availableHeight : 0;

      let bobbinRect = new fabric.Rect({
        width: width,
        height: height,
        fill: '#00235a',
        stroke: '#00235a',
        selectable: false,
        left: positionX,
        top: positionY,
      });

      this.bobbins.push(bobbinRect);
    }

    let positionX = this.core.thickness + this.bobbin.distance_to_core_floor;
    let positionY = this.core.thickness + this.bobbin.distance_to_core_wall;
    const bobbinGroup = new fabric.Group(this.bobbins, {
      left: positionX,
      top: positionY,
      strokeWidth: 0,
      hasControls: false,
      selectable: false,
    });

    this.addToCanvas(bobbinGroup);
  }

  drawWiring() {
    const numberWiring = this.canvasHeight() / 20;
    const wiring1 = [];
    for (let i = 0; i < numberWiring; i++) {
      const circle = new fabric.Circle({
        radius: 10,
        fill: 'red',
        top: 20 * i,
      });
      wiring1.push(circle);
    }
    var wirings1 = new fabric.Group(wiring1, {
      left: 50,
      top: 10,
      hasControls: false,
    });
  }

  addToCanvas(element: any) {
    this.canvas.add(element);
    this.canvas.renderAll();
  }

  clearCanvas() {
    this.canvas.clear().renderAll();
  }
}
