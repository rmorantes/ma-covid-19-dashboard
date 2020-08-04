import {
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-selection-form',
  template: ` <div class="selection-form">Test</div> `,
  styles: [
    `
      .selection-form {
        background: blue;
      }
    `,
  ],
})
class SelectionFormComponent {}

export default SelectionFormComponent;
