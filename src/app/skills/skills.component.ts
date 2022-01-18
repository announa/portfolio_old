import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'REST API', 'git', 'SCRUM']

  constructor() { }

  ngOnInit(): void {
  }

}
