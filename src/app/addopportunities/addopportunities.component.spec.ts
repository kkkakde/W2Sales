import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddopportunitiesComponent } from './addopportunities.component';

describe('AddopportunitiesComponent', () => {
  let component: AddopportunitiesComponent;
  let fixture: ComponentFixture<AddopportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddopportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddopportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
