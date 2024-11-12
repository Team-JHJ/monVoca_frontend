import logo from '@/assets/img/logo.png'
import { Link } from 'react-router-dom'

export default function MainPage() {
    return (
        <div className="flex min-h-screen justify-center bg-gray-200">
            <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
                <div className="h-20"></div>
                <div className="flex flex-1 flex-col px-4">
                    <div className="flex h-1/4 items-center justify-center">
                        <img
                            src={logo}
                            alt="monvoca logo"
                            className="mx-auto"
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                        <p className="mb-1 text-4xl font-medium">단어</p>
                        <div className="flex justify-between break-keep text-center text-3xl font-bold text-[#1D40B0]">
                            <div className="flex aspect-square w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="/note-list">단어장 관리하기</Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="/note-list">전체 단어보기</Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="/note-list">카드 단어보기</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                        <p className="mb-1 text-4xl font-medium">복습</p>
                        <div className="flex justify-between break-keep text-center text-3xl font-bold text-[#1D40B0]">
                            <div className="flex aspect-square w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                O, X 자가진단
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                예문 빈칸학습
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                단어 선택하기
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-20"></div>
            </div>
        </div>
    )
}
