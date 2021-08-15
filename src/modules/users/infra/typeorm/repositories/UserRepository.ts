import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/user';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
    private ormConfig: Repository<User>

    constructor() {
      this.ormConfig = getRepository(User);
    }

    public async create({ name, email, password }: ICreateUserDTO):Promise<User> {
      const user = this.ormConfig.create({ name, email, password });

      await this.ormConfig.save(user);

      return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormConfig.findOne({
        where: { email },
      });

      return user;
    }

    public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormConfig.findOne(id);

      return user;
    }

    public async save(user: User):Promise<User> {
      const response = await this.ormConfig.save(user);

      return response;
    }
}

export default UserRepository;
