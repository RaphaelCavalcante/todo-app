import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input()
  todos: Todo[];

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleTodoComplete: EventEmitter<Todo> = new EventEmitter();
  constructor() { }


  onToggleTodoComplete(todo: Todo) {
    this.toggleTodoComplete.emit(todo);
  }
  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }

}
