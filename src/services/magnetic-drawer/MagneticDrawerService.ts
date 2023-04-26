import { fabric } from 'fabric';

export default class MagneticDrawerService {
  cores: fabric.Rect[];
  canvas: fabric.Canvas;

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.cores = [];

    canvas.setDimensions({
      width: 200,
      height: 300,
    });
  }

  canvasHegight() {
    return this.canvas.height ?? 0;
  }

  drawCore(thicknes: number) {
    for (let rect = 0; rect < 3; rect++) {
      const canvasHeight = this.canvas.height ?? 0;
      let width = rect % 2 === 0 ? this.canvas.width : thicknes;
      let height = rect % 2 === 0 ? thicknes : canvasHeight;

      let core = new fabric.Rect({
        width: width,
        height: height,
        fill: 'gray',
        selectable: false,
        stroke: 'gray',
        left: 0,
        top: rect === 2 ? canvasHeight - height : 0,
      });

      this.cores.push(core);
    }

    const coreGroup = new fabric.Group(this.cores, {
      left: 1,
      top: 0,
      hasControls: false,
    });

    this.canvas.add(coreGroup);
    this.canvas.renderAll();
  }
}
