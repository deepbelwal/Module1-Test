import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Query } from '../types';
import { Todo } from '../todo.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userInfo:Todo[];
  users=[];
  user;
  todos : Observable<Todo[]>;
  allData:any[];
  clicked:boolean=false;
  nameClicked:boolean;
  p: number = 1;
  index:number;
  id:number=0;
  userTitle:string="";
  userCompleted:boolean;
  constructor(private apollo: Apollo, private todoservice : TodoService) { } 
   ngOnInit() {
    this.initializeVar();
    this.getTodos();
    this.getGraphData();
 
  }
  initializeVar(){
    this.clicked = false;
    this.nameClicked= false;
    this.allData = [];
    this.userTitle="";
    this.userCompleted;

    }
   giveId(userdata)
  {
    this.userInfo=[];
    this.nameClicked=true;
     this.todoservice.getIndexfromservice(userdata.id).subscribe((userdata:any)=>{ 
      
      this.userTitle=userdata[0].title;
      this.userCompleted=userdata[0].completed 
      this.nameClicked=true;
    });
  }

  getTodos()
  {
    this.todoservice.getData().subscribe((data:any)=>{
      this.todos=data      
    });
  }

  getGraphData()
  {
    this.user = this.apollo.watchQuery<Query>({
      query: gql`
        query { 
          allUsers {
            id
            name
            email
          }
        }
      `
    })
      .valueChanges
      .subscribe((data:any)=>{
          for(let i=0; i<10 ;i++){
          this.users.push(data.data.allUsers[i])
          }            
      });
  }
  displayData(){
    this.clicked=true;
    this.allData=[];
    for(let i=0;i<10;i++){
        let allDataObj={
          id:this.todos[i].id,
          graphqlid:this.users[i].id,
          name:this.users[i].name,
          email:this.users[i].email,
          title:this.todos[i].title,
          completed:this.todos[i].completed,
        }   
        this.allData.push(allDataObj)
      }
      
    }
   
  }
