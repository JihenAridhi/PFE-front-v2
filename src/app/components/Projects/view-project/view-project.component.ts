import {Component, OnInit} from '@angular/core';
import {Project} from "../../../entities/Project";
import {NewsService} from "../../../services/news.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit{
  project: Project = new Project();
  constructor(private ps: ProjectService, private route: ActivatedRoute) {}

  async ngOnInit()
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    await this.ps.get(id).then(data => this.project=data!)
    //await this.ns.getPhoto(this.news.id).then(data => this.url=data!)
  }
}
