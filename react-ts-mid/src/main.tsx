import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // 使用 react-router-dom
import { router } from './router/router';



const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
} else {
    console.error('Root element not found!');
}
