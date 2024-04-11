import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofrComponent } from './sofr.component';

describe('SofrComponent', () => {
  let component: SofrComponent;
  let fixture: ComponentFixture<SofrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SofrComponent]
    });
    fixture = TestBed.createComponent(SofrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
