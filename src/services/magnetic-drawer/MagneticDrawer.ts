import { fabric } from 'fabric';
import Core from '../../domain/Core';
import CoilFormer from '../../domain/CoilFormer';

export default class MagneticDrawer {
  cores: fabric.Rect[];
  bobbins: fabric.Rect[];
  gaps: fabric.Rect[];
  wirings: fabric.Group[];
  canvas: fabric.Canvas;

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
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

  drawCore(core: Core) {
    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.width : core.getThickness();
      let height = rect % 2 === 0 ? core.getThickness() : this.canvasHeight();
      let positionY = rect === 2 ? this.canvasHeight() - height : 0;
      console.log(height, positionY);

      let coreRect = new fabric.Rect({
        width: width,
        height: height,
        fill: 'gray',
        selectable: false,
        left: 0,
        strokeWidth: 0,
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
      width: this.coreWidth(),
      height: 10,
      fill: 'white',
      selectable: false,
      strokeWidth: 0,
    });

    gap.set({
      left: 1,
      top: this.canvasHeight() / 2,
      strokeWidth: 0,
    });

    this.addToCanvas(gap);
  }

  drawBobbin(bobbin: CoilFormer) {
    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.width : bobbin.thickness;
      let height = rect % 2 === 0 ? bobbin.thickness : this.canvasHeight();

      let core = new fabric.Rect({
        width: width,
        height: height,
        fill: 'blue',
        selectable: false,
        stroke: 'blue',
        left: 0,
        top: rect === 2 ? this.canvasHeight() - height : 0,
      });

      this.bobbins.push(core);
    }

    let positionX = this.coreWidth() + bobbin.distanceToCore;
    let positionY = this.coreWidth() + bobbin.distanceToCore;
    const bobbinGroup = new fabric.Group(this.bobbins, {
      left: positionX,
      top: positionY,
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
