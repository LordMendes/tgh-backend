import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateCharService from '../services/CreateCharService';

import Character from '../models/Character';

const charRouter = Router();

// Create Character / Fetch Char
charRouter.post('/', async (request, response) => {
  try {
    const { name: charName, id: userId } = request.body;

    const createChar = new CreateCharService();

    const char = await createChar.execute({ charName, userId });

    return response.status(201).json(char);
  } catch (err) {
    return response.status(404).json({ error: err.message });
  }
});
// List characters
charRouter.get('/', async (request, response) => {
  const charRepository = getRepository(Character);

  const charList = await charRepository.find();

  return response.status(201).json(charList);
});
// Get one character
charRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const charRepository = getRepository(Character);

    const char = await charRepository.findOne({ where: { id } });
    if (char) {
      return response.status(201).json(char);
    }
    return response.status(404).json({ Error: 'Character not associated' });
  } catch (err) {
    return response.json({ error: err.message });
  }
});
// List Player's characters
charRouter.get('/owned/:id', async (request, response) => {
  const { id } = request.params;

  const charRepository = getRepository(Character);

  const ownedCharacters = await charRepository.findAndCount({
    where: { userId: id },
  });

  const outputOwnedCharacters = {
    characters: [...ownedCharacters[0]],
    count: ownedCharacters[1],
  };

  return response.status(201).json(outputOwnedCharacters);
});

export default charRouter;
