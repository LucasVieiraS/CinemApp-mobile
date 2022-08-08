import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  bckupMovieData = [
    {
      title: 'Os Simpsons',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9n4dv0aGRb8Ma15H7jbWsY7Eg0N.jpg',
      vote_average: 8.0,
      genre_ids: [18, 14, 16],
      original_language: 'US',
      release_date: '2 June 1989',
    },
    {
      title: 'Peaky Blinders',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/i0uajcHH9yogXMfDHpOXexIukG9.jpg',
      vote_average: 8.6,
      genre_ids: [12, 14, 16],
      original_language: 'US',
      release_date: '2 January 2013',
    },
    {
      title: 'Cavaleiro da Lua',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tkc7AVyUoG9VEeDvukN0TVqa24C.jpg',
      vote_average: 8.4,
      genre_ids: [12, 14, 16],
      original_language: 'US',
      release_date: '19 June 2022',
    },
    {
      title: 'The Boys',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/stTEycfG9928HYGEISBFaG1ngjM.jpg',
      vote_average: 8.5,
      genre_ids: [12, 14, 16],
      original_language: 'US',
      release_date: '16 December 2019',
    },
    {
      title: 'Stranger Things',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      vote_average: 8.6,
      genre_ids: [12, 14, 10749],
      original_language: 'US',
      release_date: '23 July 2016',
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
