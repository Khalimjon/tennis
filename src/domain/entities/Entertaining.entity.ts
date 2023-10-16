import {Types} from "mongoose";
import {EntertainingSchema} from "../../database/schemas/Entertainings.schema";
import {EntertainingModel} from "../../database";

export class EntertainingEntity{
    protected _id?: Types.ObjectId;
    protected _title?: string;
    protected _price?: number;
    protected _createdAt?: Date;
    protected _updatedAt?: Date;

    setId(v: Types.ObjectId): EntertainingEntity {
        this._id = v;
        return this;
    }

    setTitle(v: string): EntertainingEntity{
        this._title = v;
        return this
    }

    setPrice(v: number): EntertainingEntity{
        this._price = v;
        return this
    }

    setUpdatedAt(v: Date): EntertainingEntity {
        this._updatedAt = v;
        return this;
    }

    setCreatedAt(v: Date): EntertainingEntity {
        this._createdAt = v;
        return this;
    }

    getCratedAt() {
        return this._createdAt;
    }

    getUpdatedAt() {
        return this._updatedAt;
    }

    getTitle(){
        return this._title
    }

    getId(){
        return this._id
    }

    getPrice(){
        return this._price
    }

    toEntity(v: EntertainingSchema): EntertainingEntity{
        return v
            ? this.setId(v._id).setTitle(v.title).setPrice(v.price).setCreatedAt(v.createdAt).setUpdatedAt(v.updatedAt)
            : null;
    }

    toSchema(): {
        title: string;
        price: number;
        _id: Types.ObjectId;
        updatedAt: Date;
        createdAt: Date;

    }{
        return this
        ?  {
               _id: this.getId(),
                title: this.getTitle(),
                price: this.getPrice(),
                updatedAt: this.getUpdatedAt(),
                createdAt: this.getCratedAt()
            }
            :null;
    }

    async create(): Promise <EntertainingEntity>{
        const entertaining = await EntertainingModel.create(this.toSchema());
        return this.toEntity(entertaining)
    }

    async syncById(): Promise <EntertainingEntity>{
        const entertaining =  await EntertainingModel.findOne({_id: this.getId()});
        return this.toEntity(entertaining);
    }

    async delete(): Promise<EntertainingEntity> {
        const entertaining = await EntertainingModel.findByIdAndDelete(this.getId());
        return this.toEntity(entertaining)
    }

    async update(): Promise<EntertainingEntity>{
        const schema: EntertainingSchema = {};
        if (this.getTitle()) schema.title = this.getTitle();
        const entertaining = await EntertainingModel.findByIdAndUpdate({ _id: this.getId() }, { $set: schema }, { new: true })
        return this.toEntity(entertaining)
    }

    async findAll() {
        const entertaining = await EntertainingModel.find({});
        return entertaining.map((group) => this.toEntity(group));
    }
}