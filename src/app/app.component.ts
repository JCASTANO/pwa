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
  title = 'pwa';
  panelOpenState = false;
  categorias: any = ['trabajo', 'personal'];
  nota: any = {};
  notas: any = null;

  constructor(private swUpdate: SwUpdate,
  private notesService: NotesService,
  private snackBar: MatSnackBar) {

    this.notesService.getNotes().valueChanges().subscribe(fbNotas => {
      this.notas = fbNotas.reverse();
    });

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

}
