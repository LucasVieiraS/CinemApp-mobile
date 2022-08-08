import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MovieAPI } from '../models/MovieAPI.model';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.page.html',
  styleUrls: ['./movie-data.page.scss'],
})
export class MovieDataPage implements OnInit {

  movie: MovieAPI;
  rating = '0.0';
  loaded = null;
  genres: string[] = [];

  constructor(public dataService: DataService) { }

  convertCategoriaString(categorias) {
    let convertedString = '';
    categorias.forEach(element => {
      convertedString += element + ', ';
    });
    return convertedString.substring(0, convertedString.length - 2);
  }

  ngOnInit() {
    this.movie = this.dataService.getDados('movie');
    this.genres = this.dataService.getDados('genres');
    console.log('filme enviado', this.movie);
    if (this.movie) {
      this.rating = this.movie.vote_average.toString();
    }
  }

  ionViewDidEnter() {
    const toNumberRating = Number(this.rating)/2;
    const starRating = document.getElementById('starRating');
    for (let i = 1; i <= 5; i ++) {
      console.log('star-' + i.toString());
      const starElement = document.getElementById('star-' + i.toString());
      if (toNumberRating >= i) {
        starElement.setAttribute('name', 'star');
        starElement.setAttribute('color', 'danger');
      } else {
        if ((i - 5) % 2 && (toNumberRating - i > -1)){
          starElement.setAttribute('name', 'star-half-outline');
          starElement.setAttribute('color', 'danger');
        } else {
          starElement.setAttribute('name', 'star-outline');
          starElement.setAttribute('color', null);
        }
      }
    }
    starRating.removeAttribute('hidden');
    this.loaded = true;
  }

}