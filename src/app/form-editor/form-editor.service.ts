import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { baseApiUrl } from './../../environments/environment.prod';

export interface IFormField {
  created_at: Date;
  id: number;
  is_required: boolean;
  max?: number;
  max_length?: number;
  min?: number;
  order: number;
  title: string;
  type: string;
  updated_at: Date;
}

interface IFormFieldRequest {
  data: IFormField[];
  meta: any;
}

export interface IFormItem {
  id: number;
  created_at: string;
  updated_at: string;
  form_field_values: [{ id: number; form_field_id: number; value: string }];
}

interface IFormRequest {
  data: IFormItem[];
  meta: any;
}

interface IOneFormRequest {
  data: IFormItem;
  meta: any;
}

interface IQueryFormsParameters {
  search?: string;
  createdAfter?: Date;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class FormEditorService {
  formFields$ = new BehaviorSubject<IFormField[]>([]);
  formlyFieldConfig$ = new BehaviorSubject<FormlyFieldConfig[]>([]);
  titleIdMap$ = new BehaviorSubject<Map<string, number>>(null);
  idTitleMap$ = new BehaviorSubject<Map<number, string>>(null);
  idTypeMap$ = new BehaviorSubject<Map<number, string>>(null);

  constructor(private http: HttpClient) {
    this.formFields$.subscribe((x) => {
      this.computeFormlyFieldConfig(x);
    });
    this.getFormFields();
  }

  getFormFields() {
    this.http
      .get<IFormFieldRequest>(baseApiUrl + '/form_fields')
      .subscribe((res) => {
        this.formFields$.next(res.data);
        console.log('getFormFields', res.data);
      });
  }

  getForms$(param?: IQueryFormsParameters) {
    let params = new HttpParams();
    if (param) {
      if (param.search) {
        params = params.set('search', param.search);
      }
      if (param.createdAfter) {
        let fDate = 'created_at,>=,';
        fDate = fDate + param.createdAfter.toISOString();
        params = params.set('filters', fDate);
      }
    }
    params = params.set('order_by', 'created_at');
    params = params.set('order_direction', 'desc');
    params = params.set('per_page', '10');
    params = params.set('page', param.page.toString());

    return this.http.get<IFormRequest>(baseApiUrl + '/forms', { params });
  }

  getFormById$(id: number) {
    return this.http.get<IOneFormRequest>(baseApiUrl + `/forms/${id}`);
  }

  computeFormlyFieldConfig(xformFields) {
    this.formlyFieldConfig$.next([]);
    this.titleIdMap$.next(null);
    this.idTitleMap$.next(null);
    this.idTypeMap$.next(null);

    if (!xformFields) {
      console.error('formFields null');
      return;
    }
    const newFormArr: FormlyFieldConfig[] = [];
    const titleIdMapNew = new Map<string, number>();
    const idTitleMapNew = new Map<number, string>();
    const idTypeMapNew = new Map<number, string>();

    xformFields.forEach((element) => {
      titleIdMapNew.set(element.title, element.id);
      idTitleMapNew.set(element.id, element.title);
      idTypeMapNew.set(element.id, element.type);

      const type = element.type;

      const newForm: FormlyFieldConfig = {
        key: element.title,
        templateOptions: { label: element.title, placeholder: element.title },
      };

      if (element.is_required) {
        newForm.templateOptions.required = element.is_required;
      }

      if (type === 'number') {
        newForm.type = 'input';
        newForm.templateOptions.type = 'number';
        if (element.max) {
          newForm.templateOptions.max = +element.max;
        }
        if (element.min) {
          newForm.templateOptions.min = +element.min;
        }
      }

      if (type === 'date') {
        newForm.type = 'datepicker';
      }

      if (type === 'text') {
        newForm.type = 'input';
        if (element.max_length) {
          newForm.templateOptions.maxLength = element.max_length;
        }
      }
      if (type !== 'text' && type !== 'number' && type !== 'date') {
        console.error('bad type');
      }

      newFormArr.push(newForm);
    });
    this.formlyFieldConfig$.next(newFormArr);
    this.titleIdMap$.next(titleIdMapNew);
    this.idTitleMap$.next(idTitleMapNew);
    this.idTypeMap$.next(idTypeMapNew);
  }
}
