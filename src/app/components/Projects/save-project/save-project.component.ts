import { Component } from '@angular/core';
import {Project} from "../../../entities/Project";
import {LanguageService} from "../../../services/language.service";
import {NgForm} from "@angular/forms";
import {ProjectService} from "../../../services/project.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-save-project',
  templateUrl: './save-project.component.html',
  styleUrls: ['./save-project.component.css']
})
export class SaveProjectComponent {
  project: Project = new Project();
  date: any;
  content: any;
  private selectedFiles: any;

  constructor(private ls: LanguageService, private route: ActivatedRoute, private pr: ProjectService) {ls.getLanguage().subscribe(data => this.content=data)}

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.project.id?.toString()+'.jpg');
    //await this.ps.setPhoto(formData).then()
  }

  addproject(form: NgForm)
  {
    let project = form.value
    project.date = new Date()
    project.id=this.project.id
    this.pr.save(project, this.selectedFiles)
  }

  ngOnInit(): void
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      this.pr.get(id).then(data => this.project=data!)
  }
}
