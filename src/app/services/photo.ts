import { Injectable, signal } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  // Uso de Signal para reactividad en Angular
  public photos = signal<UserPhoto[]>([]);
  private PHOTO_STORAGE: string = 'photos';

  constructor() {}

  // Cargar fotos al iniciar
  public async loadSaved() {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    const savedPhotos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // Convertir rutas si está en un celular real
    for (let photo of savedPhotos) {
      if (Capacitor.isNativePlatform()) {
        const readFile = await Filesystem.getUri({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = Capacitor.convertFileSrc(readFile.uri);
      }
    }

    this.photos.set(savedPhotos);
  }

  // Tomar foto y guardar
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true, // Asegura que se guarde en la galería del cel
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    // Actualizamos la Signal de forma reactiva
    this.photos.update((photos) => [savedImageFile, ...photos]);

    // Guardamos en Preferences
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos()),
    });
  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.base64FromPath(photo.webPath!);

    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (Capacitor.isNativePlatform()) {
      return {
        filepath: fileName,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  private async base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}