import WireStandardTypes from "../../enum/WireStandardTypes";
import WireTypes from "../../enum/WireTypes";
import Wire from "../Wire";


export type Insutation = 'enamel' | 'plastic';

export const enum InsulationType {
    ENAMEL = 'enamel',
    PLASTIC = 'plastic',
}
export default class RoundWire implements Wire {
    number_turns = 0;
    number_layers = 0;
    number_parallels = 0;
    wire_standard = WireStandardTypes.INTERNATIONAL;
    conductor_width = 0;
    insulation_type = InsulationType.ENAMEL as string;
    margin_tape = 0;
    grade = 0;
    customized_outer_dimensions = false;
    total_width = 0;

    getWireType(): WireTypes {
        return WireTypes.ROUND;
    }
}
