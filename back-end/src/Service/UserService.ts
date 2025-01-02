import { Service } from "../abstract/Service";
import { pals } from "../interfaces/pals";
import { logger } from "../middlewares/log";
import { palsModel } from "../orm/schemas/palsSchemas";
import { Document, Types } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";



export class UserService extends Service {
    /**尋找所有學生資料
     * 
     * @returns 
     */
    public async get(): Promise<Array<DBResp<pals>>|undefined> {
        try {
            const res:Array<DBResp<pals>> = await palsModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }
        
    }

    /**
 * 新增學生
 * @param info 學生資訊
 * @returns resp
 */
public async insertOne(info: pals): Promise<resp<DBResp<pals> | undefined>> {
    const resp: resp<DBResp<pals> | undefined> = {
        code: 200,
        message: "",
        body: undefined
    };
    try {
        // 驗證用戶名稱是否有效
        const nameValidator = await this.userNameValidator(info.name);
        if (nameValidator !== "驗證通過") {
            resp.code = 403;
            resp.message = nameValidator;
            return resp;
        }
        // 查詢當前的學生數量
        const studentCount = await palsModel.countDocuments();
        if (studentCount >= 200) { // 最多存放 200 筆資料
            resp.message = "pals list is full";
            resp.code = 403;
            return resp;
        }
        // 查詢當前的最大座號
        const maxid = await palsModel
            .findOne()
            .sort({ id: -1 }) // 按 id 降序排列，取第一個
            .select("id") // 只取 id 欄位
            .exec();
        // 設置新的 sid
        const newid = maxid ? Number(maxid.id) + 1 : 1;
        info.id = String(newid);
        info._id = undefined; // 讓 MongoDB 自動生成 _id
    
        // 插入新學生
        const res = new palsModel(info);
        resp.body = await res.save();
        resp.message = "insert success";
    } catch (error) {
        resp.message = "server error";
        resp.code = 500;
        console.error("Error inserting student:", error);
    }
    return resp;
}

/**
 * 帕魯名字驗證器
 * @param userName 帕魯名字
 * 座號檢查，跟之前有重複就噴錯  只能寫沒重複的號碼
 * 
 */
public async userNameValidator(userName: string): Promise<
    '座號已存在' | 
    '驗證通過'
> {
    // 檢查是否有相同的名字
    const isNameExist = await this.existingName(userName);
    if (isNameExist) {
        return '座號已存在';
    }
    
    return '驗證通過';
}

/**
 * 檢查用戶名是否已存在
 * @param userName 用戶名
 * @returns boolean
 */
public async existingName(userName: string): Promise<boolean> {
    const user = await palsModel.findOne({ name: userName });
    return user !== null; // 如果有找到相同的名字，返回 true
}



/**
 * 獲取所有帕魯
 * @returns Promise<Student[]>
 */
public async getAllStudents(): Promise<pals[]> {
    try {
        return await palsModel.find(); // 返回所有帕魯
    } catch (error) {
        console.error("Error fetching pals:", error);
        return []; // 處理無法獲取帕魯數據的情况
    }
}


    /**
     * 刪除一筆用戶資料
     * @param id 用戶_id
     * @returns resp
     */
    public async deletedById(id:string): Promise<resp<DBResp<pals> | undefined>>{
        const resp: resp<any> ={
            code: 200,
            message: "",
            body: undefined
        }
        const user = await palsModel.findById(id);
        if (user) {
            try {
                const res = await palsModel.deleteOne({_id: id});
                resp.message = "sucess";
                resp.body = res;
            } catch (error) {
                resp.message = error as string;
                resp.code = 500;
            }
        } else {
            resp.message = "user not found";
            resp.code = 404;
        }
        return resp;
    }
    /**
     * 刪除一筆用戶資料
     * @param name 用戶名稱
     * @returns resp
     */
    public async deletedByName(name: string): Promise<resp<DBResp<pals> | undefined>>{
        const resp: resp<any> ={
            code: 200,
            message: "",
            body: undefined
        }
        const user = await palsModel.findOne({name: name});
        if (user) {
            try {
                const res = await palsModel.deleteOne({name: name});
                resp.message = "sucess";
                resp.body = res;
            } catch (error) {
                resp.message = error as string;
                resp.code = 500;
            }
        } else {
            resp.code = 404;
            resp.message = "user not found";
        }
        return resp;
    }
    /**
     * 根據用戶名稱更新資料
     * @param old_name 用戶名稱
     * @param updateData 更新的資料
     * @returns resp
     */
    public async updateByName(name: string, updateData: pals): Promise<resp<DBResp<pals> | undefined>> {
        const resp: resp<DBResp<pals> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            // 移除不想被看到的欄位，_id、sid
            const updateFields = { ...updateData };
            delete updateFields._id;
            
            
            
    
            // 使用 findOneAndUpdate 進行資料更新，並返回更新後的資料
            const user = await palsModel.findOneAndUpdate(
                { name: name },  // 查找條件
                { $set: updateFields },  // 更新操作
                { 
                    new: true,  // 返回更新後的資料
                    runValidators: true  // 執行 Schema 驗證
                }
            );
            if (user) {
                resp.body = user;  // 返回更新後的資料
                resp.message = "Update successful";
            } else {
                resp.code = 404;
                resp.message = "User not found";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "server error";
        }
        return resp;
    }
    /**
     * 根據用戶id更新資料
     * @param id 用戶id
     * @param updateData 更新的資料
     * @returns resp
     */
    public async updateById(id: string, updateData: pals): Promise<resp<DBResp<pals> | undefined>> {
        const resp: resp<DBResp<pals> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        try {
            // 移除不想被看到的欄位，_id、sid、absences
            const updateFields = { ...updateData };
            delete updateFields._id;
            
            // 使用 findOneAndUpdate 進行資料更新，並返回更新後的資料
            const user = await palsModel.findOneAndUpdate(
                { _id: id },  // 查找條件
                { $set: updateFields },  // 更新操作
                { 
                    new: true,  // 返回更新後的資料
                    runValidators: true  // 執行 Schema 驗證
                }
            );
            if (user) {
                resp.body = user;  // 返回更新後的資料
                resp.message = "Update successful";
            } else {
                resp.code = 404;
                resp.message = "User not found";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "server error";
        }
        return resp;
    }

    /**
     * 根據名稱尋找用戶
     * @param name 用戶名稱
     * @returns resp
     */
    public async findByName(name: string): Promise<resp<DBResp<pals> | undefined>>{
        const resp: resp<DBResp<pals> | undefined> ={
            code: 200,
            message: "",
            body: undefined
        }
        const user = await palsModel.findOne({name: name});
        if (user) {
            try {
                resp.body = user;
                resp.message = "find success";
            } catch (error) {
                resp.code = 500;
                resp.message = "server error"
            }
        }else {
            resp.code = 404;
            resp.message = "user not found";
        }
        return resp;
    }

    /**
     * 根據id尋找用戶
     * @param id 用戶id
     * @returns resp
     */
    public async findById(id: string): Promise<resp<DBResp<pals> | undefined>> {
        const resp: resp<DBResp<pals> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };
        // 檢查 id 是否為有效的 ObjectId 格式
        if (!Types.ObjectId.isValid(id)) {
            resp.code = 404;
            resp.message = "user not found";  // 若 ID 格式不正確，返回 400 錯誤
            return resp;
        }
        try {
            const user = await palsModel.findById(id);
            if (user){
                resp.body = user;
                resp.message = "find success";
            }
        } catch (error) {
            resp.code = 500;
            resp.message = "server error";  // 若出現其他錯誤，返回 500 錯誤
            console.error("Error finding user by ID:", error);  // 輸出錯誤以便調試
        }
        return resp;
    }
}
