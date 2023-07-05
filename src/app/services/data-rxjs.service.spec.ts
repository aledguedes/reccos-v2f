import { TestBed } from '@angular/core/testing';

import { DataRxjsService } from './data-rxjs.service';

describe('DataRxjsService', () => {
  let service: DataRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
