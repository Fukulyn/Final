import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation"; // 引入 Navigation
import "../style/LoginPage.css"; // 假設您已經有CSS檔案

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === 'test@example.com' && password === 'password') {
            console.log('登入成功！');
            navigate('/'); // 成功後導航回首頁
        } else {
            alert('登入失敗，請檢查帳號和密碼');
        }
    };

    return (
        <div>
            <Navigation /> {/* 顯示導航欄 */}
            <div className="login-container">
                
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="email">Email:</label> {/* 為 email 輸入框添加 label */}
                        <input 
                            id="email" /* 給 input 一個唯一的 id */
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="請輸入您的電子郵件" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label> {/* 為 password 輸入框添加 label */}
                        <input 
                            id="password" /* 給 input 一個唯一的 id */
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="請輸入您的密碼" 
                            required 
                        />
                    </div>
                    <button onClick={handleLogin}>登入</button>
                </form>
            </div>
        </div>
    );
}
