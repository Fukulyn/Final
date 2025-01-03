import { useState } from "react";
import { asyncGet, asyncPut } from "../utils/fetch";
import { api } from "../enum/api";
import "../style/Update.css";
import Navigation from "./Navigation";

export default function UpdateName() {
    const [selectedOption, setSelectedOption] = useState<string>("id");
    const [inputValue, setInputValue] = useState<string>("");
    const [userData, setUserData] = useState<any>({
        userName: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        email: "",
        absences: "",  // 新增缺席次數欄位
    });
    const [showUserData, setShowUserData] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    function handleInputPlaceholder(): string {
        return "請輸入學生" + (selectedOption === "id" ? "ID" : "姓名");
    }

    async function handleQueryUser() {
        const apiEndpoint =
            selectedOption === "id"
                ? `${api.findById}?id=${inputValue}`
                : `${api.findByName}?name=${inputValue}`;

        try {
            const response = await asyncGet(apiEndpoint);

            if (response?.code === 200) {
                setUserData(response?.body);
                setShowUserData(true);
            } else {
                setShowUserData(false);
                setIsError(true);
                setMessage("學生資料未找到");
            }
        } catch (error) {
            console.error("查詢失敗:", error);
            setIsError(true);
            setMessage("請求失敗，請檢查伺服器連接");
        }
    }

    async function handleUpdate() {
        const updatedData: any = {};

        for (const key in userData) {
            if (userData[key]?.trim()) {
                updatedData[key] = userData[key];
            }
        }

        try {
            const response = selectedOption === "id"
                ? await asyncPut(`${api.updateById}?id=${inputValue}`, updatedData)
                : await asyncPut(`${api.updateByName}?name=${inputValue}`, updatedData);

            if (response?.code === 200) {
                setMessage("");
                setInputValue("");
                setShowUserData(false);
            } else {
                setMessage(`伺服器錯誤: ${response?.message || "請稍後再試"}`);
            }
        } catch (error) {
            setMessage("請求失敗，請檢查伺服器連接");
        }
    }

    const userFields = [
        { label: "帳號", key: "userName" },
        { label: "姓名", key: "name" },
        { label: "科系", key: "department" },
        { label: "年級", key: "grade" },
        { label: "班級", key: "class" },
        { label: "Email", key: "email" },
        { label: "缺席次數", key: "absences" }, // 新增缺席次數欄位
    ];

    return (
        <>
            <Navigation />
            <div className="update_container">
                <h1>更新學生資料</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleQueryUser(); }}>
                    <div>
                        <label>
                            <input type="radio" name="deleteOption" checked={selectedOption === "id"} onChange={() => setSelectedOption("id")} />
                            ID
                        </label>
                        <label>
                            <input type="radio" name="deleteOption" checked={selectedOption === "name"} onChange={() => setSelectedOption("name")} />
                            姓名
                        </label>
                    </div>
                    <input
                        type="text"
                        placeholder={handleInputPlaceholder()}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                        title={handleInputPlaceholder()}
                    />
                    <button type="submit">查詢學生</button>
                </form>
                {message && <p className={`message ${isError ? "error" : ""}`}>{message}</p>}
            </div>

            {showUserData && (
                <div className={`user_data_container ${showUserData ? "show" : ""}`}>
                    <h2>學生資料</h2>
                    {userFields.map(({ label, key }) => (
                        <div key={key}>
                            <label htmlFor={key}>{label}:</label>
                            <input
                                type="text"
                                id={key}
                                value={userData[key] || ""}
                                disabled={label === "帳號"}
                                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                                title={`請輸入${label}`}
                            />
                        </div>
                    ))}
                    <button onClick={handleUpdate}>更新資料</button>
                </div>
            )}
        </>
    );
}

