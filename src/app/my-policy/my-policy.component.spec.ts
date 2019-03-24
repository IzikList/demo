import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPolicyComponent } from './my-policy.component';

describe('MyPolicyComponent', () => {
  let component: MyPolicyComponent;
  let fixture: ComponentFixture<MyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
