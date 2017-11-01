import { Component } from '@angular/core';
import { TodoDataService } from './service/todo-data.service';
import { Todo } from './components/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  newTodo: Todo = new Todo ();
  constructor (private todoDataService: TodoDataService) {}
  onAddTodo(todo: Todo) {
    this.todoDataService.post(todo);
  }
  onRemoveTodo(todo) {
    this.todoDataService.delete(todo.id);
  }
  onToogleTodoComplete(todo) {
    this.todoDataService.toggleComplete(todo);
  }
  get todos() {
    return this.todoDataService.getAll();
  }
}
