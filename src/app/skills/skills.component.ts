import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Line } from './Line.class';
import { Point } from './Point.class';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'REST API',
    'git',
    'Material',
    'SCRUM',
  ];

  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('canvasContainer') canvasContainer!: ElementRef;
  @HostListener('window:resize', ['$event'])
  resizeEvent() {
    this.initCanvas();
  }
  @HostListener('document:mousemove', ['$event'])
  mousemoveEvent($event: any) {
    this.moveMousePoint($event);
  }

  /*   @HostListener('document:mouseleave', ['$event'])
  mouseleaveEvent() {
    console.log('mouse leave');
    this.removeMousePoint();
  } */

  // mouseleave event not firing in firefox  ---> alternative mouseout
  @HostListener('document:mouseout', ['$event'])
  mouseoutEvent() {
    this.removeMousePoint();
  }

  points: Point[] = [];
  linesToDraw: Line[] = [];
  mousePoint!: Point;
  c!: HTMLCanvasElement;
  cC!: HTMLDivElement;
  ctx!: any;
  animationFrame!: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement;
    this.cC = this.canvasContainer.nativeElement;
    this.startAnimation();
  }

  startAnimation() {
    this.initCanvas();
    this.createPoints(this.skills.length);
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
        const point = new Point(
          this.getX(),
          this.getY(),
          this.c.width,
          this.skills[i],
          false
        );
        this.points.push(point);
      }, 3500 + i * 150);
    }
  }

  getX() {
    return 50 + Math.random() * (this.c.width - 100);
  }

  getY() {
    return 50 + Math.random() * (this.c.height - 100);
  }

  createLines() {
    this.linesToDraw = [];
    this.getMouseLines();
    this.points.forEach((p, i) => this.getLines(p, i, false));
  }

  getMouseLines() {
    if (this.mousePoint && this.mousePoint.isMousePoint) {
      this.getLines(this.mousePoint, -1, true);
    }
  }

  getLines(point: Point, index: number, isMouseLine: boolean) {
    for (let i = 0; i < this.points.length; i++) {
      if (
        point.pointsAreClose(this.points[i], 0.2 * this.c.width) &&
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
    this.animationFrame = requestAnimationFrame(() => {
      this.draw();
    });
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawLines();
    this.drawPoints();
    this.animate();
  }

  drawPoints() {
    this.points.forEach((p) => {
      this.ctx.strokeStyle = 'hsl(180, 100%, 15%)';
      this.ctx.fillStyle = 'rgb(10,10,10)';
      this.ctx.beginPath();
      this.ctx.arc(p.x - 0.6, p.y - 0.6, p.r, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
      this.drawText(p, p.text);
    });
  }

  drawText(p: Point, text: string) {
    this.ctx.fillStyle = 'hsl(180, 100%, 30%)';
    this.ctx.font = '2vw Spartan';
    this.ctx.fillText(text, p.x - p.r, p.y - p.r);
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
    point.speed.x = this.atXLimit(point);
    point.speed.y = this.atYLimit(point);
  }

  atXLimit(p: Point) {
    let newDirection =
      p.x <= 50 || p.x >= this.c.width - 100 ? -p.speed.x : p.speed.x;
    return newDirection;
  }

  atYLimit(p: Point) {
    let newDirection =
      p.y <= 50 || p.y >= this.c.height - 100 ? -p.speed.y : p.speed.y;
    return newDirection;
  }

  outOfView(p: Point) {
    return (
      p.x < -0.1 * this.c.width ||
      p.x > this.c.width + 0.1 * this.c.width ||
      p.y < -0.1 * this.c.width ||
      p.y > this.c.height + 0.1 * this.c.width
    );
  }

  stopAnimationFrame() {
    cancelAnimationFrame(this.animationFrame);
    this.points = [];
    this.linesToDraw = [];
  }

  /* -----------  MOUSE ANIMATION  ------------- */

  createMousePoint(event: any) {
    if (this.points.length > 0) {
      this.mousePoint = new Point(
        event.x,
        event.y,
        this.c.width,
        this.skills[0],
        true
      );
      this.createLines();
    }
  }

  moveMousePoint(event: any) {
    if (this.mousePoint && this.mousePoint.isMousePoint) {
      this.mousePoint.x = event.x;
      this.mousePoint.y = event.y;
      this.createLines();
    } else {
      this.createMousePoint(event);
    }
  }

  removeMousePoint() {
    if (this.mousePoint) {
      this.mousePoint.isMousePoint = false;
    }
  }
}
