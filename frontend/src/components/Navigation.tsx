import { Link } from 'react-router-dom'; // 引入 Link 組件
import "../style/Navigation.css";

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-title">
                <Link to="/" className="home-link">Palworld</Link> 
            </div>
            <div className="nav-links">
                <Link to="/delete" className="nav-button">刪除帕魯資料</Link> 
                <Link to="/update" className="nav-button">搜尋及更新帕魯資料</Link> 
                <Link to="/add" className="nav-button">新增帕魯資料</Link>
                <Link to="/login" className="nav-button">登入</Link> {/* 新增登入頁面連結 */}
            </div>
        </nav>
    );
}
