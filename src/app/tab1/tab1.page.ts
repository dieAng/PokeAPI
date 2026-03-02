import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  offset = 0;
  pokemon: any[] = [];
  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;

  private pokeService = inject(PokemonService);

  constructor() {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadData(event: any) {
    this.loadPokemon(true, event);
  }

  loadPokemon(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemonList(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset == 125) {
        if (this.infinite) {
          this.infinite.disabled = true;
        }
      }
    });
  }

  onSearchChange(e: any) {
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.pokemon = [];
      if (this.infinite) {
        this.infinite.disabled = false;
      }
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe({
      next: (res) => {
        this.pokemon = [res];
      },
      error: (_err) => {
        this.pokemon = [];
      }
    });
  }
}
