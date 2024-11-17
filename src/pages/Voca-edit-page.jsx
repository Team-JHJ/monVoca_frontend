import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown,
    faCaretUp,
    faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { LuPencil } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export default function VocaEditPage() {
    const navigate = useNavigate()
    const exampleObj = [
        {
            id: 1,
            word: '영어1',
            definition: '뜻1',
            example: '예문1',
            note: '메모장',
        },
        {
            id: 2,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
        {
            id: 3,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
        {
            id: 4,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
        {
            id: 5,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
        {
            id: 6,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
        {
            id: 7,
            word: '영어2',
            definition: '뜻2',
            example: '예문2',
            note: '메모장',
        },
    ]

    const [isOpen, setIsOpen] = useState(
        new Array(exampleObj.length).fill(false),
    )
    console.log(isOpen)

    const openCard = (index) => {
        const openList = [...isOpen]
        openList[index] = !isOpen[index]
        setIsOpen(openList)
    }

    return (
        <div className="flex h-full w-full flex-col p-4">
            <div className="flex h-20 justify-between pb-8">
                <div
                    className="flex w-2/5 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        navigate('/add-word')
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
                {exampleObj.map((item, index) => (
                    <div key={index} className="relative w-full text-2xl">
                        <div
                            className={`relative z-10 flex h-16 items-center justify-between bg-[#CCE1FE] px-4 ${isOpen[index] ? 'rounded-t-lg' : 'rounded-lg'}`}
                        >
                            <p className="font-bold text-[#1D40B0]">
                                {item.word}
                            </p>
                            {
                                <FontAwesomeIcon
                                    className="h-2/3 cursor-pointer select-none"
                                    onClick={() => {
                                        openCard(index)
                                    }}
                                    icon={
                                        isOpen[index] ? faCaretUp : faCaretDown
                                    }
                                    color={
                                        isOpen[index] ? '#687EE2' : '#E26868'
                                    }
                                />
                            }
                        </div>
                        <div
                            className={`overflow-hidden rounded-b-lg border-2 border-t-0 border-[#F5F5F5] px-4 transition-transform duration-500 ${!isOpen[index] ? 'invisible h-0 -translate-y-12 opacity-0' : 'visible h-auto translate-y-0 opacity-100'}`}
                        >
                            <div className="flex justify-between py-4">
                                <div className="mr-2">{item.definition}</div>
                                <LuPencil
                                    size={28}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        navigate('/edit-word', {
                                            state: item.id,
                                        })
                                    }
                                />
                            </div>
                            <div className="py-4">{item.example}</div>
                            <div className="py-4">{item.note}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
