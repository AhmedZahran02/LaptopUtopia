import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCPUComponent } from './add-new-cpu.component';

describe('AddNewCPUComponent', () => {
  let component: AddNewCPUComponent;
  let fixture: ComponentFixture<AddNewCPUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCPUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
