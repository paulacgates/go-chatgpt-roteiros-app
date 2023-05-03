import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { __values } from 'tslib';
import { User } from '../shared/user';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css'],
  providers: [MessageService],
})
export class SignupUserComponent {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {}

  user: User = {
    password: '',
    username: '',
    nome: '',
    email: '',
  };

  url = 'http://localhost:8000';
  signUpUser() {
    this.http.post(`${this.url}/account/signup`, this.user).subscribe({
      next: (resultado) => {
        
      },
      error: (erro) => {
        console.log(erro);
        if (erro.status == 400 || erro.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Criar Usuário:',
            detail: 'Usuario já existe',
          });
        }

        if (erro.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Criar Usuário:',
            detail: 'Successo',
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      },
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
