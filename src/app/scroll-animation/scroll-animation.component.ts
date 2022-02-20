import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Line } from '../scroll-animation/Line.class';
import { Point } from '../scroll-animation/Point.class';

@Component({
  selector: 'app-scroll-animation',
  templateUrl: './scroll-animation.component.html',
  styleUrls: ['./scroll-animation.component.scss'],
})
export class ScrollAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;
  @HostListener('window:resize', ['$event'])
  resizeEvent() {
    this.initCanvas();
    console.log(this.c);
  }
  @HostListener('window: scroll', ['$event'])
  scrollEvent() {
    this.addPoint();
  }

  points: Point[] = [];
  linesToDraw: Line[] = [];
  pointCount = 30;
  createdPoints = 0;
  c!: HTMLCanvasElement;
  cC!: HTMLDivElement;
  ctx!: any;
  animationFrame!: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement;
    this.cC = this.canvasContainer.nativeElement;
    setTimeout(() => {
      this.initCanvas();
    }, 1);
  }

  initCanvas() {
    this.c.width = this.cC.clientWidth;
    this.c.height = this.cC.clientHeight;
    this.ctx = this.c.getContext('2d');
  }

  addPoint() {
    if (
      window.scrollY >=
      (document.body.clientHeight / this.pointCount) * (1 + this.createdPoints)
    ) {
      this.createPoint();
      this.draw();
    }
  }

  createPoint() {
    console.log('createPoit')
    const point = new Point(this.getX(), this.getY());
    this.points.push(point);
    console.log(point)
    this.createdPoints++;
    this.createLines();
  }

  getX() {
    return this.c.width / 4 + Math.random() * (this.c.width / 2);
  }

  getY() {
    let segmentHeight = this.c.height / this.pointCount;
    return 1.3 * segmentHeight * this.createdPoints + Math.random() * segmentHeight;
  }

  createLines() {
    this.points.forEach((p, i) => {
      console.log('check if close')
      if (
        p.pointsAreClose(this.points[this.points.length - 1], (this.c.height / this.pointCount) * 4)
      ) {
        console.log('close')
        const line = new Line(this.points[this.points.length - 1], this.points.length - 1, p, i);
        this.linesToDraw.push(line);
      }
    });
  }

  draw() {
    this.animationFrame = requestAnimationFrame(() => {
      this.draw();
    });
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawPoints();
    this.drawLines();
    this.animate();
  }

  drawPoints() {
    this.points.forEach((p) => {
      this.ctx.fillStyle = 'hsl(270, 80%, 50%)';
      this.ctx.beginPath();
      this.ctx.arc(p.x - 0.6, p.y - 0.6, 1.2, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }

  drawLines() {
    this.linesToDraw.forEach((l) => {
      this.ctx.strokeStyle = this.getLineGradient(l);
      this.ctx.beginPath();
      this.ctx.moveTo(l.x1, l.y1);
      this.ctx.lineTo(l.x2, l.y2);
      this.ctx.stroke();
    });
  }

  getLineGradient(l: Line) {
    let gradient = this.ctx.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
    gradient.addColorStop(0, `hsla(280, 90%, 70%, 1`);
    gradient.addColorStop(0.5, `hsla(217, 80%, 40%, 1`);
    gradient.addColorStop(1, `hsla(165, 100%,20%, 1)`);
    return gradient;
  }

  animate() {
    this.movePoints();
    this.moveLines();
  }

  movePoints() {
    this.points.forEach((p, i) => {
      p.x = p.x + p.speed.x;
      p.y = p.y + p.speed.y;
      this.checkPointPosition(p, i);
    });
  }

  checkPointPosition(point: Point, index: number) {
    point.speed.x = this.atXLimit(point);
    point.speed.y = this.atYLimit(point);
  }

  atXLimit(p: Point) {
    let newDirection =
      p.x <= 10 || p.x >= this.c.width - 10 ? -p.speed.x : p.speed.x;
    return newDirection;
  }

  atYLimit(p: Point) {
    let newDirection =
      p.y <= this.c.offsetHeight + 20 || p.y >= this.c.height - 20
        ? -p.speed.y
        : p.speed.y;
    return newDirection;
  }

  moveLines(){
    this.linesToDraw.forEach(l => {
      let p1 = this.points[l.i1]
      let p2 = this.points[l.i2]
      l.x1 = p1.x;
      l.x2 = p2.x;
      l.y1 = p1.y;
      l.y2 = p2.y;
    })
  }
}
