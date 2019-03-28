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
  private param:string = "top_rated";
  constructor(private mDBService: MoviedbService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.consultaFilmes();
  }

  async consultaFilmes(){
    //loading
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });
    //exibir a caixa de diálogo
    await loading.present();


    await this.mDBService.getMovies(this.param).subscribe(
      //pega a resposta
      data=>{
      //let resposta = (data as any)._body;
      //converte para obj JSON
      //resposta = JSON.parse(resposta);
      this.movies = data;
      console.log(this.movies);
      loading.dismiss();
  },error =>{
    console.log(error);
  }
    ).add();
}
}
