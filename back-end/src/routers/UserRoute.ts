import { Route } from "../abstract/Route"
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";

export class UserRoute extends Route {

    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super();
        this.url = '/api/v1/user/';
        this.setRoutes();
    }

    protected setRoutes(): void {

        this.router.get(`${this.url}findAll`, (req, res) => {
            console.log("GET request received for /api/v1/user/findAll");
            this.Contorller.findAll(req, res);
        });

        this.router.get(`${this.url}findByName`, (req, res) => {
            console.log("GET request received for /api/v1/user/findByName with query:", req.query);
            this.Contorller.findByName(req, res);
        });

        this.router.get(`${this.url}findById`, (req, res) => {
            console.log("GET request received for /api/v1/user/findById with query:", req.query);
            this.Contorller.findById(req, res);
        });

        /**
         * 新增學生
         * request body {
         *  userName: string,
         *  name: string",
         *  department: string,
         *  grade: string,
         *  class: string,
         *  Email: string
         * } 
         * @returns resp<Student>
         */
        this.router.post(`${this.url}insertOne`, (req, res) => {
            console.log("POST request received for /api/v1/user/insertOne with body:", req.body);
            this.Contorller.insertOne(req, res);
        });

        this.router.delete(`${this.url}deletedById`, (req, res) => {
            console.log("DELETE request received for /api/v1/user/deletedById with query:", req.query);
            this.Contorller.deletedById(req, res);
        });

        this.router.delete(`${this.url}deletedByName`, (req, res) => {
            console.log("DELETE request received for /api/v1/user/deletedByName with query:", req.query);
            this.Contorller.deletedByName(req, res);
        });

        this.router.put(`${this.url}updateByName`, (req, res) => {
            console.log("PUT request received for /api/v1/user/updateByName with query:", req.query, "and body:", req.body);
            this.Contorller.updateByName(req, res);
        });

        this.router.put(`${this.url}updateById`, (req, res) => {
            console.log("PUT request received for /api/v1/user/updateById with query:", req.query, "and body:", req.body);
            this.Contorller.updateById(req, res);
        });

    }
}
