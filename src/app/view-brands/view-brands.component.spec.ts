import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrandsComponent } from './view-brands.component';

describe('ViewBrandsComponent', () => {
  let component: ViewBrandsComponent;
  let fixture: ComponentFixture<ViewBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
