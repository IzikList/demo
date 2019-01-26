import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUnit2Component } from './single-unit2.component';

describe('SingleUnit2Component', () => {
  let component: SingleUnit2Component;
  let fixture: ComponentFixture<SingleUnit2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUnit2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUnit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
