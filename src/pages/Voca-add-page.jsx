import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function VocaAddPage() {
    const location = useLocation()
    const path = location.pathname
    // console.log(path)
    const id = location.state
    const [input, setInput] = useState({
        id,
        word: '',
        meaning: '',
        example: '',
        memo: '',
    })
    const word = 'apple'
    const meaning = '사과'
    const example = 'I ate apple'
    const memo = '명사'
    // console.log(input)

    const updateData = (e) => {
        // console.log(e.target)
        const { name, value } = e.target
        const data = { ...input, [name]: value }
        setInput(data)
    }

    const submitData = (e) => {
        // e.preventDefault()
        if (id) {
            // 아이디가 있으면 단어 수정 처리
        } else {
            // 아이디가 없으면 단어 추가 처리
        }
    }

    useEffect(() => {
        if (path === '/edit-word') {
            const data = { id, word, meaning, example, memo }
            setInput(data)
        }
    }, [])

    return (
        <div className="flex h-full w-full flex-col p-4">
            <form
                action=""
                className="flex h-full flex-col justify-around py-10"
                onSubmit={(e) => {
                    submitData(e)
                }}
            >
                <input
                    name="word"
                    type="text"
                    placeholder="영단어"
                    className="text-input"
                    value={input.word}
                    onChange={(e) => {
                        updateData(e)
                    }}
                />
                <input
                    name="meaning"
                    type="text"
                    placeholder="뜻"
                    className="text-input"
                    value={input.meaning}
                    onChange={(e) => {
                        updateData(e)
                    }}
                />
                <input
                    name="example"
                    type="text"
                    placeholder="예문"
                    className="text-input"
                    value={input.example}
                    onChange={(e) => {
                        updateData(e)
                    }}
                />
                <textarea
                    name="memo"
                    rows="4"
                    placeholder="부가 설명"
                    className="resize-none rounded-lg border-2 border-[#E5E7EB] p-2"
                    value={input.memo}
                    onChange={(e) => {
                        updateData(e)
                    }}
                />
                {path === '/add-word' ? (
                    <div className="flex justify-center">
                        <button type="submit" className="submit-btn">
                            단어 추가
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between">
                        <button type="submit" className="submit-btn">
                            단어 수정
                        </button>
                        <button type="button" className="submit-btn">
                            단어 삭제
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
