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
    /* this.savePoints(); */
    this.initCanvas();
    /* this.getResizePoints() */
    /* this.restorePoints(); */
  }
  @HostListener('window: scroll', ['$event'])
  scrollEvent() {
    this.checkPoints();
  }

  points: Point[] = [];
  linesToDraw: Line[] = [];
  pointCount = 30;
  createdPoints = 0;
  c!: HTMLCanvasElement;
  cC!: HTMLDivElement;
  ctx!: any;
  animationFrame!: number;
  scrolltop = 0;
  scrollStart = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.c = this.canvas.nativeElement;
    this.cC = this.canvasContainer.nativeElement;
    this.points = [];
    this.linesToDraw = [];
    this.createdPoints = 0;
    setTimeout(() => {
      this.initCanvas();
    }, 10);
  }

  initCanvas() {
    this.c.width = this.cC.clientWidth;
    this.c.height = this.cC.clientHeight;
    this.ctx = this.c.getContext('2d');
    this.draw();
  }

  checkPoints() {
    if (window.scrollY > this.scrolltop) {
      this.addPoint();
    } else {
      this.removePoint();
    }
    this.scrolltop = window.scrollY;
    if (this.scrolltop < 0) {
      this.scrolltop = 0;
    }
  }

  addPoint() {
    if(window.scrollY < document.body.clientHeight / this.pointCount && this.scrollStart == false){
      this.createPoint();
      this.createPoint();
      this.scrollStart = true
    }
    if (
      window.scrollY >=
      (document.body.clientHeight / this.pointCount) * (1 + this.createdPoints)
    ) {
      this.createPoint();
    }
  }

  removePoint() {
    if (
      window.scrollY <=
      (document.body.clientHeight / this.pointCount) * (1 + this.createdPoints)
    ) {
      this.removeLines();
      this.points.splice(this.points.length - 1, 1);
      this.createdPoints--;
      if (this.createdPoints < 0) {
        this.createdPoints = 0;
      }
    }
    if(window.scrollY == 0){
      this.scrollStart = false;
    }
  }

  removeLines() {
    let linesToDelete: number[] = [];
    this.linesToDraw.forEach((l, i) => {
      if (l.i1 == this.points.length - 1 || l.i2 == this.points.length - 1) {
        linesToDelete.push(i);
      }
    });
    linesToDelete.reverse().forEach((l) => this.linesToDraw.splice(l, 1));
  }

  createPoint() {
    const point = new Point(this.getX(), this.getY());
    this.points.push(point);
    this.createdPoints++;
    this.createLines();
  }

  getX() {
    return 5 + Math.random() * (this.c.width - 10);
  }

  getY() {
    let segmentHeight = this.c.height / this.pointCount;
    return (
      10 +
      (1.35 * segmentHeight * this.createdPoints +
        Math.random() * segmentHeight)
    );
  }

  createLines() {
    this.points.forEach((p, i) => {
      if (
        p.pointsAreClose(
          this.points[this.points.length - 1],
          (this.c.height / this.pointCount) * 4
        )
      ) {
        const line = new Line(
          this.points[this.points.length - 1],
          this.points.length - 1,
          p,
          i
        );
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
      this.ctx.fillStyle = 'hsla(270, 80%, 50%, 0.3)';
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
    gradient.addColorStop(0, `hsla(280, 90%, 70%, 0.4`);
    gradient.addColorStop(0.3, `hsla(217, 80%, 40%, 0.4`);
    gradient.addColorStop(1, `hsla(165, 100%,20%, 0.4)`);
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
      p.x <= 5 || p.x >= this.c.width - 5 ? -p.speed.x : p.speed.x;
    return newDirection;
  }

  atYLimit(p: Point) {
    let newDirection =
      p.y <= 80 || p.y >= this.c.height - 20 ? -p.speed.y : p.speed.y;
    return newDirection;
  }

  moveLines() {
    this.linesToDraw.forEach((l) => {
      let p1 = this.points[l.i1];
      let p2 = this.points[l.i2];
      l.x1 = p1.x;
      l.x2 = p2.x;
      l.y1 = p1.y;
      l.y2 = p2.y;
    });
  }

/*   savePoints(){
    this.points.forEach
  } */
}
