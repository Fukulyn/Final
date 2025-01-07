import { useState, useEffect } from "react";
import { asyncPost, asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import '../style/Add.css';
import Navigation from "./Navigation";

export default function AddUser() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        attribute: "",
        workCompatibility: "",
        image: "",
    });

    const [existingIds, setExistingIds] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Fetch all data and extract IDs
        const fetchData = async () => {
            try {
                const response = await asyncGet(api.findAll);
                if (response?.code === 200 && Array.isArray(response.data)) {
                    setExistingIds(response.data.map((item: { id: string }) => item.id));
                } else {
                    console.error("Failed to fetch existing data.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 防止表單預設提交行為

        // Check if ID already exists
        if (existingIds.includes(formData.id)) {
            setMessage("新增失敗：ID 已存在，請輸入其他 ID");
            setIsError(true);
            return;
        }

        try {
            const response = await asyncPost(api.insertOne, formData);

            if (response?.code === 200) {
                setMessage("新增成功");
                setIsError(false);
                setFormData({
                    id: "",
                    name: "",
                    attribute: "",
                    workCompatibility: "",
                    image: "",
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
        { name: "id", label: "ID", type: "text" },
        { name: "name", label: "名稱", type: "text" },
        { name: "attribute", label: "屬性", type: "text" },
        { name: "workCompatibility", label: "適合工作", type: "text" },
        { name: "image", label: "圖片 URL", type: "url" },
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
