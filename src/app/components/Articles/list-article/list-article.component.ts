import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../../entities/Article";
import {ArticleService} from "../../../services/article.service";
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";
import {ActivatedRoute} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit{
  @Input() id?: number
  articles: Article[] = []
  filteredList: Article[] = []
  article= new Article()
  file = ''
  content: any

  constructor(private ps: PersonService, private as: ArticleService, private route: ActivatedRoute, private ls: LanguageService) {}

  async ngOnInit()
  {
    this.ls.getLanguage().subscribe(data => this.content = data)
    if (this.route.snapshot.paramMap.get('id')!)
      this.id  = parseInt(this.route.snapshot.paramMap.get('id')!)
    await this.as.getPersonArticles(this.id).then(data =>
    {
      this.articles = data!
      this.filteredList = this.articles
    })
  }

   async toggle(a: Article) {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.toggle('active');
    this.article = a;
    //await this.as.getFile(this.article.id).then(data => this.file=data!)
  }
  onSearchTextEntered(searchText: string, year: string) {
    if (searchText==='' && year==='')
      this.filteredList = this.articles
    else
      this.filteredList = this.articles.filter(article => article.year!.toString().includes(year) && article.title!.toUpperCase().includes(searchText.toUpperCase()))
  }
  openNewTab(bibtex: string) {
    const newWindow = window.open('', '_blank');
    newWindow!.document.write(`<html><body><pre>${bibtex}</pre></body></html>`);
  }
}
