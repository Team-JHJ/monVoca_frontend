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

export default function VocaEditPage() {
    const navigate = useNavigate()
    const memoId = useLocation().state
    console.log(`생성하고나서 ${memoId}`)
    console.log(memoId)
    const userName = useSelector((state) => state.userSlice.userName)
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

    const openCard = (index) => {
        const openList = [...isOpen]
        openList[index] = !isOpen[index]
        setIsOpen(openList)
    }

    // 단어장 내 단어 리스트 가져오기
    const getDetailList = async () => {
        try {
            const response = await detail.getDetail(userName, memoId)
            console.log(response.data)
            setVocaList(response.data)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
            setVocaList(exampleObj)
        }
    }

    useEffect(() => {
        getDetailList()
    }, [])

    return (
        <div className="flex h-full w-full flex-col p-4">
            <div className="flex h-20 justify-between pb-8">
                <div
                    className="flex w-2/5 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        navigate('/add-word', { state: memoId })
                    }}
                >
                    <FontAwesomeIcon
                        className="h-2/3 select-none"
                        icon={faPlus}
                    />
                </div>
                <div className="flex w-2/5 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:bg-[#E5E7EB]">
                    <FontAwesomeIcon
                        className="h-2/3 select-none"
                        icon={faImage}
                    />
                </div>
            </div>
            <div className="no-scrollbar flex flex-1 flex-col gap-y-5 overflow-y-auto">
                {vocaList.map((item, index) => (
                    <div key={index} className="relative w-full text-2xl">
                        <div
                            className={`relative z-10 flex h-16 items-center justify-between bg-[#e5efff] px-4 ${isOpen[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                        >
                            <p className="font-bold text-[#1D40B0]">
                                {item.word}
                            </p>
                            {
                                <FontAwesomeIcon
                                    className="h-3/5 cursor-pointer select-none"
                                    onClick={() => {
                                        openCard(index)
                                    }}
                                    icon={
                                        isOpen[index] ? faAngleUp : faAngleDown
                                    }
                                    color={
                                        isOpen[index] ? '#687EE2' : '#E26868'
                                    }
                                />
                            }
                        </div>
                        <div
                            className={`overflow-hidden rounded-b-lg border-2 border-t-0 border-[#EBEBEB] px-4 transition-transform duration-500 ${!isOpen[index] ? 'invisible h-0 -translate-y-12 opacity-0' : 'visible h-auto translate-y-0 opacity-100'}`}
                        >
                            <div className="flex items-center justify-between py-4">
                                <div className="mr-4 bg-blue-100/50 px-1 text-lg text-gray-400">
                                    뜻
                                </div>
                                <div className="mr-2 flex-1">
                                    {item.meaning}
                                </div>
                                <LuPencil
                                    size={28}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        navigate('/edit-word', {
                                            state: { memoId, item },
                                        })
                                    }
                                />
                            </div>
                            {item.example && (
                                <div className="flex items-center">
                                    <div className="mr-4 bg-blue-100/50 px-1 text-lg text-gray-400">
                                        예문
                                    </div>
                                    <div className="py-4">{item.example}</div>
                                </div>
                            )}
                            {item.memo && (
                                <div className="flex items-center">
                                    <div className="mr-4 bg-blue-100/50 px-1 text-lg text-gray-400">
                                        메모
                                    </div>
                                    <div className="py-4">{item.memo}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
