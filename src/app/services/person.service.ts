import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

   person: BehaviorSubject<Person> = new BehaviorSubject<Person>(new Person())
   allPerson: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([])
   autorisations:  BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([])
  constructor(private http: HttpClient, private router: Router) { }

  public get(id: number)
  {this.http.get('http://localhost:8000/person/get/'+id).subscribe((data: Person)=> this.person.next(data))}

  public getAll()
  {this.http.get<Person[]>('http://localhost:8000/person/getAll').subscribe(data=> this.allPerson.next(data))}

  public add(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).subscribe(
      (data: Person)=>
      {
        if(data)
          alert('this email is already in use !!')
        else
          this.http.post('http://localhost:8000/person/add', person).subscribe(()=>alert('your request have been submitted, please wait for further confirmation.'))
      }
    )
  }

  login(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).subscribe(
      (data: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            this.router.navigate(['/account/profil'])
            this.person.next(data)
            this.getAutorisations(data).subscribe(
              (auto: Autorisation[]) =>
              {
                let a = new Array<number>()
                for (let i=0; i<auto.length; i++)
                  a[i]=auto[i].id
                this.autorisations.next(a)
              })
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
      }
    )}

  getStatus(status: any)
  {
    if (!status)
      status=0
    this.http.get<Array<Person>>('http://localhost:8000/person/getAll/status/'+status).subscribe(data => this.allPerson.next(data))
  }

  accept(person: Person)
  {this.http.put('http://localhost:8000/person/accept/'+person.id, true).subscribe()}

  getAutorisations(person: Person)
  {return this.http.get<Array<Autorisation>>('http://localhost:8000/person/' + person.id + '/getAutorisations')}

  addAutorisation(idP: number, idA: number)
  {this.http.post('http://localhost:8000/person/'+idP+'/addAutorisation/'+idA, null).subscribe()}

  update(person: Person)
  {this.http.put('http://127.0.0.1:8000/person/update', person).subscribe(() => alert('your information have been updated successfully !!'))}

  delete(person: Person)
  {this.http.delete('http://localhost:8000/person/delete/'+person.id).subscribe()}


}
