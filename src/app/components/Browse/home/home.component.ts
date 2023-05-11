import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {News} from "../../../entities/News";
import {NewsService} from "../../../services/news.service";
import {LanguageService} from "../../../services/language.service";
import { Article } from 'src/app/entities/Article';
import { ArticleService } from 'src/app/services/article.service';
import { Partner } from 'src/app/entities/Partner';
import { PartnersService } from 'src/app/services/partners.service';
import { Person } from 'src/app/entities/Person';
import { PersonService } from 'src/app/services/person.service';
import { Event } from 'src/app/entities/Event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  eventList : Event[] = new Array<Event>()
  articleList : Article[] = new Array<Article>()
  partnersList : Partner[] = new Array<Partner>()
  personList : Person[] = new Array<Person>()
  newsList: News[] = new Array<News>()
  url: string[] = [];
  content: any;


  constructor(private router: Router, private ns: NewsService, private as: ArticleService, private ls: LanguageService, private prt : PartnersService , private prs : PersonService , private es : EventService) {}

  async ngOnInit()
  {
    this.ls.getLanguage().subscribe(data => this.content=data)
    await this.es.getAll().then(async (data) => { if (data) this.eventList = data;})
    await this.prs.getAll().then(async (data) => { if (data) this.personList = data;})
    await this.as.getAll().then(async (data) => { if (data) this.articleList = data;})
    await this.prt.getAll().then(async (data) => { if (data) this.partnersList = data;})

    await this.ns.getAll().then( async data =>
    {
      if (data)
        this.newsList = data
    })
  }

  changeLang(language: string) {
    this.ls.switchTo(language)
    this.ls.getLanguage().subscribe(data => this.content = data)
    window.location.reload()
  }
}
