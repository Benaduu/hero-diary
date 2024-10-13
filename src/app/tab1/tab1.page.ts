import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  selectedRaceDetails: any;
  raceDetailsArray: any[] = [];

  constructor(private tabsPage: TabsPage) {}

  ngOnInit() {
    this.tabsPage.selectedRaceDetails.subscribe((details: any) => {
      this.selectedRaceDetails = details;
      this.prepareRaceDetailsArray();
    });
  }

  prepareRaceDetailsArray() {
    if (this.selectedRaceDetails) {
      this.raceDetailsArray = [
        { title: 'Alignment', content: this.selectedRaceDetails.alignment },
        { title: 'Age', content: this.selectedRaceDetails.age },
        { title: 'Size', content: this.selectedRaceDetails.size },
        // Adicione mais detalhes conforme necessário
      ];
    }
  }
}
