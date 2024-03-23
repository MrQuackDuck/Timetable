import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FormatTextPipe } from './pipes/format-text.pipe';
import { FooterComponent } from './footer/footer.component';
import { MonthNamePipe } from './pipes/month-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    FormatTextPipe,
    FooterComponent,
    MonthNamePipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
