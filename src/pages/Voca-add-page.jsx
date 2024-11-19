import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import detail from '@/api/detail.js'
import { useSelector } from 'react-redux'

export default function VocaAddPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname
    let noteId = location.state.noteId
    if (path !== '/edit-word') {
        noteId = location.state
    }
    console.log(noteId)
    // if
    // const item = location.state.item
    const userName = useSelector((state) => state.userSlice.userName)
    // console.log(noteId)
    // console.log(item)
    // console.log(id)
    const [input, setInput] = useState({
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

    const createDetail = async () => {
        try {
            const response = await detail.createDetail(userName, noteId, input)
            console.log(response.status)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    const updateDetail = async () => {
        try {
            const response = await detail.updateDetail(userName, input)
            console.log(response.status)
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    const deleteDetail = async () => {
        try {
            const response = await detail.deleteDetail(
                userName,
                noteId,
                location.state.item.id,
            )
            console.log(response.status)
            navigate('/voca-edit', { state: noteId })
        } catch (error) {
            console.error('Request Error:', error.message)
            // alert(error.message)
        }
    }

    const submitData = (e) => {
        // e.preventDefault()
        if (input.detailId) {
            // 아이디가 있으면 단어 수정 요청
            updateDetail()
            navigate('/voca-edit', { state: noteId })
        } else {
            // 아이디가 없으면 단어 추가 요청
            createDetail()
            // navigate(-2)
            navigate('/voca-edit', { state: noteId })
        }
    }

    useEffect(() => {
        // 단어를 수정하는 경우 기존 저장 내용이 보이도록 설정
        if (path === '/edit-word') {
            const item = location.state.item
            const data = {
                userName: userName,
                noteId: noteId,
                detailId: item.id,
                word: item.word,
                meaning: item.meaning,
                example: item.example,
                memo: item.memo,
            }
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
                    required={true}
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
                    required={true}
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
                        <button
                            type="button"
                            className="submit-btn"
                            onClick={deleteDetail}
                        >
                            단어 삭제
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
