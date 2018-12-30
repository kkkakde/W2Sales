import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NPSLostScoreComponent } from './npslost-score.component';

describe('NPSLostScoreComponent', () => {
  let component: NPSLostScoreComponent;
  let fixture: ComponentFixture<NPSLostScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NPSLostScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NPSLostScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
