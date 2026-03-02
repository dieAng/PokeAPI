import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  private http = inject(HttpClient);

  getPokemonList(offset: number = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
      map((result: any) => {
        return result['results'];
      }),
      map(pokemons => {
        return pokemons.map((poke: any, index: number) => {
          poke.image = this.getPokeImage(offset + index + 1);
          poke.pokeIndex = offset + index + 1;
          return poke;
        });
      })
    );
  }

  getPokeImage(index: number) {
    return `${this.imageUrl}${index}.png`;
  }

  findPokemon(search: string | number) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map((poke: any) => {
        poke['image'] = poke['sprites']['other']['official-artwork']['front_default'];
        poke['pokeIndex'] = poke['id'];
        return poke;
      })
    );
  }

  getPokemonDetails(index: string | number) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke: any) => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map((spriteKey: any) => poke['sprites'][spriteKey])
          .filter((img: any) => img);
        return poke;
      })
    );
  }
}
