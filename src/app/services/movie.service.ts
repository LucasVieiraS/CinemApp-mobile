import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MovieList } from '../models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  language = 'pt-BR';
  region = 'BR';

  private apiUrl = 'https://api.themoviedb.org/3/';
  private key = `?api_key=341fc8132e42aef14fc676cfca02b04c`;

  constructor(private http: HttpClient, public toastController: ToastController) { }

  getMovies(search: string): Observable<MovieList> {
    const url = `${this.apiUrl}search/movie${this.key}&language=${this.language}&region=${this.region}&query=${search}`;
    return this.http.get<MovieList>(url).pipe(
      map(return_ => return_),
      catchError(error => this.showError(error))
    );
  }

  getSeries(search: string): Observable<MovieList> {
    const url = `${this.apiUrl}search/tv${this.key}&language=${this.language}&region=${this.region}&query=${search}`;
    return this.http.get<MovieList>(url).pipe(
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