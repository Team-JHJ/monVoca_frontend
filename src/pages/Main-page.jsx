import logo from '@/assets/img/logo.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import user from '@/api/user.js'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/user-slice.js'

export default function MainPage() {
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        userName: 'admin2',
        userPassword: '12345',
        userEmail: 'govmo1282@gmail.com',
    })

    const getUser = async () => {
        try {
            const response = await user.getUser('admin2')
            console.log(response.data)
            // console.log(response.status)
            dispatch(setUser(response.data.userName))
        } catch (error) {
            // console.log(error)
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    const createUser = async () => {
        try {
            const response = await user.createUser(
                userInfo.userName,
                userInfo.userPassword,
                userInfo.userEmail,
            )
            console.log(response.data)
            console.log(response.status)
        } catch (error) {
            console.error('Request Error:', error.message)
            alert(error.message)
        }
    }

    useEffect(() => {
        // createUser()
        getUser()
    }, [])

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
                        <p className="mb-1 text-4xl font-medium sm:text-3xl">
                            단어
                        </p>
                        <div className="flex justify-between break-keep text-center text-3xl font-bold text-[#1D40B0] sm:text-2xl sm:font-extrabold">
                            <div className="flex aspect-square w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link
                                    to="/note-list"
                                    state={{ choice: '단어관리' }}
                                >
                                    단어장 관리하기
                                </Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link
                                    to="/note-list"
                                    state={{ choice: '전체단어' }}
                                >
                                    전체 단어보기
                                </Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link
                                    to="/note-list"
                                    state={{ choice: '단어카드' }}
                                >
                                    단어 카드보기
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                        <p className="mb-1 text-4xl font-medium sm:text-3xl">
                            복습
                        </p>
                        <div className="flex justify-between break-keep text-center text-3xl font-bold text-[#1D40B0] sm:text-2xl sm:font-extrabold">
                            <div className="flex aspect-square w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="" state={{ choice: '학습진단' }}>
                                    O, X 자가진단
                                </Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="" state={{ choice: '예문학습' }}>
                                    예문 빈칸학습
                                </Link>
                            </div>
                            <div className="flex w-[30%] cursor-pointer items-center justify-center rounded-md bg-[#D8E9FE] p-2 hover:bg-[#3C82F6] hover:text-white">
                                <Link to="" state={{ choice: '단어선택' }}>
                                    단어 선택하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-20"></div>
            </div>
        </div>
    )
}
