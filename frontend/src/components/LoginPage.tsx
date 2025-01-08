import { useState, useEffect } from 'react';
import '../style/LoginPage.css';
import Navigation from './Navigation';
import { initLoginAnimation } from '../scripts/loginAnimation';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        // 在組件掛載後初始化動畫
        initLoginAnimation();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 處理登入邏輯
    };

    return (
        <>
            <Navigation />
            <div className="login_container">
                <div className="panda_face">
                    <div className="ear_left"></div>
                    <div className="ear_right"></div>
                    <div className="blush_left"></div>
                    <div className="blush_right"></div>
                    <div className="eye_left">
                        <div className="eyeball_left"></div>
                    </div>
                    <div className="eye_right">
                        <div className="eyeball_right"></div>
                    </div>
                    <div className="nose"></div>
                    <div className="mouth"></div>
                </div>
                <form className="login_form" onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username here..."
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password here..."
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button type="submit">LOGIN</button>
                </form>
                <div className="hand_left"></div>
                <div className="hand_right"></div>
                <div className="paw_left"></div>
                <div className="paw_right"></div>
            </div>
        </>
    );
}