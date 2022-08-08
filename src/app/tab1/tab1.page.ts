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

  movieData: MovieAPI[] = [];
  movieList: MovieList;
  genres: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,

    public dataService: DataService,
    public movieService: MovieService,
    public genreService: GenreService,
    public favService: FavService,

    public route: Router
  ) {}

  getMovies(event: any) {
    const search = event.target.value;
    if (search != null && search.trim() !== '') {
      this.movieService.getMovies(search).subscribe(data => {
        console.log(data);
        this.movieList = data;
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
    this.genreService.getGenres().subscribe(data => {
      console.log('Genders: ', data);
      data.genres.forEach(genre => {
        this.genres[genre.id] = genre.name;
      });
      this.dataService.setDados('genres', this.genres);
    });
    this.movieService.getMovies('Batman').subscribe(data => {
      console.log(data);
      this.movieList = data;
    });
  }
}
