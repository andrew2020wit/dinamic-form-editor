import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { baseApiUrl } from 'environments/environment';
import { FormEditorService } from '../form-editor.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit, AfterViewInit {
  form = new FormGroup({});
  model = {};
  respond: Array<{ form_field_id: number; value: any }> = [];

  formlyFieldConfig: FormlyFieldConfig[] = [];
  titleIdMap = new Map<string, number>();
  idTitleMap = new Map<number, string>();
  idTypeMap = new Map<number, string>();

  formId: number;

  constructor(
    private formEditorService: FormEditorService,
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formEditorService.titleIdMap$.subscribe((x) => (this.titleIdMap = x));
    this.formEditorService.idTitleMap$.subscribe((x) => (this.idTitleMap = x));
    this.formEditorService.idTypeMap$.subscribe((x) => (this.idTypeMap = x));

    this.formId = this.activateRoute.snapshot.params['id'];
    console.log('formId', this.formId);

    if (this.formId) {
      this.formEditorService.getFormById$(this.formId).subscribe((form) => {
        console.log('idTitleMap', this.idTitleMap);
        const fields = form.data.form_field_values;
        const newModel = {};
        fields.forEach((x) => {
          newModel[this.idTitleMap.get(x.form_field_id)] = x.value;
          if (this.idTypeMap.get(x.form_field_id) === 'date') {
            newModel[this.idTitleMap.get(x.form_field_id)] = new Date(x.value);
          }
        });
        this.model = newModel;
        console.log('form', form);
        console.log('model', this.model);
      });
    }
    this.formEditorService.formlyFieldConfig$.subscribe(
      (x) => (this.formlyFieldConfig = x)
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onSubmit() {
    console.log('model:', this.model);
    console.log('titleIdMap:', this.titleIdMap);

    this.respond = [];

    let url = baseApiUrl + '/forms';
    if (this.formId) {
      url = url + `/${this.formId}`;
    }

    for (let key in this.model) {
      const id = this.titleIdMap.get(key);
      //
      const typ = this.idTypeMap.get(id);

      let val = this.model[key];
      if (typ === 'date') {
        val = (val as Date).toLocaleString();
        console.log('val', val);
      }
      this.respond.push({ form_field_id: id, value: val });
    }

    console.log(`this.respond`, this.respond);
    this.http
      .post(url, { form_field_values: this.respond })
      .subscribe((x) => console.log('post', x));
    this.router.navigate(['/']);
  }

  onClearAll() {
    this.model = {};
  }
  onCancel() {
    this.router.navigate(['/']);
  }
  onDeleteForm() {
    if (!confirm('realy delete?')) {
      return;
    }
    if (this.formId) {
      this.http.delete(baseApiUrl + `/forms/${this.formId}`).subscribe((x) => {
        console.log('delete: ', x);
        this.router.navigate(['/']);
      });
    }
  }
}
