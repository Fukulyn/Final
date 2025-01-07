import { Route } from "../abstract/Route";
import { UserController } from "../controller/UserController"; // 引入 UserController
import { logger } from "../middlewares/log";

export class UserRoute extends Route {
    
    protected url: string;
    protected Controller = new UserController(); // 使用 UserController

    constructor() {
        super();
        this.url = '/api/v1/user/';
        this.setRoutes();
    }

    protected setRoutes(): void {

        // 獲取所有學生資料
        this.router.get(`${this.url}findAll`, async (req, res) => {
            this.Controller.findAll(req, res);
        });

        // 根據名稱尋找學生
        this.router.get(`${this.url}findByName`, async (req, res) => {
            const name = req.query.name as string;
            this.Controller.findByName(req, res);
        });

        // 根據 ID 尋找學生
        this.router.get(`${this.url}findById`, async (req, res) => {
            const id = req.query.id as string;
            this.Controller.findById(req, res);
        });

        /**
         * 新增學生
         * request body {
         *  userName: string,
         *  name: string,
         *  department: string,
         *  grade: string,
         *  class: string,
         *  email: string
         * } 
         * @returns resp<Student>
         */
        this.router.post(`${this.url}insertOne`, async (req, res) => {
            this.Controller.insertOne(req, res);
        });

        // 根據 ID 刪除學生
        this.router.delete(`${this.url}deletedById`, async (req, res) => {
            const id = req.query.id as string;
            this.Controller.deletedById(req, res);
        });

        // 根據名稱刪除學生
        this.router.delete(`${this.url}deletedByName`, async (req, res) => {
            const name = req.query.name as string;
            this.Controller.deletedByName(req, res);
        });

        // 根據名稱更新學生資料
        this.router.put(`${this.url}updateByName`, async (req, res) => {
            const name = req.query.name as string;
            const updateData = req.body;
            this.Controller.updateByName(req, res);
        });

        // 根據 ID 更新學生資料
        this.router.put(`${this.url}updateById`, async (req, res) => {
            const id = req.query.id as string;
            const updateData = req.body;
            this.Controller.updateById(req, res);
        });

    }
}
