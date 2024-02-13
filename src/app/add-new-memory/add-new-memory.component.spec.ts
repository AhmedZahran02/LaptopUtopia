import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMemoryComponent } from './add-new-memory.component';

describe('AddNewMemoryComponent', () => {
  let component: AddNewMemoryComponent;
  let fixture: ComponentFixture<AddNewMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
