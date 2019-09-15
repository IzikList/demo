import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDialogComponent } from './complete-dialog.component';

describe('CompleteDialogComponent', () => {
  let component: CompleteDialogComponent;
  let fixture: ComponentFixture<CompleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
