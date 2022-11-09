import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/services/app/app.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { forkJoin } from 'rxjs';
import { AllCases } from '../../models/allCases.interface';

@Component({
  selector: 'app-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.scss'],
})
export class DateInfoComponent implements OnInit {
  minDate: Date = new Date('01/22/2020');
  maxDate: Date = new Date('11/08/2022');
  population!: number;
  selectDate: boolean = false;
  showDateInfo: boolean = false;
  previousDate!: Date | null;
  allCases: AllCases = {};
  dateCases: AllCases = {};
  @Output() showPreviousDate: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() activateLoader: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  //getting cases for all dates so that we can filter via selected date
  getCasesForAllDates(allCases: AllCases) {
    this.activateLoader.emit(true);
    forkJoin(
      this.appService.getCountryCases(
        `/history?country=Azerbaijan&status=confirmed`
      ),
      this.appService.getCountryCases(
        `/history?country=Azerbaijan&status=recovered`
      ),
      this.appService.getCountryCases(
        `/history?country=Azerbaijan&status=deaths`
      )
    ).subscribe(
      (res) => {
        this.activateLoader.emit(false);
        this.population = res[0]?.All?.population;
        this.selectDate = true;
        this.allCases.confirmed = res[0]?.All;
        this.allCases.recovered = res[1]?.All;
        this.allCases.deaths = res[2]?.All;
        this.sendDateCaseObject(allCases);
      },
      (error) => {
        this.activateLoader.emit(true);
        console.log(error);
      }
    );
  }
  //on every date change setting new date value to a variable
  //and checking if the allCases object is already set
  setSelectedDate(event: MatDatepickerInputEvent<Date>, allCases: AllCases) {
    this.previousDate = event.value;
    if ('confirmed' in allCases) {
      this.sendDateCaseObject(allCases);
    } else {
      this.getCasesForAllDates(allCases);
    }
  }
  //filtering values for selected date from object that includes all dates with values
  getCasesValuesForSelectedDate(
    cases: string,
    date: Date | null,
    allCases: AllCases
  ) {
    type caseKeys = keyof AllCases;
    Object.keys(allCases[cases as caseKeys]?.dates).find((key) => {
      if (new Date(key).toDateString() === date?.toDateString()) {
        this.dateCases[cases as caseKeys] =
          allCases[cases as caseKeys]?.dates[key];
      }
    });
  }
  //preparing the object we will send as a new data
  setCasesForSelectedDate(allCases: AllCases) {
    Object.keys(allCases).forEach((element) => {
      this.getCasesValuesForSelectedDate(element, this.previousDate, allCases);
    });
  }
  //sending the object to a parent component
  sendDateCaseObject(allCases: AllCases) {
    this.setCasesForSelectedDate(allCases);
    if (this.previousDate) {
      const specificDateInfo = {
        date: this.previousDate,
        info: this.dateCases,
      };
      this.showPreviousDate.emit(specificDateInfo);
    }
  }
}
