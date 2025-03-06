import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.post('/', usersController.create);
UsersRouter.get('/', usersController.findAll);
UsersRouter.get('/:id', usersController.findById);
UsersRouter.patch('/:id', usersController.update);

export default UsersRouter;