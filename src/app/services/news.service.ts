import { Injectable } from '@angular/core';
import {News} from "../entities/News";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private router: Router) {}

  getAll(){return this.http.get<News[]>('http://localhost:8000/news/getAll').toPromise()}

  get(id?: number){return this.http.get('http://localhost:8000/news/get/'+id).toPromise()}

  save(news: News, files: any)
  {
    if(news.id)
      this.http.put('http://localhost:8000/news/update', news).subscribe(()=> {
        this.setPhoto(files, news.id!)
        alert('changes have been affected successfully !!')
      })
    else
      this.http.post<number>('http://localhost:8000/news/add', news).subscribe((data)=> {
        this.setPhoto(files, data)
        alert('news have been posted successfully !! ')
      })
  }

  delete(id?: number) { this.http.delete('http://localhost:8000/news/delete/'+id).subscribe()}

  setPhoto(files: any, id: number)
  {
    if (files) {
      const file: File = files[0];
      const formData = new FormData();
      formData.append('file', file, id.toString() + '.jpg');
      this.http.post<string>('http://localhost:8000/photo/news', formData).toPromise().then()
    }
  }
}
