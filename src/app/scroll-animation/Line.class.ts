import { Point } from './Point.class';

export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  i1: number;
  i2: number;
  length: number;


  constructor(point_1: Point, index1: number, point_2: Point, index2: number) {
    this.i1 = index1;
    this.i2 = index2;
    this.x1 = point_1.x;
    this.y1 = point_1.y;
    this.x2 = point_2.x;
    this.y2 = point_2.y;
    this.length = point_1.getDistance(point_2);
  }
}
