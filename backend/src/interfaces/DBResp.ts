import { Document } from "mongoose";

export type DBResp<T> = Document<unknown, any, T> & Omit<
    T & Required<{
        _id: {
            $oid: string; // 更新 `_id` 的型別結構
        };
    }>,
    never
>;
