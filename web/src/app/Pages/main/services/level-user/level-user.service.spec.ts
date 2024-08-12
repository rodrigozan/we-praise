import { TestBed } from '@angular/core/testing';

import { LevelUserService } from './level-user.service';

describe('LevelUserService', () => {
  let service: LevelUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
