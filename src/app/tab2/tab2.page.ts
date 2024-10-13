import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page'; // Ajuste o caminho conforme necessário
import { DndService } from '../dnd.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  selectedClassDetails: any;
  classDetailsArray: any[] = [];

  constructor(private tabsPage: TabsPage, private dndService: DndService) {}

  ngOnInit() {
    this.tabsPage.selectedClass.subscribe((classIndex: string) => {
      this.dndService.getClassDetails(classIndex).subscribe((details: any) => {
        this.selectedClassDetails = details;
        this.prepareClassDetailsArray();
      });
    });
  }

  prepareClassDetailsArray() {
    if (this.selectedClassDetails) {
      this.classDetailsArray = [
        { title: 'Hit Die', content: this.selectedClassDetails.hit_die },
        { title: 'Proficiencies', content: this.selectedClassDetails.proficiencies.map((prof: any) => prof.name).join(', ') },
        { title: 'Saving Throws', content: this.selectedClassDetails.saving_throws.map((save: any) => save.name).join(', ') },
        // Adicione mais detalhes conforme necessário
      ];
    }
  }
}
