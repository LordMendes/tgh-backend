import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateMemberService from '../services/CreateMemberService';

import Member from '../models/Member';

const memberRouter = Router();

// Create Membership
memberRouter.post('/', async (request, response) => {
  try {
    const { job, privilege, guildId, memberId } = request.body;

    const createMember = new CreateMemberService();

    const member = await createMember.execute({
      job,
      memberId,
      privilege,
      guildId,
      accepted: false,
    });

    return response.status(201).json(member);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default memberRouter;
