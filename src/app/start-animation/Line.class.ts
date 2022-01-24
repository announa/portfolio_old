import { Point } from './Point.class';

export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
  isMouseLine: boolean;

  constructor(point_1: Point, point_2: Point, isMouseLine: boolean) {
    this.x1 = point_1.x;
    this.y1 = point_1.y;
    this.x2 = point_2.x;
    this.y2 = point_2.y;
    this.length = point_1.getDistance(point_2);
    this.isMouseLine = isMouseLine;
  }
}
