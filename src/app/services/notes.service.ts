import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private afDB: AngularFireDatabase) { }

  public getNotes() {
    return this.afDB.list('/notes/');
  }

  public getNote(id) {
    return this.afDB.object('/notes/' + id);
  }

  public saveNote(note) {
    return this.afDB.database.ref('/notes/' + note.id).set(note);
  }

  public deleteNote(note) {
    // reto
    return this.afDB.database.ref('/notes/' + note.id).remove();
  }
}
