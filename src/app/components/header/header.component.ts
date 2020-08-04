import { Component } from '@angular/core';

@Component({ selector: 'app-header', template, styles })
class HeaderComponent {}

var template = `
    <div class="app-header">
    </div>
`;

var styles = [
  `
  .app-header {
    width: 100vw;
    height: 5rem;
    background: #202128;
  }
`,
];

export default HeaderComponent;
