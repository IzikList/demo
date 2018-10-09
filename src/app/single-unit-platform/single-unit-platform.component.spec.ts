import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUnitPlatformComponent } from './single-unit-platform.component';

describe('SingleUnitPlatformComponent', () => {
  let component: SingleUnitPlatformComponent;
  let fixture: ComponentFixture<SingleUnitPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUnitPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUnitPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
