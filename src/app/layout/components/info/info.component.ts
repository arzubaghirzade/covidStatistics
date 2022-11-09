import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CasesObject } from '../../models/cases';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnChanges {
  country: string = 'Azerbaijan';
  cases!: CasesObject;
  @Input() info: any;
  @Input() population!: number;
  @Input() vaccinated!: number;
  constructor() {}
  ngOnChanges(value: SimpleChanges) {
    this.info = value.info.currentValue;
    this.setCasesObject(this.info);
  }
  ngOnInit(): void {}

  //setting case object in the format we need
  setCasesObject(info: any) {
    this.cases = {
      deaths: info?.deaths,
      confirmed: info?.confirmed,
      recovered: info?.recovered,
    };
  }
}
