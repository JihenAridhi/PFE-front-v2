import { Component } from '@angular/core';
interface FooterData {
  mailLab: string;
  mailPresident: string;
  phone: string;
  fax: string;
  adresse: string;
  fb: string;
  lkn: string;
  tw: string;
  gh: string;
}
@Component({
  selector: 'app-edit-website',
  templateUrl: './edit-website.component.html',
  styleUrls: ['./edit-website.component.css']
})
export class EditWebsiteComponent implements OnInit {
  footerData: any;
  presidentData: any;
  serviceData: any;
  isLoading: boolean = true; // Add a loading indicator flag
  isLoading1: boolean = true; // Add a loading indicator flag
  firstName: string='';
  lastName: string='';

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getFooterData();
    this.getPresidentData();
  }
  getFooterData() {
    this.http.get<any>('http://127.0.0.1:8000/api/footer')
      .subscribe(
        data => {
          this.footerData = data.footerData; // Access the "footerData" key
          console.log('hi');
          console.log(this.footerData);
          this.isLoading = false; // Set the loading indicator flag to false
        },
        error => {
          console.error(error);
          this.isLoading = false; // Set the loading indicator flag to false even in case of error
        }
      );
  }
  updateFooterData(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const footerData = {
      mailLab: (document.getElementById('mailLab') as HTMLInputElement).value,
      mailPresident: (document.getElementById('mailPresident') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      fax: (document.getElementById('fax') as HTMLInputElement).value,
      adresse: (document.getElementById('adresse') as HTMLInputElement).value,
      fb: (document.getElementById('fb') as HTMLInputElement).value,
      gh: (document.getElementById('gh') as HTMLInputElement).value,
      lkn: (document.getElementById('lkn') as HTMLInputElement).value,
      tw: (document.getElementById('tw') as HTMLInputElement).value,
    };

    this.http.post('http://127.0.0.1:8000/api/update-footer', { footerData }, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Footer data updated successfully:', response);
          console.log(this.footerData);
          // Optionally, display a success message to the user
        },
        error => {
          console.error('Error updating footer data:', error);
          // Optionally, display an error message to the user
        }
      );
  }
  getPresidentData() {
    this.http.get<any>('http://127.0.0.1:8000/api/president')
      .subscribe(
        data => {
          this.presidentData = data.presidentData;// Access the "footerData" key
          console.log('hi');
          console.log(this.presidentData);
          this.isLoading1 = false; // Set the loading indicator flag to false
        },
        error => {
          console.error(error);
          this.isLoading1 = false; // Set the loading indicator flag to false even in case of error
        }
      );
  }
  updatePresidenData(event: Event) {
    event.preventDefault(); // Prevents the default form submission behavior

    const presidentData = {
      presidentfirstname: (document.getElementById('presidentfirstname') as HTMLInputElement).value,
      presidentlastname: (document.getElementById('presidentlastname') as HTMLInputElement).value,
    };

    this.http.post('http://127.0.0.1:8000/api/update-president', { presidentData }, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('President data updated successfully:', response);
          console.log(this.presidentData);
          // Optionally, display a success message to the user
        },
        error => {
          console.error('Error updating president data:', error);
          // Optionally, display an error message to the user
        }
      );
  }




}
