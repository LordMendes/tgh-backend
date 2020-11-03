import { Router } from 'express';

import CreateMemberService from '../services/CreateMemberService';

const memberRouter = Router();

// Create Membership
memberRouter.post('/', async (request, response) => {
  try {
    const { job, privilege, guildId, userId } = request.body;

    const createMember = new CreateMemberService();

    const member = await createMember.execute({
      job,
      userId,
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
