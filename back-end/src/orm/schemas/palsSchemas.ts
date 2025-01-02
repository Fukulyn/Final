import { model, Schema } from "mongoose";
import { pals } from "../../interfaces/pals";

export const palsSchemas = new Schema<pals>({
    id: { 
        type: String, 
        required: true, 
        unique: true,  // 確保 id 唯一
        index: true    // 為 id 字段添加索引，優化查詢性能
    },
    name: { 
        type: String, 
        required: true, 
        unique: true,  // 確保 name 唯一
        index: true    // 為 name 字段添加索引，優化查詢性能
    },
    attribute: { 
        type: String, 
        required: true 
    },
    workCompatibility: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true  // 可選：自動添加 createdAt 和 updatedAt 字段
});

// 創建 Mongoose 模型
export const palsModel = model<pals>('pals', palsSchemas);

