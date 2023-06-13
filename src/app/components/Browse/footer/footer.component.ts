import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  infos!: any[];
  content: any;
  ngOnInit() {
    this.fetchInfoData();
  }

  constructor(private ls: LanguageService, private http: HttpClient) {ls.getLanguage().subscribe(data => this.content=data)}
  private fetchInfoData() {
    this.http.get<any[]>('/assets/BrowseInfo/footer.json').subscribe(data => {
      this.infos = data;
    });
  }

}
