import { convertToPascalCase } from "js@/shared/utils";

enum WireTypes {
    LITZ = 0,
    ROUND = 1,
    FOIL = 2,
    RECTANGULAR = 3,
}

const wireTypesProperties = Object.entries(WireTypes)
    .filter(([key, value]) => isNaN(Number(key)))
    .map(([key, value]) => ({ key: convertToPascalCase(key), value }));

export { wireTypesProperties };
export default WireTypes;
