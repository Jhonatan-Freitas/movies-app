import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'aplication/json'})
}

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private URL_API:string = "https://api.themoviedb.org/3";
  private API_KEY:string = "4ffa1cd72ba74cff649724806ab0e1f9";

  constructor(private http: HttpClient){ }

  //função (método) terá um retorno do tipo Observable
  
  getMovies(param:string):Observable<any>{
    const url = `${this.URL_API}/${param}api_key=${this.API_KEY}&language=pt-BR`;
    return this.http.get<any>(url).pipe(
        tap(_ => console.log(`O parâmetro requisitado foi: ${param}`)),
        catchError(this.handleError<any>(`Falha no getMovies = ${param}`))
    );
  }


  //método privado para exibir o erro
  private handleError<T>(Operator = 'operation', result?: T){
    return (error:any):Observable<T> => {
      console.error(error); //log do erro na console

      //mantem o app rodando por ter retornado o obj vazio
      return of(result as T);
    };
  }
}



///top_rated?api_key=<<api_key>>&language=en-US&page=1

