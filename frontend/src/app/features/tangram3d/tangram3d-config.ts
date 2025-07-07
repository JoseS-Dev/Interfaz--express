import * as THREE from 'three';

export const SHAPES_DEFS = [
  { id: 'largeBlue', color: "#0f82f2", points: [[-100, -50], [0, 50], [100, -50]] },
  { id: 'largePink', color: "#cd0e66", points: [[100, -50], [0, 50], [-100, -50]] },
  { id: 'mediumPurple', color: "#6d3bbf", points: [[-50, -50], [50, -50], [50, 50]] },
  { id: 'squareGreen', color: "#22ab24", points: [[-50, 0], [0, -50], [50, 0], [0, 50]] },
  { id: 'parallelogramOrange', color: "#fd8c00", points: [[-75, 25], [25, 25], [75, -25], [-25, -25]] },
  { id: 'smallTurquoise1', color: "#009ea6", points: [[0, -25], [50, 25], [-50, 25]] },
  { id: 'smallRed', color: "#eb4726", points: [[0, -25], [50, 25], [-50, 25]] }
];

export const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  steps: 1,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 1
};

export interface PieceConfig {
  x?: number;
  y?: number;
  angle?: number;
  opacity?: number;
  scaleX?: number;
}

export interface Configuration {
  [key: string]: PieceConfig;
}

export type ConfigurationName = 'torre' | 'mesa' | 'cohete';

export const CONFIGURATIONS: Record<ConfigurationName, Configuration> = {
  torre: {
    largeBlue:         { x: 37.35, y: 69.25, angle: 225 },
    largePink:         { x: -33.35, y: 139.95, angle: 45 },
    mediumPurple:      { x: -2.25, y: -104.25, angle: 315 },
    squareGreen:       { x: 0.25, y: 1.75, angle: 45 },
    parallelogramOrange: { x: -2.25, y: -68.95, angle: 45 },
    smallTurquoise1:   { x: 50.75, y: -86.65, angle: 45 },
    smallRed:          { x: -55.35, y: -51.25, angle: 225, opacity: 1 },
  },
  mesa: {
    largeBlue:         { x: 70.7, y: 0.1, angle: 45 },
    largePink:         { x: -70.7, y: 0.1, angle: 315 },
    mediumPurple:      { x: -176.8, y: 106.2, angle: 315 },
    squareGreen:       { x: 0, y: -70.6, angle: 45 },
    parallelogramOrange: { x: 176.8, y: 70.8, angle: 45 },
    smallTurquoise1:   { x: -123.7, y: 53.1, angle: 45 },
    smallRed:          { x: 123.7, y: 88.5, angle: 225, opacity: 1 },
  },
  cohete: {
    mediumPurple:      { x: -3, y: -70.5, angle: 315 },
    squareGreen:       { x: 0, y: -35.5, angle: 45 },
    smallRed:          { x: 18, y: 17.5, angle: 45 },
    parallelogramOrange: { x: 0, y: 70.5, angle: 45, scaleX: -1 },
    smallTurquoise1:   { x: -18, y: 123.5, angle: 225 },
    largePink:         { x: -71, y: 105.5, angle: 315 },
    largeBlue:         { x: 70, y: 105.5, angle: 45 },
  }
};

export const CONFIG_ORDER: ConfigurationName[] = ['torre', 'mesa', 'cohete', 'torre'];
export const LIFT_HEIGHT = 150;
export const PAUSE_DURATION = 1500;
export const LIFT_DURATION = 600;
export const PLACE_DURATION = 700;