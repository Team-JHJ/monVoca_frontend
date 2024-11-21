import { useLocation } from 'react-router-dom'
import FlashCard from '@/components/Flash-card.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleChevronLeft,
    faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import detail from '@/api/detail.js'

export default function VocaFlashcardPage() {
    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)
    const choice = useLocation().state
    const exampleObj = [
        {
            id: 1,
            word: '영단어1',
            meaning: '뜻1',
            example: '',
            memo: '메모1',
        },
        {
            id: 2,
            word: '영단어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모2',
        },
        {
            id: 3,
            word: '영단어3',
            meaning: '뜻3',
            example: '예문3',
            memo: '메모3',
        },
        {
            id: 4,
            word: '영단어4',
            meaning: '뜻4',
            example: '예문4',
            memo: '메모4',
        },
        {
            id: 5,
            word: '영단어5',
            meaning: '뜻5',
            example: '예문5',
            memo: '메모5',
        },
        {
            id: 6,
            word: '영단어6',
            meaning: '뜻6',
            example: '예문6',
            memo: '메모6',
        },
        {
            id: 7,
            word: '영단어7',
            meaning: '뜻7',
            example: '예문7',
            memo: '메모7',
        },
    ]

    const [vocaList, setVocaList] = useState([])
    const [voca, setVoca] = useState({})
    const [listIndex, setListIndex] = useState(0)

    const nextVoca = () => {
        setListIndex((prev) => (prev + 1) % vocaList.length)
    }

    const prevVoca = () => {
        setListIndex((prev) => (prev <= 0 ? vocaList.length - 1 : prev - 1))
    }

    const getVoca = () => {
        setVoca(vocaList[listIndex])
    }

    // 단어장 내 단어 리스트 가져오기
    const getDetailList = async () => {
        console.log('가져옴')
        try {
            const response = await detail.getDetail(userName, noteId)
            console.log(response.data)
            setVocaList(response.data)
            getVoca()
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
            setVocaList(exampleObj)
        }
    }

    // voca가 유효한지 확인하는 함수 추가
    const isVocaValid = () => {
        return voca && Object.keys(voca).length > 0 && voca.id
    }

    useEffect(() => {
        getDetailList()
    }, [])

    useEffect(() => {
        if (vocaList.length > 0) {
            getVoca()
        }
    }, [vocaList, listIndex])

    return (
        <div className="flex h-full w-full flex-col overflow-hidden p-4">
            <div className="no-scrollbar flex h-full items-center overflow-y-auto">
                {isVocaValid() ? (
                    <FlashCard
                        choice={choice}
                        id={voca.id}
                        word={voca.word}
                        meaning={voca.meaning}
                        example={voca.example}
                        memo={voca.memo}
                    />
                ) : (
                    <FlashCard
                        choice=""
                        id=""
                        word=""
                        meaning=""
                        example=""
                        memo=""
                    />
                )}
            </div>
            <div className="flex h-24 items-center justify-between py-3">
                <FontAwesomeIcon
                    icon={faCircleChevronLeft}
                    className="h-full cursor-pointer text-[#3C82F6] hover:text-[#2563EB]"
                    onClick={() => {
                        prevVoca()
                    }}
                />
                <div className="text-2xl font-bold">
                    {listIndex + 1} / {vocaList.length}
                </div>
                <FontAwesomeIcon
                    icon={faCircleChevronRight}
                    className="h-full cursor-pointer text-[#3C82F6] hover:text-[#2563EB]"
                    onClick={() => {
                        nextVoca()
                    }}
                />
            </div>
        </div>
    )
}
