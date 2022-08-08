import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favoriteMovies = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public favService: FavService,
    public route: Router
  ) {}

  async sendAlert(movie) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `Deseja favoritar <strong>${movie.title || movie.name}</strong>?`,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.favService.removeFav(movie.title || movie.name)
            this.showLowerNotification(
              'Filme removido dos favoritos.',
              'star-outline'
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
    this.favoriteMovies = this.favService.getFav();
  }
}
