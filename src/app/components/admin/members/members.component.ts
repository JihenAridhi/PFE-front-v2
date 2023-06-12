import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {AutorisationService} from "../../../services/autorisation.service";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit{

  members: Person[] = new Array<Person>()
  member: Person = new Person()
  autoList: number[][] =  []
  url='';
  content: any
  filteredList: Person[] = [];

  constructor(private ps: PersonService, private as: AutorisationService, private ls: LanguageService) {}

  toggle(person?: Person) {
    let blur=document.getElementById('blur');
     if (blur) blur.classList.toggle('active');
    let popup = document.getElementById('popup');
    if (popup) popup.classList.toggle('active');
    if (person) {
      this.member = person
      this.ps.getPhoto(person.id).then(data => this.url=data!)
    }

  }

  async ngOnInit()
  {
    this.ls.getLanguage().subscribe(data => this.content = data)
    await this.ps.getStatus(true).then(data => {if (data) this.members = data})
    await this.as.getAllAutorisations().then(data => {if(data) this.autoList = data})
  }

  submit(changesF: NgForm)
  {
    let f = changesF.value
    for(let i=0; i<this.members.length; i++)
    {
      this.members[i].profession=f['profession_'+i]
      this.members[i].team=f['team_'+i]
      this.ps.update(this.members[i])
      this.ps.setItem('personList', this.members)
      let a = [f['1_'+i], f['2_'+i], f['3_'+i], f['4_'+i], f['5_'+i], f['6_'+i], f['7_'+i]]
      for(let j=0; j<7; j++)
      {
        if (a[j] && !this.autoList[this.members[i].id!].includes(j+1)) {
          this.as.addAutorisation(this.members[i].id, j + 1)
          this.autoList[this.members[i].id!].push(j+1)
        }
        else if (!a[j]) {
          this.as.deletePerson(this.members[i].id, j + 1)
          this.autoList[this.members[i].id!].map(r => r!== j+1)
        }
      }
      this.as.setItem('personAutoList', this.autoList)
    }
    alert('the information have been updated successfully !!')
  }


  delete(m: Person)
  {
    let response = confirm('are you sure ?')
    if (response)
    {
      this.ps.delete(m)
      this.members = this.members.filter(r => r!==m)
      this.autoList.splice(m.id!, 1)
    }
  }

  onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.members
    else
      this.filteredList = this.members.filter(member => member.fullName?.toUpperCase().includes(searchText.toUpperCase()))
  }
}
