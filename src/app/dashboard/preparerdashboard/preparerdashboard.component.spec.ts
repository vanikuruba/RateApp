import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparerdashboardComponent } from './preparerdashboard.component';

describe('PreparerdashboardComponent', () => {
  let component: PreparerdashboardComponent;
  let fixture: ComponentFixture<PreparerdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreparerdashboardComponent]
    });
    fixture = TestBed.createComponent(PreparerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
