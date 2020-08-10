import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import DATA from './DATA.json';

// SOURCE: https: dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8
@Injectable({
  providedIn: 'root',
})
class CitiesStoreService {
  private readonly _cities = new BehaviorSubject(DATA.towns);

  readonly cities$ = this._cities.asObservable();

  get cities() {
    return this._cities.getValue();
  }

  set cities(val) {
    this._cities.next(val);
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

    this.cities = filteredCities;
  }

  reset() {
    this.cities = DATA.towns;
  }
}

export default CitiesStoreService;
