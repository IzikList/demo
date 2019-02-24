import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketNewComponent } from './market-new.component';

describe('MarketNewComponent', () => {
  let component: MarketNewComponent;
  let fixture: ComponentFixture<MarketNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
