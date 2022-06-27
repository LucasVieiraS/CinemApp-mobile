import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenreList } from '../models/Genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  language = 'pt-BR';

  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = `?api_key=341fc8132e42aef14fc676cfca02b04c`;

  constructor(private http: HttpClient, public toastController: ToastController) { }

  getGenres(): Observable<GenreList> {
    const url = `${this.apiUrl}genre/movie/list${this.key}&language=${this.language}`;

    return this.http.get<GenreList>(url).pipe(
      map(return_ => return_),
      catchError(error => this.showError(error))
    );
  }

  async showError(sentError) {
    const toast = await this.toastController.create({
      icon: 'bug',
      header: 'Não foi possível carregar os filmes da API.',
      message: sentError,
      position: 'top',
      duration: 2000
    });
    toast.present();
    return null;
  }
}
