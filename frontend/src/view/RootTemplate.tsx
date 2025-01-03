import { useState, useEffect } from "react";
import { asyncGet } from "../utils/fetch"; // 假設你有這個工具來處理 API 請求
import { api } from "../enum/api"; // 你的 API 路徑
import "../style/RootTemplate.css"; // 引入樣式
import Navigation from "../components/Navigation";
import { Student } from "../interface/Student"; // 引入 Student 接口

export default function RootTemplate() {
    const [students, setStudents] = useState<Student[]>([]); // 使用 Student 類型來儲存學生資料
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        // 初始化時請求學生資料
        async function fetchStudents() {
            try {
                const response = await asyncGet(api.findAll);
                if (response?.code === 200) {
                    setStudents(response.body); // 假設 API 返回的學生資料是 body
                } else {
                    setIsError(true);
                    setMessage("無法載入學生資料");
                }
            } catch (error) {
                setIsError(true);
                setMessage("請求失敗，請檢查伺服器連接");
            }
        }
        fetchStudents();
    }, []);

    return (
        <>
            <Navigation />
            <div className="root_template">
                <h1>學生資料圖鑑</h1>
                {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
                <div className="student-grid">
                    {students.length > 0 ? (
                        students.map((student) => (
                            <div className="student-card" key={student._id}> 
                                <div className="student-info">
                                    <h2>{student.name}</h2>
                                    <p>學生ID: {student._id}</p>
                                    <p>帳號: {student.userName}</p>
                                    <p>座號: {student.sid}</p>
                                    <p>系級: {student.department}</p>
                                    <p>年級: {student.grade}</p>
                                    <p>班級: {student.class}</p>
                                    <p>Email: {student.email}</p>
                                    <p>缺席次數: {student.absences !== undefined ? student.absences : '無資料'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>尚未載入資料</p>
                    )}
                </div>
            </div>
        </>
    );
}
