export type Note = {
  id: string,
  title?: string,
  body: string,
  date: Date,
};

export type Notes = Array<Note>;