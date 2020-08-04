import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import DATA from './DATA.json';

//https: dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8

@Injectable({
  providedIn: 'root',
})
class CitiesStoreService {
  private readonly _cities = new BehaviorSubject(DATA.towns);

  readonly todos$ = this._cities.asObservable();

  get cities() {
    return this._cities.getValue();
  }
}

export default CitiesStoreService;

// todos-store.service.ts

// @Injectable({ provideIn: 'root' })
// export class TodosStoreService {
//   // - We set the initial state in BehaviorSubject's constructor
//   // - Nobody outside the Store should have access to the BehaviorSubject
//   //   because it has the write rights
//   // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
//   // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
//   //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
//   private readonly _todos = new BehaviorSubject<Todo[]>([]);

//   // Expose the observable$ part of the _todos subject (read only stream)
//   readonly todos$ = this._todos.asObservable();

//   // the getter will return the last value emitted in _todos subject
//   get todos(): Todo[] {
//     return this._todos.getValue();
//   }

//   // assigning a value to this.todos will push it onto the observable
//   // and down to all of its subsribers (ex: this.todos = [])
//   private set todos(val: Todo[]) {
//     this._todos.next(val);
//   }

//   addTodo(title: string) {
//     // we assaign a new copy of todos by adding a new todo to it
//     // with automatically assigned ID ( don't do this at home, use uuid() )
//     this.todos = [
//       ...this.todos,
//       { id: this.todos.length + 1, title, isCompleted: false },
//     ];
//   }

//   removeTodo(id: number) {
//     this.todos = this.todos.filter((todo) => todo.id !== id);
//   }
// }
