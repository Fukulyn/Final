import { createHashRouter } from "react-router-dom"; // 修正路由模組
import Delete from '../components/Delete';
import UpdateName from "../components/Update";
import AddUser from "../components/Add";
import RootTemplate from '../view/RootTemplate';

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
]);
