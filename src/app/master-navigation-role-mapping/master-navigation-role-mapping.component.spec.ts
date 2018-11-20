import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNavigationRoleMappingComponent } from './master-navigation-role-mapping.component';

describe('MasterNavigationRoleMappingComponent', () => {
  let component: MasterNavigationRoleMappingComponent;
  let fixture: ComponentFixture<MasterNavigationRoleMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterNavigationRoleMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNavigationRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
