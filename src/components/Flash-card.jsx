import { useEffect, useState } from 'react'

export default function FlashCard({
    choice,
    id,
    word,
    meaning,
    example,
    memo,
}) {
    const [isFront, setIsFront] = useState(true)
    const [onChange, setOnChange] = useState(false)

    useEffect(() => {
        setOnChange(true)
        setIsFront(true)
        const timer = setTimeout(() => {
            setOnChange(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [id])

    return (
        <div className="relative h-3/5 w-full [perspective:1100px]">
            {/* 카드 앞면*/}
            <div
                className={`flash-card absolute h-full w-full overflow-hidden transition-transform duration-1000 ${isFront ? 'front' : 'front-back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                <div className="h-full w-full p-5">
                    <div className="no-scrollbar flex h-full items-center justify-center overflow-y-auto">
                        {choice === 'word' ? word : meaning}
                    </div>
                </div>
            </div>
            {/* 카드 뒷면*/}
            <div
                className={`flash-card absolute h-full w-full transition-transform duration-1000 ${!isFront ? 'back-front' : 'back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                <div className="h-full p-5">
                    <div
                        className={`no-scrollbar flex h-full flex-col justify-center gap-y-6 overflow-y-auto ${onChange ? 'hidden' : 'flex'}`}
                    >
                        {choice === 'word' ? <p>{word}</p> : <p>{meaning}</p>}
                        {example && <p>{example}</p>}
                        {memo && <p>{memo}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
