import { MessagingService } from './services/messaging.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '../../node_modules/@angular/service-worker';
import { NotesService } from './services/notes.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PlatziNotas';
  panelOpenState = false;
  categorias: any = ['trabajo', 'personal'];
  nota: any = {};
  notas: any = null;
  message: any = {};
  currentToken: any = {};

  constructor(private swUpdate: SwUpdate,
  private notesService: NotesService,
  private snackBar: MatSnackBar,
  private authService: AuthService,
  private messagingService: MessagingService) {

    this.notesService.getNotes().valueChanges().subscribe(fbNotas => {
      this.notas = fbNotas.reverse();
    });

    this.messagingService.getPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    setTimeout(() => {
      this.currentToken = this.messagingService.getCurrentToken();
    }, 5000);
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      console.log('service worker habilitado');
      this.swUpdate.available.subscribe(evt => {
        window.location.reload();
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  guardarNota() {
    if (!this.nota.id) {
      this.nota.id = Date.now();
    }

    this.notesService.saveNote(this.nota).then(result => {
      this.nota = {};
      this.openSnackBar('Note saved', 'success');
    })
    .catch(err => {
      console.log(err);
      this.openSnackBar('Opps, Something has happened', 'error');
    });
  }

  seleccionarNota(nota) {
    this.nota = nota;
  }

  login() {
    this.authService.loginWithFacebook();
  }
}

