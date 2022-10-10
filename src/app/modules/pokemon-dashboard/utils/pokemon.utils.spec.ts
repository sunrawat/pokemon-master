import { TestBed } from '@angular/core/testing';
import { sortCardData } from './pokemen.utils';

describe('PokemonUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });
  });

  it('sort card data', () => {
    const data: any = [];
    const result = sortCardData('', data);
    expect(result).toEqual(data);
  });

  it('sort card data by height', () => {
    const data: any = [{ detail: { height: 2 } }, { detail: { height: 1 } }];
    const expectData = [{ detail: { height: 1 } }, { detail: { height: 2 } }];
    const result = sortCardData('Height', data);
    expect(result).toEqual(expectData);
  });

  it('sort card data by weight', () => {
    const data: any = [{ detail: { weight: 2 } }, { detail: { weight: 1 } }];
    const expectData = [{ detail: { weight: 1 } }, { detail: { weight: 2 } }];
    const result = sortCardData('Weight', data);
    expect(result).toEqual(expectData);
  });

  it('sort card data by Name', () => {
    const data: any = [ { name: 'BB' }, { name: 'AA' } ];
    const expectData = [{ name: 'AA' }, { name: 'BB' }];
    const result = sortCardData('Name', data);
    expect(result).toEqual(expectData);

  });
});
