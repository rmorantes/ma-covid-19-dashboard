import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';

import CitiesStoreService from 'src/app/services/cities-store.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="app-sidebar">
      <div class="scroll-container">
        <app-selection-form></app-selection-form>
        <div class="table-header">
          <span>
            City
          </span>
          <span>
            Cases
          </span>
          <span>
            Population
          </span>
          <span>
            Household Income
          </span>
        </div>
        <app-city-tile
          *ngFor="let city of citiesStore.cities"
          [name]="city[0]"
          [cases]="city[1]"
          [population]="city[2]"
          [householdIncome]="city[3]"
          (mouseenter)="onMouseenter(city[0])"
          (mouseout)="onMouseout(city[0])"
        ></app-city-tile>
      </div>
    </div>
  `,
  styles: [
    `
      .app-sidebar {
        background-color: #292b33;
        border-radius: 20px;
        display: inline-block;
        height: calc(100vh - 9rem);
        margin: 20px;
        margin-right: 10px;
        padding: 2rem;
        width: 36rem;
      }
      .scroll-container {
        height: 100%;
        overflow-y: scroll;
      }
      .scroll-container::-webkit-scrollbar {
        margin-left: 5px;
        width: 4px;
      }
      .scroll-container::-webkit-scrollbar-thumb {
        background: #3f4350;
        border-radius: 99px;
      }
      .scroll-container::-webkit-scrollbar-track {
        background: #24262e;
        border-radius: 99px;
      }
      .table-header {
        display: flex;
        justify-content: space-evenly;
        background: #4c4c4c;
        margin-top: 4rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    `,
  ],
})
export class SidebarComponent {
  constructor(public citiesStore: CitiesStoreService) {}

  onMouseenter(name) {
    d3.select(`#${_.kebabCase(name).toLowerCase()}-circle`)
      .style('fill', 'red')
      .raise();
  }

  onMouseout(name) {
    d3.select(`#${_.kebabCase(name).toLowerCase()}-circle`).style(
      'fill',
      '#69b2b3',
    );
  }
}
