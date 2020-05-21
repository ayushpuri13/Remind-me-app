import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../Services/api.service";


@Injectable()
export class Resolver implements Resolve<any> {
  constructor(private api: ApiService) {
  }

  resolve() {
    return this.api.getEventList();
  }
}
