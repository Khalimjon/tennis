import { getModelForClass, Severity } from '@typegoose/typegoose';
import { UserSchema } from '../schemas';

export const UserModel = getModelForClass(UserSchema, {
    schemaOptions: {
        collection: 'user',
        minimize: true,
        timestamps: true,
        versionKey: false,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
});
