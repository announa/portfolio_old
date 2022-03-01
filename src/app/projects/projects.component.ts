import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ProjectsService } from '../projects.service';
import { SliderService } from '../slider.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit, AfterViewInit {
  @Input() scrollposition: any;
  @Output() goBack = new EventEmitter();
  @ViewChildren('imgProject') imgProject!: QueryList<any>;
  currentProjectImage = 0;
  imgProjectArr!: ElementRef[];

  constructor(public projects: ProjectsService, public slider: SliderService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.slider.getHTMLElements('projects', this.imgProject)
    setInterval(() => {
      this.slider.slideImagesRight('projects')
    }, 4000)
  }

  backToPortfolio(){
    this.goBack.emit(true);
  }
}
