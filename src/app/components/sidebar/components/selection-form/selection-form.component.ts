import CitiesStoreService from 'src/app/services/cities-store.service';

import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-selection-form',
  template: `
    <label class="text-field-label">
      Household Income Min:
      <input
        class="text-field"
        type="text"
        placeholder="Enter min"
        (input)="onInputHouseholdIncomeMin($event)"
      />
    </label>

    <label class="text-field-label">
      Household Income Max:
      <input
        class="text-field"
        type="text"
        placeholder="Enter max"
        (input)="onInputHouseholdIncomeMax($event)"
      />
    </label>

    <label class="text-field-label">
      Population Min:
      <input
        class="text-field"
        type="text"
        placeholder="Enter min"
        (input)="onInputPopulationMin($event)"
      />
    </label>

    <label class="text-field-label">
      Population Max:
      <input
        class="text-field"
        type="text"
        placeholder="Enter max"
        (input)="onInputPopulationMax($event)"
      />
    </label>

    <label class="text-field-label">
      Cases Min:
      <input
        class="text-field"
        type="text"
        placeholder="Enter min"
        (input)="onInputCasesMin($event)"
      />
    </label>

    <label class="text-field-label">
      Cases Max:
      <input
        class="text-field"
        type="text"
        placeholder="Enter max"
        (input)="onInputCasesMax($event)"
      />
    </label>
    <div class="form-buttons">
      <button class="form-button" (click)="onClickReset()">
        Reset
      </button>
      <button class="form-button" (click)="onClickSubmit()">
        Submit
      </button>
    </div>

    <!-- <div class="selection-form" (click)="onClick()">Test</div>
    <button (click)="onClick2()">Add</button> -->
  `,
  styles: [
    `
      .text-field,
      .form-button {
        color: black;
        display: block;
      }
      .text-field {
        width: 10rem;
        margin-left: 1rem;
      }
      .text-field-label {
        display: flex;
        justify-content: space-between;
      }
      .selection-form {
      }
      .form-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }
    `,
  ],
})
class SelectionFormComponent {
  // TODO: Prob better way to do this.
  householdIncomeMin = null;
  householdIncomeMax = null;
  populationMin = null;
  populationMax = null;
  casesMin = null;
  casesMax = null;

  // TODO: Angular form

  constructor(public citiesStore: CitiesStoreService) {}
  // onClick() {
  //   console.log('clicked');

  //   this.citiesStore.filterByRegion();
  // }

  // onClick2() {
  //   this.citiesStore.resetDefaults();
  // }

  onClickSubmit() {
    this.citiesStore.filter({
      householdIncomeMin: this.householdIncomeMin,
      householdIncomeMax: this.householdIncomeMax,
      populationMin: this.populationMin,
      populationMax: this.populationMax,
      casesMin: this.casesMin,
      casesMax: this.casesMax,
    });
  }

  onClickReset() {
    this.citiesStore.reset();
  }

  onInputHouseholdIncomeMin(e) {
    this.householdIncomeMin = e.target.value;
  }

  onInputHouseholdIncomeMax(e) {
    this.householdIncomeMax = e.target.value;
  }

  onInputPopulationMin(e) {
    this.populationMin = e.target.value;
  }

  onInputPopulationMax(e) {
    this.populationMax = e.target.value;
  }

  onInputCasesMin(e) {
    this.casesMin = e.target.value;
  }

  onInputCasesMax(e) {
    this.casesMax = e.target.value;
  }
}

export default SelectionFormComponent;
