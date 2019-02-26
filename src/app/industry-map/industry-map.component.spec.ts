import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryMapComponent } from './industry-map.component';

describe('IndustryMapComponent', () => {
  let component: IndustryMapComponent;
  let fixture: ComponentFixture<IndustryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
