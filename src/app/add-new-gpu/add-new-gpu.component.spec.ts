import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGPUComponent } from './add-new-gpu.component';

describe('AddNewGPUComponent', () => {
  let component: AddNewGPUComponent;
  let fixture: ComponentFixture<AddNewGPUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewGPUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
