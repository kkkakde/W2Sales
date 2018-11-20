import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEnquiryTypeComponent } from './master-enquiry-type.component';

describe('MasterEnquiryTypeComponent', () => {
  let component: MasterEnquiryTypeComponent;
  let fixture: ComponentFixture<MasterEnquiryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEnquiryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEnquiryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
