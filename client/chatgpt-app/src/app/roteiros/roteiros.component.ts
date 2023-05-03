import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roteiro } from '../shared/roteiro';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-roteiros',
  templateUrl: './roteiros.component.html',
  styleUrls: ['./roteiros.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class RoteirosComponent implements OnInit {
  url = 'http://localhost:8000';
  id = this.route.snapshot.queryParams['id'];
  roteiro: Roteiro[] | null = [];

  ngOnInit(): void {
    this.getRoteiro(this.id);
  }
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  getRoteiro(id: string) {
    this.http.get(`${this.url}/${id}/roteiros`).subscribe({
      next: (resultado) => {
        this.roteiro = <Roteiro[]>resultado;
      },
      error: (erro) => {
        if (erro.status == 400 || erro.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Roteiros:',
            detail: 'Não existem roteiros ainda',
          });
        }
      },
    });
  }

  confirm(id: string){

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja apagar esse roteiro?',
      header: 'Apagar Roteiro',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteRoteiro(id)
          this.messageService.add({ severity: 'info', summary: 'Roteiro:', detail: 'Deletado com sucesso' });
      },
      reject: (type: any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: '' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: '' });
                  break;
          }
      }
  });
  }

  deleteRoteiro(id: string) {

    this.http.delete(`${this.url}/deletar-roteiro/${id}`).subscribe({
      next: () => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (erro) => {
        if (erro.status == 400 || erro.status == 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Deletar roteiro:',
            detail: 'Roteiro não foi deletado!',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Deletar roteiro:',
            detail: 'Roteiro deletado com sucesso!',
          });
          
        }
      },
    });
  }

  saveEdits() {
    
    }
}

