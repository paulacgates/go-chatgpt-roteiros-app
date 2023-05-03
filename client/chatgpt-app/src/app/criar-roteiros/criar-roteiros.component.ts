import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../loader.service';
import { HttpClient } from '@angular/common/http';

export interface Roteiro {
  lugar: string;
  dias: string;
}

@Component({
  selector: 'app-criar-roteiros',
  templateUrl: './criar-roteiros.component.html',
  styleUrls: ['./criar-roteiros.component.css'],
  providers: [MessageService],
})
export class CriarRoteirosComponent {
  roteiro: Roteiro = {
    lugar: '',
    dias: '',
  };

  constructor(
    private http: HttpClient,
    public loader: LoaderService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  url = 'http://localhost:8000';
  id = this.route.snapshot.queryParams['id'];

  criarRoteiro() {
    this.http.post(`${this.url}/${this.id}/criar-roteiro`, this.roteiro).subscribe({
      next: (resultado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso:',
          detail: 'Roteiro criado com sucesso',
        });
      },
      error: (erro) => {
        if (erro.status == 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro:',
            detail: 'Erro ao criar roteiro',
          });
        }
      },
    });
  }

  cancel() {
    this.router.navigate(['roteiros'], {queryParams: {id: this.id}});
  }
}
