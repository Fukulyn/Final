import { useState } from "react";
import { asyncPost } from "../utils/fetch";
import { api } from "../enum/api";
import '../style/Add.css';
import Navigation from "./Navigation";

export default function AddUser() {
    const [formData, setFormData] = useState({
        userName: "",
        name: "",
        department: "",
        grade: "",
        class: "",
        email: "",
    });

    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 防止表單預設提交行為

        try {
            const response = await asyncPost(api.insertOne, formData);

            if (response?.code === 200) {
                setMessage("新增成功");
                setIsError(false);
                setFormData({
                    userName: "",
                    name: "",
                    department: "",
                    grade: "",
                    class: "",
                    email: "",
                });
            } else {
                setMessage(`新增失敗: ${response?.message || "請稍後再試"}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage("請求失敗，請檢查伺服器連接");
            setIsError(true);
        }
    };

    const formFields = [
        { name: "userName", label: "使用者名稱", type: "text" },
        { name: "name", label: "姓名", type: "text" },
        { name: "department", label: "系級", type: "text" },
        { name: "grade", label: "年級", type: "text" },
        { name: "class", label: "班級", type: "text" },
        { name: "email", label: "電子郵件", type: "email" },
    ];

    return (
        <>
            <Navigation />
            <div className="add_container">
                <h1>新增帕魯</h1>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div className="txt_field" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                required
                                title={`請輸入${field.label}`}
                            />
                            <span></span>
                        </div>
                    ))}
                    <button type="submit">新增</button>
                    <p className={`message ${isError ? 'error' : ''}`}>{message}</p>
                </form>
            </div>
        </>
    );
}
