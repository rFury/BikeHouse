import { TestBed } from '@angular/core/testing';
import { bikeService } from './bike.service';

describe('bikeService', () => {
  let service: bikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(bikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
