import { fabric } from 'fabric';
import Core from '../../domain/Core';
import CoilFormer from '../../domain/CoilFormer';
import Gap from '../../domain/Gap';
import Wiring from '../../domain/Wiring';
import WiringOptions from '../../enum/Wirings';

export default class MagneticDrawer {
  rectanglesOfCore: fabric.Rect[];
  rectanglesOfBobbin: fabric.Rect[];
  gaps: Gap[];
  wirings: Wiring[];
  wiringsGroup: fabric.Object[];
  wiringsGroupCoordinates: Coordinates[];
  canvas: fabric.Canvas;
  core: Core;
  bobbin: CoilFormer;
  wiringArragement: number[];

  constructor(canvas: fabric.Canvas, core: Core, bobbin: CoilFormer, gaps: Gap[], wirings: Wiring[], wiringArragement: number[]) {
    this.canvas = canvas;
    this.core = core;
    this.bobbin = bobbin;
    this.gaps = gaps;
    this.wirings = wirings;
    this.wiringArragement = wiringArragement;
    this.rectanglesOfCore = [];
    this.rectanglesOfBobbin = [];
    this.wiringsGroup = [];
    this.wiringsGroupCoordinates = [];

    this.clearCanvas();

    this.canvas.selection = false;
    this.canvas.on('object:modified', (e) => this.wireModifiedHandler(e));
  }

  drawCore() {
    this.canvas.setDimensions({
      width: this.core.width,
      height: this.core.height,
    });

    for (let rect = 0; rect < 3; rect++) {
      let width = rect % 2 === 0 ? this.canvas.getWidth() : this.core.getThickness();
      let height = rect % 2 === 0 ? this.core.getThickness() : this.canvas.getHeight();
      let positionY = rect === 2 ? this.canvas.getHeight() - height : 0;

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

      this.rectanglesOfCore.push(coreRect);
    }

    const coreGroup = new fabric.Group(this.rectanglesOfCore, {
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
    const gapRectangles: fabric.Rect[] = [];
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

      gapRectangles.push(gapRect);
    });

    const gapsGroup = new fabric.Group(gapRectangles, {
      left: 0,
      top: 0,
      height: this.core.height,
      hasControls: false,
      strokeWidth: 0,
      selectable: false,
    });

    this.addToCanvas(gapsGroup);
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

      this.rectanglesOfBobbin.push(bobbinRect);
    }

    let positionX = this.core.thickness + this.bobbin.distance_to_core_floor;
    let positionY = this.core.thickness + this.bobbin.distance_to_core_wall;
    const bobbinGroup = new fabric.Group(this.rectanglesOfBobbin, {
      left: positionX,
      top: positionY,
      strokeWidth: 0,
      hasControls: false,
      selectable: false,
    });

    this.addToCanvas(bobbinGroup);
  }

  drawWiring() {
    this.wiringArragement.forEach((wiringIndex, wireNumber) => {
      const wiring = this.wirings[wiringIndex];
      const totalTurnsPerLayer = Math.floor(wiring.totalTurns() / wiring.number_layers);
      let totalRemainingTurns = Math.floor(wiring.totalTurns() % wiring.number_layers);
      const wiringRadius = wiring.total_height / 2;
      const wiringLayers: fabric.Object[][] = [];
      console.log(`TOTAL REMAINING TURNS PER LAYER ${totalRemainingTurns} AND TOTAL TURNS PER LAYER ${totalTurnsPerLayer}`);

      let totalTurns = 0;
      for (let layer = 0; layer < wiring.number_layers; layer++) {
        wiringLayers[layer] = [];
        const remainingTurn = totalRemainingTurns > 0 ? 1 * wiring.number_parallels : 0;
        const turnsPerLayer = totalTurnsPerLayer + remainingTurn;
        totalRemainingTurns = totalRemainingTurns - remainingTurn;
        for (let turn = 0; turn < turnsPerLayer && totalTurns < wiring.totalTurns(); turn++) {
          totalTurns++;
          const circle = new fabric.Circle({
            radius: wiringRadius,
            fill: WiringOptions[wiringIndex].color,
            top: wiring.total_height * turn,
            left: 0,
            strokeWidth: 0,
          });
          wiringLayers[layer].push(circle);
        }
      }

      const totalWiringsHeight = wiring.total_height * (totalTurnsPerLayer > 0 ? totalTurnsPerLayer : 1);
      const wiringLayersGroup = this.centeredWiringGroup(wiringLayers, wiring.total_height, totalWiringsHeight);

      const distanceXToWhiteSpace = this.distanceXToNextWiringSpace(wireNumber);
      const wiringGroup = new fabric.Group(wiringLayersGroup, {
        hasControls: false,
      });
      const wiringGroupHeight = wiringGroup.height ?? 0;
      const centerY = this.core.height / 2 - wiringGroupHeight / 2;
      const wiringCoordinates = {
        left: distanceXToWhiteSpace,
        top: centerY,
      };
      wiringGroup.set(wiringCoordinates);

      this.wiringsGroup.push(wiringGroup);
      this.wiringsGroupCoordinates.push(wiringCoordinates);
    });

    this.wiringsGroup.forEach((group) => {
      this.addToCanvas(group);
    });
  }

  private centeredWiringGroup(wiringLayers: fabric.Object[][], wiringHeight: number, totalWiringsHeight: number): fabric.Group[] {
    const wiringLayersGroups: fabric.Group[] = [];
    for (let layer = 0; layer < wiringLayers.length; layer++) {
      const layerWiringHeight = wiringHeight * wiringLayers[layer].length;
      const centerY = totalWiringsHeight / 2 - layerWiringHeight / 2;
      wiringLayersGroups.push(
        new fabric.Group(wiringLayers[layer], {
          left: wiringHeight * layer,
          top: centerY,
        })
      );
    }

    return wiringLayersGroups;
  }

  private distanceXToNextWiringSpace(wiringIndex: number) {
    const posibilityStroke = 1;
    let previousWiringsXSpace = 0;
    for (let wiringNumber = 0; wiringNumber < wiringIndex; wiringNumber++) {
      previousWiringsXSpace += this.wiringsGroup[wiringNumber].width ?? 0;
      previousWiringsXSpace += posibilityStroke;
    }
    return this.core.thickness + this.bobbin.distance_to_core_floor + this.bobbin.floor_thickness + previousWiringsXSpace + posibilityStroke;
  }

  private addToCanvas(element: fabric.Object | fabric.Object[]) {
    if (Array.isArray(element)) {
      element.forEach((e) => this.canvas.add(e));
    } else {
      this.canvas.add(element);
    }
    this.canvas.renderAll();
  }

  private removeFromCanvas(element: fabric.Object | fabric.Object[]) {
    if (Array.isArray(element)) {
      element.forEach((e) => this.canvas.remove(e));
    } else {
      this.canvas.remove(element);
    }
    this.canvas.renderAll();
  }

  private clearCanvas() {
    this.canvas.clear().renderAll();
  }

  private clearWiring() {
    this.wiringsGroup.forEach((wire) => {
      this.canvas.remove(wire);
    });
    this.wiringsGroup = [];
    this.canvas.renderAll();
  }

  private wireModifiedHandler(e: fabric.IEvent) {
    const wireMoved = this.wiringsGroup.find((wire) => wire === e.target);

    if (wireMoved) {
      const movedWireIndex = this.wiringsGroup.findIndex((wire) => wire === wireMoved);
      let dropedOnOtherWiringPosition: boolean = false;

      this.wiringsGroup.forEach((wire, wireIndex) => {
        if (movedWireIndex !== wireIndex && wire.containsPoint(wireMoved.getCenterPoint()) && !dropedOnOtherWiringPosition) {
          const indexFrom = this.wiringArragement.indexOf(movedWireIndex);
          const indexTo = this.wiringArragement.indexOf(wireIndex);
          this.wiringArragement[indexFrom] = wireIndex;
          this.wiringArragement[indexTo] = movedWireIndex;

          dropedOnOtherWiringPosition = true;
        }
      });

      console.log(this.wiringArragement);
      this.clearWiring();
      this.drawWiring();

      console.log(this.wiringsGroupCoordinates[0].left);
      console.log(this.wiringsGroupCoordinates[1].left);
    }
  }
}
