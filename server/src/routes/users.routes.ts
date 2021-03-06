import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface User {
    name: String,
    email: String,
    password?: string
}

usersRouter.post('/', async (request, response) => {

    const {name, email, password} = request.body;
    const createUser = new CreateUserService();

    const newUser: User = await createUser.execute({
        name,
        email,
        password
    });

    delete newUser.password;

    response.json(newUser);
});


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {

    const UpdateAvatar = new UpdateUserAvatarService();

    const user: User = await UpdateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    delete user.password;

    return response.json(user);
});

export default usersRouter;
