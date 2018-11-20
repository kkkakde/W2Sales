import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCompetitorComponent } from './master-competitor.component';

describe('MasterCompetitorComponent', () => {
  let component: MasterCompetitorComponent;
  let fixture: ComponentFixture<MasterCompetitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCompetitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
