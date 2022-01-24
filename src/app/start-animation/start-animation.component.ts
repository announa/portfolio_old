import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Line } from './Line.class';
import { Point } from './Point.class copy';

@Component({
  selector: 'app-start-animation',
  templateUrl: './start-animation.component.html',
  styleUrls: ['./start-animation.component.scss'],
})
export class StartAnimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;
  @HostListener('window:resize', ['$event'])
  resizeEvent() {
    this.initCanvas();
  }
  @HostListener('document:mousemove', ['$event'])
  mousemoveEvent($event: Event) {
    this.moveMousePoint($event);
  }
  @HostListener('document:mouseleave', ['$event'])
  mouseleaveEvent() {
    this.removeMousePoint();
  }

  points: Point[] = [];
  linesToDraw: Line[] = [];
  mousePoint!: Point;
  c: any;
  cC: any;
  ctx: any;
  animationFrame: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement;
    this.cC = this.cC;
    this.startAnimation();
  }

  startAnimation() {
    console.log('init');
    this.initCanvas();
    this.createPoints(80);
    this.createLines();
    this.draw();
  }

  initCanvas() {
    this.c.width = this.cC.clientWidth;
    this.c.height = this.cC.clientHeight;
    this.ctx = this.c.getContext('2d');
  }

  createPoints(count: number) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const point = new Point(this.getX(), this.getY(), false);
        this.points.push(point);
      }, 1000 + i * 150);
    }
  }

  getX() {
    return Math.random() * this.c.width;
  }

  getY() {
    return Math.random() * this.c.height;
  }

  createLines() {
    this.linesToDraw = [];
    this.getMouseLines();
    this.points.forEach((p, i) => this.getLines(p, i, false));
  }

  getMouseLines() {
    if (this.mousePoint.isMousePoint) {
      this.getLines(this.mousePoint, 0, true);
    }
  }

  getLines(point: Point, index: number, isMouseLine: boolean) {
    for (let i = 0; i < this.points.length; i++) {
      if (
        point.pointsAreClose(this.points[i], 0.2 * this.c.width) &&
        !this.points[i].isMousePoint &&
        i > index
      ) {
        const line = new Line(point, this.points[i], isMouseLine);
        this.linesToDraw.push(line);
      }
    }
  }

  containsLine(line: Line) {
    return this.linesToDraw.find(
      (l) =>
        l.x1 === line.x2 &&
        l.y1 === line.y2 &&
        l.x2 === line.x1 &&
        l.y2 === line.y1
    );
  }

  draw() {
    this.animationFrame = requestAnimationFrame(this.draw);
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawPoints();
    this.drawLines();
    this.animate();
  }

  drawPoints() {
    this.points.forEach((p) => {
      this.ctx.fillStyle = p.isMousePoint
        ? 'hsl(270, 80%, 50%)'
        : 'hsl(180, 100%, 15%)';
      this.ctx.beginPath();
      this.ctx.arc(p.x - 0.6, p.y - 0.6, 1.2, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }

  drawLines() {
    this.linesToDraw.forEach((l) => {
      this.ctx.strokeStyle = l.isMouseLine
        ? this.getLineGradient(l)
        : this.getLineColor(l);
      this.ctx.beginPath();
      this.ctx.moveTo(l.x1, l.y1);
      this.ctx.lineTo(l.x2, l.y2);
      this.ctx.stroke();
      /* linesToDraw.splice(i, 1); */
    });
  }

  getLineColor(l: Line) {
    const alpha = this.getStrokeAlpha(l);
    return `hsla(180, 100%,20%, ${alpha})`;
  }

  getLineGradient(l: Line) {
    const alpha = this.getStrokeAlpha(l);
    let gradient = this.ctx.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
    gradient.addColorStop(0, `hsla(280, 90%, 70%, ${alpha}`);
    gradient.addColorStop(0.5, `hsla(217, 80%, 40%, ${alpha}`);
    gradient.addColorStop(1, `hsla(165, 100%,20%, ${alpha})`);
    return gradient;
  }

  getStrokeAlpha(l: Line) {
    let alpha;
    if (l.length <= 0.1 * this.c.width) {
      return 1;
    } else {
      let ratio = -(0.1 * this.c.width - l.length) / (0.1 * this.c.width);
      alpha = 1 - ratio;
      return alpha;
    }
  }

  animate() {
    this.movePoints();
    this.createLines();
  }

  movePoints() {
    this.points.forEach((p, i) => {
      p.x = p.x + p.speed.x;
      p.y = p.y + p.speed.y;
      this.checkPointPosition(p, i);
    });
  }

  checkPointPosition(point: Point, index: number) {
    if (this.outOfView(point)) {
      this.points.splice(index, 1);
      setTimeout(() => {
        this.createPoints(1);
        this.createLines();
      }, 500);
    }
  }

  outOfView(p: Point) {
    return (
      p.x < -0.1 * this.c.width ||
      p.x > this.c.width + 0.1 * this.c.width ||
      p.y < -0.1 * this.c.width ||
      p.y > this.c.hight + 0.1 * this.c.width
    );
  }

  stopAnimationFrame() {
    cancelAnimationFrame(this.animationFrame);
    console.log('stop animation');
    this.points = [];
    this.linesToDraw = [];
  }

  /* -----------  MOUSE ANIMATION  ------------- */

  createMousePoint(event: Event) {
    console.log('create mouse point');
    console.log(event);
    /*   this.mousePoint = new Point(event.pageX, event.pageY, true);
  this.points.push(mousePoint);
  this.createLines(); */
  }

  moveMousePoint(event: Event) {
    console.log('move mouse point');
    console.log(event);
    if (!this.mousePoint) {
      this.createMousePoint(event);
    } else if (!this.mousePoint.isMousePoint) {
      this.createMousePoint(event);
    }
    this.mousePoint.x = event.x;
    this.mousePoint.y = event.y;
    this.createLines();
  }

  removeMousePoint() {
    const index = this.points.findIndex((p) => p.isMousePoint === true);
    this.points.splice(index, 1);
    this.mousePoint.isMousePoint = false;
  }
}
