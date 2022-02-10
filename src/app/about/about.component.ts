import { Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
/* import { projects } from '../projects' */
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnChanges {
  /* projects = projects; */
  currentProject: any;
/*   projectSelected = false;
  openProject = false; */
  clipValue = 100;

  pictures = ['me1.jpg', ]
  @ViewChild('separator') separator!: ElementRef
  @HostListener("document:scroll", ['$event'])
  getClipValue(){
    if(document.documentElement.scrollTop < 0.3 * window.innerHeight){
      this.clipValue = 100
    } else{
      this.clipValue = (100 - (document.documentElement.scrollTop - 0.3 * window.innerHeight) / (0.15 * window.innerHeight) * 100);
      if(this.clipValue < 0){
        this.clipValue = 0;
      }
  }}

  constructor(public projects: ProjectsService) { }

  ngOnInit(): void {
    console.log(this.projects.projectSelected)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.projects.projectSelected)
  }

  getClipPath(){
    return `polygon(0 0, 100% 0, 100% 0, 0 ${this.clipValue}%)`
  }

  showProject(event: string){
    let currentProjectLink = event;
    this.currentProject = this.projects.projects.find(p => p.link.includes(currentProjectLink));
    this.projects.projectSelected = true;
    setTimeout(() => {
      this.projects.openProject = true;
    }, 1);
    document.body.style.overflowY = 'hidden'
  }
}
