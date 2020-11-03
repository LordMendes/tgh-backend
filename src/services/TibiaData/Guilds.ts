import tibiaDataApi from './api/tibiaApi';

async function getGuildInfo(name: string) {
  const response = await tibiaDataApi.get(`/guild/${name}.json`);
  return response.data.guild.data;
}

export { getGuildInfo };
