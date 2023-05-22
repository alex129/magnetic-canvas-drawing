import CoreFamilies from "../enum/CoreFamilies";

export default class Core {
  thickness: number = 10;
  width: number = 200;
  height: number = 300;
  family: string = CoreFamilies.E

  getThickness() {
    return this.thickness > 0 ? this.thickness : 0;
  }
}
