import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projectSelected = false;
  openProject = false;
  currentProject: any;
  scrollposition: number = 0;
  projects = [
    {
      title: 'Bitcoin App',
      link: 'bitcoin_app',
      description: 'A BTC/USD exchange calculator',
      description_long:
        'This app calculates the currency exchange for the current exchange rate between Bitcoin and US Dollar. It also shows the historic exchange rate over a chosen period, represented in a table or a chart. It was my first project implementing an API.',
      github: ['https://github.com/announa/bitcoin-app'],
      url: 'https://annaludewig.net/projects/bitcoin-app/index.html',
      img: ['bitcoin.jpg', 'bitcoin_0.png', 'bitcoin_1.png', 'bitcoin_2.png'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    },
    {
      title: 'El Pollo Loco',
      link: 'el_pollo_loco',
      description: 'A jump and run game',
      description_long:
        'This is a funny little game written in JavaScript. It was my first project I realized using object orientated programming.',
      github: ['https://github.com/announa/el_pollo_loco'],
      url: 'https://annaludewig.net/projects/el_pollo_loco/index.html',
      img: [
        'pollo_loco.jpg',
        'pollo_loco_0.jpg',
        'pollo_loco_1.jpg',
        'pollo_loco_2.jpg',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Pokedex',
      link: 'pokedex',
      description: 'A pokemon gallery',
      description_long:
        'In this Pokémon gallery you can look up all the Pokémon or search them by name or their index. It uses the Pokeapi.',
      github: ['https://github.com/announa/pokedex'],
      url: 'https://annaludewig.net/projects/pokedex/index.html',
      img: ['pokedex.jpg', 'pokedex_0.jpg', 'pokedex_1.jpg', 'pokedex_2.jpg'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    },
/*     {
      title: 'Ring of Fire',
      link: 'ring_of_fire',
      description: 'A multiplayer online card game',
      description_long:
        'A card game which can be played with multiple persons online. The backend was realized using firebase. This game was my first bigger project I built with TypeScript and Angular.',
      github: ['https://github.com/announa/ring_of_fire'],
      url: 'https://ring-of-fire-7eef3.web.app/',
      img: [
        'ring_of_fire.jpg',
        'ring_of_fire_0.jpg',
        'ring_of_fire_1.jpg',
        'ring_of_fire_2.jpg',
      ],
      technologies: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    }, */
    {
      title: 'Kanban',
      link: 'kanban',
      description: 'A kanban board',
      description_long:
        'Kanban is a process management tool that helps you organizing your tasks and workflow. This was my biggenst project so far. It is written in TypeScript using Angular as Framework und Firebase for the backend.',
      github: ['https://github.com/announa/kanban-board'],
      url: 'https://www.annaludewig.net/projects/kanban/index.html',
      img: [
        'kanban.jpg',
        'kanban_0.jpg',
        'kanban_1.jpg',
        'kanban_2.jpg',
      ],
      technologies: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    },
    {
      title: 'Network-animation',
      link: 'network',
      description: 'A background animation with mouse interaction',
      description_long:
        'This is an unobstrusive background animation with mouse interaction. I inicially wrote it in JavaScript, but for this website I adapted it to angular.',
      github: [
        'https://github.com/announa/background-animation---network',
        'https://github.com/announa/background-animation---network__angular',
      ],
      url: 'https://annaludewig.net/projects/network-animation/index.html',
      img: ['bg-anim.jpg', 'bg-anim_0.jpg', 'bg-anim_1.jpg', 'bg-anim_2.jpg'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Angular', 'TypeScript'],
    },
  ];

  aboutme!: ElementRef;

  constructor() {}

  showProject(event: string) {
    this.currentProject = this.projects.find((p) => p.link.includes(event));
    this.projectSelected = true;
    setTimeout(() => {
      this.openProject = true;
    }, 1);
    this.scrollposition = window.scrollY;
    this.fixBody();
  }

  fixBody() {
    setTimeout(() => {
      this.aboutme.nativeElement.style.marginTop =
        (-this.scrollposition).toString() + 'px';
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, this.scrollposition);
    }, 500);
  }

  closeProject() {
    this.openProject = false;
    setTimeout(() => {
      this.projectSelected = false;
    }, 500);
    this.removefixedBody();
  }

  removefixedBody() {
    document.body.style.overflowY = '';
    document.body.style.height = '';
    this.aboutme.nativeElement.style.marginTop = '';
    if (this.scrollposition) {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, this.scrollposition);
      document.documentElement.style.scrollBehavior = '';
    }
  }
}
