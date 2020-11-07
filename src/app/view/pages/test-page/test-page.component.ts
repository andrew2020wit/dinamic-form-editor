import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth-module/auth.service';
import { baseApiUrl } from 'environments/environment';
import { FormEditorService } from './../../../form-editor/form-editor.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formEditorService: FormEditorService
  ) {}

  ngOnInit(): void {}
  getFormFields0() {
    this.http
      .get(baseApiUrl + '/form_fields')
      .subscribe((x) => console.log('getFormFields', x));
  }
  getForms() {
    this.http
      .get(baseApiUrl + '/forms')
      .subscribe((x) => console.log('getForms', x));
  }

  getFormFields() {
    this.formEditorService.getFormFields();
  }
}
