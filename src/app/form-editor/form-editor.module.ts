import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { ShareModule } from './../share.module';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FormListComponent } from './form-list/form-list.component';

@NgModule({
  declarations: [FormListComponent, EditFormComponent],
  exports: [FormListComponent],
  imports: [
    CommonModule,
    ShareModule,
    FormlyModule.forRoot({}),
    FormlyMaterialModule,
    ReactiveFormsModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class FormEditorModule {}
