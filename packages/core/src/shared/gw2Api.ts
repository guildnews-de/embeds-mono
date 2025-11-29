type PointTuple = [x: number, y: number];
type PointRect = [a: PointTuple, b: PointTuple];

// Classes

export class GW2Point {
  x: number;
  y: number;
  name: string;
  type: string;
  icon: string;
  constructor(props: GW2PointProps) {
    const {
      tupel: [x, y],
      name,
      type,
      icon = '',
    } = props;

    this.x = x;
    this.y = y;
    this.name = name;
    this.type = type;
    this.icon = icon;
  }

  toString() {
    return `Point(${this.x}, ${this.y}) [${this.name}, ${this.type}]`;
  }
}

export class GW2PointGroup {
  points: GW2Point[];
  mode: ReturnType<typeof this.setMode>;
  constructor(props: GW2PointGroupProps) {
    const { points, mode } = props;

    this.points = points;
    this.mode = this.setMode(mode);
  }

  setMode(propMode: string) {
    switch (propMode) {
      case 'line':
        return 'line';
      default:
        return 'points';
    }
  }
}

// Interfaces

export interface GW2PointProps {
  tupel: PointTuple;
  name: string;
  type: string;
  icon?: string;
}

export interface GW2PointGroupProps {
  points: GW2Point[];
  mode: string;
}

export interface GW2ApiPoi {
  name: string;
  coord: PointTuple;
  type: string;
  floor?: 1;
  chat_link?: string;
  icon?: string;
}

export interface GW2ApiSector {
  name: string;
  coord: PointTuple;
  bounds: PointTuple[];
  chat_link: string;
}

export interface GW2ApiMapsResponse {
  id?: number;
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  type?: string;
  floors?: number[];
  region_id?: number;
  region_name?: string;
  continent_id?: number;
  continent_name?: string;
  map_rect?: PointRect;
  continent_rect?: PointRect;
}

export interface GW2ApiRegionsResponse {
  name?: string;
  min_level?: number;
  max_level?: number;
  default_floor?: number;
  label_coord?: PointTuple;
  map_rect?: PointRect;
  continent_rect?: PointRect;
  points_of_interest?: Record<number, GW2ApiPoi>;
  sectors?: Record<number, GW2ApiSector>;
  id?: number;
}

export interface GW2ApiError {
  text: string;
}
