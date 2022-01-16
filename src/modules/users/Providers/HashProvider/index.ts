import { container } from 'tsyringe';

import IHashProvider from './models/iHashProvider';

import BCryptHashProvider from './implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
