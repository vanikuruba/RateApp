import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeComponent } from './prime.component';

describe('PrimeComponent', () => {
  let component: PrimeComponent;
  let fixture: ComponentFixture<PrimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeComponent]
    });
    fixture = TestBed.createComponent(PrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
