import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumpcComponent } from './numpc.component';

describe('NumpcComponent', () => {
  let component: NumpcComponent;
  let fixture: ComponentFixture<NumpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
