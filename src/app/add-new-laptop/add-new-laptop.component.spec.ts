import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLaptopComponent } from './add-new-laptop.component';

describe('AddNewLaptopComponent', () => {
  let component: AddNewLaptopComponent;
  let fixture: ComponentFixture<AddNewLaptopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLaptopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLaptopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
