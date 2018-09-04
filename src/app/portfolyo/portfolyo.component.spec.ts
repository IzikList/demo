import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolyoComponent } from './portfolyo.component';

describe('PortfolyoComponent', () => {
  let component: PortfolyoComponent;
  let fixture: ComponentFixture<PortfolyoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolyoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
