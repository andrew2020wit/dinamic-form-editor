import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormEditorService, IFormItem } from '../form-editor.service';
import { IFormField } from './../form-editor.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit, AfterViewInit {
  formFields: IFormField[] = null;
  formItems: IFormItem[] = null;

  strSample = '';
  filterDateAfter: Date;

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;
  queryPage = 1;

  errorMes: any;

  filterReLoadSubscription: Subscription;

  constructor(
    private formEditorService: FormEditorService,
    private router: Router
  ) {
    this.formEditorService.formFields$.subscribe((x) => {
      this.formFields = x;
      this.filterReLoad();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.filterInput = document.querySelector('#filterInput');
    this.filterInputKeyUp = fromEvent(this.filterInput, 'keyup') as Observable<
      Event
    >;
    this.filterInputKeyUp.pipe(debounceTime(0)).subscribe(() => {
      this.queryPage = 1;
      this.filterReLoad();
    });
  }

  filterReLoad() {
    if (this.filterReLoadSubscription) {
      this.filterReLoadSubscription.unsubscribe();
    }
    this.filterReLoadSubscription = this.formEditorService
      .getForms$({
        search: this.strSample,
        createdAfter: this.filterDateAfter,
        page: this.queryPage,
      })
      .subscribe(
        (x) => {
          console.log('getForms', x);
          this.formItems = x.data;
        },
        (error) => {
          this.errorMes = error;
          console.log('filterReLoad error:', error);
        }
      );
    console.log(
      'this.filterReLoadSubscription2',
      this.filterReLoadSubscription
    );
  }

  toEdit(id) {
    this.router.navigate(['/edit-page', id]);
  }

  inputDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'input') {
      this.filterDateAfter = event.value;
      this.queryPage = 1;
      this.filterReLoad();
    }
  }

  nextPage() {
    this.queryPage = this.queryPage + 1;
    this.filterReLoad();
  }
  prevPage() {
    if (this.queryPage < 2) {
      return;
    }
    this.queryPage = this.queryPage - 1;
    this.filterReLoad();
  }
  clearAll() {
    location.reload();
  }
}
