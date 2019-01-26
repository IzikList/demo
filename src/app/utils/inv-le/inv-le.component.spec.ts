import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvLeComponent } from './inv-le.component';

describe('InvLeComponent', () => {
  let component: InvLeComponent;
  let fixture: ComponentFixture<InvLeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvLeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvLeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
