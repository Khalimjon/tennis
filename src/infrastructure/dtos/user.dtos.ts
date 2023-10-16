import * as Joi from 'joi';
import { UserRoleEnum } from '../enum';

export interface IUserCreate {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: string;
}

export interface IUserLogin {
  phone: string;
  password: string;
}

export const userCreateDTO = Joi.object<IUserCreate>({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phone: Joi.string().trim().required().regex(new RegExp('^[0-9]{12}$')),
  password: Joi.string().min(6).trim().required(),
  role: Joi.string()
    .valid(...Object.values(UserRoleEnum))
    .required(),
});

export const userLoginDTO = Joi.object<IUserLogin>({
  phone: Joi.string().trim().required().regex(new RegExp('^[0-9]{12}$')),
  password: Joi.string().min(6).trim().required(),
});
