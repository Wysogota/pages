import axios from 'axios';
import { Notes } from '../types';

const client = axios.create({
  baseURL: 'https://retoolapi.dev/z3dqAk/address-book',
});

export const getTestData = (): Promise<Notes> => client.get('/').then(({ data }) => data);