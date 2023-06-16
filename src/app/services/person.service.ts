import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Person} from "../entities/Person";
import {AutorisationService} from "./autorisation.service";
import {Autorisation} from "../entities/Autorisation";
import * as CryptoJS from 'crypto-js';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  code?: number
  constructor(private http: HttpClient, private router: Router, private as: AutorisationService) { }

  public get(id: number)
  {return  this.http.get('http://localhost:8000/person/get/'+id).toPromise()}

  getPersonByFullName(firstName: string, lastName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/person/getByFullName/${firstName}/${lastName}`);
  }

  public getAll()
  {return this.http.get<Person[]>('http://localhost:8000/person/getAll').toPromise()/*.subscribe(data=> localStorage.setItem('personList', JSON.stringify(data)))*/}

  public add(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getEmail/'+person.email).subscribe(
      (data)=>
      {
        if(data)
          alert('this email is already in use !!')
        else {
          this.code = Math.floor(Math.random()*1000000)
          let email: any = {}
          email.subject = 'Confirm Your SMARTLAB Account Creation'
          email.html = `You have requested an account Creation for SMARTLAB. Your confirmation code is `+this.code;
          email.to = person.email
          this.http.post('http://localhost:8000/person/sendMail', email).subscribe()
        }
      }
    )
  }


  async login(person: Person)
  {
    await this.http.post('http://127.0.0.1:8000/person/login',{email: person.email, password: person.password}).toPromise().then(
      async (data?: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            this.setItem('person', data)
            await this.as.getAutorisations(data).then(
              (auto?: Autorisation[]) => {
                this.as.setItem('autoList', auto?.map(r => r.id))
              }
            )
            await this.router.navigate(['/account/profile'])
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
      }
    )
  }


  getStatus(status: any)
  {
    if (!status)
      status=0
    return this.http.get<Array<Person>>('http://localhost:8000/person/getAll/status/'+status).toPromise()
  }

  accept(person: Person)
  {
    let email: any = {}
    email.subject = 'SMARTLAB Account'
    email.html = 'Your SMARTLAB account have been accepted.\nYou can visit it <a href="http://localhost:4200/login">here</a>'
    email.to = person.email
    this.http.post('http://localhost:8000/person/sendMail', email).subscribe()
    this.http.put('http://localhost:8000/person/accept/'+person.id, true).subscribe()
  }

  update(person: Person)
  {
    //person.password = CryptoJS.AES.encrypt(person.password!, 'key').toString()
    if (!person.themes![person.themes!.length-1].id)
      person.themes?.splice(person.themes?.length-1, 1)
    this.http.put('http://127.0.0.1:8000/person/update', person).subscribe(()=>alert('your information have been updated successfully !!'))
  }

  delete(person: Person)
  {this.http.delete('http://localhost:8000/person/delete/'+person.id).subscribe()}

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/user', formData).toPromise()}

  getPhoto(id?: number)
  {return this.http.get<string>('http://localhost:8000/photo/user/get/'+id).toPromise()}

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

  setCV(files: any, id: number)
  {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, id.toString()+'.pdf');
    this.http.post<string>('http://localhost:8000/cv', formData).toPromise().then()
  }

  register(person: Person, verify: string, files: any) {
    this.http.post<number>('http://localhost:8000/person/add', person).subscribe((id: number)=> {
      alert("Your request have been submitted, please wait for further confirmation.")
      for(let i=0; i<person.themes!.length; i++)
        this.http.post('http://localhost:8000/person/'+id+'/addTheme/'+person.themes![i].id, null).subscribe();
      this.setCV(files, id!)
    })
  }
}
