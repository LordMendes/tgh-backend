import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Character from '../models/Character';
import User from '../models/User';
import { getCharacter } from './TibiaData/Character';

interface Request {
  charName: string;
  userId: string;
}

interface CharacterDTO {
  name: string;
  vocation: string;
  level: number;
  world: string;
  guild: string;
}

class CreateCharService {
  public async execute({ charName, userId }: Request): Promise<CharacterDTO> {
    const charRepository = getRepository(Character);
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({
      where: { id: userId },
    });
    if (userExists) {
      const charAlreadyRegistered = await charRepository
        .createQueryBuilder('characters')
        .where('characters.name = :charName', { charName })
        .andWhere('characters.user_id = :userId', { userId })
        .getOne();

      if (charAlreadyRegistered) {
        throw new Error('This association already exists');
      } else {
        const { characters } = await getCharacter(charName);

        const { name, vocation, level, world, guild } = characters.data;

        const char = charRepository.create({
          userId,
          name,
          vocation,
          level,
          world,
        });

        await charRepository.save(char);

        const charOutput = {
          ...char,
          owner: userId,
          guild,
        };

        return charOutput;
      }
    }
    throw new Error('Invalid user');
  }
}
export default CreateCharService;
