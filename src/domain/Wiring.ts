export default class Wiring {
    type: number = 0
    grade?: number
    serving: string = ''
    grouping: number = 0
    material: number = 0
    connection: string[] = []
    flying_wire: boolean[] = []
    margin_tape: number = 0
    termination: null[] = []
    dot_position: string = ''
    is_auxiliary: boolean = false
    number_turns: number = 10
    total_height: number = 20
    total_width: number = 10
    number_layers: number = 1
    isolation_side: string = ''
    available_angle: number = 0
    conductor_width: number = 0
    insulation_type: string = ''
    conductor_height: number = 0
    number_parallels: number = 1
    number_conductors: number = 0
    flying_wire_length: null[] = []
    number_layers_insulation?: number
    customized_outer_dimensions: boolean = false
}