import { Component } from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {Project} from "../../../entities/Project";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  content: any
  projectList: Project[] = [];

  constructor(private ls: LanguageService, private ps: ProjectService) {ls.getLanguage().subscribe(data=>this.content=data)}
  async ngOnInit()
  {
    await this.ps.getAll().then(data => {if (data) this.projectList = data})
  }
  delete(p: Project) {
    let result = confirm('are you sure ?')
    if (result) {
      this.ps.delete(p.id)
      this.projectList = this.projectList.filter(i => i !== p)
    }
  }
}
