import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {LanguageService} from "../../../services/language.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  infos!: any[];
  content: any;
  ngOnInit() {
    this.fetchInfoData();
  }

  constructor(private fs: FeedbackService, private ls: LanguageService, private http: HttpClient) {this.ls.getLanguage().subscribe(data => this.content = data)}
  add(contactF: NgForm) {
    this.fs.add(contactF.value)
  }
  private fetchInfoData() {
    this.http.get<any[]>('/assets/BrowseInfo/footer.json').subscribe(data => {
      this.infos = data;
    });
  }
}
