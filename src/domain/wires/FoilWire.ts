import WireStandardTypes from "../../enum/WireStandardTypes";
import WireTypes from "../../enum/WireTypes";
import Wire from "../Wire";

export default class FoilWire implements Wire {
    number_turns = 0;
    number_layers = 0;
    number_parallels = 0;
    wire_standard = WireStandardTypes.INTERNATIONAL;
    conductor_width = 0;
    conductor_height = 0;
    margin_tape = 0;

    getWireType(): WireTypes {
        return WireTypes.FOIL;
    }
}
