import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BasePage from '@/pages/base-page.jsx'
import MainPage from '@/pages/main-page.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
