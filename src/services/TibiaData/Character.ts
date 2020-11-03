import tibiaDataApi from './api/tibiaApi';

async function getCharacter(name: string) {
  const response = await tibiaDataApi.get(`/characters/${name}.json`);
  return response.data;
}

export { getCharacter };
