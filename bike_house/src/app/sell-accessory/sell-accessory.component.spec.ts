import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAccessoryComponent } from './sell-accessory.component';

describe('SellAccessoryComponent', () => {
  let component: SellAccessoryComponent;
  let fixture: ComponentFixture<SellAccessoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellAccessoryComponent]
    });
    fixture = TestBed.createComponent(SellAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
