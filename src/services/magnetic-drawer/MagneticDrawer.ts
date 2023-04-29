import { fabric } from 'fabric';
import Core from '../../domain/Core';
import CoilFormer from '../../domain/CoilFormer';
import Gap from '../../domain/Gap';
import Wiring from '../../domain/Wiring';

export default class MagneticDrawer {
  cores: fabric.Rect[];
  bobbins: fabric.Rect[];
  gaps: Gap[];
  wirings: Wiring[];
  wiringsGroup: fabric.Group[];
  canvas: fabric.Canvas;
  core: Core;
  bobbin: CoilFormer;

  constructor(canvas: fabric.Canvas, core: Core, bobbin: CoilFormer, gaps: Gap[], wirings: Wiring[]) {
    this.canvas = canvas;
    this.core = core;
    this.bobbin = bobbin;
    this.gaps = gaps;
    this.wirings = wirings;
    this.cores = [];
    this.bobbins = [];
    this.wiringsGroup = [];

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
        strokeWidth: 0,
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
    const numberGaps = this.gaps.length;
    const gapRects: fabric.Rect[] = [];
    this.gaps.forEach((gap, index) => {
      const positionAvailableByNumberGaps = (this.core.height / numberGaps) * (index + 1);
      const positionY = this.core.height / 2 + positionAvailableByNumberGaps;
      let gapRect = new fabric.Rect({
        top: positionY,
        left: 1,
        width: this.core.thickness + 2,
        height: gap.gap_length,
        fill: 'white',
        stroke: 'white',
        strokeWidth: 1,
        selectable: false,
      });

      gapRects.push(gapRect);
    });

    const gapGroup = new fabric.Group(gapRects, {
      left: 0,
      top: 0,
      height: this.core.height,
      hasControls: false,
      strokeWidth: 0,
      selectable: false,
    });

    this.addToCanvas(gapGroup);
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
        strokeWidth: 0,
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
      hasBorders: false,
    });

    this.addToCanvas(bobbinGroup);
  }

  drawWiring() {
    this.wirings.forEach((wiring) => {
      const drawings = [];
      for (let i = 0; i < wiring.number_turns; i++) {
        const wiringRadius = wiring.total_height / 2;
        const circle = new fabric.Circle({
          radius: wiringRadius,
          fill: '#33E7FF',
          top: wiring.total_height * i,
          left: 0,
        });
        drawings.push(circle);
      }

      const wiringHeight = wiring.total_height * wiring.number_turns;
      const centerY = this.core.height / 2 - wiringHeight / 2;
      const distanceXToWhiteSpace = this.core.thickness + this.bobbin.distance_to_core_floor + this.bobbin.floor_thickness;
      this.wiringsGroup.push(
        new fabric.Group(drawings, {
          left: distanceXToWhiteSpace,
          top: centerY,
          hasControls: false,
        })
      );
    });

    this.wiringsGroup.forEach((group) => {
      this.addToCanvas(group);
    });
  }

  addToCanvas(element: fabric.Object) {
    this.canvas.add(element);
    this.canvas.getObjects().forEach((obj) => {
      obj.set('strokeWidth', 0);
    });
    this.canvas.renderAll();
  }

  clearCanvas() {
    this.canvas.clear().renderAll();
  }
}
