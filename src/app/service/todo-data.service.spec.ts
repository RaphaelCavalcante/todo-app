import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from '../components/todo';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });
  it('should...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));
  describe ('#getAllTodos()', () => {
    it('shoud return an empty array by default', inject([TodoDataService],
    (service: TodoDataService) => {
      expect(service.getAll()).toEqual([]);
    }));
    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});

      service.post(todo1);
      service.post(todo2);

      expect(service.getAll()).toEqual([todo1, todo2]);
    }));
    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.post(todo1);
      service.post(todo2);
      expect(service.getById(1)).toEqual(todo1);
      expect(service.getById(2)).toEqual(todo2);
    }));

  });

  describe('#deleteTodoById(id)', () => {

    it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.post(todo1);
      service.post(todo2);
      expect(service.getAll()).toEqual([todo1, todo2]);
      service.delete(1);
      expect(service.getAll()).toEqual([todo2]);
      service.delete(2);
      expect(service.getAll()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});
      service.post(todo1);
      service.post(todo2);
      expect(service.getAll()).toEqual([todo1, todo2]);
      service.delete(3);
      expect(service.getAll()).toEqual([todo1, todo2]);
    }));

  });

  describe('#updateTodoById(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.post(todo);
      const updatedTodo = service.update(1, {
        title: 'new title'
      });
      expect(updatedTodo.title).toEqual('new title');
    }));

    it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.post(todo);
      const updatedTodo = service.update(2, {
        title: 'new title'
      });
      expect(updatedTodo).toEqual(null);
    }));

  });

  describe('#toggleTodoComplete(todo)', () => {

    it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.post(todo);
      const updatedTodo = service.toggleComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleComplete(todo);
      expect(updatedTodo.complete).toEqual(false);
    }));

  });

});
