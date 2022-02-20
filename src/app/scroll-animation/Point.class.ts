export class Point {
  x: number;
  y: number;
  speed: {x: number, y: number};

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = { x: -0.025 + Math.random() * 0.05, y: -0.05 + Math.random() * 0.1 };
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
