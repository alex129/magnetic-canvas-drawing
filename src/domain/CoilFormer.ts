import Core from "./Core";

export default class CoilFormer {
  thickness: number = 5;

  floor_thickness: number = 5;

  wall_thickness: number = 5;

  distance_to_core: number = 10;

  distance_to_core_floor: number = 10;

  distance_to_core_wall: number = 10;

  length: number = 0;

  height: number = 0;

  manufacturer_part_number: string | null = null;

  identifier: string | null = null;

  width: number = 0;

  winding_height: number = 0;

  winding_width: number = 0;

  custom: boolean = false;

  drawing: string | null = null;
}
