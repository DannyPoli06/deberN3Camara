import { Component, OnInit} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { PhotoService } from '../app/services/photo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private photoService: PhotoService) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
}