import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GenreService } from '../services/genre.service';
import { FavService } from '../services/fav.service';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';
import { MovieList } from '../models/Movie.model';
import { MovieAPI } from '../models/MovieAPI.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  movieData: MovieAPI[] = [];
  movieList: MovieList;

  movieList_results: any[] = [];
  genres: string[] = [];

  defaultSearch : string = "Batman";
  pageNumber : number = 1;
  updatedPage : boolean = false;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,

    public dataService: DataService,
    public movieService: MovieService,
    public genreService: GenreService,
    public favService: FavService,

    public route: Router
  ) {}

  getTotalResults() {
    return this.movieList.total_pages > 1;
  }

  scrollMovies(event : any) {
    this.updatedPage = false;
    console.log("Scrolling...")
    this.movieService.getMovies(this.defaultSearch, this.pageNumber).subscribe(data => {
      this.movieList = data;
      if (this.updatedPage == false) {
        this.updatedPage = true;
        this.pageNumber += this.clamp(1, 0, this.movieList.total_pages || 1)
      }
      this.movieList.results.forEach((data) => {
        this.movieList_results.push(data);
      })
      console.log(this.movieList);
    });
    event.target.complete();
  }

  getMovies(event: any) {
    const search = event.target.value;
    if (search != null && search.trim() !== '') {
      this.defaultSearch = search;
      this.movieService.getMovies(this.defaultSearch, this.pageNumber).subscribe(data => {
        this.movieList = data;
        this.movieList_results = this.movieList.results;
      });
    }
  }

  showMovie(movie: MovieList | any) {
    this.dataService.setDados('movie', movie);
    this.route.navigateByUrl('/movie-data');
  }

  async sendAlert(movie) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Deseja favoritar <strong>${movie.title}</strong>?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this.favService.removeFav(movie.title);
            this.showLowerNotification(
              'Filme removido dos favoritos.',
              'star-outline'
            );
          },
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.favService.addFav(movie);
            this.showLowerNotification(
              'Filme adicionado aos favoritos.',
              'star'
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async showLowerNotification(sentMessage, sentIcon) {
    const toast = await this.toastController.create({
      icon: sentIcon,
      message: sentMessage,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {
    this.scrollMovies(false);
    this.genreService.getGenres().subscribe(data => {
      console.log('Genders: ', data);
      data.genres.forEach(genre => {
        this.genres[genre.id] = genre.name;
      });
      this.dataService.setDados('genres', this.genres);
    });
  }
}
