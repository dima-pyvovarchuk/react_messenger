import { Answer } from '../types/Answer';

const API_URL = 'https://api.chucknorris.io/jokes/random';

export const getAnswer = (): Promise<Answer> => {
  return fetch(API_URL)
    .then(response => response.json());
}
