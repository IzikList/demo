import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorIvolvingLeComponent } from './simulator-ivolving-le.component';

describe('SimulatorIvolvingLeComponent', () => {
  let component: SimulatorIvolvingLeComponent;
  let fixture: ComponentFixture<SimulatorIvolvingLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorIvolvingLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorIvolvingLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
