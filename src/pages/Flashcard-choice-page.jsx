import { useLocation, useNavigate } from 'react-router-dom'

export default function FlashcardChoicePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const subject = location.state
    console.log(subject)

    const select = (choice) => {
        if (subject === '단어카드') {
            navigate('/voca-flashcard', { state: choice })
        } else if (subject === '학습진단') {
            navigate('/voca-check', { state: choice })
        } else {
            navigate('/voca-quiz', { state: choice })
        }
    }

    return (
        <div className="flex h-full w-full flex-col justify-center gap-y-16 p-4 text-3xl font-bold text-[#1F2937]">
            <div
                className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-[#E5E7EB] hover:bg-[#C2C5CC]"
                onClick={() => {
                    select('word')
                }}
            >
                영어
            </div>
            <div
                className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-[#E5E7EB] hover:bg-[#C2C5CC]"
                onClick={() => {
                    select('meaning')
                }}
            >
                한글
            </div>
        </div>
    )
}
