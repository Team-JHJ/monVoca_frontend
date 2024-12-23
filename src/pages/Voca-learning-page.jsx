import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import detail from '@/api/detail.js'
import Loading from '@/components/loading.jsx'

export default function VocaLearningPage() {
    const exampleObj = [
        {
            id: 1,
            word: '영단어1',
            meaning: '뜻1',
            example: '예문1',
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
        {
            id: 7,
            word: '영단어7',
            meaning: '뜻7',
            example: '예문7',
            memo: '메모7',
        },

        {
            id: 1,
            word: '영단어1',
            meaning: '뜻1',
            example: '예문1',
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
            id: 1,
            word: '영단어1',
            meaning: '뜻1',
            example: '예문1',
            memo: '메모1',
        },
        {
            id: 2,
            word: '영단어2',
            meaning: '뜻2',
            example: '예문2',
            memo: '메모2',
        },
    ]

    const userName = useSelector((state) => state.userSlice.userName)
    const noteId = useSelector((state) => state.noteSlice.noteId)
    // console.log(`유저: ${userName}`)
    // console.log(`노트 ${noteId}`)
    const [vocaList, setVocaList] = useState([])
    const [showWord, setShowWord] = useState(true)
    const [showMeaning, setShowMeaning] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const toggleWord = () => {
        if (showWord && !showMeaning) {
            setShowMeaning((prev) => !prev)
        }
        setShowWord((prev) => !prev)
    }

    const toggleMeaning = () => {
        if (showMeaning && !showWord) {
            setShowWord((prev) => !prev)
        }
        setShowMeaning((prev) => !prev)
    }

    // 단어장 내 단어 리스트 가져오기
    const getDetailList = async () => {
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
        getDetailList()
    }, [])

    return (
        <div className="flex h-full w-full flex-col break-all p-4">
            <div className="flex h-20 justify-between pb-8 text-lg">
                <div
                    className="flex w-5/12 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        toggleWord()
                    }}
                >
                    {showWord ? '단어 가리기' : '단어 보이기'}
                </div>
                <div
                    className="flex w-5/12 cursor-pointer items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F5] hover:bg-[#E5E7EB]"
                    onClick={() => {
                        toggleMeaning()
                    }}
                >
                    {showMeaning ? '뜻 가리기' : '뜻 보이기'}
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="no-scrollbar flex flex-1 flex-col gap-y-5 overflow-y-auto">
                    {vocaList.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex rounded-lg bg-[#EFF6FF] py-4 text-lg"
                        >
                            <div
                                className={`w-1/2 px-4 text-[#1D40B0] ${!showWord && 'invisible'}`}
                            >
                                {item.word}
                            </div>
                            <div className="h-full border-2 border-white"></div>
                            <div
                                className={`w-1/2 px-4 text-[#2463EB] ${!showMeaning && 'invisible'}`}
                            >
                                {item.meaning}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
