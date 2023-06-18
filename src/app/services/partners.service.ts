import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Partner} from "../entities/Partner";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  getAll()
  {return this.http.get<Partner[]>('http://localhost:8000/partner/getAll').toPromise()}

  get(id: number) {return this.http.get('http://localhost:8000/partner/get/'+id).toPromise()}

  setPhoto(files: any, id: number)
  {
    if (files)
    {
      const file: File = files[0];
      const formData = new FormData();
      formData.append('file', file, id.toString() + '.jpg');
      this.http.post<string>('http://localhost:8000/photo/partner', formData).toPromise().then()
    }
  }

  save(partner: Partner, files: any)
  {
    if(partner.id)
      this.http.put('http://localhost:8000/partner/update', partner).subscribe(()=> {
        this.setPhoto(files, partner.id!)
        alert('changes have been affected successfully !!')
      })
    else
      this.http.post<number>('http://localhost:8000/partner/add', partner).subscribe((data)=> {
        this.setPhoto(files, data)
        alert('partner have been posted successfully !! ')
      })
  }

  delete(id: number | undefined) {this.http.delete('http://localhost:8000/partner/delete/'+id).subscribe()}
}
