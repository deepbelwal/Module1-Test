import { TodoService } from './todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {ApolloModule,Apollo} from 'apollo-angular';
import {HttpLinkModule ,HttpLink} from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ListComponent } from './list/list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {URI} from '../app/constant/constant';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpLinkModule,
    HttpClientModule,
    ApolloModule,
    NgxPaginationModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: URI}),
      cache: new InMemoryCache()
    });
  }
}
