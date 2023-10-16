import { Request, Response } from 'express';
import { UserEntity } from '../domain';
import { PasswordService, TokenService } from '../services';
import { Auth, UserRoleEnum, userCreateDTO, IUserCreate, Validate, userLoginDTO } from '../infrastructure';

class UserController {
    @Validate(userCreateDTO, 'body')
    @Auth('admin')
    async register(req: Request, res: Response) {
        try {
            console.log('Request params: ', req.body);
            const params = req.body as IUserCreate;
            // @TODO check by phone number before create new user. If user is already exist throw User already exist error
            const hashedPassword = new PasswordService().setPassword(params.password).hash();
            const user: UserEntity = await new UserEntity()
                .setFirstName(params.firstName)
                .setPhone(params.phone)
                .setPassword(hashedPassword)
                .setRole(params.role as UserRoleEnum)
                .create();

            console.log('User entity: ', user);
            res.status(201).json(user.toSchema());
        } catch (error) {
            console.log('Create user entity error: ', error);
            console.error(error);
            res.json({
                success: false,
                error: error,
            });
        }
    }

    @Validate(userLoginDTO, 'body')
    async login(req: Request, res: Response) {
        try {
            const params = req.body;
            const user = await new UserEntity().setPhone(params.phone).syncByPhone();

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            const isValidPassword = new PasswordService().setPassword(params.password).setHash(user.getPassword()).compare();
            if (!isValidPassword) {
                return res.status(400).json({
                    message: 'Invalid password',
                });
            }

            const accessToken = new TokenService()
                .setPayload({
                    userId: user.getId(),
                    firstName: user.getFirstName(),
                    phone: user.getPhone(),
                    role: user.getRole(),
                })
                .sign();

            return res.status(200).json({
                accessToken: accessToken,
                user: user.toSchema(),
            });
        } catch (error) {
            console.log(`${error}`);
        }
    }
}

export const userController = new UserController();
