import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User, UserLogged } from 'src/app/shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class HomeComponent implements OnInit{
  url = 'http://localhost:8000';
  user: UserLogged = {
    id_usuario: '',
    password: '',
    username: '',
    nome: '',
    email: '',
  };

  ngOnInit(): void {
    this.getUser();
  }
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {}


  getUser(){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get(`${this.url}/user`, {headers: headers, withCredentials: true}).subscribe({
      next:(resultado) => {
        this.user = <UserLogged>resultado;
      },
      error: (erro) => {
        if (erro.status == 401 || erro.status == 500) {
          console.log(erro.message);
        }
      },
    });
}

}
