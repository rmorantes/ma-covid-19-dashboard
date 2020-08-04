import { Component } from '@angular/core';

@Component({ selector: 'app-header', template, styles })
class HeaderComponent {}

var template = `
    <div class="app-header">
    <h1 class="heading"> The Impact of COVID-19 on Massachusetts Cities </h1>
    </div>
`;

var styles = [
  `
  .app-header {
    width: 100vw;
    height: 5rem;
    background: #202128;
  }
  .heading {
    text-align: center;
    margin: 0;
    height: 100%;
    line-height: 5rem;
  }
`,
];

export default HeaderComponent;
