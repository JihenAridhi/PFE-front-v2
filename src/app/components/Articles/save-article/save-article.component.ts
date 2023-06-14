import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../entities/Article";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-save-article',
  templateUrl: './save-article.component.html',
  styleUrls: ['./save-article.component.css']
})
export class SaveArticleComponent implements OnInit{
  article: Article = new Article()
  searchList: Person[] = []
  filteredList: Person[] = []
  constructor(private as: ArticleService, private ps: PersonService, private route: ActivatedRoute) {}

  async ngOnInit()  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id) {
      await this.as.get(id).then(data => this.article = data!)
    }
    this.addAuthor()
    await this.ps.getStatus(true).then(data => {this.searchList = data!/*.filter(r => !this.article.authors!.some(a => a.id === r.id)); console.log(this.searchList)*/})
  }

    addAuthor() {
      if (!this.article.authors)
        this.article.authors = []
      this.article.authors.push(new Person())
    }

    removeAuthor() {
      let person = this.article.authors!.splice(this.article.authors!.length - 1, 1)
      this.searchList.push(person[0])
    }

  save(addF: NgForm)
  {
    let article = addF.value
    article.id = this.article.id
    article.authors = this.article.authors!.map(r=> ({id: r.id || null, fullName: r.fullName}))
    //article.authors.push(this.ps.getItem('person').id)
    this.as.save(article)
  }

  searchAuthor(i: number)
  {
    if (!this.article.authors![i].fullName)
      this.filteredList = []
    this.filteredList = this.searchList.filter(person =>
      (person.fullName?.toLowerCase().includes(this.article.authors![i].fullName!.toLowerCase()))
    )
  }

  selectPerson(person: Person)
  {
      this.article.authors![this.article.authors!.length - 1] = person
      this.searchList = this.searchList.filter(r => r!==person)
  }

}
