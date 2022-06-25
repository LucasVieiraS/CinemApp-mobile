import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  movieData = [
    {
      nome: 'Encanto',
      imagem: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
      nota: 77,
      categorias: ['Animação', 'Comédia', 'Família', 'Fantasia'],
    },
  ];

  constructor(public alertController: AlertController) {}

  getCategoriaString(categorias) {
    let convertedString = '';
    categorias.forEach(element => {
      convertedString += element + ', ';
    });
    return convertedString.substring(0, convertedString.length - 2);
  }

  async addToFavorite(movieName) {
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
            console.log('Filme não favoritado');
          },
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            console.log('Filme favoritado');
          },
        },
      ],
    });

    await alert.present();
  }
}
