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
      this.createLines();
      this.draw();
    }
  }

  createPoint() {
    const point = new Point(this.getX(), this.getY());
    this.points.push(point);
    this.createdPoints++;
  }

  getX() {
    return this.c.width / 4 + Math.random() * (this.c.width / 2);
  }

  getY() {
    let segmentHeight = this.c.height / this.pointCount;
    return segmentHeight * this.createdPoints + Math.random() * segmentHeight;
  }

  createLines() {
    this.linesToDraw = [];
    this.points.forEach((p, i) => this.getLines(p, i));
  }

  getLines(point: Point, index: number) {
    for (let i = 0; i < this.points.length; i++) {
      if (
        point.pointsAreClose(this.points[i], this.c.height / this.pointCount * 3) &&
        i > index
      ) {
        const line = new Line(point, this.points[i]);
        this.linesToDraw.push(line);
    }}
  }

  draw() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawPoints();
    this.drawLines();
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
      this.ctx.strokeStyle = this.getLineGradient(l)
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
}
