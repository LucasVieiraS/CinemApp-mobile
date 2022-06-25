import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmeApiService {

  dados = [];

  constructor(private http: HttpClientModule) { }

  getDados() {
    this.dados.push(this.http.get(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TOKEN}`));
  }

}
