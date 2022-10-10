import { SessionModel } from './../models/session.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  saveFilters(filters: SessionModel) {
    const data = JSON.stringify(filters);
    sessionStorage.setItem('filters', data);
  }

  saveSearchFilters(filter: string) {
    sessionStorage.setItem('search', filter);
  }

  getSearchFilters() {
    return sessionStorage.getItem('search');
  }

  getSavedFilters(): SessionModel {
    const data: any = sessionStorage.getItem('filters');
    return JSON.parse(data);
  }
}
