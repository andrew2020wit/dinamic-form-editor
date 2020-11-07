import { TestBed } from '@angular/core/testing';

import { StylesStateService } from './styles-state.service';

describe('StylesStateService', () => {
  let service: StylesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
