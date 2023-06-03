import WireStandardTypes from '../../enum/WireStandardTypes';
import WireTypes from '../../enum/WireTypes';
import Wire from '../Wire';

export type Serving = 'unserved' | 'single_served';

export const enum ServingTypes {
  SINGLE_SERVED = 'single_served',
  UNSERVED = 'unserved',
}

export default class LitzWire implements Wire {
  number_turns = 0;
  number_layers = 0;
  number_parallels = 0;
  wire_standard = WireStandardTypes.INTERNATIONAL;
  conductor_width = 0;
  number_conductors = 0;
  serving = ServingTypes.UNSERVED as string;
  margin_tape = 0;
  grade = 0;
  customized_outer_dimensions = false;
  total_width = 0;

  getWireType(): WireTypes {
    return WireTypes.LITZ;
  }
}
