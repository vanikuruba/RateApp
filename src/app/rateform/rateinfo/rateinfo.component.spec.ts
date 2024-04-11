import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateinfoComponent } from './rateinfo.component';

describe('RateinfoComponent', () => {
  let component: RateinfoComponent;
  let fixture: ComponentFixture<RateinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateinfoComponent]
    });
    fixture = TestBed.createComponent(RateinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
