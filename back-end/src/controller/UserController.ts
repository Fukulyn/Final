import { Controller } from "../abstract/Controller";  // 修正拼寫為 Controller
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { pals } from "../interfaces/pals";
require('dotenv').config()

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
        const response: resp<Array<DBResp<pals>> | undefined> = {
            code: 200,
            message: "",
            body: undefined,
        };

        try {
            console.log("findAll method called");

            // 使用 lean() 返回普通的 JavaScript 物件
            const dbResp = await this.service.get();
            console.log("Data retrieved from service:", dbResp);

            if (dbResp && dbResp.length > 0) {
                response.body = dbResp;
                response.message = "Find success";
                console.log("Data found:", dbResp);
                res.send(response);
            } else {
                response.code = 404;
                response.message = "No students found";
                console.log("No data found in the database.");
                res.status(404).send(response);
            }
        } catch (error) {
            console.error("Error in findAll:", error);
            response.code = 500;
            response.message = "Server error";
            res.status(500).send(response);
        }
    }

    /**
     * 新增一名學生
     */
    public async insertOne(req: Request, res: Response) {
        console.log("insertOne method called with body:", req.body);
        const resp = await this.service.insertOne(req.body);
        console.log("Response after inserting one student:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 ID 刪除學生資料
     */
    public async deletedById(req: Request, res: Response) {
        const studentId = req.query.id as string;
        console.log("deletedById method called with ID:", studentId);
        const resp = await this.service.deletedById(studentId);
        console.log("Response after deleting by ID:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 Name 刪除學生資料
     */
    public async deletedByName(req: Request, res: Response) {
        const studentName = req.query.name as string;
        console.log("deletedByName method called with Name:", studentName);
        const resp = await this.service.deletedByName(studentName);
        console.log("Response after deleting by Name:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 Name 更新學生資料
     */
    public async updateByName(req: Request, res: Response) {
        const studentName = req.query.name as string;
        console.log("updateByName method called with Name:", studentName, "and data:", req.body);
        const resp = await this.service.updateByName(studentName, req.body);
        console.log("Response after updating by Name:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 ID 更新學生資料
     */
    public async updateById(req: Request, res: Response) {
        const studentId = req.query.id as string;
        console.log("updateById method called with ID:", studentId, "and data:", req.body);
        const resp = await this.service.updateById(studentId, req.body);
        console.log("Response after updating by ID:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 Name 查找學生資料
     */
    public async findByName(req: Request, res: Response) {
        const studentName = req.query.name as string;
        console.log("findByName method called with Name:", studentName);
        const resp = await this.service.findByName(studentName);
        console.log("Response after finding by Name:", resp);
        res.status(resp.code).send(resp);
    }

    /**
     * 根據 ID 查找學生資料
     */
    public async findById(req: Request, res: Response) {
        const studentId = req.query.id as string;
        console.log("findById method called with ID:", studentId);
        const resp = await this.service.findById(studentId);
        console.log("Response after finding by ID:", resp);
        res.status(resp.code).send(resp);
    }
}
