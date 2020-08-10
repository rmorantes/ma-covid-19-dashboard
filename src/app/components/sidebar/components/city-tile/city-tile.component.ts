import { Component, Input } from '@angular/core';

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
      <span>
        {{ householdIncome }}
      </span>
    </div>
  `,
  styles: [
    `
      .app-city-tile {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        border-bottom: solid grey 1px;
        margin-top: 1rem;
      }
    `,
  ],
})
class CityTileComponent {
  @Input() cases;
  @Input() name;
  @Input() population;
  @Input() householdIncome;
}

export default CityTileComponent;
