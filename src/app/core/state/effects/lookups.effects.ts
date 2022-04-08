import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  filter,
  mergeMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import * as fromCore from '@metutor/core/state';
import { LookupsService, SupportService } from '@services';
import * as lookupsActions from '../actions/lookups.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class LookupsEffects {
  loadLanguages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadLanguages),
      withLatestFrom(this._store.select(fromCore.selectLanguages)),
      filter(([_, languages]) => !languages || languages.length === 0),
      mergeMap((_) =>
        this._lookupsService.getLanguages().pipe(
          map((languages) =>
            lookupsActions.loadLanguagesSuccess({
              languages,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.loadLanguagesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadLevels$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadLevels),
      withLatestFrom(this._store.select(fromCore.selectLevels)),
      filter(([_, levels]) => !levels || levels.length === 0),
      mergeMap((_) =>
        this._lookupsService.getLevels().pipe(
          map((levels) =>
            lookupsActions.loadLevelsSuccess({
              levels,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.loadLevelsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadCountries$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadCountries),
      withLatestFrom(this._store.select(fromCore.selectCountries)),
      mergeMap(([_, _countries]) => {
        if (!_countries || !_countries.length) {
          return this._lookupsService.getCountries().pipe(
            map((countries) =>
              lookupsActions.loadCountriesSuccess({
                countries,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadCountriesFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadCountriesEnded());
        }
      })
    )
  );

  loadProgramCountries$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadProgramCountries),
      withLatestFrom(this._store.select(fromCore.selectProgramCountries)),
      mergeMap(([_, _countries]) => {
        if (!_countries || !_countries.length) {
          return this._lookupsService.getProgramCountries().pipe(
            map((countries) =>
              lookupsActions.loadProgramCountriesSuccess({
                countries,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadProgramCountriesFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadProgramCountriesEnded());
        }
      })
    )
  );

  loadCities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadCities),
      mergeMap((action) =>
        this._lookupsService.getCities(action.countryId).pipe(
          map((cities) =>
            lookupsActions.loadCitiesSuccess({
              cities,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.loadCitiesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadPrograms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadPrograms),
      withLatestFrom(this._store.select(fromCore.selectPrograms)),
      mergeMap(([_, _programs]) => {
        if (!_programs || !_programs.length) {
          return this._lookupsService.getPrograms().pipe(
            map((programs) =>
              lookupsActions.loadProgramsSuccess({
                programs,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadProgramsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadProgramsEnded());
        }
      })
    )
  );

  loadSubjectsByFieldId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadSubjectsByFieldId),
      mergeMap((action) =>
        this._lookupsService
          .getSubjectsByFieldId(action.fieldId, action?.countryId)
          .pipe(
            map((subjects) =>
              lookupsActions.loadSubjectsByFieldIdSuccess({
                subjects,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadSubjectsByFieldIdFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  loadSubjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadSubjects),
      mergeMap((_) =>
        this._lookupsService.getSubjects().pipe(
          map((subjects) =>
            lookupsActions.loadSubjectsSuccess({
              subjects,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.loadSubjectsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadFieldsByProgramId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFieldsByProgramId),
      mergeMap((action) =>
        this._lookupsService
          .getFieldsByProgramId(action.programId, action.countryId)
          .pipe(
            map((fields) =>
              lookupsActions.loadFieldsByProgramIdSuccess({
                fields,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadFieldsByProgramIdFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  loadFields$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFields),
      mergeMap((_) =>
        this._lookupsService.getFields().pipe(
          map((fields) =>
            lookupsActions.loadFieldsSuccess({
              fields,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.loadFieldsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTopics$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadTopics),
      withLatestFrom(this._store.select(fromCore.selectTopics)),
      mergeMap(([_, _topics]) => {
        if (!_topics || !_topics.length) {
          return this._supportService.fetchFaqTopics().pipe(
            map((topics) =>
              lookupsActions.loadTopicsSuccess({
                topics,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadTopicsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadTopicsEnded());
        }
      })
    )
  );

  loadFAQs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFAQs),
      withLatestFrom(this._store.select(fromCore.selectFAQs)),
      mergeMap(([_, _faqs]) => {
        if (!_faqs || !_faqs.length) {
          return this._supportService.fetchListFaq().pipe(
            map((FAQs) =>
              lookupsActions.loadFAQsSuccess({
                FAQs: camelcaseKeys(FAQs, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadFAQsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadFAQsEnded());
        }
      })
    )
  );

  loadTicketCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadTicketCategories),
      withLatestFrom(this._store.select(fromCore.selectTicketCategories)),
      mergeMap(([_, _categories]) => {
        if (!_categories || !_categories.length) {
          return this._lookupsService.getTicketCategories().pipe(
            map((ticketCategories) =>
              lookupsActions.loadTicketCategoriesSuccess({
                ticketCategories,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadTicketCategoriesFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadTicketCategoriesEnded());
        }
      })
    )
  );

  loadTicketPriorities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadTicketPriorities),
      withLatestFrom(this._store.select(fromCore.selectTicketPriorities)),
      mergeMap(([_, _priorities]) => {
        if (!_priorities || !_priorities.length) {
          return this._lookupsService.getTicketPriorities().pipe(
            map((ticketPriorities) =>
              lookupsActions.loadTicketPrioritiesSuccess({
                ticketPriorities,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.loadTicketPrioritiesFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadTicketPrioritiesEnded());
        }
      })
    )
  );

  addEditProgram$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.addEditProgram),
      mergeMap((action) => {
        if (action.program.id) {
          return this._lookupsService.editProgram(action.program).pipe(
            map((response) =>
              lookupsActions.addEditProgramSuccess({
                program: response.program,
                message: response.message,
                isEdit: true,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.addEditProgramFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return this._lookupsService.addNewProgram(action.program).pipe(
            map((response) =>
              lookupsActions.addEditProgramSuccess({
                program: response.program,
                message: response.message,
                isEdit: false,
              })
            ),
            catchError((error) =>
              of(
                lookupsActions.addEditProgramFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        }
      })
    )
  );

  deleteProgram$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.deleteProgram),
      mergeMap((action) =>
        this._lookupsService.deleteProgram(action.id).pipe(
          map((response) =>
            lookupsActions.deleteProgramSuccess({
              id: action.id,
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              lookupsActions.deleteProgramFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            lookupsActions.addEditProgramSuccess,
            lookupsActions.deleteProgramSuccess,
          ]
        ),
        map((action) => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'Information updated successfully!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            lookupsActions.addEditProgramFailure,
            lookupsActions.deleteProgramFailure,
          ]
        ),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error(
              'Something went wrong!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _lookupsService: LookupsService,
    private _supportService: SupportService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
