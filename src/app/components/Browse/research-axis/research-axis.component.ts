import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../entities/Theme";

@Component({
  selector: 'app-research-axis',
  templateUrl: './research-axis.component.html',
  styleUrls: ['./research-axis.component.css']
})
export class ResearchAxisComponent implements OnInit{
  themeList: Theme[] = []
  constructor(private ts: ThemeService) {}

  ngOnInit(): void {this.ts.getAllThemes().then(data => this.themeList = data!)}


}
