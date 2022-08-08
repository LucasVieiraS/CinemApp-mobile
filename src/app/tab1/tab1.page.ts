import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  bckupMovieData = [
    {
      title: 'Ponyo - Uma Amizade que Veio do Mar',
      poster_path:
        'https://www.themoviedb.org/t/p/w220_and_h330_face/cvpsmNWc8nyePJMbyMc9X5lLN6L.jpg',
      vote_average: 9.2,
      genre_ids: [12, 14, 16],
      original_language: 'JP',
      release_date: '5 May 1993',
    },
    {
      title: 'A Viagem de Chihiro ',
      poster_path:
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/e7WdOF6j3wB5kFXIEoqGXKmGaTl.jpg',
      vote_average: 8.5,
      genre_ids: [12, 14, 16],
      original_language: 'JP',
      release_date: '7 July 2001',
    },
    {
      title: 'O Castelo Animado',
      poster_path:
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1hTfaEWktMJPxCk5nZNtK7F86C9.jpg',
      vote_average: 8.4,
      genre_ids: [12, 14, 16],
      original_language: 'JP',
      release_date: '19 November 2004',
    },
    {
      title: 'Meu Amigo Totoro',
      poster_path:
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/23KKTxDg6rxZVc66bloQQdPSr29.jpg',
      vote_average: 8.1,
      genre_ids: [12, 14, 16],
      original_language: 'JP',
      release_date: '16 June 1988',
    },
    {
      title: 'Sussurros do Coração',
      poster_path:
        'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5q752lJ1XoRwj6yKVx999avJ8eO.jpg',
      vote_average: 7.9,
      genre_ids: [12, 14, 10749],
      original_language: 'JP',
      release_date: '15 July 1995',
    },
  ];
  movieData;

  genres: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public genreService: GenreService,
    public favService: FavService,
    public route: Router
  ) {}

  getMovies(event: any) {
    const search = event.target.value;
    if (search != null) {
      console.log('-------------------');
      console.log('Search: ' + search);
      for (var _i = 0; _i < this.bckupMovieData.length; _i++) {
        var element = this.bckupMovieData[_i];
        if (
          element.title.toUpperCase().includes(search.toUpperCase()) ||
          search.trim() == ''
        ) {
          console.log('matches: ', element.title);
          let found = false;
          this.movieData.forEach(function (value) {
            if (value.title == element.title) {
              found = true;
            }
          });
          if (found == false) {
            this.movieData.splice(1, 0, this.bckupMovieData[_i]);
          }
        } else {
          console.log('does not match: ', element.title);
          console.log(this.movieData[_i]);
          for (var _e = 0; _e < this.movieData.length; _e++) {
            if (this.movieData[_e].title == element.title) {
              this.movieData.splice(_e, 1);
            }
          }
        }
      }
    }
  }

  restoreMovies(event: any) {
    this.movieData = JSON.parse(JSON.stringify(this.bckupMovieData)) as JSON;
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
    this.genreService.getGenres().subscribe((data) => {
      data.genres.forEach((genre) => {
        this.genres[genre.id] = genre.name;
      });
    });
    this.movieData = JSON.parse(JSON.stringify(this.bckupMovieData)) as JSON;
  }
}
