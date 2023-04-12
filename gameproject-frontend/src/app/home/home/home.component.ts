import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { Category } from 'src/app/models/category.model';
import { Game } from 'src/app/models/game.model';
import { AppSettings} from 'appsettings-json-reader';


interface Status {
  name: string;
  code: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  checked: boolean = true;
  status!: Status[];
  selectedStatus!: Status;
  categories!: Category[];
  games!: Game[];
  selectedCategory: Category = new Category(-1, "Todos");
  urlImage: string = AppSettings.readAppSettings().apiGameSettings.apiUrl;

  constructor(private game_service: GameService) {
    
  }

  formDataFilter(CategoryId:string, IsDisabled: string) {
    let formData = new FormData();
    formData.append('IsDisabled', IsDisabled);
    formData.append('CategoryId', CategoryId);
    return formData;
  }

  reloadGamesFilter(formData: FormData) {
    this.game_service.getGamesFilter(formData).subscribe(
      (sGames: Game[]) => {
        this.games = sGames;
        console.log(sGames);
      }
    );
  }

  ngOnInit() {
    this.status = [
      { name: 'Todos', code: '-1' },
      { name: 'Habilitado', code: '1' },
      { name: 'Inhabilitado', code: '0' }
    ];

    this.game_service.getCategories().subscribe(
      (sCategories: Category[]) => {
        sCategories.unshift({"CategoryId": -1,"CategoryName": "Todos"})
        this.categories = sCategories;
        console.log(sCategories);
      }
    );
    let formData = this.formDataFilter('-1', '-1');    
    this.reloadGamesFilter(formData);

  }

  categoryChange(valor:Category) {
    console.log(this.selectedStatus.code);
    let formData = this.formDataFilter(String(valor.CategoryId), this.selectedStatus.code);    
    this.reloadGamesFilter(formData);
  }

  statusChange(valor:Status) {
    let formData = this.formDataFilter(String(this.selectedCategory.CategoryId), valor.code);    
    this.reloadGamesFilter(formData);
  }

  chxDisabled(valor:boolean, IdGame:number){
    let IsDisabled = Number(valor);
    let formData = new FormData();
    formData.append('IsDisabled', String(IsDisabled));
    formData.append('IdGame', String(IdGame));
    
    this.game_service.changeStatus(formData).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
    // console.log(Number(valor));
  }





}
