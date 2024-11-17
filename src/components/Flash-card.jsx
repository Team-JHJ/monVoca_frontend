import { useState } from 'react'

export default function FlashCard({}) {
    const [isFront, setIsFront] = useState(true)

    return (
        <div className="relative h-3/5 w-full [perspective:1100px]">
            {/* 카드 앞면*/}
            <div
                className={`flash-card absolute h-full w-full transition-transform duration-1000 ${isFront ? 'front' : 'front-back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                앞
            </div>
            {/* 카드 뒷면*/}
            <div
                className={`flash-card absolute h-full w-full transition-transform duration-1000 ${!isFront ? 'back-front' : 'back'}`}
                onClick={() => setIsFront((prev) => !prev)}
            >
                뒷
            </div>
        </div>
    )
}
