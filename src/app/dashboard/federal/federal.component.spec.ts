import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederalComponent } from './federal.component';

describe('FederalComponent', () => {
  let component: FederalComponent;
  let fixture: ComponentFixture<FederalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FederalComponent]
    });
    fixture = TestBed.createComponent(FederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
