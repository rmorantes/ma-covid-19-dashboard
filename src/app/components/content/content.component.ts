import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <div class="app-content">
      <div class="buttons-container">
        <app-content-selection-button
          *ngFor="let buttonLabel of buttonLabels"
          [label]="buttonLabel"
          [isSelected]="buttonLabel === selected"
          (clicked)="foo($event)"
        >
        </app-content-selection-button>
      </div>
      <app-map [ngClass]="{ isHidden: selected !== 'Map' }"></app-map>

      <app-chart
        [ngClass]="{ isHidden: selected !== 'Rate vs Income' }"
      ></app-chart>

      <app-bar-graph
        [ngClass]="{ isHidden: selected !== 'Cases Comparison' }"
      ></app-bar-graph>
    </div>
  `,
  styles: [
    `
      :host {
        width: calc(100% - 36rem - 30px);
      }
      .app-content {
        background-color: #292b33;
        position: relative;
        margin: 20px;
        margin-left: 10px;
        border-radius: 20px;
        overflow: hidden;
        height: calc(100vh - 5rem - 40px);
      }
      .buttons-container {
        position: absolute;
        top: 20px;
        left: 80px;
        display: flex;
        z-index: 9;
        width: 45rem;
        justify-content: space-between;
      }
      .isHidden {
        visibility: hidden;
      }
      h3 {
        margin: 0;
        text-align: center;
      }
    `,
  ],
})
export class ContentComponent {
  buttonLabels = ['Rate vs Income', 'Cases Comparison', 'Map'];
  selected = 'Rate vs Income';

  // TODO: Rename.
  foo(e) {
    this.selected = e;
  }
}
