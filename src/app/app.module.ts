import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import HeaderComponent from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/content/components/map/map.component';
import ChartComponent from './components/content/components/chart/chart.component';
import ContentSelectionButtonComponent from './components/content/components/content-selection-button/content-selection-button.component';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ContentComponent,
    ContentSelectionButtonComponent,
    HeaderComponent,
    MapComponent,
    SidebarComponent,
    ItemComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
