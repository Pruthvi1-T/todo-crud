import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { ServiceService } from './service.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-crud';
  
  task = '';
  todos : Todo[] = []
  
  @ViewChild('todoTask') todoTask : any; 
  constructor(private appservice: ServiceService) {}

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.appservice.getTodoList().subscribe(
      response => this.todos = response
    )
  }
  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.appservice.updateTodo({...todo, completed: e.checked}).subscribe(
      response => {
        console.log(response);
        
      }
    )
     
  }

  deleteTodo(e: unknown, id: Todo["id"]) {
    console.log(e, id);
    
  }

  addTodo() {
    this.appservice.addTodo({task: this.task, completed: false}).subscribe(
      response => {
        this.todoTask.reset();
        this.getList()
        console.log(response);
      }
      
    )
    
  }
}
