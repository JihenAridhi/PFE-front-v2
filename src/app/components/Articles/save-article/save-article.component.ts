import {Component, OnInit, HostListener} from '@angular/core';
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
  showDropdown: boolean = false;

  constructor(private as: ArticleService, private ps: PersonService, private route: ActivatedRoute) {}

  async ngOnInit()  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      await this.as.get(id).then(data => this.article = data!)
    this.addAuthor()
    await this.ps.getStatus(true).then(data =>
    {
      this.searchList = data!.filter(person => !this.article.authors?.some(author => author.id === person.id))
      this.filteredList = this.searchList
    })
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element is outside the input and the dropdown
    const isOutsideInput = !clickedElement.closest('input');
    const isOutsideDropdown = !clickedElement.closest('.dropdown');

    if (isOutsideInput && isOutsideDropdown) {
      this.showDropdown = false;
    }
  }
    addAuthor() {
      if (!this.article.authors)
        this.article.authors = []
      this.article.authors.push(new Person())
    }

    removeAuthor() {
      let person = this.article.authors!.splice(this.article.authors!.length - 1, 1)
      if (person[0].id && !person[0].coAuthor) {
        this.searchList.push(person[0])
        this.filteredList = this.searchList
      }
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
      this.filteredList = this.searchList
      this.showDropdown = false;

  }

}
