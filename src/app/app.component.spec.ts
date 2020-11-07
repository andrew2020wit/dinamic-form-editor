import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`expect(app.menuOn).toEqual(true)`, () => {
    expect(component.menuOn).toEqual(true);
  });

  it('homeTitle should contain "Blog"', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#homeTitle'));
    const el: HTMLElement = de.nativeElement;
    expect(el.textContent).toContain('Blog');
  });
});
