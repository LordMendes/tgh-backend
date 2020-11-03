import { Router } from 'express';

import CreateGuildService from '../services/CreateGuildService';

const guildRouter = Router();

guildRouter.post('/', async (request, response) => {
  try {
    const { name, ownerId, whatsapp, discord, teamspeak } = request.body;

    const createGuild = new CreateGuildService();

    const guild = await createGuild.execute({
      name,
      ownerId,
      whatsapp,
      discord,
      teamspeak,
    });

    return response.status(201).json(guild);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default guildRouter;
