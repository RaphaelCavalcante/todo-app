import { Injectable } from '@angular/core';
import { Todo } from '../components/todo';

@Injectable()
export class TodoDataService {
  lastId = 0;
  todos: Todo[] = [];

  constructor() { }

  post(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  delete(id: number): TodoDataService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  update(id: number, values: Object = {}): Todo {
    const todo = this.getById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAll(): Todo[] {
    return this.todos;
  }

  getById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleComplete(todo: Todo): Todo {
    const updatedTodo = this.update(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
