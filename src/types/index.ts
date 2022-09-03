export type Note = {
  id: string,
  title?: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
};

export type Notes = Array<Note>;

export type NoteFormValues = {
  title: string;
  body: string;
};

export interface INotesStore {
  notes: Notes,
  isFetching: boolean,
  error: any,
}

export type PersistStoreOptions = {
  name: string,
  properties?: Array<string>,
};