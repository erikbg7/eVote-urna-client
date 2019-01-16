import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NewTableComponent } from './new-table/new-table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { TableComponent } from './table/table.component';
import { UserComponent } from './user/user.component';
import { UserTableComponent } from './user-table/user-table.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NewTableComponent,
    TableComponent,
    UserComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  entryComponents: [
    AdminComponent
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
