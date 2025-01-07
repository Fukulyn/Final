import { createHashRouter } from "react-router-dom"; // 修正路由模組
import Delete from '../components/Delete';
import UpdateName from "../components/Update";
import AddUser from "../components/Add";
import RootTemplate from '../view/RootTemplate';
import LoginPage from '../components/LoginPage'; // 引入登入頁面組件

export const router = createHashRouter([
    {
        path: "/",
        element: <RootTemplate />,
    },
    {
        path: "/add",
        element: <AddUser />,
    },
    {
        path: "/delete",
        element: <Delete />,
    },
    {
        path: "/update",
        element: <UpdateName />,
    },
    {
        path: "/login", // 新增登入頁面路由
        element: <LoginPage />,
    },
]);
