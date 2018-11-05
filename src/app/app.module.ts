import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef  } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
   declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
