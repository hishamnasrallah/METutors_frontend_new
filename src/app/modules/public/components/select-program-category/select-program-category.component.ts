import { generalConstants } from '@metutor/config';
import { MatDialog } from '@angular/material/dialog';
import { ICountry, IProgram } from '@metutor/core/models';
import { ChooseCountryDialogComponent } from '../choose-country-dialog';
import {
  Input,
  OnInit,
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'metutors-select-program-category',
  templateUrl: './select-program-category.component.html',
  styleUrls: ['./select-program-category.component.scss']
})
export class SelectProgramCategoryComponent
  implements OnInit, AfterViewChecked {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;

  @Input() programs: IProgram[];
  @Input() countries: ICountry[];
  @Input() loadingPrograms: boolean;
  @Input() loadingCountries: boolean;

  @Output() changeProgram = new EventEmitter();

  step = 0;
  country?: ICountry;
  leftDisabled = true;
  rightDisabled = true;
  nationalId = generalConstants.nationalId;

  constructor(private _dialog: MatDialog, private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkScroll();
  }

  ngAfterViewChecked(): void {
    this.checkScroll();
  }

  scrollLeft(): void {
    if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
      this.widgetsContent.nativeElement.scrollLeft -= 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft += 200;
    }
    this.checkScroll();
  }

  scrollRight(): void {
    if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
      this.widgetsContent.nativeElement.scrollLeft += 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft -= 200;
    }
    this.checkScroll();
  }

  checkScroll(): void {
    if (this.widgetsContent) {
      let newScrollLeft;
      this.leftDisabled =
        this.widgetsContent.nativeElement.scrollLeft == 0 ? true : false;

      if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
        newScrollLeft = this.widgetsContent.nativeElement.scrollLeft;
      } else {
        newScrollLeft = -this.widgetsContent.nativeElement.scrollLeft;
      }

      const width = this.widgetsContent.nativeElement.clientWidth;
      const scrollWidth = this.widgetsContent.nativeElement.scrollWidth;
      const diff = scrollWidth - (newScrollLeft + width);

      this.rightDisabled = diff <= 50 ? true : false;

      this._cdRef.detectChanges();
    }
  }

  onChangeStep(id: number, countries: ICountry[], isLoading: boolean): void {
    if (id === this.nationalId) {
      const dialogRef = this._dialog.open(ChooseCountryDialogComponent, {
        width: '1000px',
        data: { countries, isLoading },
        panelClass: 'overflow-height'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.country = result?.country;
          this.step = id;
          this.changeProgram.emit({
            program: id,
            country: this.country?.id
          });
        }
      });
    } else {
      this.step = id;
      this.country = undefined;
      this.changeProgram.emit({ program: id });
    }
  }
}
