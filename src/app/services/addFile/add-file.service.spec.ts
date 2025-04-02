import { TestBed } from '@angular/core/testing';

import { AddFileService } from './add-file.service';

describe('AddFileService', () => {
  let service: AddFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
