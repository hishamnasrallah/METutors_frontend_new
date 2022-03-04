import { Component, Input, OnInit } from '@angular/core';
import { IProgram } from '@metutor/core/models';

@Component({
  selector: 'metutors-learning-environment',
  templateUrl: './learning-environment.component.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class LearningEnvironmentComponent implements OnInit {
  @Input() isLoading: boolean | null;
  @Input() set programs(_programs: IProgram[] | null) {
    if (_programs && _programs.length) {
      this.programsList = _programs;
      this.selectedProgram = _programs[0];
      this.step = 'STEP-' + this.selectedProgram?.id;
    }
  }

  step: string;
  programsList: IProgram[];
  selectedProgram: IProgram;

  constructor() {}

  ngOnInit(): void {}
}
