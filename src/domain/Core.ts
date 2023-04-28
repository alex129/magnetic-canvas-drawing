export default class Core {
  thickness = 10;

  width = 200;

  height = 300;


  getThickness() {
    return this.thickness > 0 ? this.thickness : 0;
  }
}
