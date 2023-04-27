import { fabric } from 'fabric';

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

    canvas.setDimensions({
      width: 200,
      height: 300,
    });
  }

  canvasHeight() {
    return this.canvas.height ?? 0;
  }

  coreWidth() {
    return this.cores[1].width ?? 0;
  }

  drawCore(thicknes: number) {
    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.width : thicknes;
      let height = rect % 2 === 0 ? thicknes : this.canvasHeight();

      let core = new fabric.Rect({
        width: width,
        height: height,
        fill: 'gray',
        selectable: false,
        stroke: 'gray',
        left: 0,
        top: rect === 2 ? this.canvasHeight() - height : 0,
      });

      this.cores.push(core);
    }

    const coreGroup = new fabric.Group(this.cores, {
      left: 1,
      top: 0,
      hasControls: false,
      selectable: false,
    });

    this.addToCanvas(coreGroup);
  }

  drawGap() {
    let gap = new fabric.Rect({
      width: this.coreWidth(),
      height: 10,
      fill: 'white',
      stroke: 'white',
      selectable: false,
    });

    gap.set({
      left: 1,
      top: this.canvasHeight() / 2,
    });

    this.addToCanvas(gap);
  }

  drawBobbin(bobbin: Bobbin) {
    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.width : bobbin.thicknes;
      let height = rect % 2 === 0 ? bobbin.thicknes : this.canvasHeight();

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
}
