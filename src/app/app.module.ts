import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FooterComponent} from "./components/Browse/footer/footer.component";
import {NavComponent} from "./components/Browse/nav/nav.component";
import {HomeComponent} from "./components/Browse/home/home.component";
import {LoginComponent} from "./components/Browse/login/login.component";
import {SignupComponent} from "./components/Browse/signup/signup.component";
import {ListNewsComponent} from "./components/News/list-news/list-news.component";
import {ListEventComponent} from "./components/Events/list-event/list-event.component";
import {ViewNewsComponent} from "./components/News/view-news/view-news.component";
import {ViewEventComponent} from "./components/Events/view-event/view-event.component";
import {TeamsComponent} from "./components/teams/teams.component";
import {ListArticleComponent} from "./components/Articles/list-article/list-article.component";
import {ContactComponent} from "./components/Browse/contact/contact.component";
import {PartnersComponent} from "./components/Browse/partners/partners.component";
import {ProfileComponent} from "./components/Profile/profile/profile.component";
import {NavProfileComponent} from "./components/Profile/nav-profile/nav-profile.component";
import {UpdateProfileComponent} from "./components/Profile/update-profile/update-profile.component";
import {FeedbackComponent} from "./components/admin/feedback/feedback.component";
import {SaveArticleComponent} from "./components/Articles/save-article/save-article.component";
import {EditNewsComponent} from "./components/News/edit-news/edit-news.component";
import {EditEventComponent} from "./components/Events/edit-event/edit-event.component";
import {MembersComponent} from "./components/admin/members/members.component";
import {SaveNewsComponent} from "./components/News/save-news/save-news.component";
import {SaveEventComponent} from "./components/Events/save-event/save-event.component";
import {RequestsComponent} from "./components/admin/requests/requests.component";
import {TeacherResearcherComponent} from "./components/Members/teacher-researcher/teacher-researcher.component";
import {DoctorsComponent} from "./components/Members/doctors/doctors.component";
import {PhdStudentsComponent} from "./components/Members/phd-students/phd-students.component";
import {AllComponent} from "./components/Members/all/all.component";



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ListNewsComponent,
    ListEventComponent,
    ViewNewsComponent,
    ViewEventComponent,
    TeamsComponent,
    ListArticleComponent,
    ContactComponent,
    TeacherResearcherComponent,
    DoctorsComponent,
    PhdStudentsComponent,
    AllComponent,
    PartnersComponent,
    ProfileComponent,
    NavProfileComponent,
    UpdateProfileComponent,
    FeedbackComponent,
    SaveArticleComponent,
    EditNewsComponent,
    EditEventComponent,
    MembersComponent,
    SaveNewsComponent,
    SaveEventComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
