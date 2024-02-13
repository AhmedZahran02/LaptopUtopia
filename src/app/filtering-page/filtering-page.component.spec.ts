import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringPageComponent } from './filtering-page.component';

describe('FilteringPageComponent', () => {
  let component: FilteringPageComponent;
  let fixture: ComponentFixture<FilteringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteringPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
