import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsSurveyQuestionComponent } from './nps-survey-question.component';

describe('NpsSurveyQuestionComponent', () => {
  let component: NpsSurveyQuestionComponent;
  let fixture: ComponentFixture<NpsSurveyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsSurveyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
