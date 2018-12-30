import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NPSWonScoreComponent } from './npswon-score.component';

describe('NPSWonScoreComponent', () => {
  let component: NPSWonScoreComponent;
  let fixture: ComponentFixture<NPSWonScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NPSWonScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NPSWonScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
