import { getRepository } from 'typeorm';

import Guild from '../models/Guild';
import CreateMemberService from './CreateMemberService';
import { getGuildInfo } from './TibiaData/Guilds';

interface Request {
  name: string;
  ownerId: string;
  whatsapp: string;
  discord: string;
  teamspeak: string;
}

class CreateGuildService {
  async execute({
    name,
    ownerId,
    whatsapp,
    discord,
    teamspeak,
  }: Request): Promise<Guild> {
    const data = await getGuildInfo(name);
    if (data.error) {
      throw Error(data.error);
    }

    const guildRepository = getRepository(Guild);

    const alreadyRegistered = await guildRepository.findOne({
      where: { name },
    });

    if (alreadyRegistered) {
      throw Error('Guild already registered');
    }
    const createMember = new CreateMemberService();

    const guild = guildRepository.create({
      name,
      ownerId,
      whatsapp,
      discord,
      teamspeak,
      world: data.world,
    });

    await guildRepository.save(guild);

    await createMember.execute({
      userId: ownerId,
      job: 'owner',
      privilege: 'owner',
      guildId: guild.id,
      accepted: true,
    });

    return guild;
  }
}

export default CreateGuildService;
