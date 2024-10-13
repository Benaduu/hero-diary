import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DndService } from '../dnd.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { Subject } from 'rxjs'
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

  
export class TabsPage implements OnInit {
  user: any = null;
  races: any[] = [];
  selectedRaceDetails = new BehaviorSubject<any>(null);
  classes: any[] = [];
  selectedClass = new Subject<string>();
  selectedImage: string | undefined;

  constructor(private dndService: DndService, private camera: Camera) {
    if(!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  selectImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData: string) => {
      this.selectedImage = 'data:image/jpeg;base64,' + imageData;
    }, (err: any) => {
      console.log('Error: ', err);
    });
    
  }

  async signIn() {
    this.user = await GoogleAuth.signIn();
    console.log('user:', this.user);
}
  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh:',authCode);
}
  async signOut(){
    await GoogleAuth.signOut();
    this.user = null;
}

  ngOnInit() {
    this.dndService.getRaces().subscribe(data => {
      this.races = data.results;
    });
    this.dndService.getClasses().subscribe(data => {
      this.classes = data.results;
    });
  }

  onRaceChange(event: any) {
    const selectedRace = event.detail.value;
    this.dndService.getRaceDetails(selectedRace).subscribe(data => {
      this.selectedRaceDetails.next(data);
    });
  }
  onClassChange(event: any) {
    this.selectedClass.next(event.detail.value);
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}