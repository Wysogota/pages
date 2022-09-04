import { observable } from 'mobx';

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

export abstract class AbstractFetchStore<T> {
  @observable isFetching: boolean = false;
  @observable error: any = null;

  public abstract fetch(): void;
  protected abstract fetchSuccess(data: T): void;
  protected abstract fetchError(error: any): void;
}

export type PersistStoreOptions = {
  name: string,
  properties?: Array<string>,
};
