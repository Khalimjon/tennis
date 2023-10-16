import {Request, Response} from "express";
import {EntertainingEntity} from "../domain";
import {Types} from "mongoose";

class EntertainingController {
    async create(req: Request, res: Response) {
        try {
            const params = req.body;
            const group = await new EntertainingEntity().setTitle(params.title).setPrice(params.price).create();
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                error: error
            })
        }
    }
    async findById(req: Request, res: Response){
        try {
            const id = req.params.id
            const entertaining = await new EntertainingEntity().setId(new Types.ObjectId(id)).syncById();
            if (!entertaining){
                res.status(404).json({
                    message: `entertaining not found...`
                });
            }else {
                res.status(200).json(entertaining.toSchema())
            }
        }catch (error){
           return  res.json(error)
        }
    }
    async updated(req: Request, res: Response) {
        try {
            const id = req.body.id;
            const title = req.body.title;
            const entertaining = await new EntertainingEntity().setId(new Types.ObjectId(id)).setTitle(title).update();

            if (!entertaining){
                res.status(404).json({
                    message: `entertaining not found...`
                })
            }else {
                res.status(200).json({
                    message: `successfully`,
                    data: entertaining.toSchema()
                })
            }
        }catch (error){
            res.json(error)
        }
    }

    async delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const title = req.body.title;
            console.log(title, id);
            const entertaining = await new EntertainingEntity().setId(new Types.ObjectId(id)).delete();
            if (!entertaining) {
                res.status(404).json({
                    message: `entertaining not found`,
                });
            } else {
                res.status(200).json({
                    message: `successfully`,
                    data: entertaining.toSchema(),
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req: Request, res: Response){
        try {
            const entertainingEntity = new EntertainingEntity();
            const entertaining = await entertainingEntity.findAll();

            if (entertaining.length === 0) {
                res.status(404).json({
                    message: 'entertaining not found',
                });
            } else {
                res.status(200).json(entertaining);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const entertainingController = new EntertainingController()