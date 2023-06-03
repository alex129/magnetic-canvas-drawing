import Wire from './Wire';
import WindingArrangements from '../enum/WindingArrangements';
import RectangularWire from './wires/RectangularWire';
import FoilWire from './wires/FoilWire';
import LitzWire from './wires/LitzWire';
import RoundWire from './wires/RoundWire';

export type WindingArrangement = `${WindingArrangements}`;

export default class Winding {
  wire: Wire | null = null;
  arrangement: WindingArrangement | null = null;
  grouping: this | null = null;

  hasRectangularWire(): boolean {
    return this.wire instanceof RectangularWire;
  }

  hasFoilWire(): boolean {
    return this.wire instanceof FoilWire;
  }

  hasLitzWire(): boolean {
    return this.wire instanceof LitzWire;
  }

  hasRoundWire(): boolean {
    return this.wire instanceof RoundWire;
  }
}
