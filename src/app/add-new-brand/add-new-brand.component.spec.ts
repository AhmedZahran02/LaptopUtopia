import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBrandComponent } from './add-new-brand.component';

describe('AddNewBrandComponent', () => {
  let component: AddNewBrandComponent;
  let fixture: ComponentFixture<AddNewBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
