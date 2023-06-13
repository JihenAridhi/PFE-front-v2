import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../../../../entities/Person";
import {PersonService} from "../../../../services/person.service";
import {LanguageService} from "../../../../services/language.service";


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{

  personList: Array<Person> = new Array<Person>()
  url: string[] = [];
  content: any;
  filteredList: Person[] = [];

  constructor(private router: Router, private prs: PersonService, private ls: LanguageService) {ls.getLanguage().subscribe(data=>this.content=data)}

  ngOnInit(): void
  {
    this.prs.getStatus(true).then(data => {
      this.personList = data!
      this.filteredList = this.personList
    })
  }

  onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.personList
    else
      this.filteredList = this.personList.filter(person => person.fullName?.toUpperCase().includes(searchText.toUpperCase()))
  }
}
