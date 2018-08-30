import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuminputComponent } from './numinput.component';

describe('NuminputComponent', () => {
  let component: NuminputComponent;
  let fixture: ComponentFixture<NuminputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuminputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuminputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
