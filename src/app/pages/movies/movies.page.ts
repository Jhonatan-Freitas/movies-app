import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss']
})
export class MoviesPage implements OnInit {
 
  movies = [];
  private arrayCategoriy = ["popular","top_rated", "now_playing", "upcoming"];
  private movie_name:string;
  constructor(private mDBService: MoviedbService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.consultaFilmes();
  }

  async consultaFilmes(index?){
    //verifica se o parametro index está setado, senão ele um valor random // usando if ternário
    index = (typeof index === 'undefined') ? 3 : Math.floor(Math.random() * 4);
    let param = (this.movie_name === 'undefined') ? `movie/${this.arrayCategoriy[index]}?` : `search/movie?query=${this.movie_name}&include_adult=false&`;

    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });

    //exibir a caixa de diálog
    await loading.present();


    await this.mDBService.getMovies(param).subscribe(
      //pega a resposta
      data=>{
      this.movies = data.results;
      loading.dismiss();
  },error =>{
    console.log(error);
  }
    ).add();
}

exibeMsg(id:string){
  console.log(`O ID do filme clicado é: ${id}`);
}

doRefresh(event) {
  this.consultaFilmes('qualquer coisa');
  setTimeout(() => {
    event.target.complete();
  }, 1000);
}
}
