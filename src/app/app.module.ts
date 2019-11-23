import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportsFeedService } from './services/sports-feed.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatchupSummaryComponent } from './components/matchup-summary/matchup-summary.component';
import { FilterTeamLogsPipe } from './pipes/filter-team-logs.pipe';
import { OddsApiService } from './services/odds-api.service';
import { FindMatchupSitesPipe } from './pipes/find-matchup-sites.pipe';
import { BookLinesComponent } from './components/book-lines/book-lines.component';
import { SpreadValuePipe } from './pipes/spread-value.pipe';
import { OverUnderValuePipe } from './pipes/over-under-value.pipe';
import { AuthStateService } from './services/auth-state.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchupSummaryComponent,
    FilterTeamLogsPipe,
    FindMatchupSitesPipe,
    BookLinesComponent,
    SpreadValuePipe,
    OverUnderValuePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthStateService, OddsApiService, SportsFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
