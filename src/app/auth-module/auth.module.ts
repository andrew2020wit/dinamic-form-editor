import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../share.module';
import { AuthComponent } from './view/auth-component/auth.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { UserWidgetComponent } from './view/user-widget/user-widget.component';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent, UserWidgetComponent],
  imports: [CommonModule, ShareModule, MatDialogModule],
  exports: [AuthComponent, LoginFormComponent],
})
export class AuthModule {}
