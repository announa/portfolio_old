export class Point {
  x: number;
  y: number;
  speed: {x: number, y: number};
  isMousePoint: boolean;

  constructor(x: number, y: number, isMousePoint: boolean) {
    this.x = x;
    this.y = y;
    if (isMousePoint) {
      this.speed = { x: 0, y: 0 };
      this.isMousePoint = true;
    } else {
      this.speed = { x: -0.5 + Math.random() * 1, y: -0.5 + Math.random() * 1 };
      this.isMousePoint = false;
    }
  }

  pointsAreClose(point_2: Point, canvas: any) {
    const distance = this.getDistance(point_2);
    let maxDistance = canvas;
    maxDistance < 100 ? 100 : maxDistance;
    return distance < maxDistance && distance > 0;
  }

  getDistance(point_2: Point) {
    return Math.sqrt(
      Math.pow(this.x - point_2.x, 2) + Math.pow(this.y - point_2.y, 2)
    );
  }
}
