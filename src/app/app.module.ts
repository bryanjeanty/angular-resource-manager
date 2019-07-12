import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert/alert.component';
import { ImportComponent } from './_components/import/import.component';
import { SelectComponent } from './_components/select/select.component';
import { TransferComponent } from './_components/transfer/transfer.component';
import { RecordComponent } from './_components/record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ImportComponent,
    SelectComponent,
    TransferComponent,
    RecordComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
