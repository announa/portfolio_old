import { Injectable } from '@angular/core';

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
        'This app calculates the currency exchange for the current exchange rate between Bitcoin and US Dollar. It also shows the historic exchange rate over a chosen period, represented in a table or a chart.',
      github: 'https://github.com/announa/bitcoin-app',
      url: 'https://annaludewig.net/projects/bitcoin-app/index.html',
      img: ['bitcoin.png', 'bitcoin_0.png', 'bitcoin_1.png', 'bitcoin_2.png'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    },
    {
      title: 'El Pollo Loco',
      link: 'el_pollo_loco',
      description: 'A jump and run game',
      description_long: 'This is a funny little game written in JavaScript.',
      github: 'https://github.com/announa/el_pollo_loco',
      url: 'https://annaludewig.net/projects/el_pollo_loco/index.html',
      img: ['pollo_loco.png', 'pollo_loco_0.png', 'pollo_loco_1.png', 'pollo_loco_2.png'],
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Pokedex',
      link: 'pokedex',
      description: 'A pokemon gallery',
      description_long:
        'In this Pokémon gallery you can find all the Pokémon or search them by name or their index. It uses the Pokeapi.',
      github: 'https://github.com/announa/pokedex',
      url: 'https://annaludewig.net/projects/pokedex/index.html',
      img: ['pokedex.png', 'pokedex_0.png', 'pokedex_1.png', 'pokedex_2.png'],
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    },
    {
      title: 'Ring of Fire',
      link: 'ring_of_fire',
      description: 'A multiplayer online card game',
      description_long:
        'A card game which can be played with multiple persons online. This game is built with TypeScript and Angular.',
      github: 'https://github.com/announa/ring_of_fire',
      url: 'https://ring-of-fire-7eef3.web.app/',
      img: ['ring_of_fire.png', 'ring_of_fire_0.png', 'ring_of_fire_1.png', 'ring_of_fire_2.png'],
      technologies: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    },
  ];

  constructor() {}

  showProject(event: string) {
    this.currentProject = this.projects.find((p) => p.link.includes(event));
    this.projectSelected = true;
    setTimeout(() => {
      this.openProject = true;
    }, 1);
    this.scrollposition = window.scrollY;
    setTimeout(() => {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    }, 500);
  }

  closeProject() {
    this.openProject = false;
    setTimeout(() => {
      this.projectSelected = false;
    }, 500);
    document.body.style.height = '';
    document.body.style.overflowY = '';
    if (this.scrollposition) {
      window.scrollTo(0, this.scrollposition);
    }
  }
}
