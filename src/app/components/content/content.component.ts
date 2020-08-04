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
      <app-map *ngIf="selected === 'Map'"></app-map>

      <app-chart *ngIf="selected === 'Chart'"></app-chart>
    </div>
  `,
  styles: [
    `
      :host {
        width: calc(100% - 40rem);
      }
      .app-content {
        background-color: #202128;
        /* height: 100vh; */
        height: calc(100vh - 5rem);
        /* width: calc(100% - 40rem); */
        padding: 2rem 2rem;
        /* display: inline-block; */
        position: relative;

        /* Note: Doesn't seem to work, due to auto gen wrap element */
        /* width: 100%; */
        /* width: calc(100vw - 40rem); */
      }
      .buttons-container {
        position: absolute;
        top: 40px;
        left: 80px;
        display: flex;
        z-index: 9;
        width: 17rem;
        justify-content: space-between;
      }

      h3 {
        margin: 0;
        text-align: center;
      }
    `,
  ],
})
export class ContentComponent {
  buttonLabels = ['Chart', 'Map'];
  selected = 'Chart';

  foo(e) {
    console.log('e = ', e);
    this.selected = e;
  }
}
