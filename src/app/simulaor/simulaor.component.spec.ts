import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulaorComponent } from './simulaor.component';

describe('SimulaorComponent', () => {
  let component: SimulaorComponent;
  let fixture: ComponentFixture<SimulaorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulaorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulaorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
