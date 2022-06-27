import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MovieAPI } from '../models/MovieAPI.model';
import { MovieService } from '../services/movie.service';
import { MovieList } from '../models/DatabaseAPI.model';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  movieData: MovieAPI[] = [
    /*{
      nome: 'Encanto',
      imagem: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
      classificacao: 77,
      categorias: ['Animação', 'Comédia', 'Família', 'Fantasia'],
      lancamento: '31/03/2022 (BR)',
      duracao: '2:23'
    }*/
  ];

  movieList: MovieList;

  genres: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dataService: DataService,
    public movieService: MovieService,
    public genreService: GenreService,
    public route: Router
  ) { }

  getMovies(event: any) {
    const search = event.target.value;
    if (search != null && search.trim() !== '') {
      this.movieService.getMovies(search).subscribe(data => {
        console.log(data);
        this.movieList = data;
      });
    }
  }

  showMovie(movie: MovieList) {
    this.dataService.setDados('movie', movie);
    this.route.navigateByUrl('/movie-data');
  }

  async sendAlert(movieName, element) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Deseja favoritar <strong>${movieName}</strong>?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            element.name = 'star-outline';
            this.showLowerNotification('Filme removido dos favoritos.', 'star-outline');
          },
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            element.name = 'star';
            this.showLowerNotification('Filme adicionado aos favoritos.', 'star');
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
      duration: 2000
    });
    toast.present();
  }

  async requestFavorite(movieName, event) {
    const element = document.getElementsByClassName(event.target.className[0]);
    console.log(element);
    this.sendAlert(movieName, element);
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe(data => {
      console.log('Genders: ', data);
      data.genres.forEach(genre => {
        this.genres[genre.id] = genre.name;
      });

      this.dataService.setDados('genres', this.genres);
    });
  }
}
