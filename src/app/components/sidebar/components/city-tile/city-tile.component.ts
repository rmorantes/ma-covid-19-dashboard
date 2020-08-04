import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

// <!-- (mouseenter)="mouseenterr.emit(name)"
// (mouseout)="mouseout.emit(name)" -->
@Component({
  selector: 'app-city-tile',
  template: `
    <div class="app-city-tile">
      <span>
        {{ name }}
      </span>
      <span>
        {{ cases }}
      </span>
      <span>
        {{ population }}
      </span>
      <!-- Boston 73,234 $45,239 -->
    </div>
  `,
  styles: [
    `
      .app-city-tile {
        width: 100%;
        height: 4rem;
        background: grey;
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
class CityTileComponent {
  @Input() cases;
  @Input() name;
  @Input() population;
  // @Output() mouseenterr = new EventEmitter();
  // @Output() mouseout = new EventEmitter();

  // onMouseEnterOrLeave({ type }) {
  //   // const type = e.type;
  //   console.log('type = ', type);
  //   // console.log('name = ', this.name);
  //   // this.clicked.emit(this.name);
  //   this.emitter.emit({ name, type });
  // }
}
// <!-- <div (mouseover)="onChangeStyle.emit($event)"
// (mouseout)="onChangeStyle.emit($event)”>Test</div> -->

export default CityTileComponent;
