import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonImg,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { PhotoService } from '../services/photo';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonImg,
  ]
})
export class Tab1Page implements OnInit {

  constructor(public photoService: PhotoService) {
    addIcons({ camera });
  }

  async ngOnInit() {
    // Carga las fotos guardadas en el almacenamiento
    await this.photoService.loadSaved();
  }

  async takePhoto() {
    await this.photoService.addNewToGallery();
  }
}