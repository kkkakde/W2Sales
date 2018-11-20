import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNavigationComponent } from './master-navigation.component';

describe('MasterNavigationComponent', () => {
  let component: MasterNavigationComponent;
  let fixture: ComponentFixture<MasterNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
