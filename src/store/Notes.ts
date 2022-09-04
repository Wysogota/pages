import { makeObservable, action, observable } from 'mobx';
import { Notes, Note, INotesStore, AbstractFetchStore } from '../types';
import { getTestData } from '../api';
import { makePersistable } from '../utils/PersistStore';

class NotesStore extends AbstractFetchStore<Notes> implements INotesStore {
  @observable public notes: Notes = [];

  constructor() {
    super();
    makeObservable(this);
    makePersistable(this, { name: 'notes', properties: ['notes'] });

    this.formatNotes();
  }

  @action public insert = (note: Note) => {
    this.notes.push(note);
  };

  @action public remove = (id: string) => {
    this.notes = this.notes.filter(
      ({ id: noteId }) => noteId !== id
    );
  };

  @action public edit = (note: Note) => {
    this.notes = this.notes.map((existedNote) =>
      existedNote.id === note.id ? note : existedNote
    );
  };

  @action public clear = () => {
    this.notes = [];
  };

  @action public fetch = () => {
    this.isFetching = true;
    getTestData().then(this.fetchSuccess, this.fetchError);
  };

  @action protected fetchSuccess = (notes: Notes) => {
    this.isFetching = false;
    this.formatNotes(notes);
  };

  @action protected fetchError = (error: any) => {
    this.isFetching = false;
    this.error = error;
  };

  @action private formatNotes = (notes: Notes = this.notes) => {
    this.notes = notes.map((note: Note) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  };
}

export default new NotesStore();