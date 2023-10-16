import { Router } from 'express';
import {entertainingController, userController} from "./controllers";
function prefix(path: string, configure: Router): void {
    const router = Router({ mergeParams: true });
    this.use(path, router);
    // @ts-ignore
    configure(router);
}

Router['prefix'] = prefix;
const routes = Router({ mergeParams: true });

// @ts-ignore
routes.prefix('/user', (user) => {
    user.post('', userController.register);
    user.post('/login', userController.login);
});

// @ts-ignore
routes.prefix('/entertaining', (entertaining) => {
    entertaining.post('', entertainingController.create);
    entertaining.get('/:id', entertainingController.findById);
    entertaining.get('', entertainingController.getAll);
    entertaining.put('/id', entertainingController.updated);
    entertaining.delete('./id', entertainingController.delete)
});



export default routes;