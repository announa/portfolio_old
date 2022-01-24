import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { Router, RouterModule, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NavigationService } from './navigation.service';
import { filter } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ButtonComponent } from './button/button.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { StartAnimationComponent } from './start-animation/start-animation.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SkillsComponent,
    PortfolioComponent,
    AboutComponent,
    AboutMeComponent,
    ButtonComponent,
    StartAnimationComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  constructor(router: Router, viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 0]);
    router.events
      .pipe(filter((e: any) => e instanceof Scroll))
      .subscribe((e: Scroll) => {
        
        //a good solve but it still does not scroll to anchor element after second click on the same anchor
        //one fix should be to set routing config option onSameUrlNavigation: 'reload',
        if (e.anchor) {
          // anchor navigation
          /* setTimeout is the core line to solve the solution */
          setTimeout(() => {
            viewportScroller.scrollToAnchor(e.anchor as string);
          });
        } else if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
}
