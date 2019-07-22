import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyForecastComponent } from './policy-forecast.component';

describe('PolicyForecastComponent', () => {
  let component: PolicyForecastComponent;
  let fixture: ComponentFixture<PolicyForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
