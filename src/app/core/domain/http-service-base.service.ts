import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {HttpStatusCodes} from "@app-core/domain/http-status-codes.const";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceBaseService {

  constructor() { }

  protected handleError(error: HttpErrorResponse): HttpErrorResponse {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error('Backend returned code: ', `${error.status}`);
      if (error.status !== HttpStatusCodes.INTERNAL_SERVER_ERROR) {
        console.error('Body was: ', `${error.error}`);
      }
    }
    return error;
  }
}
