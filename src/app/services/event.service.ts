import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../entities/Event";
import {BehaviorSubject} from "rxjs";
import {News} from "../entities/News";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class EventService
{
  event = new BehaviorSubject<Event>(new Event())
  constructor(private http: HttpClient) { }

  getAll()
  {return this.http.get<Event[]>('http://localhost:8000/event/getAll').toPromise()/*.subscribe(data => this.allEvents.next(data))*/}

  save(event: Event, files: any)
  {
    if(event.id)
      this.http.put('http://localhost:8000/event/update', event).subscribe(()=> {
        this.setPhoto(files, event.id!)
        alert('changes have been affected successfully !!')
      })
    else
      this.http.post<number>('http://localhost:8000/event/add', event).subscribe((data)=> {
        this.setPhoto(files, data)
        alert('news have been posted successfully !! ')
      })
  }

  get(id?: number){return this.http.get('http://localhost:8000/event/get/'+id).toPromise()/*.subscribe(
    (data: News) =>
      this.event.next(data)
  )*/}

  delete(id?: number) {
     this.http.delete('http://localhost:8000/event/delete/'+id).subscribe()
  }

  setPhoto(files: any, id: number)
  {
    const formData = new FormData();
    //files.forEach((file: File) => formData.append('files[]', file))
    for (let i=0; i<files.length; i++)
      formData.append('files[]', files[i])
    this.http.post<string>('http://localhost:8000/photo/event/'+id, formData).toPromise().then()
  }
}
