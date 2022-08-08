import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { FavService } from '../services/fav.service';
import { MovieService } from '../services/movie.service';
import { DataService } from '../services/data.service';
import { SeriesList } from '../models/Series.model';
import { SeriesAPI } from '../models/SeriesAPI.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  seriesData: SeriesAPI[] = [];
  seriesList: SeriesList;
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

  getSeries(event: any) {
    const search = event.target.value;
    if (search != null && search.trim() !== '') {
      this.movieService.getSeries(search).subscribe(data => {
        console.log(data);
        this.seriesList = data;
      });
    }
  }

  showSerie(movie: SeriesList) {
    this.dataService.setDados('movie', movie);
    this.route.navigateByUrl('/movie-data');
  }

  async sendAlert(movie) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Deseja favoritar <strong>${movie.name}</strong>?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            this.favService.removeFav(movie.name);
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
    this.movieService.getSeries("Simpsons").subscribe(data => {
      console.log(data);
      this.seriesList = data;
    });
  }
}
