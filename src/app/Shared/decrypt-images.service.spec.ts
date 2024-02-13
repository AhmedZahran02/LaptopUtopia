import { TestBed } from '@angular/core/testing';

import { DecryptImagesService } from './decrypt-images.service';

describe('DecryptImagesService', () => {
  let service: DecryptImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecryptImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
