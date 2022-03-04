import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  filter,
  mergeMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import * as fromCore from '@metutor/core/state';
import * as fromRouterStore from '@metutor/state';
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
            of(lookupsActions.loadLanguagesFailure({ error: error?.error?.message }))
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
          catchError((error) => of(lookupsActions.loadLevelsFailure({ error: error?.error?.message })))
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
            of(lookupsActions.loadCountriesFailure({ error: error?.error?.message }))
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
          catchError((error) => of(lookupsActions.loadCitiesFailure({ error: error?.error?.message })))
        )
      )
    )
  );

  loadPrograms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadPrograms),
      withLatestFrom(this._store.select(fromCore.selectPrograms)),
      filter(([_, programs]) => !programs || programs.length === 0),
      mergeMap((_) =>
        this._lookupsService.getPrograms().pipe(
          map((programs) =>
            lookupsActions.loadProgramsSuccess({
              programs,
            })
          ),
          catchError((error) =>
            of(lookupsActions.loadProgramsFailure({ error: error?.error?.message }))
          )
        )
      )
    )
  );

  loadSubjectsByProgramId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadSubjectsByProgramId),
      // withLatestFrom(this._store.select(fromCore.selectSubjects)),
      // filter(([_, subjects]) => !subjects || subjects.length === 0),
      mergeMap((action) =>
        this._lookupsService.getSubjectsByProgramId(action.programId).pipe(
          map((subjects) =>
            lookupsActions.loadSubjectsByProgramIdSuccess({
              subjects,
            })
          ),
          catchError((error) =>
            of(lookupsActions.loadSubjectsByProgramIdFailure({ error: error?.error?.message }))
          )
        )
      )
    )
  );

  loadFieldsByProgramId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFieldsByProgramId),
      // withLatestFrom(this._store.select(fromCore.selectSubjects)),
      // filter(([_, fields]) => !fields || fields.length === 0),
      mergeMap((action) =>
        this._lookupsService.getFieldsByProgramId(action.programId).pipe(
          map((fields) =>
            lookupsActions.loadFieldsByProgramIdSuccess({
              fields,
            })
          ),
          catchError((error) =>
            of(lookupsActions.loadFieldsByProgramIdFailure({ error: error?.error?.message }))
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
          catchError((error) => of(lookupsActions.loadFieldsFailure({ error: error?.error?.message })))
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
              of(lookupsActions.loadTopicsFailure({ error: error?.error?.message }))
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
      withLatestFrom(
        this._store.select(fromCore.selectFAQs),
        this._store.select(fromRouterStore.selectRouteParams)
      ),
      mergeMap(([{ title, load }, _faqs, { topic }]) => {
        if (!_faqs || !_faqs.length || load) {
          return this._supportService.fetchListFaq({ topic, title }).pipe(
            map((FAQs) =>
              lookupsActions.loadFAQsSuccess({
                FAQs,
              })
            ),
            catchError((error) => of(lookupsActions.loadFAQsFailure({ error: error?.error?.message })))
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
