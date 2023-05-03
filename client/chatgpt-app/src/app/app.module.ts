import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { CardModule } from 'primeng/card';
import { LoginUserComponent } from './login-user/login-user.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { RoteirosComponent } from './roteiros/roteiros.component';
import { PanelModule } from 'primeng/panel';
import { CriarRoteirosComponent } from './criar-roteiros/criar-roteiros.component';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalModule } from 'primeng/terminal';
import { LoadingInterceptor } from './loading.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HomeComponent } from './login-user/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupUserComponent,
    LoginUserComponent,
    RoteirosComponent,
    CriarRoteirosComponent,
    TerminalComponent,
    SpinnerComponent,
    DragDropComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    PasswordModule,
    AccordionModule,
    BrowserAnimationsModule,
    DividerModule,
    FormsModule,
    CardModule,
    ProgressSpinnerModule,
    MessagesModule,
    ToastModule,
    PanelModule,
    TerminalModule,
    DragDropModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
      
    }, 
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
