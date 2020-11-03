import { getRepository } from 'typeorm';
import Member from '../models/Member';

interface Request {
  job: string;
  privilege: string;
  guildId: string;
  userId: string;
  accepted: boolean;
}

class CreateMemberService {
  async execute({
    userId,
    job,
    privilege,
    guildId,
    accepted,
  }: Request): Promise<Member> {
    const memberRepository = getRepository(Member);

    const alreadyRequested = await memberRepository
      .createQueryBuilder('members')
      .where('members.guild_id = :guildId', { guildId })
      .andWhere('members.user_id = :userId', { userId })
      .getOne();

    if (alreadyRequested) {
      throw new Error('Membership/Application already exists');
    }

    const member = memberRepository.create({
      userId,
      job,
      privilege,
      guildId,
      accepted,
    });

    await memberRepository.save(member);

    return member;
  }
}

export default CreateMemberService;
