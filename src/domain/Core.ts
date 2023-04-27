export default class Core {
  thickness = 0;

  height = 0;

  width = 0;

  getThickness() {
    return this.thickness > 0 ? this.thickness : 0;
  }
}
