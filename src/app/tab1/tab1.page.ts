import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MovieAPI } from '../models/MovieAPI.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  movieData: MovieAPI[] = [
    {
      nome: 'Encanto',
      imagem: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
      classificacao: 77,
      categorias: ['Animação', 'Comédia', 'Família', 'Fantasia'],
      lancamento: '31/03/2022 (BR)',
      duracao: '2:23'
    }
  ];

  constructor(
    public alertController: AlertController, public toastController: ToastController, public dataService: DataService,
    public route: Router
  ) { }

  showMovie(filme) {
    this.dataService.setDados('filme', filme);
    this.route.navigateByUrl('/movie-data');
  }

  convertCategoriaString(categorias) {
    let convertedString = '';
    categorias.forEach(element => {
      convertedString += element + ', ';
    });
    return convertedString.substring(0, convertedString.length - 2);
  }

  async sendAlert(movieName) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Deseja favoritar <strong>${movieName}</strong>?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.showLowerNotification('Filme removido dos favoritos.');
          },
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.showLowerNotification('Filme adicionado aos favoritos.');
          },
        },
      ],
    });

    await alert.present();
  }

  async showLowerNotification(sentMessage) {
    const toast = await this.toastController.create({
      icon: 'star',
      message: sentMessage,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async requestFavorite(movieName) {
    this.sendAlert(movieName);
  }
}
