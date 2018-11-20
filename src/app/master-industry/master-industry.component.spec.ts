import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterIndustryComponent } from './master-industry.component';

describe('MasterIndustryComponent', () => {
  let component: MasterIndustryComponent;
  let fixture: ComponentFixture<MasterIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
