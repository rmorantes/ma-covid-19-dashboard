import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import DATA from './DATA.json';

//https: dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8

@Injectable({
  providedIn: 'root',
})
class CitiesStoreService {
  private readonly _cities = new BehaviorSubject(DATA.towns);

  // tableObs = new BehaviorSubject<Table>(null);
  // this.tableService.tableObs.subscribe(reponse => {
  //   this.table = reponse;
  // });

  readonly cities$ = this._cities.asObservable();

  get cities() {
    return this._cities.getValue();
  }

  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
  set cities(val) {
    this._cities.next(val);
  }

  filterByRegion() {
    // we assaign a new copy of todos by adding a new todo to it
    // with automatically assigned ID ( don't do this at home, use uuid() )
    this.cities = [...this.cities.slice(0, 10)];
    // this.cities = [];
  }

  filter({
    householdIncomeMin,
    householdIncomeMax,
    populationMin,
    populationMax,
    casesMin,
    casesMax,
  }) {
    const copy = JSON.parse(JSON.stringify(DATA.towns));

    const filteredCities = copy.filter((city) => {
      // TODO: Refactor.
      if (householdIncomeMin && city[3] < householdIncomeMin) {
        return false;
      }

      if (householdIncomeMax && city[3] > householdIncomeMax) {
        return false;
      }

      if (populationMin && city[2] < populationMin) {
        return false;
      }

      if (populationMax && city[2] > populationMax) {
        return false;
      }

      if (casesMin && city[1] < casesMin) {
        return false;
      }

      if (casesMax && city[1] > casesMax) {
        return false;
      }

      return true;
    });
    console.log('filteredCities.length = ', filteredCities.length);
    this.cities = filteredCities;
  }

  reset() {
    this.cities = DATA.towns;
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
