import { CardList, CardListResponse } from './../../models/pokemon.model';
import { PageSizeOptions } from './../../constants';
import { SessionService } from './../../../../shared/services/session.service';
import { PokemonService } from './../../services/pokemon.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, timer } from 'rxjs';
import { filterPredicate, sortCardData } from '../../utils/pokemen.utils';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() searchTearm = '';
  @Input() sortBy = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sortFilter = '';
  obs!: Observable<any>;
  dataSource: MatTableDataSource<CardList> = new MatTableDataSource<CardList>([]);
  isLoading = false;
  pageSize = 10;
  currentPage = 0;
  pageIndex = 1;
  pageSizeOptions = PageSizeOptions;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private pokemonService: PokemonService,
    private sessionService: SessionService
  ) {}
  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    const filterObj = this.sessionService.getSavedFilters();
    if(!!filterObj) {
      this.paginator.pageIndex = filterObj.currentPage;
      this.paginator.pageSize = filterObj.currentPageSize;
      this.sortFilter = filterObj.sort;
    }
    this.loadData(this.sortFilter);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.dataSource.filterPredicate = filterPredicate;
  }

  // setup on load of a component function
  setupDefaultFilters() {
    this.paginator.pageIndex = this.sessionService.getSavedFilters().currentPage;
    this.paginator.pageSize = this.sessionService.getSavedFilters().currentPageSize;
    this.sortFilter = this.sessionService.getSavedFilters().sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['searchTearm'] && !changes['searchTearm'].firstChange) {
      this.applySearchFilter(changes['searchTearm'].currentValue);
    }
    if (!!changes['sortBy'] && !changes['sortBy'].firstChange) {
      this.sort(changes['sortBy'].currentValue);
    }
  }
  // applying filter on seach
  applySearchFilter(filterValue: string) {
    if (!!filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.dataSource.filter = ''
      this.loadData(this.sortFilter);
    }
  }
  loadData(value: string = '') {
    this.updatedateLoader(true);
    let pageSize = this.pageSize || this.pageSize + 1;
    let pageIndex = this.pageIndex || this.pageIndex + 1;
    this.pokemonService.getPokemonList({ pageSize, pageIndex }).subscribe(
      (response: CardListResponse) => {
        console.log(response.results);
        this.dataSource.data = response.results;
        this.dataSource.data = sortCardData(value, this.dataSource.data);
        this.updatePaginatorAterReceivingCardData(response.count);
        this.updatedateLoader(false);
      },
      () => {
        this.updatedateLoader(false);
      }
    );
  }

  updatedateLoader(state: boolean) {
    this.isLoading = state;
  }

  // updating index, size on paginator changes
  pageChanged(event: {pageSize: number, pageIndex: number}) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.currentPage = event.pageIndex;
    this.loadData(this.sortFilter);
  }

  // updating sort value
  sort(value: string) {
    this.sortFilter = value;
    this.loadData(this.sortFilter);
  }

  // updating paginator after getting the data
  updatePaginatorAterReceivingCardData(count: number) {
    timer(1).subscribe(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = count;
      this.sessionService.saveFilters({
          currentPage: this.currentPage,
          currentPageSize:this.paginator.pageSize,
          sort: this.sortFilter,
        }
      );
    });
  }
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
