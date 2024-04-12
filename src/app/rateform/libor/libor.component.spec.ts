import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiborComponent } from './libor.component';

describe('LiborComponent', () => {
  let component: LiborComponent;
  let fixture: ComponentFixture<LiborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiborComponent]
    });
    fixture = TestBed.createComponent(LiborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
