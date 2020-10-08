import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';

import User from '../models/User';

const userRouter = Router();

// Create User
userRouter.post('/', async (request, response) => {
  try {
    const { username, password, name, email } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ username, password, name, email });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// List Users
userRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  const noPasswordUsers = users.map(user => {
    delete user.password;
    return user;
  });

  return response.status(201).json(noPasswordUsers);
});

// Get User
userRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: {} });

  delete user.password;

  return response.status(201).json(user);
});

// Update User
userRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { username, password, name, email } = request.body;

    const updateUser = new UpdateUserService();

    const updatedUser = await updateUser.execute({
      id,
      username,
      password,
      name,
      email,
    });
    return response.status(201).json(updatedUser);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

// Delete User
userRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);

  const userExists = await usersRepository.findOne(id);

  if (!userExists) {
    throw Error("User doesn't exist");
  }

  usersRepository.remove(userExists);

  return response
    .status(201)
    .json({ message: `User ${userExists.id} removed` });
});
export default userRouter;
