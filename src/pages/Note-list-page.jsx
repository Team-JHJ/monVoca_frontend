import logo from '@/assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    faArrowLeft,
    faChevronLeft,
    faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { AiOutlineHome } from 'react-icons/ai'
import { GrHomeRounded } from 'react-icons/gr'
import { IoArrowBack } from 'react-icons/io5'
import { HiArrowLeft } from 'react-icons/hi2'

export default function NoteListPage() {
    const navigate = useNavigate()
    const choice = useLocation().state.choice
    const note = [
        {
            id: 1,
            title: '단어장 1 이름이 긴경ㅇ ㅜ처리',
        },
        {
            id: 2,
            title: '단어장 3',
        },
        {
            id: 3,
            title: '단어장 1',
        },
        {
            id: 4,
            title: '단어장 1',
        },
        {
            id: 4,
            title: '단어장 1',
        },
        {
            id: 4,
            title: '단어장 1',
        },
    ]

    const navigatePage = () => {
        if (choice === '단어관리') {
            navigate('/voca-edit')
        } else if (choice === '전체단어') {
            navigate('/voca-learning')
        } else if (choice === '카드단어') {
            navigate('/')
        }
    }

    return (
        <div className="flex min-h-screen justify-center bg-gray-200">
            <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
                <div className="flex h-20 items-center justify-between px-4">
                    {/*<FontAwesomeIcon icon={faArrowLeft} className="h-2/3" />*/}
                    <HiArrowLeft
                        size={35}
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <GrHomeRounded
                        size={25}
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                </div>
                <div className="flex flex-1 flex-col justify-between overflow-hidden px-4">
                    <div className="flex h-1/4 items-center justify-center">
                        <img src={logo} alt="monvoca logo" className="" />
                    </div>
                    <div className="no-scrollbar flex-1 overflow-y-auto">
                        <div className="my-7 flex flex-wrap justify-around gap-y-6 py-4">
                            {note.map((note, index) => (
                                <div
                                    key={index}
                                    className="group flex aspect-square w-5/12 cursor-pointer flex-col items-center justify-center text-xl"
                                    onClick={() => navigatePage()}
                                >
                                    <div className="mb-1 h-fit w-3/4 rounded-xl bg-[#D8E9FE] p-2 group-hover:bg-[#3C82F6]">
                                        <FontAwesomeIcon
                                            icon={faFolder}
                                            className="h-full w-full"
                                        />
                                    </div>
                                    {/*
                                    <div className="mb-1 h-3/4 w-fit rounded-xl bg-[#D8E9FE] p-2 hover:bg-[#3C82F6]">
                                        <FontAwesomeIcon
                                            icon={faFolder}
                                            className="h-full"
                                        />
                                    </div>
                                    */}
                                    <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
                                        {note.title}
                                    </div>
                                </div>
                            ))}
                            <div className="flex aspect-square w-5/12 cursor-pointer items-center justify-center rounded-xl hover:bg-[#f5f5f5]">
                                <FontAwesomeIcon
                                    icon={faSquarePlus}
                                    className="h-1/2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-20"></div>
            </div>
        </div>
    )
}
