import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-module/guards/auth.guard';
import { EditFormComponent } from './form-editor/edit-form/edit-form.component';
import { AboutComponent } from './view/pages/about/about.component';
import { HomePageComponent } from './view/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './view/pages/not-found-page/not-found-page.component';
import { TestPageComponent } from './view/pages/test-page/test-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'edit-page/:id',
    component: EditFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit-page', component: EditFormComponent, canActivate: [AuthGuard] },
  { path: 'test-page', component: TestPageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
