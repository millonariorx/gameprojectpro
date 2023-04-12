import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from 'appsettings-json-reader';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  id!: string | null;
  game!: Game;
  urlImage: string = AppSettings.readAppSettings().apiGameSettings.apiUrl;
  constructor(
      private route: ActivatedRoute,
      private game_service: GameService
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    let formIdGame = new FormData();
    formIdGame.append("IdGame", String(this.id));
    
    this.game_service.getGame(formIdGame).subscribe(
      (sGame: Game[]) => {
        this.game = sGame[0];
        console.log(this.game.CountNumberGame);
      });

    console.log(this.id);

  }
}
