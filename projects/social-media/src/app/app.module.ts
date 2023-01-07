import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeedModule } from './feed/feed.module';
import { HttpClientModule } from '@angular/common/http';
import { UserLoggedInGuard } from './guards/user-logged-in.guard';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeedModule,
    HttpClientModule,
    CookieModule.withOptions(),
  ],
  providers: [UserLoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
