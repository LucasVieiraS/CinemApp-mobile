import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FavService {

  favorites = [];

  constructor(
    public toastController: ToastController
  ) {}

  addFav(item) {
    this.favorites.push(item);
    this.showSuccess();
  }

  getFav() {
    return this.favorites;
  }

  removeFav(title) {
    for (let i = 0; i < this.favorites.length; i++) {
      let data = this.favorites[i];
      if (data.title.toLowerCase() == title.toLowerCase()) {
        this.favorites.splice(i, 1)
        break
      }
    }
  }

  async showSuccess() {
    const toast = await this.toastController.create({
      icon: 'star',
      header: 'Sucesso',
      position: 'top',
      color: 'success',
      duration: 2000,
    });
    toast.present();
    return null;
  }
}
