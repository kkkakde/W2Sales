import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterResourceRoleMappingComponent } from './master-resource-role-mapping.component';

describe('MasterResourceRoleMappingComponent', () => {
  let component: MasterResourceRoleMappingComponent;
  let fixture: ComponentFixture<MasterResourceRoleMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterResourceRoleMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterResourceRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
