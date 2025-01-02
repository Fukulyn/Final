import { useState, useEffect } from "react";
import { asyncGet } from "../utils/fetch"; // 假設你有這個工具來處理 API 請求
import { api } from "../enum/api"; // 你的 API 路徑
import "../style/RootTemplate.css"; // 引入樣式
import Navigation from "../components/Navigation";
import { Pals } from "../interface/pals"; // 引入 Student 接口

export default function RootTemplate() {
    const [pals, setPals] = useState<Pals[]>([]); // 使用 Student 類型來儲存學生資料
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        // 初始化時請求學生資料
        async function fetchStudents() {
            try {
                const response = await asyncGet(api.findAll);
                if (response?.code === 200) {
                    setPals(response.body); // 假設 API 返回的學生資料是 body
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
                <h1>幻獸帕魯資料圖鑑</h1>
                {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
                <div className="student-grid">
                    {pals.length > 0 ? (
                        pals.map((pal) => (
                            <div className="student-card" key={pal._id}> 
                                <div className="student-info">
                                    <h2>{pal.name}</h2>
                                    <p>帕魯ID: {pal._id}</p>
                                    <p>編號: {pal.id}</p>
                                    <p>名稱: {pal.name}</p>
                                    <p>屬性: {pal.attribute}</p>
                                    <p>工作屬性: {pal.workCompatibility}</p>
                                    <img src={pal.image} alt={pal.name} />
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
