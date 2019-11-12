import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  index:number=0;
  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get(environment.BASE_URL+"node");
  }
  
  getIndexfromservice(index){
    return this.http.get(environment.BASE_URL+`node1/${index}`);
  }
}
