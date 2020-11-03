import { Router } from 'express';

import memberRouter from './member.routes';
import userRouter from './user.routes';
import charRouter from './character.routes';
import guildRouter from './guild.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/character', charRouter);
routes.use('/member', memberRouter);
routes.use('/guild', guildRouter);

export default routes;
