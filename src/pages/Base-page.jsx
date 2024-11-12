import Header from '../components/Header.jsx'
import { Outlet } from 'react-router-dom'

export default function BasePage() {
    return (
        <div className="flex min-h-screen justify-center bg-gray-200">
            <div className="relative flex h-screen w-full max-w-md flex-col">
                <Header />
                <div className="h-full overflow-hidden bg-[#EFF6FF] p-4">
                    <div className="h-full w-full overflow-y-auto bg-amber-200">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
