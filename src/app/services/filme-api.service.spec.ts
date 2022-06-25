import { TestBed } from '@angular/core/testing';

import { FilmeApiService } from './filme-api.service';

describe('FilmeApiService', () => {
  let service: FilmeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
