import WireStandardTypes from '../../enum/WireStandardTypes';
import WireTypes from '../../enum/WireTypes';
import Wire from '../Wire';
import { fabric } from 'fabric';

export default class RectangularWire implements Wire {
  number_turns = 0;
  number_layers = 0;
  number_parallels = 0;
  wire_standard = WireStandardTypes.INTERNATIONAL;
  conductor_width = 0;
  conductor_height = 0;
  grade = 0;

  getWireType(): WireTypes {
    return WireTypes.RECTANGULAR;
  }

  getDrawShape(): fabric.Object {
    const form = new fabric.Rect({});

    return form;
  }
}
