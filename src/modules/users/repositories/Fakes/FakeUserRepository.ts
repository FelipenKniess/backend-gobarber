import { uuid } from 'uuidv4';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/user';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
    private users: User[] = [];

    public async create({ name, email, password }: ICreateUserDTO):Promise<User> {
      const user = new User();
      Object.assign(user, {
        id: uuid(), name, email, password,
      });

      this.users.push(user);

      return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
      const findUser = this.users.find((user) => user.email === email);

      return findUser;
    }

    public async findById(id: string): Promise<User | undefined> {
      const findUser = this.users.find((user) => user.id === id);

      return findUser;
    }

    public async save(user: User):Promise<User> {
      const findIndex = this.users.findIndex((findUser) => findUser.id === user.id);
      this.users[findIndex] = user;
      return user;
    }
}

export default UserRepository;
