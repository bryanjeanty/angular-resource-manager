import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AlertComponent, ImportComponent, RecordComponent, SelectComponent, TransferComponent } from './_components';
import { FormulaComponent } from './formula';
import { ProjectComponent } from './project';
import { ResourceComponent } from './resource';
import { SigninComponent } from './signin';
import { SignupComponent } from './signup';
import { TemplateComponent } from './template';
import { ErrorComponent } from './error';

@NgModule({
    imports: [
        BrowserModule,
        appRoutingModule
      ],
  declarations: [
    AppComponent,
    AlertComponent,
    ImportComponent,
    SelectComponent,
    TransferComponent,
    RecordComponent,
    FormulaComponent,
    ProjectComponent,
    ResourceComponent,
    SigninComponent,
    SignupComponent,
    TemplateComponent,
    ErrorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
