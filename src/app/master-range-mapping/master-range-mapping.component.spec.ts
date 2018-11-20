import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRangeMappingComponent } from './master-range-mapping.component';

describe('MasterRangeMappingComponent', () => {
  let component: MasterRangeMappingComponent;
  let fixture: ComponentFixture<MasterRangeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRangeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRangeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
