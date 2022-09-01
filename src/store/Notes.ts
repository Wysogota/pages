import { autorun, makeAutoObservable, toJS } from 'mobx';
import { isEmpty } from 'lodash';
import { Notes, Note } from '../types';

class NotesStore {
  public notes: Notes = [];

  constructor() {
    this.loadFromStorage();
    makeAutoObservable(this);
    this.autoSaveToStorage();
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

  private loadFromStorage() {
    const loadedData: string | null = localStorage.getItem('notes');
    if (loadedData) {
      let notes: Notes = JSON.parse(loadedData).notes;
      if (!isEmpty(notes)) {
        this.notes = notes.map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: note.updatedAt ? new Date(note.updatedAt) : undefined,
        }));
      }
    }
  }

  private autoSaveToStorage = () => {
    let firstRun = true;
    autorun(() => {
      const json = JSON.stringify(toJS(this));
      if (!firstRun) localStorage.setItem('notes', json);
      firstRun = false;
    });
  };

}

export default new NotesStore();