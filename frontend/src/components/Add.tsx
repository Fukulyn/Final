import { useState, useEffect, useRef } from "react";
import { asyncPost, asyncGet } from "../utils/fetch";
import { api } from "../enum/api";
import '../style/Add.css';
import Navigation from "./Navigation";

interface ApiResponse {
    code: number;
    message: string;
    body?: any;
}

export default function AddUser() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        attribute: "",
        workCompatibility: "",
        image: "",
    });

    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const idRef = useRef<HTMLInputElement>(null);

    // 驗證圖片 URL 是否有效
    const isValidImageUrl = (url: string) => {
        const imagePattern = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
        return imagePattern.test(url);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 驗證必填欄位
            if (!formData.name || !formData.attribute || !formData.workCompatibility) {
                setMessage("請填寫所有必填欄位");
                setIsError(true);
                setIsSubmitting(false);
                return;
            }

            // 驗證圖片 URL 格式
            if (formData.image && !isValidImageUrl(formData.image)) {
                setMessage("圖片 URL 格式不正確，請使用有效的圖片格式（如 JPG、PNG 等）");
                setIsError(true);
                setIsSubmitting(false);
                return;
            }

            const submitData = {
                name: formData.name.trim(),
                attribute: formData.attribute.trim(),
                workCompatibility: formData.workCompatibility.trim(),
                image: formData.image.trim()
            };

            const response = await asyncPost<ApiResponse>(api.insertOne, submitData);
            
            if (response?.code === 200) {
                setMessage(response.message || "新增成功");
                setIsError(false);
                // 重置表單
                setFormData({
                    id: "",
                    name: "",
                    attribute: "",
                    workCompatibility: "",
                    image: "",
                });
            } else {
                throw new Error(response?.message || "新增失敗");
            }
        } catch (error) {
            console.error('錯誤詳情:', error);
            setMessage(error instanceof Error ? error.message : "伺服器錯誤，請稍後再試");
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formFields = [
        { name: "name", label: "名稱", type: "text" },
        { name: "attribute", label: "屬性", type: "text" },
        { name: "workCompatibility", label: "適合工作", type: "text" },
        { name: "image", label: "圖片 URL", type: "text" },
    ];

    return (
        <>
            <Navigation />
            <div className="add_container">
                
                <form onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div className="txt_field" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                ref={field.name === "name" ? idRef : null}
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
                    <button type="submit" disabled={isSubmitting}>新增</button>
                    <p className={`message ${isError ? 'error' : ''}`}>{message}</p>
                </form>

                {/* 顯示圖片預覽 */}
                {formData.image && isValidImageUrl(formData.image) && (
                    <div className="image_preview">
                        <h2>圖片預覽</h2>
                        <img src={formData.image} alt="預覽圖片" style={{ width: '300px', height: 'auto' }} />
                    </div>
                )}
            </div>
        </>
    );
}
