import { Types } from 'mongoose';
import {  UserModel, UserSchema } from '../../database';
import { UserRoleEnum } from '../../infrastructure';

export class UserEntity {
    protected _id?: Types.ObjectId;
    protected _firstName?: string;
    protected _lastName?: string;
    protected _phone?: string;
    protected _password?: string;
    protected _role?: UserRoleEnum;
    protected _updatedAt?: Date;
    protected _createdAt?: Date;

    setId(v: Types.ObjectId): UserEntity {
        this._id = v;
        return this;
    }

    setFirstName(firstName: string): UserEntity {
        this._firstName = firstName;
        return this;
    }

    setLastName(lastName: string): UserEntity {
        this._lastName = lastName;
        return this;
    }

    setPhone(phone: string): UserEntity {
        this._phone = phone;
        return this;
    }

    setPassword(password: string): UserEntity {
        this._password = password;
        return this;
    }

    setRole(v: UserRoleEnum): UserEntity {
        this._role = v;
        return this;
    }

    setUpdatedAt(v: Date): UserEntity {
        this._updatedAt = v;
        return this;
    }

    setCreatedAt(v: Date): UserEntity {
        this._createdAt = v;
        return this;
    }

    getFirstName() {
        return this._firstName;
    }

    getLastName() {
        return this._lastName;
    }

    getPassword() {
        return this._password;
    }

    getPhone() {
        return this._phone;
    }

    getId() {
        return this._id;
    }

    getRole() {
        return this._role;
    }

    getCratedAt() {
        return this._createdAt;
    }

    getUpdatedAt() {
        return this._updatedAt;
    }

    toEntity(v: UserSchema): UserEntity {
        return v
            ? this.setId(v._id)
                .setFirstName(v.firstName)
                .setLastName(v.lastName)
                .setPhone(v.phone)
                .setPassword(v.password)
                .setRole(v.role)
                .setCreatedAt(v.createdAt)
                .setUpdatedAt(v.updatedAt)
            : null;
    }

    toSchema(): UserSchema {
        return this
            ? {
                _id: this.getId(),
                firstName: this.getFirstName(),
                lastName: this.getLastName(),
                phone: this.getPhone(),
                password: this.getPassword(),
                role: this.getRole(),
                createdAt: this.getCratedAt(),
                updatedAt: this.getUpdatedAt(),
            }
            : null;
    }

    async create(): Promise<UserEntity> {
        const newUser = await UserModel.create(this.toSchema());
        return this.toEntity(newUser);
    }

    async syncById() {
        const user = await UserModel.findOne({ _id: this.getId() });
        return this.toEntity(user);
    }

    async syncByPhone(): Promise<UserEntity> {
        const user = await UserModel.findOne({ phone: this.getPhone() });
        return this.toEntity(user);
    }
}
