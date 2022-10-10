import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonIndexComponent } from './components/pokemon-index/pokemon-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDashboardRoutingModule } from './pokemon-dashboard-routing.module';
import { PokemonDashboardComponent } from './pokemon-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { FiltersComponent } from './components/filters/filters.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    PokemonDashboardComponent,
    PokemonIndexComponent,
    PokemonListComponent,
    FiltersComponent,
    PokemonDetailsComponent,
  ],
  imports: [CommonModule, PokemonDashboardRoutingModule, SharedModule],
})
export class PokemonDashboardModule {}
