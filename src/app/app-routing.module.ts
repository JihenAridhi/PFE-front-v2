import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamsComponent} from "./components/Browse/teams/teams.component";
import {FooterComponent} from "./components/Browse/footer/footer.component";
import {HomeComponent} from "./components/Browse/home/home.component";
import {NavComponent} from "./components/Browse/nav/nav.component";
import {ListNewsComponent} from "./components/News/list-news/list-news.component";
import {ViewNewsComponent} from "./components/News/view-news/view-news.component";
import {ListEventComponent} from "./components/Events/list-event/list-event.component";
import {ViewEventComponent} from "./components/Events/view-event/view-event.component";
import {ListArticleComponent} from "./components/Articles/list-article/list-article.component";
import {ContactComponent} from "./components/Browse/contact/contact.component";
import {ProfileComponent} from "./components/Profile/profile/profile.component";
import {LoginComponent} from "./components/Browse/login/login.component";
import {SignupComponent} from "./components/Browse/signup/signup.component";
import {NavProfileComponent} from "./components/Profile/nav-profile/nav-profile.component";
import {UpdateProfileComponent} from "./components/Profile/update-profile/update-profile.component";
import {RequestsComponent} from "./components/admin/requests/requests.component";
import {MembersComponent} from "./components/admin/members/members.component";
import {SaveArticleComponent} from "./components/Articles/save-article/save-article.component";
import {EditEventComponent} from "./components/Events/edit-event/edit-event.component";
import {EditNewsComponent} from "./components/News/edit-news/edit-news.component";
import {FeedbackComponent} from "./components/admin/feedback/feedback.component";
import {SaveNewsComponent} from "./components/News/save-news/save-news.component";
import {SaveEventComponent} from "./components/Events/save-event/save-event.component";
import {TeacherResearcherComponent} from "./components/Browse/members/teacher-researcher/teacher-researcher.component";
import {DoctorsComponent} from "./components/Browse/members/doctors/doctors.component";
import {PhdStudentsComponent} from "./components/Browse/members/phd-students/phd-students.component";
import {AllComponent} from "./components/Browse/members/all/all.component";
import {EditPartnersComponent} from "./components/Partners/edit-partners/edit-partners.component";
import {SavePartnerComponent} from "./components/Partners/save-partner/save-partner.component";
import {ViewPartnersComponent} from "./components/Partners/view-partners/view-partners.component";
import {ListProjectComponent} from "./components/Projects/list-project/list-project.component";
import {ViewProjectComponent} from "./components/Projects/view-project/view-project.component";
import {SaveProjectComponent} from "./components/Projects/save-project/save-project.component";
import {ResearchAxisComponent} from "./components/Browse/research-axis/research-axis.component";
import {EditProjectComponent} from "./components/Projects/edit-project/edit-project.component";
import {ReportingComponent} from "./components/admin/reporting/reporting.component";
import {EditWebsiteComponent} from "./components/admin/edit-website/edit-website.component";
import {AboutComponent} from "./components/Browse/about/about.component";






const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '', component: FooterComponent, children:
  [
    {path: 'home', component: HomeComponent},
    {path: '', component: NavComponent, children:
    [
      {path: 'list-news', component: ListNewsComponent},
      {path: 'view-news/:id', component: ViewNewsComponent},
      {path: 'list-event', component: ListEventComponent},
      {path: 'view-event/:id', component: ViewEventComponent},
      {path: 'teams', component: TeamsComponent},
      {path: 'list-article', component: ListArticleComponent},
      {path: 'teacher-researcher', component: TeacherResearcherComponent},
      {path: 'doctors', component: DoctorsComponent},
      {path: 'phd-students', component: PhdStudentsComponent},
      {path: 'members', component: AllComponent},
      {path: 'partners', component: ViewPartnersComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'list-project', component: ListProjectComponent},
      {path: 'view-project', component: ViewProjectComponent},
      {path: 'research-axis', component: ResearchAxisComponent},
      {path: 'about', component: AboutComponent}
    ]}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  {path: 'account', component: NavProfileComponent, children:
  [
    {path: 'profile', component: ProfileComponent},
    {path: 'update', component: UpdateProfileComponent},
    {path: 'requests', component: RequestsComponent},
    {path: 'members', component: MembersComponent},
    {path: 'save-article', component: SaveArticleComponent},
    {path: 'save-article/:id', component: SaveArticleComponent},
    {path: 'edit-event', component: EditEventComponent},
    {path: 'edit-news', component: EditNewsComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'save-news', component: SaveNewsComponent},
    {path: 'save-news/:id', component: SaveNewsComponent},
    {path: 'save-event', component: SaveEventComponent},
    {path: 'save-event/:id', component: SaveEventComponent},
    {path: 'edit-partners', component: EditPartnersComponent},
    {path: 'save-partner', component: SavePartnerComponent},
    {path: 'save-partner/:id', component: SavePartnerComponent},
    {path: 'save-project', component: SaveProjectComponent},
    {path: 'edit-projects', component: EditProjectComponent},
    {path: 'edit-website', component: EditWebsiteComponent},
    {path: 'reporting', component: ReportingComponent}
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
