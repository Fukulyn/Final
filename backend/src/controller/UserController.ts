import { Controller } from "../abstract/Controller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
import mongoose from "mongoose";

export class UserController extends Controller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    /**
     * 獲取所有學生資料
     */
    public async findAll(req: Request, res: Response) {
        const response: resp<Array<DBResp<Student>> | undefined> = {
            code: 200,
            message: "",
            body: undefined,
        };

        try {
            const students = await this.service.get();

            if (students) {
                response.body = students;
                response.message = "Find success";
                res.send(response);
            } else {
                response.code = 404;
                response.message = "No students found";
                res.status(404).send(response);
            }
        } catch (error) {
            response.code = 500;
            response.message = "Server error";
            res.status(500).send(response);
        }
    }

    /**
     * 新增一名學生
     */
    public async insertOne(req: Request, res: Response) {
        try {
            const result = await this.service.insertOne(req.body);
            res.status(result.code).send(result);
        } catch (error) {
            res.status(500).send({ code: 500, message: "Server error" });
        }
    }

    /**
     * 根據 ID 刪除學生資料
     */
    public async deletedById(req: Request, res: Response) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send({ code: 400, message: "Invalid ID format" });
            return;
        }

        const result = await this.service.deleteById(id);
        res.status(result.code).send(result);
    }

    /**
     * 根據名稱刪除學生資料
     */
    public async deletedByName(req: Request, res: Response) {
        const name = req.query.name as string;

        if (!name) {
            res.status(400).send({ code: 400, message: "Name is required" });
            return;
        }

        const result = await this.service.deleteByName(name);
        res.status(result.code).send(result);
    }

    /**
     * 根據名稱更新學生資料
     */
    public async updateByName(req: Request, res: Response) {
        const name = req.query.name as string;

        if (!name) {
            res.status(400).send({ code: 400, message: "Name is required" });
            return;
        }

        const result = await this.service.updateByName(name, req.body);
        res.status(result.code).send(result);
    }

    /**
     * 根據 ID 更新學生資料
     */
    public async updateById(req: Request, res: Response) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send({ code: 400, message: "Invalid ID format" });
            return;
        }

        const result = await this.service.updateById(id, req.body);
        res.status(result.code).send(result);
    }

    /**
     * 根據名稱查找學生
     */
    public async findByName(req: Request, res: Response) {
        const name = req.query.name as string;

        if (!name) {
            res.status(400).send({ code: 400, message: "Name is required" });
            return;
        }

        const result = await this.service.findByName(name);
        res.status(result.code).send(result);
    }

    /**
     * 根據 ID 查找學生
     */
    public async findById(req: Request, res: Response) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send({ code: 400, message: "Invalid ID format" });
            return;
        }

        const result = await this.service.findById(id);
        res.status(result.code).send(result);
    }
}
