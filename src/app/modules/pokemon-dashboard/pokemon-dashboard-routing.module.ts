import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonIndexComponent } from './components/pokemon-index/pokemon-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon-list' },
  { path: 'pokemon-list', component: PokemonIndexComponent },
  { path: 'pokemon-details/:name', component: PokemonDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDashboardRoutingModule {}
