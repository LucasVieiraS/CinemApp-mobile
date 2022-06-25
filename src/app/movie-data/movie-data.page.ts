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

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.movie = this.dataService.getDados('movie');
    console.log('filme enviado', this.movie);
  }

}
