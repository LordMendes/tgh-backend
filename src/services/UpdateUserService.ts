import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  id: string;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
}

class UpdateUserService {
  public async execute({
    id,
    username,
    password,
    name,
    email,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const actualUserInfo = await userRepository.findOne({ where: [{ id }] });

    const checkUserExistence = await userRepository.findOne({
      where: [{ username }],
    });

    const checkEmailExistence = await userRepository.findOne({
      where: [{ email }],
    });

    if (
      (checkEmailExistence &&
        actualUserInfo?.email !== checkEmailExistence.email) ||
      (checkUserExistence &&
        actualUserInfo?.username !== checkUserExistence.email)
    ) {
      throw new Error('User/Email already exists');
    }

    const user = userRepository.create({
      username,
      password,
      name,
      email,
    });

    await userRepository.update(id, user);

    delete user.password;

    return user;
  }
}

export default UpdateUserService;
