import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  footerData: any;
  isLoading: boolean = true; // Add a loading indicator flag
  ngOnInit() {
    this.getFooterData();
  }

  constructor( private http: HttpClient) {}
  getFooterData() {
    this.http.get<any>('http://127.0.0.1:8000/api/footer')
      .subscribe(
        data => {
          this.footerData = data.footerData; // Access the "footerData" key
          this.isLoading = false; // Set the loading indicator flag to false
        },
        error => {
          this.isLoading = false; // Set the loading indicator flag to false even in case of error
        }
      );
  }

}
