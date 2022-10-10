import { CardDetails, CardList } from './../../models/pokemon.model';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  card: any = {};
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name') || '';
    this.pokemonService.getPokemonByName(name).subscribe((r: CardDetails)=>{
      this.card = r;
    })
  }
}
