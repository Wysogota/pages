import axios from 'axios';
import { Notes } from '../types';

const client = axios.create({
  baseURL: 'https://retoolapi.dev/17vZWT/address-book',
});

export const getTestData = (): Promise<Notes> => client.get('/').then(({ data }) => data);