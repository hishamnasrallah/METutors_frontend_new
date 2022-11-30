import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import * as fromCore from '@metutor/core/state';
import * as lookupsActions from '../actions/lookups.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as languageActions from '../actions/language-menu.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { LookupsService, SupportService, UsersService } from '@services';
import {
  map,
  filter,
  mergeMap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

@Injectable()
export class LookupsEffects {
  loadUserTypes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadUserTypes),
      withLatestFrom(this._store.select(fromCore.selectUserTypes)),
      mergeMap(([_, _userTypes]) => {
        if (!_userTypes || !_userTypes?.length) {
          return this._userService.getRoles().pipe(
            map(userTypes =>
              lookupsActions.loadUserTypesSuccess({
                userTypes
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadUserTypesFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadUserTypesEnded());
        }
      })
    )
  );

  loadLanguages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadLanguages),
      withLatestFrom(this._store.select(fromCore.selectLanguages)),
      mergeMap(([_, _languages]) => {
        if (!_languages || !_languages?.length) {
          return this._lookupsService.getLanguages().pipe(
            map(languages =>
              lookupsActions.loadLanguagesSuccess({
                languages
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadLanguagesFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadLanguagesEnded());
        }
      })
    )
  );

  changeLanguage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(languageActions.changeLanguage),
      mergeMap(action =>
        this._userService.changeLanguage(action.language).pipe(
          map(languages =>
            languageActions.changeLanguageSuccess()
          ),
          catchError(error =>
            of(
              languageActions.changeLanguageFailure({
                error: error?.error?.message || error?.error?.errors
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
      mergeMap(_ =>
        this._lookupsService.getLevels().pipe(
          map(levels =>
            lookupsActions.loadLevelsSuccess({
              levels
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadLevelsFailure({
                error: error?.error?.message || error?.error?.errors
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
            map(countries =>
              lookupsActions.loadCountriesSuccess({
                countries
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadCountriesFailure({
                  error: error?.error?.message || error?.error?.errors
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
            map(countries =>
              lookupsActions.loadProgramCountriesSuccess({
                countries
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadProgramCountriesFailure({
                  error: error?.error?.message || error?.error?.errors
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

  loadFlagCountries$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadFlagCountries),
      withLatestFrom(this._store.select(fromCore.selectFlagCountries)),
      mergeMap(([_, _countries]) => {
        if (!_countries || !_countries.length) {
          return this._lookupsService.getFlagCountries().pipe(
            map(countries =>
              lookupsActions.loadFlagCountriesSuccess({
                countries
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadFlagCountriesFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return of(lookupsActions.loadFlagCountriesEnded());
        }
      })
    )
  );

  loadCities$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadCities),
      mergeMap(action =>
        this._lookupsService.getCities(action.countryId).pipe(
          map(cities =>
            lookupsActions.loadCitiesSuccess({
              cities
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadCitiesFailure({
                error: error?.error?.message || error?.error?.errors
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
            map(programs =>
              lookupsActions.loadProgramsSuccess({
                programs
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadProgramsFailure({
                  error: error?.error?.message || error?.error?.errors
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

  loadAdminPrograms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadAdminPrograms),
      mergeMap(({ params }) =>
        this._lookupsService.getAdminPrograms(params).pipe(
          map(({ total, programs }) =>
            lookupsActions.loadAdminProgramsSuccess({
              total,
              programs
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadAdminProgramsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadSubjectsByFieldId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadSubjectsByFieldId),
      mergeMap(action =>
        this._lookupsService
          .getSubjectsByFieldId(action.fieldId, action?.countryId)
          .pipe(
            map(subjects =>
              lookupsActions.loadSubjectsByFieldIdSuccess({
                subjects
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadSubjectsByFieldIdFailure({
                  error: error?.error?.message || error?.error?.errors
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
      mergeMap(_ =>
        this._lookupsService.getSubjects().pipe(
          map(subjects =>
            lookupsActions.loadSubjectsSuccess({
              subjects
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadSubjectsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadAdminSubjects$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadAdminSubjects),
      mergeMap(({ params }) =>
        this._lookupsService.getAdminSubjects(params).pipe(
          map(({ total, subjects }) =>
            lookupsActions.loadAdminSubjectsSuccess({
              total,
              subjects
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadAdminSubjectsFailure({
                error: error?.error?.message || error?.error?.errors
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
      mergeMap(action =>
        this._lookupsService
          .getFieldsByProgramId(
            action.programId,
            action.countryId,
            action.grade
          )
          .pipe(
            map(fields =>
              lookupsActions.loadFieldsByProgramIdSuccess({
                fields
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadFieldsByProgramIdFailure({
                  error: error?.error?.message || error?.error?.errors
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
      mergeMap(_ =>
        this._lookupsService.getFields().pipe(
          map(fields =>
            lookupsActions.loadFieldsSuccess({
              fields
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadFieldsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadAdminFields$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.loadAdminFields),
      mergeMap(({ params }) =>
        this._lookupsService.getAdminFields(params).pipe(
          map(({ total, fields }) =>
            lookupsActions.loadAdminFieldsSuccess({
              total,
              fields: camelcaseKeys(fields)
            })
          ),
          catchError(error =>
            of(
              lookupsActions.loadAdminFieldsFailure({
                error: error?.error?.message || error?.error?.errors
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
            map(topics =>
              lookupsActions.loadTopicsSuccess({
                topics
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadTopicsFailure({
                  error: error?.error?.message || error?.error?.errors
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
            map(FAQs =>
              lookupsActions.loadFAQsSuccess({
                FAQs: camelcaseKeys(FAQs, { deep: true })
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadFAQsFailure({
                  error: error?.error?.message || error?.error?.errors
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
            map(ticketCategories =>
              lookupsActions.loadTicketCategoriesSuccess({
                ticketCategories
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadTicketCategoriesFailure({
                  error: error?.error?.message || error?.error?.errors
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
            map(ticketPriorities =>
              lookupsActions.loadTicketPrioritiesSuccess({
                ticketPriorities
              })
            ),
            catchError(error =>
              of(
                lookupsActions.loadTicketPrioritiesFailure({
                  error: error?.error?.message || error?.error?.errors
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
      mergeMap(action => {
        if (action?.id) {
          return this._lookupsService
            .editProgram(action.program, action.id)
            .pipe(
              map(response =>
                lookupsActions.addEditProgramSuccess({
                  program: response.program,
                  message: response.message,
                  isEdit: true
                })
              ),
              catchError(error =>
                of(
                  lookupsActions.addEditProgramFailure({
                    error: error?.error?.message || error?.error?.errors
                  })
                )
              )
            );
        } else {
          return this._lookupsService.addNewProgram(action.program).pipe(
            map(response =>
              lookupsActions.addEditProgramSuccess({
                program: response.program,
                message: response.message,
                isEdit: false
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditProgramFailure({
                  error: error?.error?.message || error?.error?.errors
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
      mergeMap(action =>
        this._lookupsService.deleteProgram(action.id).pipe(
          map(response =>
            lookupsActions.deleteProgramSuccess({
              id: action.id,
              message: response.message
            })
          ),
          catchError(error =>
            of(
              lookupsActions.deleteProgramFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  addEditField$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.addEditField),
      mergeMap(action => {
        if (action.id) {
          return this._lookupsService.editField(action.field, action.id).pipe(
            map(response =>
              lookupsActions.addEditFieldSuccess({
                field: response.field,
                message: response.message,
                isEdit: true
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditFieldFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return this._lookupsService.addNewField(action.field).pipe(
            map(response =>
              lookupsActions.addEditFieldSuccess({
                field: response.field,
                message: response.message,
                isEdit: false
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditFieldFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        }
      })
    )
  );

  deleteField$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.deleteField),
      mergeMap(action =>
        this._lookupsService.deleteField(action.id).pipe(
          map(response =>
            lookupsActions.deleteFieldSuccess({
              id: action.id,
              message: response.message
            })
          ),
          catchError(error =>
            of(
              lookupsActions.deleteFieldFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  addEditSubject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.addEditSubject),
      mergeMap(action => {
        if (action.subject.id) {
          return this._lookupsService.editSubject(action.subject).pipe(
            map(response =>
              lookupsActions.addEditSubjectSuccess({
                subject: response.subject,
                message: response.message,
                isEdit: true
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditSubjectFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return this._lookupsService.addNewSubject(action.subject).pipe(
            map(response =>
              lookupsActions.addEditSubjectSuccess({
                subject: response.subject,
                message: response.message,
                isEdit: false
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditSubjectFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        }
      })
    )
  );

  deleteSubject$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.deleteSubject),
      mergeMap(action =>
        this._lookupsService.deleteSubject(action.id).pipe(
          map(response =>
            lookupsActions.deleteSubjectSuccess({
              id: action.id,
              message: response.message
            })
          ),
          catchError(error =>
            of(
              lookupsActions.deleteSubjectFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  addEditProgramCountries$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.addEditProgramCountries),
      mergeMap(action => {
        if (action.country.id) {
          return this._lookupsService.editProgramCountries(action.country).pipe(
            map(response =>
              lookupsActions.addEditProgramCountriesSuccess({
                country: response.country,
                message: response.message,
                isEdit: true
              })
            ),
            catchError(error =>
              of(
                lookupsActions.addEditProgramCountriesFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return this._lookupsService
            .addNewProgramCountries(action.country)
            .pipe(
              map(response =>
                lookupsActions.addEditProgramCountriesSuccess({
                  country: response.country,
                  message: response.message,
                  isEdit: false
                })
              ),
              catchError(error =>
                of(
                  lookupsActions.addEditProgramCountriesFailure({
                    error: error?.error?.message || error?.error?.errors
                  })
                )
              )
            );
        }
      })
    )
  );

  deleteProgramCountries$ = createEffect(() =>
    this._actions$.pipe(
      ofType(lookupsActions.deleteProgramCountries),
      mergeMap(action =>
        this._lookupsService.deleteProgramCountries(action.id).pipe(
          map(response =>
            lookupsActions.deleteProgramCountriesSuccess({
              id: action.id,
              message: response.message
            })
          ),
          catchError(error =>
            of(
              lookupsActions.deleteProgramCountriesFailure({
                error: error?.error?.message || error?.error?.errors
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
            lookupsActions.addEditFieldSuccess,
            lookupsActions.deleteFieldSuccess,
            lookupsActions.addEditSubjectSuccess,
            lookupsActions.deleteSubjectSuccess,
            lookupsActions.addEditProgramCountriesSuccess,
            lookupsActions.deleteProgramCountriesSuccess
          ]
        ),
        map(action => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'INFORMATION_UPDATED_SUCCESSFULLY'
            );
          }
        })
      ),
    {
      dispatch: false
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            lookupsActions.addEditProgramFailure,
            lookupsActions.deleteProgramFailure,
            lookupsActions.addEditFieldFailure,
            lookupsActions.deleteFieldFailure,
            lookupsActions.addEditSubjectFailure,
            lookupsActions.deleteSubjectFailure,
            lookupsActions.addEditProgramCountriesFailure,
            lookupsActions.deleteProgramCountriesFailure
          ]
        ),
        map(action => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error('SOMETHING_WENT_WRONG');
          }
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _userService: UsersService,
    private _lookupsService: LookupsService,
    private _supportService: SupportService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
