import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="app-sidebar">
      <h3>{{ name }}'s Menu</h3>
      <p>{{ myBool ? 'isTrue' : 'isFalse' }}</p>
      <p>My num = {{ getNum() }}</p>
      <p [innerText]="name + ' Bobandy'"></p>
      <button (click)="onClick(-1)">-</button>
      <button (click)="counter = counter + 1">+</button>
      <button (click)="onClick()">Reset</button>
      <p>Counter = {{ counter }}</p>

      <input (input)="onUpdate($event)" />
      <p>Current input = {{ inputValue }}</p>
      <input [(ngModel)]="inputValue" />
      <p *ngIf="myBool; else myBoolIsFalse">
        If myBool is true, this should show
      </p>
      <ng-template #myBoolIsFalse>
        <p>If myBool is false, this should show</p>
      </ng-template>

      <p
        [ngStyle]="{ backgroundColor: getColor() }"
        [ngClass]="{ myBoolIsTrue: myBool, myBoolIsFalse: !myBool }"
      >
        Should change from red to green!
      </p>

      <div *ngFor="let item of items">
        <p>{{ item }}</p>
      </div>

      <app-item *ngFor="let item of items"></app-item>
      <div *ngFor="let item of items; let i = index">
        <p
          [ngStyle]="{
            color: 'white',
            backgroundColor: i > 1 ? 'red' : 'blue'
          }"
        >
          i = {{ i }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .app-sidebar {
        background: #313144;
        height: calc(100vh - 5rem);
        padding: 2rem 1rem;
        width: 40rem;
        display: inline-block;
      }
      h3,
      p {
        color: white;
        margin: 0;
        text-align: center;
      }
      .myBoolIsTrue {
        border: solid white 0.2rem;
      }
      .myBoolIsFalse {
        border: solid black 0.2rem;
      }
    `,
  ],
})
export class SidebarComponent {
  myBool = false;
  name: string = 'Randy';
  counter: number = 0;
  inputValue: string = '';
  items = ['Item 1', 'Item 2', 'Item 3'];

  constructor() {
    setTimeout(() => (this.myBool = true), 5000);
  }
  getNum() {
    return 10;
  }

  onClick(num = 0) {
    if (num) {
      this.counter += num;
    } else {
      this.counter = 0;
    }
  }

  onUpdate(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  getColor() {
    return this.myBool ? 'green' : 'red';
  }
}
