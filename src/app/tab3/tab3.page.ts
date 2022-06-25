import { Component } from '@angular/core';
import { MovieAPI } from '../models/MovieAPI.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoriteMovies: MovieAPI[] = [
    {
      nome: 'Encanto',
      imagem: 'https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
      classificacao: 77,
      categorias: ['Animação', 'Comédia', 'Família', 'Fantasia'],
      lancamento: '31/03/2022 (BR)',
      duracao: '2:23'
    }
  ];

  constructor() {}

}
