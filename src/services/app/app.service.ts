import { Injectable } from '@angular/core';
import { HttpsService } from '../https/https.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService extends HttpsService {
  constructor(public http: HttpClient) {
    super();
  }

  public getCountryCases(route_url: string) {
    return this.get(this.http, route_url);
  }
}
