import { Component } from '@angular/core';
import { MovieAPI } from '../models/MovieAPI.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newMovies: MovieAPI[] = [
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
