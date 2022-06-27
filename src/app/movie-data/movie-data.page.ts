import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
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
  carregado = null;

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
    console.log('filme enviado', this.movie);
    if (this.movie) {
      const newRating = ((this.movie.classificacao / 100) * 5).toString();
      this.rating = newRating.substring(0, newRating.length - 1);
    }
  }

  ionViewDidEnter() {
    const toNumberRating = Number(this.rating);
    const starRating = document.getElementById('starRating');
    for (let i = 1; i <= 5; i ++) {
      console.log('star-' + i.toString());
      const starElement = document.getElementById('star-' + i.toString());
      if (toNumberRating >= i) {
        starElement.setAttribute('name', 'star');
        starElement.setAttribute('color', 'danger');
      } else {
        if ((i - 5) % 2){
          starElement.setAttribute('name', 'star-half-outline');
          starElement.setAttribute('color', 'danger');
        } else {
          starElement.setAttribute('name', 'star-outline');
          starElement.setAttribute('color', null);
        }
      }
    }
    starRating.removeAttribute('hidden');
    this.carregado = true;
  }

}
