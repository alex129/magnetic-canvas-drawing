import WiringOptions from '@/enum/Wirings';
import WireStandardTypes from '../../enum/WireStandardTypes';
import WireTypes from '../../enum/WireTypes';
import Wire from '../Wire';
import { fabric } from 'fabric';

export type Insutation = 'enamel' | 'plastic';

export const enum InsulationType {
  ENAMEL = 'enamel',
  PLASTIC = 'plastic',
}
export default class RoundWire implements Wire {
  number_turns = 10;
  number_layers = 1;
  number_parallels = 1;
  wire_standard = WireStandardTypes.INTERNATIONAL;
  conductor_width = 0;
  insulation_type = InsulationType.ENAMEL as string;
  margin_tape = 0;
  grade = 0;
  customized_outer_dimensions = false;
  total_width = 20;

  getWireType(): WireTypes {
    return WireTypes.ROUND;
  }

  getDrawShape(): fabric.Object {
    const shape = new fabric.Circle({
      radius: this.total_width / 2,
    });

    return shape;
  }
}
