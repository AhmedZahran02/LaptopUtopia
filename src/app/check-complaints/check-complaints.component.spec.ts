import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckComplaintsComponent } from './check-complaints.component';

describe('CheckComplaintsComponent', () => {
  let component: CheckComplaintsComponent;
  let fixture: ComponentFixture<CheckComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
