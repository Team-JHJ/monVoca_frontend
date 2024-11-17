import { useState } from 'react'

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

    const [showWord, setShowWord] = useState(true)
    const [showMeaning, setShowMeaning] = useState(true)

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

    return (
        <div className="flex h-full w-full flex-col p-4">
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
            <div className="no-scrollbar flex flex-1 flex-col gap-y-5 overflow-y-auto">
                {exampleObj.map((item, index) => (
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
        </div>
    )
}
