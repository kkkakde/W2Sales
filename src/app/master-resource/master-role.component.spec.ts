import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterResourceComponent } from './master-resource.component';

describe('MasterResourceComponent', () => {
  let component: MasterResourceComponent;
  let fixture: ComponentFixture<MasterResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
