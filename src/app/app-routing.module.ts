import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: 'privacy', component: PrivacyComponent},
];

const config = {
  /* instead of use extraOptions for Router */
  onSameUrlNavigation:
    'reload' /**fix to rescroll to same anchor url after scrolling */,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, <ExtraOptions>config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
