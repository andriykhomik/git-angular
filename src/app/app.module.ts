import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UsersBlockComponent } from './components/users-block/users-block.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SearchService } from './services/search.service';
import { DetailsComponent } from './components/details/details.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadersInterceptor } from './interceptor/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersBlockComponent,
    UsersTableComponent,
    DetailsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    SearchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
