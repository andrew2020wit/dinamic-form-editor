import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from './../auth-module/auth.module';
import { FormEditorModule } from './../form-editor/form-editor.module';
import { ShareModule } from './../share.module';
import { AboutComponent } from './pages/about/about.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundPageComponent,
    AboutComponent,
    TestPageComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule,
    AuthModule,
    FormEditorModule,
  ],
})
export class ViewModule {}
