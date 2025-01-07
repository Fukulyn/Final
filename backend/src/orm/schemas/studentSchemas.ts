import { model, Schema } from "mongoose";
import { Student } from "../../interfaces/Student";

export const studentsSchemas = new Schema<Student>({
  id: { type: String, required: true }, // 學生編號
  name: { type: String, required: true }, // 學生名稱
  attribute: { type: String, required: true }, // 屬性
  workCompatibility: { type: String, required: true }, // 工作適配性（逗號分隔的字串）
  image: { type: String, required: true } // 圖片的 URL
});

export const studentsModel = model<Student>('students', studentsSchemas);
