import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Project} from "../entities/Project";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  project = new BehaviorSubject<Project>(new Project())
  constructor(private http: HttpClient) { }

  getAll(){return this.http.get<Project[]>('http://localhost:8000/project/getAll').toPromise()}

  get(id?: number){return this.http.get('http://localhost:8000/project/get/'+id).toPromise()}
  save(project: Project, files: any)
  {
    if(project.id)
      this.http.put('http://localhost:8000/project/update', project).subscribe(()=> {
        this.setPhoto(files, project.id!)
        alert('changes have been affected successfully !!')
      })
    else
      this.http.post<number>('http://localhost:8000/project/add', project).subscribe((data)=> {
        this.setPhoto(files, data)
        alert('news have been posted successfully !! ')
      })
  }

  delete(id: number | undefined) {
    this.http.delete('http://localhost:8000/project/delete/'+id).subscribe()
  }

  setPhoto(files: any, id: number)
  {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, id.toString()+'.jpg');
    this.http.post<string>('http://localhost:8000photo/project', formData).toPromise().then()
  }
  setItem(key: string, value: any) {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), 'key').toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, 'key').toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue);
    }
    return null;
  }
}
