import { BaseSchema } from './general';
import { prop } from '@typegoose/typegoose';
import { EntertainingEnum } from '../../infrastructure/enum/Entertaining.enum';

export class EntertainingSchema extends BaseSchema {
    @prop()
    title?: string;

    @prop()
    price?: number;

    @prop()
    role?: EntertainingEnum;
}