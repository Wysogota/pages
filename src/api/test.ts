import axios from 'axios';
import { Notes, Note } from '../types';

const client = axios.create({
  baseURL: 'https://retoolapi.dev/17vZWT/address-book',
});

export const getTestData = (): Promise<Notes> => client.get('/')
  .then(({ data }) => data.map((note: Note) => {
    const { updatedAt, createdAt } = note;

    return {
      ...note,
      updatedAt: (new Date(updatedAt) > new Date(createdAt)) ? updatedAt : createdAt,
    };
  }))
  .catch(error => error);