import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { IProgram, IProgramFilters } from '@metutor/core/models';
import { ProgramStatus, PROGRAM_STATUSES_CONST } from '@metutor/config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-program-list',
  templateUrl: './admin-program-list.component.html',
  styleUrls: ['./admin-program-list.component.scss'],
})
export class AdminProgramListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isDeletingProgram$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  isAddingEditingProgram$: Observable<boolean>;
  showAddNewProgramModal$: Observable<boolean>;

  title?: string;
  status?: number;
  deletedProgram?: IProgram;
  selectedProgram?: IProgram;
  programStatus = ProgramStatus;
  statuses = PROGRAM_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._preparePrograms();

    this.showAddNewProgramModal$ = this._store.select(
      fromAdmin.selectAddNewProgramModal
    );

    this.isAddingEditingProgram$ = this._store.select(
      fromCore.selectIsAddingEditingProgram
    );

    this.isDeletingProgram$ = this._store.select(
      fromCore.selectIsDeletingProgram
    );
  }

  onOpenAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewProgramModal());
  }

  onCloseAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewProgramModal());
  }

  filterPrograms(filters: IProgramFilters): void {
    this.programs$ = this._store.select(fromCore.selectFilteredPrograms, {
      ...filters,
    });
  }

  onChangeSelection(): void {
    this.filterPrograms({
      title: this.title,
      status: this.status?.toString(),
    });
  }

  onAddEditProgram(program: any): void {
    if (this.selectedProgram) {
      this._store.dispatch(
        fromCore.addEditProgram({
          program: { ...program, id: this.selectedProgram.id },
        })
      );
    } else {
      this._store.dispatch(fromCore.addEditProgram({ program }));
    }
  }

  onChangeStatus(program: IProgram, status: number): void {
    this._store.dispatch(
      fromCore.addEditProgram({
        program: { ...program, status },
      })
    );
  }

  deleteProgram(program: IProgram): void {
    if (confirm(`Are you sure to delete ${program.name} program?`)) {
      this.deletedProgram = program;
      this._store.dispatch(fromCore.deleteProgram({ id: program.id }));
    }
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPrograms);
  }
}
