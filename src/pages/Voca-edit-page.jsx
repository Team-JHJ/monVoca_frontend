import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleDown,
    faAngleUp,
    faCaretDown,
    faCaretUp,
    faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { LuPencil } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router-dom'
import detail from '@/api/detail.js'
import { useSelector } from 'react-redux'
import Loading from '@/components/loading.jsx'

export default function VocaEditPage() {
    const navigate = useNavigate()
    // const noteId = useLocation().state
    // console.log(`생성하고나서 ${noteId}`)
    // console.log(noteId)
    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)
    // console.log(`노트 아이디디디딛 ${noteId}`)
    const exampleObj = [
        {
            id: 1,
            word: '영어1',
            meaning: '뜻1',
            example: '예문1',
            memo: '메모장 메모장메모장메모장메모장메모장메모장메모장메모장',
        },
        {
            id: 2,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
        {
            id: 3,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
        {
            id: 4,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
        {
            id: 5,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
        {
            id: 6,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
        {
            id: 7,
            word: '영어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모장',
        },
    ]

    const [isOpen, setIsOpen] = useState(
        new Array(exampleObj.length).fill(false),
    )
    const [vocaList, setVocaList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const openCard = (index) => {
        const openList = [...isOpen]
        openList[index] = !isOpen[index]
        setIsOpen(openList)
    }

    // 단어장 내 단어 리스트 가져오기
    const getDetailList = async () => {
        // console.log('가져옴')
        setIsLoading(true)
        try {
            const response = await detail.getDetail(userName, noteId)
            // console.log(response.data)
            setVocaList(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Request Error:', error.message)
            alert(error.message)
            setVocaList(exampleObj)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getDetailList()
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex h-full w-full flex-col p-4">
            <div className="flex h-20 justify-between pb-8">
                <div
                    className="flex w-[45%] cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:border-[#C7CCD3] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        navigate('/add-word')
                    }}
                >
                    <FontAwesomeIcon
                        className="h-2/3 select-none"
                        icon={faPlus}
                    />
                </div>
                <div
                    className="flex w-[45%] cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:border-[#C7CCD3] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        navigate('/image-upload')
                    }}
                >
                    <FontAwesomeIcon
                        className="h-2/3 select-none"
                        icon={faImage}
                    />
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="no-scrollbar flex flex-1 flex-col gap-y-5 overflow-hidden overflow-y-auto">
                    {vocaList.map((item, index) => (
                        <div key={index} className="relative w-full text-2xl">
                            <div
                                className={`relative z-10 flex justify-between bg-[#e5efff] p-4 ${isOpen[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                            >
                                <p className="mr-1 font-bold text-[#1D40B0]">
                                    {item.word}
                                </p>
                                <div className="h-8">
                                    <FontAwesomeIcon
                                        className="cursor-pointer select-none"
                                        onClick={() => {
                                            openCard(index)
                                        }}
                                        icon={
                                            isOpen[index]
                                                ? faAngleUp
                                                : faAngleDown
                                        }
                                        color={
                                            isOpen[index]
                                                ? '#687EE2'
                                                : '#E26868'
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                className={`overflow-hidden rounded-b-lg border-2 border-t-0 border-[#EBEBEB] px-4 transition-transform duration-500 ${!isOpen[index] ? 'invisible h-0 -translate-y-12 opacity-0' : 'visible h-auto translate-y-0 opacity-100'}`}
                            >
                                <div className="flex justify-between py-4">
                                    <div className="mr-4 mt-0.5 h-7 bg-blue-100/50 px-1 text-lg text-gray-400">
                                        뜻
                                    </div>
                                    <div className="mr-2 flex-1">
                                        {item.meaning}
                                    </div>
                                    <LuPencil
                                        size={28}
                                        className="mt-0.5 cursor-pointer text-gray-600 hover:text-black"
                                        onClick={() =>
                                            navigate('/edit-word', {
                                                state: { item },
                                            })
                                        }
                                    />
                                </div>
                                {item.example && (
                                    <div className="flex py-4">
                                        <div className="mr-4 mt-1 h-7 bg-blue-100/50 px-1 text-lg text-gray-400">
                                            예문
                                        </div>
                                        <div className="flex-1">
                                            {item.example}
                                        </div>
                                    </div>
                                )}
                                {item.memo && (
                                    <div className="flex py-4">
                                        <div className="mr-4 mt-1 h-7 bg-blue-100/50 px-1 text-lg text-gray-400">
                                            메모
                                        </div>
                                        <div className="flex-1">
                                            {item.memo}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
