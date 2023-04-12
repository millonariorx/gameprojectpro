import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormComponent } from './form/form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    TableModule,
    FormsModule,
    InputSwitchModule,
    ImageModule,
    MessagesModule,
    ToastModule,
    InputNumberModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
