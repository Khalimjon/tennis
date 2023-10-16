import { getModelForClass, Severity } from '@typegoose/typegoose';
import {EntertainingSchema} from "../schemas/Entertainings.schema";

export const EntertainingModel = getModelForClass(EntertainingSchema, {
    schemaOptions: {
        collection: 'Entertaining',
        minimize: true,
        timestamps: true,
        versionKey: false,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
});