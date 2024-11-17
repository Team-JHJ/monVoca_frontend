import { useNavigate } from 'react-router-dom'

export default function FlashcardChoicePage() {
    const navigate = useNavigate()

    const select = (choice) => {
        navigate('/voca-flashcard', { state: choice })
    }

    return (
        <div className="flex h-full w-full flex-col justify-center gap-y-16 p-4 text-3xl font-bold text-[#1F2937]">
            <div
                className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-[#E5E7EB] hover:bg-[#C2C5CC]"
                onClick={() => {
                    select('word')
                }}
            >
                영어로 학습
            </div>
            <div
                className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-[#E5E7EB] hover:bg-[#C2C5CC]"
                onClick={() => {
                    select('meaning')
                }}
            >
                한글로 학습
            </div>
        </div>
    )
}
