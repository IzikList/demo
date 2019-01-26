import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocSimulatorComponent } from './poc-simulator.component';

describe('PocSimulatorComponent', () => {
  let component: PocSimulatorComponent;
  let fixture: ComponentFixture<PocSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
