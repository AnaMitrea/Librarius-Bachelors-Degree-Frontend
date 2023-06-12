import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  constructor(private apiService: ApiService) {}

}
