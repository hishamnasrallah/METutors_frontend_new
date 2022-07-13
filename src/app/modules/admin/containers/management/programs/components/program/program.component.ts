import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { IPagination, IProgram } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { PROGRAM_STATUSES_CONST, ProgramStatus } from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  isDeletingProgram$: Observable<boolean>;
  isLoadingPrograms$: Observable<boolean>;
  isAddingEditingProgram$: Observable<boolean>;
  showAddNewProgramModal$: Observable<boolean>;

  perPage = 10;
  deletedProgram?: IProgram;
  selectedProgram?: IProgram;
  programStatus = ProgramStatus;
  programStatusConst = PROGRAM_STATUSES_CONST;

  view$: Observable<{
    loading: boolean;
    pagination: IPagination;
    programs: IProgram[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  onOpenAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewProgramModal());
  }

  onCloseAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewProgramModal());
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

  onSearchText(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminPrograms({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminPrograms({
        params: { page, search: '' },
      })
    );
  }

  ngOnInit(): void {
    this.showAddNewProgramModal$ = this._store.select(
      fromAdmin.selectAddNewProgramModal
    );

    this.isAddingEditingProgram$ = this._store.select(
      fromCore.selectIsAddingEditingProgram
    );

    this.isDeletingProgram$ = this._store.select(
      fromCore.selectIsDeletingProgram
    );

    this._store.dispatch(
      fromCore.loadAdminPrograms({ params: { page: 1, search: '' } })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectPrograms),
      this._store.select(fromCore.selectIsLoadingPrograms),
      this._store.select(fromCore.selectLookUpsPagination),
    ]).pipe(
      map(([programs, loading, pagination]) => ({
        loading,
        programs,
        pagination,
      }))
    );
  }
}
