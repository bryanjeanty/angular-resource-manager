import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlertComponent, ImportComponent, RecordComponent, SelectComponent, TransferComponent } from './_components';
import { FormulaComponent } from './formula';
import { ProjectComponent } from './project';
import { ResourceComponent } from './resource';
import { SigninComponent } from './signin';
import { SignupComponent } from './signup';
import { TemplateComponent } from './template';
import { ErrorComponent } from './error';

import { AccountService, AuthenticationService } from './_services';
import { Record } from './_models';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
    imports: [
        BrowserModule,
        appRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
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
  providers: [
      AccountService,
      AuthenticationService,
      Record,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule {}
