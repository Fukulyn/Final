import { Link } from 'react-router-dom'; // 引入 Link 組件
import "../style/Navigation.css";

export default function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-title">
                <Link to="/" className="home-link">StudentHub</Link> 
            </div>
            <div className="nav-links">
                <Link to="/delete" className="nav-button">刪除學生資料</Link> 
                <Link to="/update" className="nav-button">搜尋及更新學生資料</Link> 
                <Link to="/add" className="nav-button">新增學生資料</Link>
            </div>
        </nav>
    );
}
