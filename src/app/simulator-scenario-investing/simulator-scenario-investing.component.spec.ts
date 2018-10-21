import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorScenarioInvestingComponent } from './simulator-scenario-investing.component';

describe('SimulatorScenarioInvestingComponent', () => {
  let component: SimulatorScenarioInvestingComponent;
  let fixture: ComponentFixture<SimulatorScenarioInvestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorScenarioInvestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorScenarioInvestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
