import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  addTodo(postData: Todo) {
    return this.http.post(`${this.baseUrl}/todos`, postData);
  }

  updateTodo(postData: Todo) {
    console.log(postData);

    return this.http.put(`${this.baseUrl}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: Todo['id']) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }
}
