import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStorageComponent } from './add-new-storage.component';

describe('AddNewStorageComponent', () => {
  let component: AddNewStorageComponent;
  let fixture: ComponentFixture<AddNewStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
