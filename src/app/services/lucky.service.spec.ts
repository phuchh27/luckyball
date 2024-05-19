import { TestBed } from '@angular/core/testing';

import { LuckyService } from './lucky.service';

describe('LuckyService', () => {
  let service: LuckyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuckyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
