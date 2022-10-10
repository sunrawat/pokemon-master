import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.scss']
})
export class PokemonIndexComponent {
  searchTearm = '';
  sortBy = '';
  filter(search: string) {
    this.searchTearm = search;
  }
  sortSelection(sort: string) {
    this.sortBy = sort;
  }
}
