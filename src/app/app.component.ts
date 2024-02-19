import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { ServiceService } from './service.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { AppThemeService } from './app-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-crud';

  task = '';
  todos: Todo[] = [];

  @ViewChild('todoTask') todoTask: any;
  constructor(
    private appservice: ServiceService,
    private apptheme: AppThemeService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.appservice
      .getTodoList()
      .subscribe((response) => (this.todos = response));
  }
  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.appservice
      .updateTodo({ ...todo, completed: e.checked })
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.appservice.deleteTodo(id).subscribe((response) => {
      console.log('Deleted:', id);
      this.getList();
    });
  }

  addTodo() {
    this.appservice
      .addTodo({ task: this.task, completed: false })
      .subscribe((response) => {
        this.todoTask.reset();
        this.getList();
        console.log(response);
      });
  }

  themes = [
    {
      id: 'lara-light-blue',
      label: 'Lara Light Blue',
    },
    {
      id: 'luna-green',
      label: 'Luna Green',
    },
    {
      id: 'bootstrap4-dark-blue',
      label: 'Bootstrap 4 Dark Blue',
    },
  ];

  selectedTheme: { id: string; label: string } = this.themes[0];

  changeTheme(themeId: string) {
    this.apptheme.switchTheme(themeId);
  }
}
