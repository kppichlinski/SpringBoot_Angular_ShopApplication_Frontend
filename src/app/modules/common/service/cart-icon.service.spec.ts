import { TestBed } from '@angular/core/testing';

import { CartIconService } from './cart-icon.service';

describe('CartIconService', () => {
  let service: CartIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
