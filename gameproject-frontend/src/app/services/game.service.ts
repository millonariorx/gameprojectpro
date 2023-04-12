import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Game } from '../models/game.model';
import { AppSettings } from 'appsettings-json-reader'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  apiUrl: string = AppSettings.readAppSettings().apiGameSettings.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }

  getGamesFilter(data: FormData):Observable<Game[]> {
    return this.http.post<Game[]>(`${this.apiUrl}/filter`, data);
  }

  changeStatus(data: FormData):any {
    return this.http.post<Game[]>(`${this.apiUrl}/disabled`, data);  
  }

  saveGame(data: FormData):any {
    return this.http.post(`${this.apiUrl}/game`, data);
  }

  getGame(data: FormData):Observable<Game[]> {
    return this.http.post<Game[]>(`${this.apiUrl}/detail`, data);
  }

  // obtenerCredencial(data):Observable<Usuario> {
  //   return this.http.post<Usuario>(`${this.apiUrl}/api/getuser`, data);
  // }


}
