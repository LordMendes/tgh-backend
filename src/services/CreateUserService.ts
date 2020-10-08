import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  username: string;
  password: string;
  name: string;
  email: string;
}

class CreateUserService {
  public async execute({
    username,
    password,
    name,
    email,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExistence = await userRepository.findOne({
      where: [{ username }],
    });

    const checkEmailExistence = await userRepository.findOne({
      where: [{ email }],
    });

    if (checkEmailExistence || checkUserExistence) {
      throw new Error('User/Email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      username,
      password: hashedPassword,
      name,
      email,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
