import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-dashboard',
    loadChildren: () =>
      import(`./modules/pokemon-dashboard/pokemon-dashboard.module`).then(
        (module) => module.PokemonDashboardModule
      )
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
