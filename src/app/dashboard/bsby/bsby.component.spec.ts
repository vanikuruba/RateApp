import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsbyComponent } from './bsby.component';

describe('BsbyComponent', () => {
  let component: BsbyComponent;
  let fixture: ComponentFixture<BsbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BsbyComponent]
    });
    fixture = TestBed.createComponent(BsbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
