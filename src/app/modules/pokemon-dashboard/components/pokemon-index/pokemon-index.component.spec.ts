import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonIndexComponent } from './pokemon-index.component';

describe('PokemonIndexComponent', () => {
  let component: PokemonIndexComponent;
  let fixture: ComponentFixture<PokemonIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('sortSelection method getting called with no issues', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'sortSelection').and.callThrough();
    app.sortSelection('Height');
    expect(app.sortSelection).toHaveBeenCalled();
  });

  it('sortSelection method call updating sortBy value', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'sortSelection').and.callThrough();
    app.sortSelection('Name');
    expect(app.sortBy).toBe('Name');
  });

  it('filter method getting called with no issues', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'filter').and.callThrough();
    app.filter('Bulbasuer');
    expect(app.filter).toHaveBeenCalled();
  });

  it('filter method call updating searchTearm', () => {
    const app = fixture.componentInstance;
    spyOn(app, 'filter').and.callThrough();
    app.filter('Venesuer');
    expect(app.searchTearm).toBe('Venesuer');
  });

});
