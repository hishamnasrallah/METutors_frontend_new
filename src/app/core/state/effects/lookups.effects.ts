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
      filter(([_, countries]) => !countries || countries.length === 0),
      mergeMap((_) =>
        this._lookupsService.getCountries().pipe(
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
        )
      )
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
        this._lookupsService.getSubjectsByFieldId(action.fieldId, action?.country).pipe(
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
      withLatestFrom(this._store.select(fromCore.selectSubjects)),
      mergeMap(([_, _subjects]) => {
        if (!_subjects || !_subjects.length) {
          return this._lookupsService.getSubjects().pipe(
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
          );
        } else {
          return of(lookupsActions.loadSubjectsEnded());
        }
      })
    )
  );

  loadFieldsByProgramId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFieldsByProgramId),
      // withLatestFrom(this._store.select(fromCore.selectSubjects)),
      // filter(([_, fields]) => !fields || fields.length === 0),
      mergeMap((action) =>
        this._lookupsService.getFieldsByProgramId(action.programId, action.country).pipe(
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

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _lookupsService: LookupsService,
    private _supportService: SupportService
  ) {}
}
