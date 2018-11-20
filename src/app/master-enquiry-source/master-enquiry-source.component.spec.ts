import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEnquirySourceComponent } from './master-enquiry-source.component';

describe('MasterEnquirySourceComponent', () => {
  let component: MasterEnquirySourceComponent;
  let fixture: ComponentFixture<MasterEnquirySourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEnquirySourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEnquirySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
