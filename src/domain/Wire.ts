import WireStandardTypes from "../enum/WireStandardTypes";
import WireTypes from "../enum/WireTypes";

export type WireStandard = `${WireStandardTypes}`;

export default interface Wire {
    number_turns: number;
    number_layers: number;
    number_parallels: number;
    wire_standard: WireStandard;
    getWireType(): WireTypes;
    getDrawShape(): fabric.Object
}
