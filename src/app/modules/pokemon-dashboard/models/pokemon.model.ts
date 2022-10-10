export interface QueryParams {
  query?: string;
  page?: string;
  pageSize?: string;
  orderBy?: string;
}

export interface CardList {
  name: string;
  url: string;
}

export interface PokemonObject {
  count: number;
  next: string;
  previous?: any;
  results: CardList[];
}
export interface Abilities {
  ability:  { name: string, url: string},
}

export interface Sprites {
  other:  { "official-artwork" : { front_default: string}},
}

export interface CardDetails {
  abilities:  Abilities[],
  height: number;
  weight: number;
  name: string;
  sprites: Sprites;
}

export interface CardList {
  detail : CardDetails;
  name: string;
  url: string;
}

export interface CardListResponse {
  results: CardList[];
  count: number;
  }


