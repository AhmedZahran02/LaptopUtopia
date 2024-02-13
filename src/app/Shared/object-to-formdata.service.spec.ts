import { TestBed } from '@angular/core/testing';

import { ObjectToFormdataService } from './object-to-formdata.service';

describe('ObjectToFormdataService', () => {
  let service: ObjectToFormdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectToFormdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
