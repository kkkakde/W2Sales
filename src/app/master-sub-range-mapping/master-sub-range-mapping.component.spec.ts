import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubRangeMappingComponent } from './master-sub-range-mapping.component';

describe('MasterSubRangeMappingComponent', () => {
  let component: MasterSubRangeMappingComponent;
  let fixture: ComponentFixture<MasterSubRangeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSubRangeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubRangeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
