import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RoteirosComponent } from './roteiros/roteiros.component';
import { CriarRoteirosComponent } from './criar-roteiros/criar-roteiros.component';
import { TerminalComponent } from './terminal/terminal.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { HomeComponent } from './login-user/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'signup', component: SignupUserComponent },
  { path: 'terminal', component: TerminalComponent },
  { path: 'drag-drop', component: DragDropComponent },
  { path: 'roteiros', component: RoteirosComponent },
  { path: 'criar-roteiro', component: CriarRoteirosComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  //{ path: ':user/roteiros', component: RoteirosComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
