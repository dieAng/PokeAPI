import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false,
})
export class DetailsPage implements OnInit {
  details: any;

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    if (index) {
      this.pokeService.getPokemonDetails(index).subscribe((details: any) => {
        this.details = details;
      });
    }
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      normal: 'medium',
      fire: 'danger',
      water: 'primary',
      grass: 'success',
      electric: 'warning',
      ice: 'secondary',
      fighting: 'danger',
      poison: 'tertiary',
      ground: 'warning',
      flying: 'secondary',
      psychic: 'tertiary',
      bug: 'success',
      rock: 'medium',
      ghost: 'dark',
      dragon: 'tertiary',
      steel: 'medium',
      fairy: 'secondary'
    };
    return colors[type] || 'medium';
  }

  getStatColor(value: number): string {
    if (value < 50) return 'danger';
    if (value < 80) return 'warning';
    return 'success';
  }
}
