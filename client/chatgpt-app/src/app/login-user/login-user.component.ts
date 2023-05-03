import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User, UserLogged } from '../shared/user';

export interface Login {
  password: string;
  username: string;
}
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [MessageService],
})
export class LoginUserComponent {
  login: Login = {
    password: '',
    username: '',
  };

  user: UserLogged = {
    id_usuario: '',
    password: '',
    username: '',
    nome: '',
    email: '',
  };

  url = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
  ) {}

  getLogin() {
    this.http.post(`${this.url}/account/login`, this.login).subscribe({
      next: (resultado) => {
        this.user = <UserLogged>resultado;
        console.log(this.user);
        this.router.navigate(['roteiros'], {
          queryParams: { id: this.user.id_usuario },
        });
        //this.router.navigate(['home'])
      },
      error: (erro) => {
        if (erro.status == 400 || erro.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro:',
            detail: 'Login ou senha incorreta',
          });
        }
      },
    });
  }
}
