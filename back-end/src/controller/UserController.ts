import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { pals } from "../interfaces/pals";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async findAll(req: Request, res: Response) {
        const response: resp<Array<DBResp<pals>> | undefined> = {
            code: 200,
            message: "",
            body: undefined,
        };
    
        try {
            // 使用 lean() 返回普通对象
            const dbResp = await this.service.getAllStudents().lean; 
    
            if (dbResp) {
                response.body = dbResp;
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
    }    public async insertOne(Request: Request, Response: Response) {
        const resp = await this.service.insertOne(Request.body)
        Response.status(resp.code).send(resp)
    }

    public async deletedById(Request: Request, Response: Response){
        const resp = await this.service.deletedById(Request.query.id as string);
        Response.status(resp.code).send(resp);
    }

    public async deletedByName(Request: Request, Response: Response){
        const resp = await this.service.deletedByName(Request.query.name as string);
        Response.status(resp.code).send(resp);
    }

    public async updateByName(Request: Request, Response: Response){
        const resp = await this.service.updateByName(Request.query.name as string, Request.body);
        Response.status(resp.code).send(resp);
    }

    public async updateById(Request: Request, Response: Response){
        const resp = await this.service.updateById(Request.query.id as string, Request.body);
        Response.status(resp.code).send(resp);
    }

    public async findByName(Request: Request, Response: Response){
        const resp = await this.service.findByName(Request.query.name as string);
        Response.status(resp.code).send(resp);
    }

    public async findById(Request: Request, Response: Response){
        const resp = await this.service.findById(Request.query.id as string);
        Response.status(resp.code).send(resp);
    }
}