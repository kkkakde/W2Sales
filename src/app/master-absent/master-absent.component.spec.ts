import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAbsentComponent } from './master-absent.component';

describe('MasterAbsentComponent', () => {
  let component: MasterAbsentComponent;
  let fixture: ComponentFixture<MasterAbsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAbsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAbsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
