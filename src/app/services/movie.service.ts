import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MovieList } from '../models/Movie.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

  constructor(
    public toastController: ToastController
  ) {}

  async showError(sentError) {
    const toast = await this.toastController.create({
      icon: 'bug',
      header: 'Não foi possível carregar os filmes da API.',
      message: sentError,
      position: 'top',
      duration: 2000,
    });
    toast.present();
    return null;
  }
}
