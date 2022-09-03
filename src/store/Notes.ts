import { makeAutoObservable } from 'mobx';
import { Notes, Note, INotesStore } from '../types';
import { getTestData } from '../api';
import { makePersistable } from '../utils/PersistStore';

class NotesStore implements INotesStore {
  public notes: Notes = [];
  public isFetching: boolean = false;
  public error: any = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: 'notes' });

    this.formatNotes();
  }

  public insert = (note: Note) => {
    this.notes.push(note);
  };

  public remove = (id: string) => {
    this.notes = this.notes.filter(
      ({ id: noteId }) => noteId !== id
    );
  };

  public edit = (note: Note) => {
    this.notes = this.notes.map((existedNote) =>
      existedNote.id === note.id ? note : existedNote
    );
  };

  public clear = () => {
    this.notes = [];
  };

  public fetch = () => {
    this.isFetching = true;
    getTestData().then(this.fetchNotesSuccess, this.fetchNotesError);
  };

  private fetchNotesSuccess = (notes: Notes) => {
    this.isFetching = false;
    this.formatNotes(notes);
  };

  private fetchNotesError = (error: any) => {
    this.error = error;
  };

  private formatNotes = (notes: Notes = this.notes) => {
    this.notes = notes.map((note: Note) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  };
}

export default new NotesStore();