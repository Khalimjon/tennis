import { Types } from 'mongoose';

export class BaseSchema {
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
