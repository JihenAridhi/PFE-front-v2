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
  footerData: any;
  isLoading: boolean = true; // Add a loading indicator flag
  content: any;
  ngOnInit() {
    this.getFooterData();
  }

  constructor(private fs: FeedbackService, private http: HttpClient) {}
  add(contactF: NgForm) {
    this.fs.add(contactF.value)
  }
  getFooterData() {
    this.http.get<any>('http://127.0.0.1:8000/api/footer')
      .subscribe(
        data => {
          this.footerData = data.footerData; // Access the "footerData" key
          console.log('hiiiiiiiiii');
          console.log(this.footerData);
          this.isLoading = false; // Set the loading indicator flag to false
        },
        error => {
          console.error(error);
          this.isLoading = false; // Set the loading indicator flag to false even in case of error
        }
      );
  }
}
