import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { Types } from "mongoose";

export class UserService extends Service {
  /**
   * 獲取所有學生資料
   * @returns Promise<Array<DBResp<Student>> | undefined>
   */
  public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined> {
    try {
      const students = await studentsModel.find();
      return students;
    } catch (error) {
      console.error("Error fetching all students:", error);
      return undefined;
    }
  }

  /**
   * 獲取所有學生資料（加上 .lean() 以提高查詢效率）
   * @returns Promise<Array<DBResp<Student>> | undefined>
   */
  public async get(): Promise<Array<DBResp<Student>> | undefined> {
    try {
      const res: Array<DBResp<Student>> = await studentsModel.find({}).lean(); // 使用 .lean() 提高查詢效率
      return res;
    } catch (error) {
      console.error("Error fetching students:", error);
      return undefined;
    }
  }

  /**
   * 新增一名學生
   * @param studentInfo 學生資料
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async insertOne(studentInfo: Student): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const newStudent = new studentsModel(studentInfo);
      const savedStudent = await newStudent.save();
      response.body = savedStudent;
      response.message = "Insert successful";
    } catch (error) {
      response.code = 500;
      response.message = "Server error during insertion";
      console.error("Error inserting student:", error);
    }

    return response;
  }

  /**
   * 根據學生 ID 刪除學生
   * @param id 學生 ID
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async deleteById(id: string): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    if (!Types.ObjectId.isValid(id)) {
      response.code = 400;
      response.message = "Invalid ID format";
      return response;
    }

    try {
      const deletedStudent = await studentsModel.findByIdAndDelete(id);
      if (deletedStudent) {
        response.body = deletedStudent;
        response.message = "Delete successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during deletion";
      console.error("Error deleting student:", error);
    }

    return response;
  }

  /**
   * 根據學生名稱刪除學生
   * @param name 學生名稱
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async deleteByName(name: string): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const deletedStudent = await studentsModel.findOneAndDelete({ name });
      if (deletedStudent) {
        response.body = deletedStudent;
        response.message = "Delete successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during deletion";
      console.error("Error deleting student by name:", error);
    }

    return response;
  }

  /**
   * 根據 ID 更新學生資料
   * @param id 學生 ID
   * @param updateData 更新的資料
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async updateById(id: string, updateData: Partial<Student>): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    if (!Types.ObjectId.isValid(id)) {
      response.code = 400;
      response.message = "Invalid ID format";
      return response;
    }

    try {
      const updatedStudent = await studentsModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (updatedStudent) {
        response.body = updatedStudent;
        response.message = "Update successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during update";
      console.error("Error updating student:", error);
    }

    return response;
  }

  /**
   * 根據名稱更新學生資料
   * @param name 學生名稱
   * @param updateData 更新的資料
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async updateByName(name: string, updateData: Partial<Student>): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const updatedStudent = await studentsModel.findOneAndUpdate(
        { name },
        { $set: updateData },
        { new: true, runValidators: true }
      );
      if (updatedStudent) {
        response.body = updatedStudent;
        response.message = "Update successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during update";
      console.error("Error updating student by name:", error);
    }

    return response;
  }

  /**
   * 根據名稱尋找學生
   * @param name 學生名稱
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async findByName(name: string): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const student = await studentsModel.findOne({ name });
      if (student) {
        response.body = student;
        response.message = "Find successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during retrieval";
      console.error("Error finding student by name:", error);
    }

    return response;
  }

  /**
   * 根據 ID 尋找學生
   * @param id 學生 ID
   * @returns Promise<resp<DBResp<Student> | undefined>>
   */
  public async findById(id: string): Promise<resp<DBResp<Student> | undefined>> {
    const response: resp<DBResp<Student> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    if (!Types.ObjectId.isValid(id)) {
      response.code = 400;
      response.message = "Invalid ID format";
      return response;
    }

    try {
      const student = await studentsModel.findById(id);
      if (student) {
        response.body = student;
        response.message = "Find successful";
      } else {
        response.code = 404;
        response.message = "Student not found";
      }
    } catch (error) {
      response.code = 500;
      response.message = "Server error during retrieval";
      console.error("Error finding student by ID:", error);
    }

    return response;
  }
}
