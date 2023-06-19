import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PersonService} from "../../../services/person.service";
import {LanguageService} from "../../../services/language.service";
import {Theme} from "../../../entities/Theme";
import {ThemeService} from "../../../services/theme.service";
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
@ViewChild('partA') partA!: ElementRef;
@ViewChild('partB') partB!: ElementRef;
@ViewChild('partC') partC!: ElementRef;
@ViewChild('partD') partD!: ElementRef;
@ViewChild('partE') partE!: ElementRef;
  content: any
  themes: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false]
  themeList: Theme[] = []
  selectedFiles: any;
  parts: HTMLElement[] = []
  constructor(private ps: PersonService, private ls: LanguageService, private ts: ThemeService) {ls.getLanguage().subscribe(data => this.content=data)}

  ngOnInit() {this.ts.getAllThemes().then((data)=>this.themeList=data!)}

  ngAfterViewInit() {
    // Get the divs
    this.parts.push(this.partA.nativeElement);
    this.parts.push(this.partB.nativeElement);
    this.parts.push(this.partC.nativeElement);
    this.parts.push(this.partD.nativeElement);
    this.parts.push(this.partE.nativeElement);

    this.showPart(this.parts[0]);
  }

  // Function to show a specific part and hide others
  showPart(partToShow: HTMLElement){
    console.log(partToShow.id)
    this.parts.forEach(part => {
      if (part === partToShow) {
        part.style.display = 'block'; // Type assertion
      } else {
        part.style.display = 'none'; // Type assertion
      }
    });
  };

 addPerson(addF: NgForm) {
   console.log(addF.value)
    const password = addF.value.password;

    // Check password length
    if (password.length < 8 && password.length > 0) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    // Check if password contains both letters and numbers
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
    if (!passwordRegex.test(password) && password.length > 0) {
      alert('Password must contain both letters and numbers!');
      return;
    }

    // Rest of your code...
    if (addF.value.password != addF.value.password1)
      alert('Confirm password, please!');
    else {
      this.ps.sendEmail(addF.value.email)
      this.showPart(this.parts[4])

    }
  }


  onFileSelected(files: FileList | null) {
    this.selectedFiles = files;
  }

  confirm(addF: NgForm) {
      let verify = addF.value.code
    let person: Person = addF.value
    person.themes = []
    for(let i=0; i<12; i++)
      if(this.themes[i])
        person.themes?.push(this.themeList[i])
      this.ps.register(addF.value, verify, this.selectedFiles)
  }

}
