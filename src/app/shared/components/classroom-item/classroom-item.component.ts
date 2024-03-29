import { ClassroomType, courseStatusLabel } from 'src/app/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.scss'],
})
export class ClassroomItemComponent implements OnInit {
  @Input() classroom!: any;
  @Input() isStudent!: boolean;
  @Input() isTeacher!: boolean;
  @Input() selectedId!: number;
  @Input() completeCourse: boolean;
  @Input() isAcceptingCourse: boolean;
  @Input() url = '/student/classroom/syllabus/';

  @Output() reject: EventEmitter<void> = new EventEmitter<void>();
  @Output() accept: EventEmitter<void> = new EventEmitter<void>();

  classroomType = ClassroomType;
  statusLabel = courseStatusLabel;

  constructor() {}

  ngOnInit(): void {}
}
