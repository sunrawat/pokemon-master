import { SessionService } from './../../../../shared/services/session.service';
import { SORT_OPTIONS } from './../../constants';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements AfterViewInit {
  @Output() searchTearmSelection = new EventEmitter();
  @Output() sortSelection = new EventEmitter();
  sortOptions = SORT_OPTIONS;
  selectedSort = this.sessionService.getSavedFilters() ? this.sessionService.getSavedFilters().sort: '';
  selectedSearch = this.sessionService.getSearchFilters();
  constructor(
    private sessionService: SessionService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
    this.searchTearmSelection.emit(this.selectedSearch);
    });
  }
  applyFilter(filterValue: string) {
    this.sessionService.saveSearchFilters(filterValue);
    this.searchTearmSelection.emit(filterValue);
  }
  sort(sortBy: MatSelectChange) {
    this.sortSelection.emit(sortBy.value);
  }
}
