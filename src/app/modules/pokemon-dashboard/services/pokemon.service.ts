import { CardDetails, CardList, CardListResponse } from './../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  throwError,
  mergeMap,
  from,
  toArray,
  map,
} from 'rxjs';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}
  getPokemonByName(name: string): Observable<CardDetails> {
    let URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get<CardDetails>(URL);
  }

  getPokemonList(page: any): Observable<CardListResponse> {
    let URL = `${environment.endpointURL}/pokemon?limit=${
      page.pageIndex * page.pageSize
    }`;
    return this.http
      .get<CardListResponse>(URL, {
        context: withCache(),
      })
      .pipe(
        mergeMap((result: any) =>
          from(result.results).pipe(
            mergeMap(
              (data: any) => this.getPokemonByName(data.name),
              (original: any, detail) => ({ ...original, detail })
            ),
            toArray(),
            map((results) => ({ ...result, results }))
          )
        ),
        catchError((err) => {
          console.log('error caught in service');
          return throwError(err);
        })
      );
  }
}
