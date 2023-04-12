import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { GameService } from 'src/app/services/game.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService]
})
export class FormComponent {

  formGame!: FormGroup;
  evento!: any;
  categories!: Category[];
  selectedCategory!: Category;
  CountNumberGame!: number;

  constructor(
    public formBuilder: FormBuilder, 
    private game_service: GameService, 
    private messageService: MessageService,
    private navController: Router
    ) {  
    
    this.formGame = this.formBuilder.group({
      'Name': new FormControl("", Validators.required),
      'PathCoverGame': new FormControl("", Validators.required),
      'CategoryId': new FormControl("", Validators.required),
      'ReleaseDate': new FormControl("", Validators.required),
      'CountNumberGame': new FormControl("", Validators.required),
      'UrlPlayerRecord': new FormControl("", Validators.required)
    });

  }

  ngOnInit() {
    this.game_service.getCategories().subscribe(
      (sCategories: Category[]) => {
        this.categories = sCategories;
        console.log(sCategories);
      }
    );

  }



  showClear() {
    this.formGame.patchValue({ PathCoverGame: undefined });
    this.formGame.get('PathCoverGame')?.updateValueAndValidity();
    console.log("no hay nada");
  }

  uploadFile(event:any) {
    for (let file of event.files) {
      console.log("entro log");
      this.formGame.patchValue({ PathCoverGame: file });
      this.formGame.get('PathCoverGame')?.updateValueAndValidity();
    }

  }

  register() {

    console.log(this.selectedCategory);
    // this.formGame.patchValue({ PathCoverGame: file });
    // this.formGame.get('PathCoverGame')?.updateValueAndValidity();

    let form = this.formGame.value;
    if (this.formGame.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Requerido', detail: 'Llene los datos faltantes' });
      console.log("falta datos")
    } else {
      let formGame = new FormData();
      formGame.append('Name', form.Name);
      formGame.append('CategoryId', form.CategoryId);
      formGame.append('PathCoverGame', form.PathCoverGame);
      formGame.append('ReleaseDate', form.ReleaseDate);
      formGame.append('CountNumberGame', form.CountNumberGame);
      formGame.append('UrlPlayerRecord', form.UrlPlayerRecord);
      formGame.append('IsDisabled', '1');

       this.game_service.saveGame(formGame).subscribe(
        (sCategories: any) => {
          console.log(sCategories);
          console.log("insertado");
          this.navController.navigate(['']);
        }
      );
      
      
      console.log(formGame.get("Name"));
      console.log(formGame.get("CategoryId"));
      console.log(formGame.get("PathCoverGame"));
      console.log(formGame.get("ReleaseDate"));
      console.log(formGame.get("CountNumberGame"));
      console.log(formGame.get("CategoryId"));

      // console.log("registro ", form.PathCoverGame);
      // console.log("registro CategoryId: ", form.CategoryId);
      // console.log("registro ReleaseDate: ", form.ReleaseDate);
      // console.log("registro CountNumberGame: ", form.CountNumberGame);
      // console.log("registro UrlPlayerRecord: ", form.UrlPlayerRecord);
    }
  }


}
