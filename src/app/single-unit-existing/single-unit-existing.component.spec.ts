import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUnitExistingComponent } from './single-unit-existing.component';

describe('SingleUnitExistingComponent', () => {
  let component: SingleUnitExistingComponent;
  let fixture: ComponentFixture<SingleUnitExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUnitExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUnitExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
