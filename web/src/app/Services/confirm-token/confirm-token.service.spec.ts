import { TestBed } from '@angular/core/testing';

import { ConfirmTokenService } from './confirm-token.service';

describe('ConfirmTokenService', () => {
  let service: ConfirmTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
