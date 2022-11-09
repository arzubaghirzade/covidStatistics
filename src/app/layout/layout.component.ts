import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppService } from 'src/services/app/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  population!: number;
  country: string = 'Azerbaijan';
  info: any;
  currentCases: any;
  loader: boolean = false;
  vaccinated!: number;
  previousDate!: string;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.getGeneralCovidInfo();
  }
  getGeneralCovidInfo() {
    this.loader = true;
    forkJoin(
      this.appService.getCountryCases(`cases?country=${this.country}`),
      this.appService.getCountryCases(`/vaccines?country=${this.country}`)
    ).subscribe(
      (res) => {
        //sometimes the first response can be included in Global object
        // in that case we should use res[o].Global?.All?.
        this.loader = false;
        this.population = res[0]?.All?.population;
        this.info = res[0]?.All;
        this.currentCases = this.info;
        this.vaccinated = res[1]?.Global?.All?.people_vaccinated;
      },
      (error) => {
        this.loader = true;
      }
    );
  }

  //getting data of old dates cases and assigning it to info object
  //so that Simplechanges of Input() would be triggered
  showPreviousDate(data: any) {
    this.previousDate = data?.date.toLocaleDateString();
    this.info = data?.info;
  }
  activateLoader(loader: boolean) {
    this.loader = loader;
    if (this.loader) {
      this.info = null;
      this.previousDate = '';
    }
  }
  resetPreviousCases() {
    this.previousDate = '';
    this.info = this.currentCases;
  }
}
