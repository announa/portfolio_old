import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit, AfterViewInit {
  projects = [
    {
      title: 'Bitcoin App',
      description:
        'A BTC/USD exchange calculator which also shows the historic exchange rate over a chosen period',
      url: 'https://annaludewig.net/projects/bitcoin-app/index.html',
      img: 'bitcoin.png',
    },
    {
      title: 'El Pollo Loco',
      description: 'A jump and run game written in JavaScript',
      url: 'https://annaludewig.net/projects/el_pollo_loco/index.html',
      img: 'pollo_loco.png',
    },
    {
      title: 'Pokedex',
      description: 'A pokemon gallery using the pokeapi',
      url: 'https://annaludewig.net/projects/pokedex/index.html',
      img: 'pokedex.png',
    },
    {
      title: 'Ring of Fire',
      description:
        'A multiplayer online card game, built with Angular and TypeScript',
      url: 'https://ring-of-fire-7eef3.web.app/',
      img: 'ring_of_fire.png',
    },
  ];

  observer!: IntersectionObserver;

  @ViewChildren('projectItem') projectItemList!: QueryList<any>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: .5
    }
    console.log(this.projectItemList)
    this.observer = new IntersectionObserver((entries) => {
      console.log(entries);
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.toggle('work-pos-0')
          this.observer.unobserve(e.target);
        }
      })
    }, options);

    this.projectItemList.forEach((p) => this.observer.observe(p.nativeElement));
  }
}
