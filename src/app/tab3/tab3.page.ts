import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCardContent, 
  IonIcon, 
  IonBadge,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { images, camera, informationCircle } from 'ionicons/icons';
import { PhotoService } from '../services/photo';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent, 
    IonIcon, 
    IonBadge,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class Tab3Page {

  constructor(public photoService: PhotoService) {
    // Registramos los íconos
    addIcons({ images, camera, informationCircle });
  }

}