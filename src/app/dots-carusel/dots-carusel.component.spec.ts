import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsCaruselComponent } from './dots-carusel.component';

describe('DotsCaruselComponent', () => {
  let component: DotsCaruselComponent;
  let fixture: ComponentFixture<DotsCaruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotsCaruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsCaruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
